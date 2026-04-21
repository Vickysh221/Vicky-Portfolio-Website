import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  buildBotSceneConfigs,
  FALLBACK_BOT_SCENE_MAP,
  filterPortfolioVisibleBotSceneConfigs,
  PORTFOLIO_VISIBLE_FALLBACK_BOT_SCENE_MAP,
  type BotSceneConfig,
} from './data/botSceneMap'
import { BotScenePrototype } from './BotScenePrototype'

export function BotSceneGallery() {
  const [configs, setConfigs] = useState<BotSceneConfig[]>(PORTFOLIO_VISIBLE_FALLBACK_BOT_SCENE_MAP)
  const [idx, setIdx] = useState(0)
  const navigate = useNavigate()
  const total = configs.length
  const config = configs[idx]!

  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total])

  useEffect(() => {
    let cancelled = false

    async function loadConfigs() {
      try {
        const response = await fetch('/api/library/bot-song-map')
        const result = await response.json()
        if (!response.ok || !Array.isArray(result?.entries)) return

        const fallbackByBotId = new Map(FALLBACK_BOT_SCENE_MAP.map((entry) => [entry.botId, entry]))
        const nextConfigs = filterPortfolioVisibleBotSceneConfigs(
          buildBotSceneConfigs(result.entries).map((entry) => {
            const fallback = fallbackByBotId.get(entry.botId)
            if (!fallback || entry.resolvedSong) return entry
            return {
              ...entry,
              resolvedSong: fallback.resolvedSong,
            }
          }),
        )
        if (!cancelled && nextConfigs.length > 0) {
          setConfigs(nextConfigs)
          setIdx((current) => Math.min(current, nextConfigs.length - 1))
        }
      } catch {
        // Keep fallback map when bot-song-map cannot be resolved.
      }
    }

    void loadConfigs()
    return () => {
      cancelled = true
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <BotScenePrototype key={config.botId} config={config} />

      <div
        style={{
          position: 'fixed',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'auto',
        }}
      >
        {configs.map((scene, i) => (
          <button
            key={scene.botId}
            type="button"
            onClick={() => setIdx(i)}
            title={scene.botRole}
            style={{
              width: i === idx ? 22 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              background:
                i === idx
                  ? config.colorAccent
                  : 'rgba(255,255,255,0.22)',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s, background 0.3s',
              boxShadow: i === idx ? `0 0 8px ${config.colorAccent}88` : 'none',
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        style={arrowStyle('left')}
        title="上一个 bot（←）"
        aria-label="上一个 scene"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        style={arrowStyle('right')}
        title="下一个 bot（→）"
        aria-label="下一个 scene"
      >
        ›
      </button>

      <button
        type="button"
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: 24,
          right: 28,
          zIndex: 80,
          padding: '5px 12px',
          borderRadius: 999,
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.45)',
          fontSize: 11,
          fontFamily: 'Courier New, monospace',
          backdropFilter: 'blur(8px)',
          letterSpacing: '0.05em',
          transition: 'color 0.2s',
          cursor: 'pointer',
        }}
      >
        ← portfolio
      </button>

      <div
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 80,
          padding: '5px 12px',
          borderRadius: 999,
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.52)',
          fontSize: 11,
          fontFamily: 'Courier New, monospace',
          letterSpacing: '0.05em',
          backdropFilter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      >
        musik-nacht scenes · {idx + 1}/{total}
      </div>
    </div>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'fixed',
    top: '50%',
    [side]: 20,
    transform: 'translateY(-50%)',
    zIndex: 80,
    width: 40,
    height: 56,
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.32)',
    color: 'rgba(255,255,255,0.45)',
    fontSize: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'color 0.2s, background 0.2s',
    lineHeight: 1,
    paddingBottom: 3,
  }
}
