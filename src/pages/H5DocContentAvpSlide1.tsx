import type { CSSProperties, ReactNode } from 'react';

interface SectionData {
  id: string;
  numeral: string;
  title: string;
  blocks: ReactNode[];
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
    letterSpacing: '0.12em',
    background: 'rgba(255,255,255,0.01)',
    textAlign: 'center',
  };
}

function ListItem({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <li style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
      <span style={{ color: accent }}>—</span>
      <span>{children}</span>
    </li>
  );
}

export function getAvpSlide1Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'project-overview',
      numeral: '01',
      title: '项目概述',
      blocks: [
        <>
          <div style={{ marginBottom: '26px', textAlign: 'left' }}>
            <div style={{ color: '#c8a96e', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '8px' }}>
              H5 DOCUMENT SPEC · /jidu-hmi/avp
            </div>
            <div style={{ color: '#f0e8d8', fontSize: '24px', lineHeight: 1.2, fontStyle: 'italic' }}>
              自动代客泊车（AVP）原型设计与 Unity Demo 系统状态流
            </div>
            <p style={{ ...paragraphStyle(), marginTop: '10px' }}>
              通过 Unity 交互式 Demo 演示自动代客泊车系统的关键流程，展示停车场环境下车辆自主建图、路径规划与泊车执行的完整状态流。
            </p>
          </div>

          <h2 style={h2Style(accentColor)}>项目目标</h2>
          <p style={paragraphStyle()}>
            使用 Unity 构建交互式 Demo，模拟 AVP 功能在真实停车场环境中的运行流程，验证系统状态设计与用户交互逻辑。
          </p>

          <h2 style={h2Style(accentColor)}>设计范围</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              'AVP 用户流程设计',
              'Unity 3D 场景演示',
              'SLAM 建图流程展示',
              '系统状态机与用户行为流转',
            ].map((item) => (
              <ListItem key={item} accent={accentColor}>{item}</ListItem>
            ))}
          </ul>
        </>,
      ],
    },
    {
      id: 'state-flow',
      numeral: '02',
      title: '系统状态流',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>状态机结构</h2>
          <p style={paragraphStyle()}>
            AVP 系统状态由三类因素共同决定：系统状态、用户行为以及物理环境条件。
          </p>

          <h2 style={h2Style(accentColor)}>状态来源</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '系统状态：功能激活、建图、路径规划、泊车执行',
              '用户行为：功能触发、确认操作、交互反馈',
              '物理环境：停车场道路结构、车位位置、环境变化',
            ].map((item) => (
              <ListItem key={item} accent={accentColor}>{item}</ListItem>
            ))}
          </ul>
        </>,
      ],
    },
    {
      id: 'unity-demo-expression',
      numeral: '03',
      title: 'Unity Demo 表达',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>3D 场景职责</h2>
          <p style={paragraphStyle()}>
            Unity Demo 用于演示 AVP 系统能力，包括 SLAM 建图过程、车辆路径规划以及自动泊车执行过程。
          </p>

          <h2 style={h2Style(accentColor)}>图片</h2>
          <div style={mediaBlockStyle()}>
            <div style={placeholderStyle('image', accentColor)}>Image · AVP 停车场地图与路径规划示意</div>
            <p style={{ ...paragraphStyle(), fontSize: '10px', color: '#7f6f55', marginTop: 8, marginBottom: 0 }}>
              图 3-1 AVP 停车场建图与路径规划示意
            </p>
          </div>

          <h2 style={h2Style(accentColor)}>视频</h2>
          <div style={mediaBlockStyle()}>
            <div style={placeholderStyle('video', accentColor)}>Video · AVP Unity Demo 自动泊车流程</div>
            <p style={{ ...paragraphStyle(), fontSize: '10px', color: '#7f6f55', marginTop: 8, marginBottom: 0 }}>
              视频 3-1 AVP 自动泊车 Unity Demo
            </p>
          </div>
        </>,
      ],
    },
    {
      id: 'application-notes',
      numeral: '04',
      title: '应用说明',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            当前文档内容将应用到 <code style={{ color: '#c8b080' }}>{'#/jidu-hmi/unity3d-camera'}</code> 页面 CONTENT 区域中，作为 H5 文档内容展示。
          </p>
        </>,
      ],
    },
  ];
}
