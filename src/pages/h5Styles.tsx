import type { CSSProperties, ReactNode } from 'react';

/** 正文段落 */
export function paragraphStyle(): CSSProperties {
  return {
    color: '#a99679',
    fontSize: '16px',
    lineHeight: 1.9,
    margin: '0 0 10px',
  };
}

/** h2 标题（带 flex 布局，可内嵌 accent 标记块） */
export function h2Style(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '17px',
    margin: '16px 0 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };
}

/** h2 标题（纯文本，无 flex） */
export function subtitleStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '17px',
    margin: '16px 0 8px',
  };
}

/** 图片 / 视频容器块 */
export function mediaBlockStyle(): CSSProperties {
  return {
    border: '1px solid rgba(200,169,110,0.15)',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.012)',
    padding: '12px',
    margin: '12px 0',
  };
}

/** 代码块 */
export function codeBlockStyle(): CSSProperties {
  return {
    margin: '12px 0 8px',
    padding: '14px 16px',
    borderRadius: '6px',
    border: '1px solid rgba(200,169,110,0.16)',
    background: 'rgba(255,255,255,0.02)',
    color: '#d8ccb6',
    fontSize: '13px',
    lineHeight: 1.75,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  };
}

/** dash 列表项，配合 <ul style={{ listStyle:'none', ... }}> 使用 */
export function ListItem({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <li style={{ color: '#a99679', fontSize: '16px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
      <span style={{ color: accent }}>—</span>
      <span>{children}</span>
    </li>
  );
}

/** 小型元信息标签 */
export function smallMetaStyle(): CSSProperties {
  return {
    color: '#d8ccb6',
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '6px',
  };
}

/** 轻卡片，用于文档摘要 / note block */
export function noteCardStyle(): CSSProperties {
  return {
    border: '1px solid rgba(200,169,110,0.14)',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.014)',
    padding: '12px 14px',
  };
}

/** 竖向栅格列表容器 */
export function gridListStyle(gap = 8): CSSProperties {
  return {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap,
  };
}

/** 文档路径 / 技术路径标签 */
export function pathLabelStyle(): CSSProperties {
  return {
    color: '#8e7d61',
    fontSize: '12px',
    lineHeight: 1.6,
    margin: '0 0 8px',
    wordBreak: 'break-word',
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  };
}

/** 信息标签条 */
export function infoTagStyle(accentColor: string, tone: 'source' | 'prompt' | 'tech' = 'source'): CSSProperties {
  const tones = {
    source: {
      border: `1px solid ${accentColor}33`,
      background: `${accentColor}14`,
      color: accentColor,
    },
    prompt: {
      border: '1px solid rgba(136, 184, 255, 0.28)',
      background: 'rgba(136, 184, 255, 0.10)',
      color: '#9cc4ff',
    },
    tech: {
      border: '1px solid rgba(139, 210, 176, 0.28)',
      background: 'rgba(139, 210, 176, 0.10)',
      color: '#9ddfbe',
    },
  } as const;

  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 8px',
    borderRadius: '999px',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    margin: '0 0 8px',
    ...tones[tone],
  };
}

/** 页面导语 kicker */
export function kickerStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '11px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    margin: '0 0 10px',
  };
}

/** 更重的文档卡片，适合高密度 case-study */
export function documentCardStyle(): CSSProperties {
  return {
    border: '1px solid rgba(200,169,110,0.16)',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.016)',
    padding: '14px 16px',
    margin: '12px 0',
  };
}

/** 小节说明文字 */
export function captionStyle(): CSSProperties {
  return {
    color: '#8e7d61',
    fontSize: '13px',
    lineHeight: 1.7,
    margin: '0 0 10px',
  };
}

/** 强调型区块标题 */
export function blockLabelStyle(): CSSProperties {
  return {
    color: '#d8ccb6',
    fontSize: '12px',
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    margin: '0 0 8px',
  };
}

/** 三段式元信息栏 */
export function metaRailStyle(): CSSProperties {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    margin: '0 0 10px',
  };
}

/** 更细的分隔线 */
export function dividerStyle(): CSSProperties {
  return {
    width: '100%',
    height: '1px',
    background: 'rgba(200,169,110,0.10)',
    margin: '12px 0',
  };
}
