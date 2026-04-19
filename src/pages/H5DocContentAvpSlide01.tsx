import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle, ListItem } from './h5Styles';
import { ImageWithStatus, VideoWithStatus } from '../components/MediaWithStatus';
import Anchor from '../components/agents/Anchor';
import avpSlide01Image01 from '../images/avp/slide01-img01.jpg';
import avpSlide01Image00 from '../images/avp/slide01-img00.png';
import avpSlide01Image02 from '../images/avp/slide01-img02.png';
import avpSlide01Image03 from '../images/avp/slide01-img03.png';
import avpSlide01Image04 from '../images/avp/slide01-img04.png';
import avpSlide01Video01 from '../images/avp/slide01-vid01.mov';
import avpSlide01Video02 from '../images/avp/slide01-vid02.mov';

export function getAvpSlide1Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'project-overview',
      numeral: '01',
      title: '项目概述',
      blocks: [
        <>
          <div style={{ marginBottom: '26px', textAlign: 'left' }}>

            <Anchor id="avp-overview-intro" block>
              <p style={{ ...paragraphStyle(), marginTop: '10px' }}>
                通过 Unity 交互式 Demo 演示自动代客泊车系统的关键流程，展示停车场环境下车辆自主建图、路径规划与泊车执行的完整状态流。
              </p>
            </Anchor>


             <h2 style={h2Style(accentColor)}>AVP学习系统流程总览</h2>
            <p style={{ ...paragraphStyle(), marginTop: '10px' }}>
              为了在 Unity 中验证 AVP（代客泊车路径学习）复杂流程，需要通过状态流模拟来管理来自车辆系统状态与车位组件状态的多源信号，因为 AVP 是一个非线性系统，不同功能节点的状态转换会相互叠加并动态影响 3D 场景中的车位可选性、交互行为和视觉呈现，且与APA（自动泊车）功能有并行机制。
            </p>
               <div style={mediaBlockStyle()}>
            <VideoWithStatus
              src={avpSlide01Video01}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }} 
              controls 
              title="AVP Unity Demo 自动泊车流程" 
            />
            <p style={{ ...paragraphStyle(), fontSize: '13px', color: '#7f6f55', marginTop: 8, marginBottom: 0 }}>
              视频 3-1 AVP 自动泊车 Unity Demo
            </p>
          </div>
            
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={avpSlide01Image01}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="AVP learning user flow overview" 
            /></div>

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
          <Anchor id="avp-state-sources" block>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              {[
                '系统状态：功能激活、建图、路径规划、泊车执行',
                '用户行为：功能触发、确认操作、交互反馈',
                '物理环境：停车场道路结构、车位位置、环境变化',
              ].map((item) => (
                <ListItem key={item} accent={accentColor}>{item}</ListItem>
              ))}
            </ul>
          </Anchor>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={avpSlide01Image02}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="AVP learning user flow overview" 
            /></div>
        </>,
      ],
    },
    {
      id: 'unity-demo-expression',
      numeral: '03',
      title: 'Unity Demo 表达',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>AVP/APA车位状态流转</h2>
          <Anchor id="avp-demo-slot-states" block>
            <div style={mediaBlockStyle()}>
              <ImageWithStatus
                src={avpSlide01Image00}
                style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }}
                alt="AVP APA parking slot state flow"
              />
            </div>
          </Anchor>

          <h2 style={h2Style(accentColor)}>3D场景模拟系统和车位状态流转</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={avpSlide01Image03}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="AVP learning user flow overview" 
            /></div>
                      <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={avpSlide01Image04}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="AVP learning user flow overview" 
            /></div>
          

          <h2 style={h2Style(accentColor)}>视频</h2>
          <Anchor id="avp-demo-video" block>
            <div style={mediaBlockStyle()}>
              <VideoWithStatus
                src={avpSlide01Video01}
                style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }}
                controls
                title="AVP Unity Demo 自动泊车流程"
              />
              <p style={{ ...paragraphStyle(), fontSize: '13px', color: '#7f6f55', marginTop: 8, marginBottom: 0 }}>
                视频 3-1 AVP 自动泊车 Unity Demo
              </p>
            </div>
          </Anchor>
          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              src={avpSlide01Video02}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }} 
              controls 
              title="AVP Unity Demo 建图流程" 
            />
            <p style={{ ...paragraphStyle(), fontSize: '13px', color: '#7f6f55', marginTop: 8, marginBottom: 0 }}>
              视频 3-2 AVP 建图流程 Unity Demo
            </p>
          </div>
        </>,
      ],
    },
    
  ];
}
