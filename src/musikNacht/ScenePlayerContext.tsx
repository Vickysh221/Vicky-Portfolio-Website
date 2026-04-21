import {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { FALLBACK_BOT_SCENE_MAP } from './data/botSceneMap';
import {
  resolveLocalAudioFallbackSource,
  shouldUseLocalAudioFallback,
} from './localAudioFallback';
import type { PlaybackState, Song } from './types';

type ScenePlayerContextValue = {
  songs: Song[];
  playback: PlaybackState;
  playerHint: string;
  playerBusy: boolean;
  selectSong: (songId: string | null) => void;
  upsertSongs: (nextSongs: Song[]) => void;
  refreshPlayerState: () => Promise<void>;
  playSelectedSong: (songId?: string) => Promise<void>;
  pausePlayback: () => Promise<void>;
  stopPlayback: () => Promise<void>;
};

const ScenePlayerContext = createContext<ScenePlayerContextValue | null>(null);

let playbackRequestVersion = 0;

function collectInitialSongs() {
  const deduped = new Map<string, Song>();

  for (const entry of FALLBACK_BOT_SCENE_MAP) {
    if (!entry.resolvedSong) continue;
    deduped.set(entry.resolvedSong.id, entry.resolvedSong);
  }

  return Array.from(deduped.values());
}

const INITIAL_SONGS = collectInitialSongs();

const INITIAL_PLAYBACK: PlaybackState = {
  status: 'stopped',
  currentSongId: null,
  progress: 0,
  duration: 0,
  volume: null,
  source: 'mock',
};

export function ScenePlayerProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [playback, setPlayback] = useState<PlaybackState>(INITIAL_PLAYBACK);
  const [playerHint, setPlayerHint] = useState('本地播放器待命中');
  const [playerBusy, setPlayerBusy] = useState(false);
  const browserAudioRef = useRef<HTMLAudioElement | null>(null);
  const browserAudioSongIdRef = useRef<string | null>(null);

  const selectSong = useCallback((songId: string | null) => {
    setPlayback((current) => {
      const nextSong = songs.find((song) => song.id === songId) ?? null;
      return {
        ...current,
        currentSongId: songId,
        duration: nextSong?.duration ? nextSong.duration / 1000 : current.duration,
      };
    });
  }, [songs]);

  const upsertSongs = useCallback((nextSongs: Song[]) => {
    setSongs((current) => {
      const merged = new Map(current.map((song) => [song.id, song]));
      for (const song of nextSongs) {
        merged.set(song.id, song);
      }
      return Array.from(merged.values());
    });
  }, []);

  const syncBrowserAudioState = useCallback((statusOverride?: PlaybackState['status']) => {
    const audio = browserAudioRef.current;
    const currentSongId = browserAudioSongIdRef.current;
    if (!audio || !currentSongId) return;

    const nextStatus =
      statusOverride ??
      (audio.ended ? 'stopped' : audio.paused ? (audio.currentTime > 0 ? 'paused' : 'stopped') : 'playing');

    setPlayback((current) => ({
      ...current,
      status: nextStatus,
      currentSongId,
      progress: Number.isFinite(audio.currentTime) ? audio.currentTime : current.progress,
      duration:
        Number.isFinite(audio.duration) && audio.duration > 0
          ? audio.duration
          : current.duration,
      source: 'browser-audio',
    }));
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    browserAudioRef.current = audio;

    const handlePlay = () => syncBrowserAudioState('playing');
    const handlePause = () => syncBrowserAudioState(audio.currentTime > 0 ? 'paused' : 'stopped');
    const handleTimeUpdate = () => syncBrowserAudioState();
    const handleLoadedMetadata = () => syncBrowserAudioState();
    const handleEnded = () => {
      syncBrowserAudioState('stopped');
      setPlayerHint('内置音频播放结束');
    };
    const handleError = () => {
      setPlayerHint('内置音频加载失败');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.src = '';
      browserAudioRef.current = null;
      browserAudioSongIdRef.current = null;
    };
  }, [syncBrowserAudioState]);

  const stopBrowserAudioPlayback = useCallback((resetPosition: boolean) => {
    const audio = browserAudioRef.current;
    if (!audio) return;
    audio.pause();
    if (resetPosition) {
      audio.currentTime = 0;
    }
    syncBrowserAudioState(resetPosition ? 'stopped' : 'paused');
  }, [syncBrowserAudioState]);

  const playBrowserAudioFallback = useCallback(async (selectedSong: Song, fallbackReason?: string) => {
    const audioSource = resolveLocalAudioFallbackSource(selectedSong);
    const audio = browserAudioRef.current;
    if (!audioSource || !audio) return false;

    browserAudioSongIdRef.current = selectedSong.id;

    if (audio.getAttribute('src') !== audioSource) {
      audio.src = audioSource;
      audio.load();
    }

    try {
      await audio.play();
      setPlayback((current) => ({
        ...current,
        status: 'playing',
        currentSongId: selectedSong.id,
        progress: audio.currentTime,
        duration:
          Number.isFinite(audio.duration) && audio.duration > 0
            ? audio.duration
            : selectedSong.duration / 1000,
        source: 'browser-audio',
      }));
      setPlayerHint(
        fallbackReason
          ? `${fallbackReason}，已切到内置音频：${selectedSong.name}`
          : `已切到内置音频：${selectedSong.name}`,
      );
      return true;
    } catch (error) {
      setPlayback((current) => ({
        ...current,
        status: 'paused',
        currentSongId: selectedSong.id,
        source: 'browser-audio',
      }));
      setPlayerHint(
        error instanceof Error && error.name === 'NotAllowedError'
          ? '浏览器阻止了自动播放，请点击播放按钮继续'
          : `内置音频播放失败：${selectedSong.name}`,
      );
      return false;
    }
  }, []);

  const refreshPlayerState = useCallback(async () => {
    const requestVersion = playbackRequestVersion;

    if (playback.source === 'browser-audio' && browserAudioSongIdRef.current) {
      syncBrowserAudioState();
      return;
    }

    try {
      const response = await fetch('/api/player/state');
      const result = await response.json();
      if (requestVersion !== playbackRequestVersion) return;

      if (result?.state) {
        setPlayback((current) => ({
          ...current,
          status: result.state.status ?? current.status,
          progress: result.state.position ?? current.progress,
          volume: result.state.volume ?? current.volume,
          source: 'local-bridge',
        }));
        setPlayerHint(
          result.state.title
            ? `本地播放中：${result.state.title}`
            : `本地播放器状态：${result.state.status ?? 'unknown'}`,
        );
      }
    } catch {
      setPlayerHint('未连上本地 player bridge');
    }
  }, [playback.source, syncBrowserAudioState]);

  const playSelectedSong = useCallback(async (songId?: string) => {
    const targetSongId = songId ?? playback.currentSongId;
    const selectedSong = songs.find((song) => song.id === targetSongId);
    if (!selectedSong) return;

    const requestVersion = ++playbackRequestVersion;

    if (targetSongId !== playback.currentSongId) {
      selectSong(targetSongId);
    }

    if (playback.source === 'browser-audio' && browserAudioSongIdRef.current === selectedSong.id) {
      setPlayerBusy(true);
      await playBrowserAudioFallback(selectedSong);
      setPlayerBusy(false);
      return;
    }

    if (playback.source === 'browser-audio' && browserAudioSongIdRef.current) {
      stopBrowserAudioPlayback(true);
      browserAudioSongIdRef.current = null;
      setPlayback((current) => ({
        ...current,
        status: 'stopped',
        currentSongId: selectedSong.id,
        progress: 0,
        source: 'mock',
      }));
    }

    setPlayerBusy(true);
    setPlayerHint(`尝试播放：${selectedSong.name}`);

    try {
      const response = await fetch('/api/player/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          encryptedId: selectedSong.id,
          originalId: selectedSong.originalId,
        }),
      });
      const result = await response.json();
      if (requestVersion !== playbackRequestVersion) return;

      if (shouldUseLocalAudioFallback(selectedSong, {
        responseOk: response.ok,
        message: result?.message ?? result?.raw ?? null,
      })) {
        await playBrowserAudioFallback(selectedSong, result?.message ?? result?.raw ?? null);
        return;
      }

      setPlayback((current) => ({
        ...current,
        status: response.ok ? 'playing' : current.status,
        currentSongId: response.ok ? selectedSong.id : current.currentSongId,
        duration: response.ok ? selectedSong.duration / 1000 : current.duration,
        source: response.ok ? 'local-bridge' : current.source,
      }));
      setPlayerHint(result?.message ?? result?.raw ?? `已发送播放请求：${selectedSong.name}`);

      window.setTimeout(() => {
        if (requestVersion !== playbackRequestVersion) return;
        void refreshPlayerState();
      }, 1500);
    } catch {
      if (requestVersion !== playbackRequestVersion) return;
      const playedFallback = await playBrowserAudioFallback(selectedSong, '未连上本地 bridge');
      if (!playedFallback) {
        setPlayerHint('播放请求失败：未连上本地 bridge');
      }
    } finally {
      if (requestVersion === playbackRequestVersion) {
        setPlayerBusy(false);
      }
    }
  }, [
    playback.currentSongId,
    playback.source,
    playBrowserAudioFallback,
    refreshPlayerState,
    selectSong,
    songs,
    stopBrowserAudioPlayback,
  ]);

  const pausePlayback = useCallback(async () => {
    if (playback.source === 'browser-audio' && browserAudioSongIdRef.current) {
      setPlayerBusy(true);
      stopBrowserAudioPlayback(false);
      setPlayerHint('已暂停内置音频');
      setPlayerBusy(false);
      return;
    }

    const requestVersion = ++playbackRequestVersion;
    setPlayerBusy(true);

    try {
      await fetch('/api/player/pause', { method: 'POST' });
      if (requestVersion !== playbackRequestVersion) return;

      setPlayback((current) => ({
        ...current,
        status: 'paused',
        source: 'local-bridge',
      }));
      setPlayerHint('已发送暂停命令');

      window.setTimeout(() => {
        if (requestVersion !== playbackRequestVersion) return;
        void refreshPlayerState();
      }, 800);
    } catch {
      if (requestVersion !== playbackRequestVersion) return;
      setPlayerHint('暂停失败：未连上本地 bridge');
    } finally {
      if (requestVersion === playbackRequestVersion) {
        setPlayerBusy(false);
      }
    }
  }, [playback.source, refreshPlayerState, stopBrowserAudioPlayback]);

  const stopPlayback = useCallback(async () => {
    if (playback.source === 'browser-audio' && browserAudioSongIdRef.current) {
      setPlayerBusy(true);
      stopBrowserAudioPlayback(true);
      setPlayback((current) => ({
        ...current,
        status: 'stopped',
        progress: 0,
        source: 'browser-audio',
      }));
      setPlayerHint('已停止内置音频');
      setPlayerBusy(false);
      return;
    }

    const requestVersion = ++playbackRequestVersion;
    setPlayerBusy(true);

    try {
      await fetch('/api/player/stop', { method: 'POST' });
      if (requestVersion !== playbackRequestVersion) return;

      setPlayback((current) => ({
        ...current,
        status: 'stopped',
        progress: 0,
        source: 'local-bridge',
      }));
      setPlayerHint('已发送停止命令');

      window.setTimeout(() => {
        if (requestVersion !== playbackRequestVersion) return;
        void refreshPlayerState();
      }, 800);
    } catch {
      if (requestVersion !== playbackRequestVersion) return;
      setPlayerHint('停止失败：未连上本地 bridge');
    } finally {
      if (requestVersion === playbackRequestVersion) {
        setPlayerBusy(false);
      }
    }
  }, [playback.source, refreshPlayerState, stopBrowserAudioPlayback]);

  const value = useMemo<ScenePlayerContextValue>(() => ({
    songs,
    playback,
    playerHint,
    playerBusy,
    selectSong,
    upsertSongs,
    refreshPlayerState,
    playSelectedSong,
    pausePlayback,
    stopPlayback,
  }), [
    pausePlayback,
    playback,
    playSelectedSong,
    playerBusy,
    playerHint,
    refreshPlayerState,
    selectSong,
    songs,
    stopPlayback,
    upsertSongs,
  ]);

  return (
    <ScenePlayerContext.Provider value={value}>
      {children}
    </ScenePlayerContext.Provider>
  );
}

export function useScenePlayer() {
  const value = useContext(ScenePlayerContext);
  if (!value) {
    throw new Error('useScenePlayer must be used within a ScenePlayerProvider');
  }
  return value;
}
