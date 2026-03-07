import type { CSSProperties, ReactNode } from 'react';

interface H5DocContentProps {
  route: string;
  accentColor: string;
}

interface SectionData {
  id: string;
  numeral: string;
  title: string;
  blocks: ReactNode[];
}

function sectionTitleStyle(accentColor: string): CSSProperties {
  return {
    fontSize: '17px',
    color: '#efe4d0',
    letterSpacing: '0.02em',
    borderBottom: '1px solid rgba(200,169,110,0.16)',
    paddingBottom: '8px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };
}

function paragraphStyle(): CSSProperties {
  return {
    color: '#a99679',
    fontSize: '12px',
    lineHeight: 1.9,
    margin: '0 0 10px',
  };
}

function h2Style(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '13px',
    margin: '16px 0 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };
}

function mediaBlockStyle(): CSSProperties {
  return {
    border: '1px solid rgba(200,169,110,0.15)',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.012)',
    padding: '12px',
    margin: '12px 0',
  };
}

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

function getRuleSections(accentColor: string): SectionData[] {
  return [
    {
      id: 'rule-overview',
      numeral: '01',
      title: '页面结构规则',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />页面标题
          </h2>
          <p style={paragraphStyle()}>
            顶部使用页面标题（Title）+ 副标题（Subtitle）+ 元信息（版本、状态、更新时间）组合。标题建议 28–36px，副标题建议 14–18px。
          </p>
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />一级标题（H1）
          </h2>
          <p style={paragraphStyle()}>
            H1 对应章节入口，建议带序号展示（例如 01、02），用于快速建立文档层级。每个 H1 下可包含多个二级标题与正文模块。
          </p>
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />二级标题（H2）
          </h2>
          <p style={paragraphStyle()}>
            H2 用于同章节内信息分组，建议在视觉上弱于 H1，但强于正文。可增加细竖条或强调色作为视觉锚点。
          </p>
        </>,
      ],
    },
    {
      id: 'rule-body',
      numeral: '02',
      title: '正文与列表规则',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            正文（Body）建议字号 12–14px，行高 1.8 左右，单段长度控制在 2–5 行，强调信息使用加粗而非过度变色，保持阅读稳定性。
          </p>
          <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '正文颜色与背景需保持充足对比，确保车载场景可读性。',
              '列表项建议统一使用短横线或圆点作为前缀。',
              '同一页面内正文宽度保持一致，避免阅读动线跳跃。',
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>,
      ],
    },
    {
      id: 'rule-media',
      numeral: '03',
      title: '图片与视频规则',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />图片规则
          </h2>
          <p style={paragraphStyle()}>
            图片建议统一 16:9 或 4:3，使用轻边框与小圆角，图片下方必须包含图注（图号 + 说明）。
          </p>
          <div style={mediaBlockStyle()}>
            <div style={placeholderStyle('image', accentColor)}>IMAGE · 示例占位</div>
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 3-1 视觉示意图（占位）</div>
          </div>

          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />视频规则
          </h2>
          <p style={paragraphStyle()}>
            视频区域统一使用 16:9 占位并展示文件名/主题名，点击后再进入播放流程，避免页面中直接自动播放造成干扰。
          </p>
          <div style={mediaBlockStyle()}>
            <div style={placeholderStyle('video', accentColor)}>VIDEO · 示例占位</div>
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>视频 3-1 运镜策略演示（占位）</div>
          </div>
        </>,
      ],
    },
  ];
}

function getUnitySections(accentColor: string): SectionData[] {
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
            <div style={placeholderStyle('image', accentColor)}>IMAGE · 行车事件示意图</div>
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
            主视图竞争的结果不是“切镜头”，而是参数目标覆盖。通过连续参数变化，而不是离散动画状态，实现镜头间平滑过渡。
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

function H5Section({ section, accentColor }: { section: SectionData; accentColor: string }) {
  return (
    <section id={section.id} style={{ marginBottom: 26, scrollMarginTop: 12 }}>
      <h1 style={sectionTitleStyle(accentColor)}>
        <span style={{ color: accentColor, fontSize: '10px', letterSpacing: '0.2em' }}>{section.numeral}</span>
        <span>{section.title}</span>
      </h1>
      {section.blocks.map((block, idx) => (
        <div key={`${section.id}-${idx}`}>{block}</div>
      ))}
    </section>
  );
}

export default function H5DocContent({ route, accentColor }: H5DocContentProps) {
  const sections = route === '/jidu-hmi/unity3d-camera' ? getUnitySections(accentColor) : getRuleSections(accentColor);

  return (
    <div style={{ padding: '0 17px 2px' }}>
      {sections.map((section) => (
        <H5Section key={section.id} section={section} accentColor={accentColor} />
      ))}
    </div>
  );
}
