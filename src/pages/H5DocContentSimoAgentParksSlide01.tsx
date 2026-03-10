import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import slide01Image01 from '../images/jiduagent/slide01-img01.png';
import slide01Image02 from '../images/jiduagent/slide01-img02.png';
import slide01Image03 from '../images/jiduagent/slide01-img03.png';

export function getSimoAgentParksSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'immersive-agent-platform',
      numeral: '01',
      title: '车机沉浸式 Agent 平台',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            围绕车机内多 Agent 协同体验，搭建从应用管理、使用创建到智能生产流程的沉浸式平台表达，用于统一呈现
            Agent 能力组织方式及平台化工作流。
          </p>

          <h2 style={h2Style(accentColor)}>AGENT 应用管理</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={slide01Image01}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: `1px dashed rgba(200,169,110,0.28)`,
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="Agent 应用管理界面"
            />
          </div>

          <h2 style={h2Style(accentColor)}>Agent 使用、创建与 Agentverse 平台协同</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={slide01Image02}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: `1px dashed rgba(200,169,110,0.28)`,
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="Agent 使用、创建与 Agentverse 平台协同"
            />
          </div>

          <h2 style={h2Style(accentColor)}>Agent 智能创建典型流程</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={slide01Image03}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: `1px dashed rgba(200,169,110,0.28)`,
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="Agent 智能创建典型流程"
            />
          </div>
        </>,
      ],
    },
  ];
}
