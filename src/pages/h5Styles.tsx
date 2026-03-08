import type { CSSProperties, ReactNode } from 'react';

/** 正文段落 */
export function paragraphStyle(): CSSProperties {
  return {
    color: '#a99679',
    fontSize: '12px',
    lineHeight: 1.9,
    margin: '0 0 10px',
  };
}

/** h2 标题（带 flex 布局，可内嵌 accent 标记块） */
export function h2Style(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '13px',
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
    fontSize: '13px',
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

/** dash 列表项，配合 <ul style={{ listStyle:'none', ... }}> 使用 */
export function ListItem({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <li style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
      <span style={{ color: accent }}>—</span>
      <span>{children}</span>
    </li>
  );
}
