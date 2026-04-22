import type { Song } from './types';

type LocalAudioFallbackSong = Pick<Song, 'originalId'>;

type LocalAudioFallbackAttempt = {
  responseOk: boolean;
  message?: string | null;
};

const LOCAL_AUDIO_FALLBACK_SONGS = new Map<number, Song>([
  [
    1808923954,
    {
      id: 'LOCAL_AUDIO_SUBMARINE_LIMPERATRICE',
      originalId: 1808923954,
      name: 'Submarine',
      duration: 284940,
      artistIds: ['LOCAL_ARTIST_LIMPERATRICE'],
      artistNames: ["L'Impératrice"],
      albumId: null,
      coverImgUrl: null,
      liked: false,
      visible: true,
      maxBrLevel: null,
      plLevel: null,
      dlLevel: null,
      playable: true,
    },
  ],
  [
    5069277,
    {
      id: 'LOCAL_AUDIO_JUNGLE_HEARTBEAT_SUDUAYA',
      originalId: 5069277,
      name: 'Jungle HeartBeat',
      duration: 285380,
      artistIds: ['LOCAL_ARTIST_SUDUAYA'],
      artistNames: ['Suduaya'],
      albumId: null,
      coverImgUrl: null,
      liked: false,
      visible: true,
      maxBrLevel: null,
      plLevel: null,
      dlLevel: null,
      playable: true,
    },
  ],
]);

const LOCAL_AUDIO_FALLBACK_BY_ORIGINAL_ID = new Map<number, string>([
  [1364351242, '/audio/haru-o-matte-never-young-beach.m4a'],
  [1364351247, '/audio/itsumo-ame-never-young-beach.m4a'],
  [1435628297, '/audio/la-lune-limperatrice.m4a'],
  [1808923954, '/audio/submarine-limperatrice.m4a'],
  [5069277, '/audio/jungle-heartbeat-suduaya.m4a'],
]);

export function getLocalAudioFallbackSong(originalId: number) {
  return LOCAL_AUDIO_FALLBACK_SONGS.get(originalId) ?? null;
}

export function resolveLocalAudioFallbackSource(song: LocalAudioFallbackSong | null | undefined) {
  if (!song) return null;
  return LOCAL_AUDIO_FALLBACK_BY_ORIGINAL_ID.get(song.originalId) ?? null;
}

export function shouldUseLocalAudioFallback(
  song: LocalAudioFallbackSong | null | undefined,
  attempt: LocalAudioFallbackAttempt,
) {
  if (attempt.responseOk) return false;
  return resolveLocalAudioFallbackSource(song) !== null;
}
