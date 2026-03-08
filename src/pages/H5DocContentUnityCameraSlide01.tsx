import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';

function placeholderStyle(kind: 'image' | 'video', accentColor: string): CSSProperties {
  return {
    height: '130px',
    borderRadius: '5px',
    border: `1px dashed ${kind === 'video' ? `${accentColor}66` : 'rgba(200,169,110,0.28)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: kind === 'video' ? accentColor : '#8f7d5f',
    fontSize: '10px',
    letterSpacing: '0.18em',
    background: 'rgba(255,255,255,0.01)',
  };
}

export function getUnitySections(accentColor: string): SectionData[] {
  return [
    {
      id: 'goal',
      numeral: '01',
      title: '总览',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />系统目标</h2>
          <p style={paragraphStyle()}>
            在多系统事件并发的情况下，定义谁占据主视图，并通过可控的镜头打断机制，引导驾驶员关注当前最重要的驾驶信息。
          </p>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />设计原则</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {['注意力优先', '最小镜头集', '稳定性优先', '安全信息优先'].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '12px', display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>,
      ],
    },
    {
      id: 'driving',
      numeral: '02',
      title: '行车运镜',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            行车模式下，相机跟随在自车后方，以第三人称视角表达路况信息。高优先级事件（如安全预警）可打断低优先级镜头。
          </p>
          <div style={mediaBlockStyle()}>
            <img 
              src="/src/images/unity3d-camera/slide01-img01.png" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="行车事件示意图" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 2-1 行车事件触发来源概览</div>
          </div>
        </>,
      ],
    },
    {
      id: 'camera',
      numeral: '03',
      title: '相机参数空间变化',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            主视图竞争的结果不是"切镜头"，而是参数目标覆盖。通过连续参数变化，而不是离散动画状态，实现镜头间平滑过渡。
          </p>
          <div style={mediaBlockStyle()}>
            <div style={placeholderStyle('video', accentColor)}>VIDEO · 相机过渡和打断.mov</div>
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>视频 3-1 相机过渡策略（占位）</div>
          </div>
        </>,
      ],
    },
  ];
}
