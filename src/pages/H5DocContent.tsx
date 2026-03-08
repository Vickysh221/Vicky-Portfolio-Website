import type { CSSProperties, ReactNode } from 'react';
import { getUnityChapter2Sections } from './H5DocContentUnityCameraChapter2';
import { getAvpSlide1Sections } from './H5DocContentAvpSlide1';

interface H5DocContentProps {
  route: string;
  accentColor: string;
  slideIndex?: number;
}

interface SectionData {
  id: string;
  numeral: string;
  title: string;
  blocks: ReactNode[];
}

function sectionTitleStyle(): CSSProperties {
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

// ─── Section getters ──────────────────────────────────────────────────────────
// Key convention: `${route}:${slideIndex}` (0-based)
// Register new content by adding a getter to sectionMap below.

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


function get3dMapSlide1Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'project-background',
      numeral: '01',
      title: '项目目标和背景',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            在辅助驾驶与导航融合的驾驶场景中，系统会同时接收多源事件，包括：
          </p>
          <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '导航信息（导航机动点 / 路况变化等）',
              '辅助驾驶状态（升降级、自动变道等）',
              '车辆状态（电量、胎压、传感器异常）',
              '用户操作（手势、视角切换）',
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p style={paragraphStyle()}>
            这些事件都会竞争主视图的展示权。如果缺乏统一规则，容易导致：
          </p>
          <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '关键信息被非关键状态打断',
              '视图频繁跳变，用户失去信任',
              '系统行为不可预测，增加认知负担',
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p style={paragraphStyle()}>
            <strong style={{ color: '#efe4d0' }}>核心问题：</strong>在多事件并发条件下，当前"主视图"应该展示什么？
          </p>
        </>,
      ],
    },
    {
      id: 'goals',
      numeral: '02',
      title: '目标',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            设计一套可扩展、可解释、可落地的主视图调度机制，以实现：
          </p>
          <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '安全信息优先，不被低优先级状态打断',
              '用户注意力可控，避免无意义的视角变化',
              '系统行为稳定可预测，符合驾驶心智模型',
              '支持未来更多 AI 事件的接入（智驾能力演进）',
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
      id: 'my-role',
      numeral: '03',
      title: '我的角色',
      blocks: [
        <>
          <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '产品定义 & 系统设计',
              '事件抽象与优先级规则制定',
              '状态机与视图切换策略设计',
              '通过 Unity 原型进行规则验证，反推产品决策合理性',
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
      id: 'core-solution',
      numeral: '04',
      title: '核心方案',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />
            主视图优先级仲裁系统
          </h2>
          <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '将所有可能影响显示的输入统一抽象为"事件"',
              '为每类事件定义优先级及是否允许打断',
              '系统在任意时刻只允许一个事件拥有主视图控制权',
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />
            视图状态机
          </h2>
          <p style={paragraphStyle()}>
            定义清晰的视图状态与切换路径：Driving / Navigation / Parking / AVP / APA 等（详见后章节）。
          </p>
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />
            信息分层与注意力管理
          </h2>
          <p style={paragraphStyle()}>
            通过视角、焦点、缩放策略表达此刻用户最需要关注什么。
          </p>
          <p style={paragraphStyle()}>
            例如：导航中路线与机动点优先 / 停车中车身周边与后向区域优先。
          </p>
        </>,
      ],
    },
  ];
}

// ─── Section map ──────────────────────────────────────────────────────────────
// Format: '<route>:<slideIndex>' → getter function
// /import-h5-doc skill appends new entries here automatically.

const sectionMap: Record<string, (accentColor: string) => SectionData[]> = {
  '/jidu-hmi/unity3d-camera:0': getUnitySections,
  '/jidu-hmi/unity3d-camera:1': getUnityChapter2Sections,
  '/jidu-hmi/avp:0': getAvpSlide1Sections,
  '/jidu-hmi/3d-map:1': get3dMapSlide1Sections,
};

// ─── Public helpers ───────────────────────────────────────────────────────────

/** Returns true if there is registered H5 content for this route + slide. */
export function hasSectionContent(route: string, slideIndex = 0): boolean {
  return `${route}:${slideIndex}` in sectionMap;
}

// ─── Components ───────────────────────────────────────────────────────────────

function H5Section({ section, accentColor }: { section: SectionData; accentColor: string }) {
  return (
    <section id={section.id} style={{ marginBottom: 26, scrollMarginTop: 12 }}>
      <h1 style={sectionTitleStyle()}>
        <span style={{ color: accentColor, fontSize: '10px', letterSpacing: '0.2em' }}>{section.numeral}</span>
        <span>{section.title}</span>
      </h1>
      {section.blocks.map((block, idx) => (
        <div key={`${section.id}-${idx}`}>{block}</div>
      ))}
    </section>
  );
}

export default function H5DocContent({ route, accentColor, slideIndex = 0 }: H5DocContentProps) {
  const getter = sectionMap[`${route}:${slideIndex}`];
  if (!getter) return null;

  const sections = getter(accentColor);
  return (
    <div style={{ padding: '0 17px 2px' }}>
      {sections.map((section) => (
        <H5Section key={section.id} section={section} accentColor={accentColor} />
      ))}
    </div>
  );
}
