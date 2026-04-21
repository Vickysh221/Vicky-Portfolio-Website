import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const execFileAsync = promisify(execFile);

type PlayerCommand = 'play' | 'pause' | 'resume' | 'stop' | 'state';

type PlayPayload = {
  encryptedId?: string;
  originalId?: number | string;
};

type SearchTrack = {
  originalId: number;
  id: string;
  name: string;
  duration: number;
  fullArtists?: Array<{
    id: string;
    name: string;
  }>;
  album?: {
    id?: string;
  } | null;
  coverImgUrl?: string | null;
  liked?: boolean;
  visible?: boolean;
  maxBrLevel?: string | null;
  plLevel?: string | null;
  dlLevel?: string | null;
  playFlag?: boolean;
};

type SearchSongResponse = {
  data?: {
    records?: SearchTrack[];
  };
};

type SongLyricResponse = {
  data?: {
    lyric?: string | null;
    transLyric?: string | null;
    noLyric?: boolean | null;
    pureMusic?: boolean | null;
  };
};

type SceneSong = {
  id: string;
  originalId: number;
  name: string;
  duration: number;
  artistIds: string[];
  artistNames?: string[];
  albumId: string | null;
  coverImgUrl: string | null;
  liked: boolean;
  visible: boolean;
  maxBrLevel: string | null;
  plLevel: string | null;
  dlLevel: string | null;
  playable?: boolean;
};

type BotSongMapEntry = {
  songId: string;
  songTitle: string;
  artist: string;
  botId: string;
  botRole: string;
  lyricSurface: {
    type: string;
    placement: string;
    style: string;
  };
};

type ResolvedBotSongMapEntry = BotSongMapEntry & {
  resolvedSong: SceneSong | null;
};

const BOT_MAP_CACHE_TTL_MS = 5 * 60 * 1000;

let botSongMapCache:
  | {
      expiresAt: number;
      entries: ResolvedBotSongMapEntry[];
    }
  | undefined;

function asJsonResponse(res: import('node:http').ServerResponse, payload: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function parseJson<T>(value: unknown): T {
  return value as T;
}

async function runNcm(command: PlayerCommand, payload?: PlayPayload) {
  const args: string[] = [command];

  if (command === 'play') {
    if (!payload?.encryptedId || !payload?.originalId) {
      throw new Error('Missing encryptedId/originalId for play command');
    }

    args.push(
      '--song',
      '--encrypted-id',
      String(payload.encryptedId),
      '--original-id',
      String(payload.originalId),
      '--output',
      'json',
    );
  } else {
    args.push('--output', 'json');
  }

  const { stdout, stderr } = await execFileAsync('ncm-cli', args, {
    timeout: command === 'play' ? 15000 : 8000,
    maxBuffer: 1024 * 1024,
  });

  const output = `${stdout ?? ''}${stderr ?? ''}`.trim();

  try {
    return output ? JSON.parse(output) : { success: true, raw: '' };
  } catch {
    return { success: true, raw: output };
  }
}

function toSceneSong(track: SearchTrack): SceneSong {
  return {
    id: track.id,
    originalId: track.originalId,
    name: track.name,
    duration: track.duration,
    artistIds: (track.fullArtists ?? []).map((artist) => artist.id),
    artistNames: (track.fullArtists ?? []).map((artist) => artist.name),
    albumId: track.album?.id ?? null,
    coverImgUrl: track.coverImgUrl ?? null,
    liked: Boolean(track.liked),
    visible: track.visible ?? true,
    maxBrLevel: track.maxBrLevel ?? null,
    plLevel: track.plLevel ?? null,
    dlLevel: track.dlLevel ?? null,
    playable: Boolean(track.playFlag),
  };
}

async function loadSongLyrics(songId: string) {
  try {
    const result = parseJson<SongLyricResponse>(
      await execFileAsync('ncm-cli', ['song', 'lyric', '--songId', songId, '--output', 'json'], {
        timeout: 15000,
        maxBuffer: 2 * 1024 * 1024,
      }).then(({ stdout }) => JSON.parse(stdout)),
    );

    return {
      lyric: result.data?.lyric ?? null,
      transLyric: result.data?.transLyric ?? null,
      noLyric: Boolean(result.data?.noLyric),
      pureMusic: Boolean(result.data?.pureMusic),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const lyricCommandMissing =
      message.includes("unknown command 'song'") ||
      message.includes('Unknown command: song') ||
      message.includes('song lyric');

    if (lyricCommandMissing) {
      return {
        lyric: null,
        transLyric: null,
        noLyric: false,
        pureMusic: false,
      };
    }

    throw error;
  }
}

async function resolveBotSong(entry: BotSongMapEntry) {
  const keyword = `${entry.songTitle} ${entry.artist}`.trim();
  const result = parseJson<SearchSongResponse>(
    await execFileAsync('ncm-cli', ['search', 'song', '--keyword', keyword, '--limit', '10', '--output', 'json'], {
      timeout: 15000,
      maxBuffer: 2 * 1024 * 1024,
    }).then(({ stdout }) => JSON.parse(stdout)),
  );

  const targetOriginalId = Number(entry.songId);
  const records = result.data?.records ?? [];
  const match =
    records.find((track) => track.originalId === targetOriginalId && track.playFlag && track.id) ??
    records.find((track) => track.originalId === targetOriginalId && track.id) ??
    null;

  return match ? toSceneSong(match) : null;
}

async function loadBotSongMap() {
  if (botSongMapCache && botSongMapCache.expiresAt > Date.now()) {
    return botSongMapCache.entries;
  }

  const source = await readFile(
    path.resolve(process.cwd(), 'src/musikNacht/data/clawd-bot-song-map.json'),
    'utf8',
  );
  const entries = parseJson<BotSongMapEntry[]>(JSON.parse(source));
  const resolvedEntries = await Promise.all(
    entries.map(async (entry) => {
      try {
        return {
          ...entry,
          resolvedSong: await resolveBotSong(entry),
        };
      } catch {
        return {
          ...entry,
          resolvedSong: null,
        };
      }
    }),
  );

  botSongMapCache = {
    expiresAt: Date.now() + BOT_MAP_CACHE_TTL_MS,
    entries: resolvedEntries,
  };

  return resolvedEntries;
}

function installNcmBridge(middlewares: { use: (path: string, fn: (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => Promise<void>) => void }) {
  middlewares.use('/api/player', async (req, res) => {
    if (!req.url) {
      asJsonResponse(res, { success: false, message: 'Missing URL' }, 400);
      return;
    }

    const method = req.method ?? 'GET';
    const url = new URL(req.url, 'http://localhost');
    const action = url.pathname.replace(/^\//, '') || 'state';

    try {
      if (method === 'GET' && action === 'state') {
        const result = await runNcm('state');
        asJsonResponse(res, result);
        return;
      }

      if (method !== 'POST') {
        asJsonResponse(res, { success: false, message: 'Method not allowed' }, 405);
        return;
      }

      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }
      const payload = body ? (JSON.parse(body) as PlayPayload) : undefined;

      if (action === 'play') {
        const result = await runNcm('play', payload);
        asJsonResponse(res, result, result?.success === false ? 502 : 200);
        return;
      }

      if (action === 'pause' || action === 'resume' || action === 'stop') {
        const result = await runNcm(action);
        asJsonResponse(res, result, result?.success === false ? 502 : 200);
        return;
      }

      asJsonResponse(res, { success: false, message: `Unknown action: ${action}` }, 404);
    } catch (error) {
      asJsonResponse(
        res,
        {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown bridge error',
        },
        500,
      );
    }
  });

  middlewares.use('/api/library', async (req, res) => {
    if (!req.url) {
      asJsonResponse(res, { success: false, message: 'Missing URL' }, 400);
      return;
    }

    const method = req.method ?? 'GET';
    const url = new URL(req.url, 'http://localhost');
    const action = url.pathname.replace(/^\//, '');

    if (method !== 'GET') {
      asJsonResponse(res, { success: false, message: 'Method not allowed' }, 405);
      return;
    }

    try {
      if (action === 'lyrics') {
        const songId = url.searchParams.get('songId');
        if (!songId) {
          asJsonResponse(res, { success: false, message: 'Missing songId' }, 400);
          return;
        }

        const lyrics = await loadSongLyrics(songId);
        asJsonResponse(res, { success: true, ...lyrics });
        return;
      }

      if (action === 'bot-song-map') {
        const entries = await loadBotSongMap();
        asJsonResponse(res, { success: true, entries });
        return;
      }

      asJsonResponse(res, { success: false, message: `Unknown action: ${action}` }, 404);
    } catch (error) {
      asJsonResponse(
        res,
        {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown library bridge error',
        },
        500,
      );
    }
  });
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ncm-local-bridge',
      configureServer(server) {
        installNcmBridge(server.middlewares);
      },
      configurePreviewServer(server) {
        installNcmBridge(server.middlewares);
      },
    },
  ],
  assetsInclude: ['**/*.mov'],
});
