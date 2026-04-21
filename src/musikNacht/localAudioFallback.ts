import type { Song } from './types';

type LocalAudioFallbackSong = Pick<Song, 'originalId'>;

type LocalAudioFallbackAttempt = {
  responseOk: boolean;
  message?: string | null;
};

const LOCAL_AUDIO_FALLBACK_BY_ORIGINAL_ID = new Map<number, string>([
  [1364351242, '/audio/haru-o-matte-never-young-beach.m4a'],
  [1364351247, '/audio/itsumo-ame-never-young-beach.m4a'],
]);

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
