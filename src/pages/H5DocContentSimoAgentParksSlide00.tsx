import type { SectionData } from './H5DocContentSlideFactory';
import { h2Style, mediaBlockStyle, paragraphStyle } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import simoImage01 from '../images/jiduagent/simo1.png';
import simoImage02 from '../images/jiduagent/simo2.png';
import simoImage03 from '../images/jiduagent/simo3.png';
import simoImage04 from '../images/jiduagent/simo4.png';

function imageStyle() {
  return {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    border: '1px dashed rgba(200,169,110,0.28)',
    background: 'rgba(255,255,255,0.01)',
  } as const;
}

export function getSimoAgentParksSlide00Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'simo-agent-intro-gallery',
      numeral: '01',
      title: 'SIMO Agent System 概念设计',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            以 SIMO Agent System 为核心，展示一个面向车机场景的多智能体平台概念：让 agent 的身份、能力组织、应用生态与创建流程在统一的沉浸式系统里被看见。
          </p>

          <h2 style={h2Style(accentColor)}>平台概念总览</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus src={simoImage01} style={imageStyle()} alt="SIMO Agent System 概念图 1" />
          </div>

          <h2 style={h2Style(accentColor)}>多 Agent 生态与协同界面</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus src={simoImage02} style={imageStyle()} alt="SIMO Agent System 概念图 2" />
          </div>

          <h2 style={h2Style(accentColor)}>平台角色与能力组织</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus src={simoImage03} style={imageStyle()} alt="SIMO Agent System 概念图 3" />
          </div>

          <h2 style={h2Style(accentColor)}>沉浸式系统表达</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus src={simoImage04} style={imageStyle()} alt="SIMO Agent System 概念图 4" />
          </div>
        </>,
      ],
    },
  ];
}
