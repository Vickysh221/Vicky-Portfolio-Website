import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle, ListItem } from './h5Styles';
import { ImageWithStatus, VideoWithStatus } from '../components/MediaWithStatus';
import phoenixDemoVideo from '../images/phoenix/slide01-vid01.mp4';
import phoenixLightVideo01 from '../images/phoenix/slide01-vid02.mov';
import phoenixLightVideo02 from '../images/phoenix/slide01-vid03.mov';
import phoenixFlowImg01 from '../images/phoenix/slide01-img01.png';
import phoenixFlowImg02 from '../images/phoenix/slide01-img02.png';
import phoenixFlowImg03 from '../images/phoenix/slide01-img03.png';
import phoenixFlowImg04 from '../images/phoenix/slide01-img04.png';
import phoenixFlowImg05 from '../images/phoenix/slide01-img05.png';
import phoenixFlowImg06 from '../images/phoenix/slide01-img06.png';
import phoenixApiImg01 from '../images/phoenix/slide02-img01..png';
import phoenixApiImg02 from '../images/phoenix/slide02-img02.png';
import phoenixApiImg03 from '../images/phoenix/slide02-img03.png';
import phoenixApiImg04 from '../images/phoenix/slide02-img04.png';
import phoenixApiImg05 from '../images/phoenix/slide02-img05.png';

function eyebrowStyle(): CSSProperties {
  return {
    color: '#c8a96e',
    fontSize: '9px',
    letterSpacing: '0.2em',
    marginBottom: '8px',
  };
}

function leadTitleStyle(): CSSProperties {
  return {
    color: '#f0e8d8',
    fontSize: '24px',
    lineHeight: 1.2,
    fontStyle: 'italic',
  };
}

function captionStyle(): CSSProperties {
  return {
    color: '#7f6f55',
    fontSize: '13px',
    lineHeight: 1.7,
    marginTop: 6,
  };
}

function listStyle(): CSSProperties {
  return {
    margin: '8px 0 0',
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap: 6,
  };
}

function imageGridStyle(columns = 2): CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: '14px',
    marginTop: '12px',
  };
}

function imageCardStyle(accentColor: string): CSSProperties {
  return {
    ...mediaBlockStyle(),
    margin: 0,
    padding: '10px',
    border: `1px solid ${accentColor}22`,
  };
}

function centeredMediaStyle(): CSSProperties {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
}

function imageStyle(accentColor: string): CSSProperties {
  return {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    border: `1px dashed ${accentColor}55`,
    background: 'rgba(255,255,255,0.01)',
  };
}

const flowImages = [
  { src: phoenixFlowImg01, title: '上传与样例入口', note: '上传区、扫码入口与示例图片共同承担新用户首次引导。' },
  { src: phoenixFlowImg02, title: '基础选择与生成参数', note: '右侧参数面板承载全屋焕新、地面替换、家具替换的首步设定。' },
  { src: phoenixFlowImg03, title: '风格选择页', note: '通过可分页风格卡片，把“选风格”变成低负担的可比较决策。' },
  { src: phoenixFlowImg04, title: '家具替换与局部编辑', note: '画布热点与右侧素材库联动，支持局部替换、旋转与缩放。' },
  { src: phoenixFlowImg05, title: '家具列表骨架屏', note: '在局部替换加载期保持位置感与操作上下文，避免画面跳变。' },
  { src: phoenixFlowImg06, title: '生成中反馈', note: '遮罩、进度与文案构成统一的异步任务反馈层。' },
];

const accountImages = [
  { src: phoenixApiImg01, title: 'API 管理列表页', note: '列表、搜索、充值和密钥管理聚合在同一企业后台视图中。' },
  { src: phoenixApiImg02, title: '新增 API 密钥弹窗', note: '以轻表单弹窗完成密钥创建，避免打断后台任务流。' },
  { src: phoenixApiImg03, title: '空状态页', note: '当没有可用 API 时，空态直接指向下一步操作，减少理解成本。' },
  { src: phoenixApiImg04, title: '删除确认弹窗', note: '高风险操作使用二次确认，维持后台系统操作安全感。' },
  { src: phoenixApiImg05, title: '个人中心与素材管理', note: '个人积分、账户详情与企业素材后台形成统一工作台入口。' },
];

export function getPhoenixKeyPagesSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'phoenix-key-pages-demo',
      numeral: '01',
      title: '关键页面',
      blocks: [
        <>
          <div style={{ marginBottom: '26px', textAlign: 'left' }}>
            <div style={eyebrowStyle()}>CASE STUDY · /web-design-develop/key-pages</div>
            <div style={leadTitleStyle()}>Phoenix AI 试装平台的核心页面与任务流设计</div>
            <p style={{ ...paragraphStyle(), marginTop: '10px' }}>
              这个项目围绕“上传空间图像 - 选择生成策略 - 等待异步任务 - 回到可编辑结果”展开。我将产品关键页面拆成三段：产品 demo、
              图生图主流程关键页，以及后台个人中心 / API 管理，用来展示前台生成体验和后台资产管理如何被统一设计。
            </p>
          </div>

          <h2 style={h2Style(accentColor)}>Virtual Staging 产品 Demo</h2>
          <p style={paragraphStyle()}>
            Demo 页展示的是 Phoenix 在真实空间图上的生成与替换能力：左侧保留大画布作为主任务空间，右侧使用阶段式面板承载风格、家具和局部编辑，
            保持每一步操作都不脱离当前结果语境。
          </p>
          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              src={phoenixDemoVideo}
              style={imageStyle(accentColor)}
              controls
              playsInline
              title="Virtual Staging 产品 demo"
            />
          </div>

          <h2 style={h2Style(accentColor)}>浅色版网页开发探索</h2>
          <p style={paragraphStyle()}>
            在深色业务主界面之外，我也探索了更轻的浅色版本，用来验证相同任务流在展示型场景中的可读性与品牌适配性。
          </p>
          <div style={imageGridStyle(1)}>
            {[phoenixLightVideo01, phoenixLightVideo02].map((src, index) => (
              <div key={src} style={imageCardStyle(accentColor)}>
                <div style={centeredMediaStyle()}>
                  <VideoWithStatus
                    src={src}
                    style={imageStyle(accentColor)}
                    controls
                    playsInline
                    title={`浅色版网页开发演示 ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <h2 style={h2Style(accentColor)}>主流程设计重点</h2>
          <ul style={listStyle()}>
            {[
              '上传、参数选择、结果浏览和局部编辑都保持在同一工作台内，避免频繁跳页。',
              '右侧面板按任务阶段切换，降低复杂 AI 能力在首次使用时的认知负担。',
              '历史记录、骨架屏和进度弹层共同组成异步任务反馈体系，保证用户始终知道系统在做什么。',
            ].map((item) => (
              <ListItem key={item} accent={accentColor}>{item}</ListItem>
            ))}
          </ul>
        </>,
      ],
    },
    {
      id: 'phoenix-image-to-image-flow',
      numeral: '02',
      title: '图生图流程关键页',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            前台图生图主流程围绕“快速上手、任务分阶段、结果可追溯”设计。入口页负责降低第一次上传门槛，生成页负责承载风格选择、
            局部替换和历史回看，加载页则负责把等待过程解释清楚。
          </p>
          <div style={imageGridStyle()}>
            {flowImages.map((item) => (
              <div key={item.title} style={imageCardStyle(accentColor)}>
                <ImageWithStatus src={item.src} style={imageStyle(accentColor)} alt={item.title} />
                <div style={{ color: '#d8ccb6', fontSize: '14px', marginTop: '10px' }}>{item.title}</div>
                <p style={captionStyle()}>{item.note}</p>
              </div>
            ))}
          </div>
        </>,
      ],
    },
    {
      id: 'phoenix-account-api-pages',
      numeral: '03',
      title: '个人中心与 API 管理关键页',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            后台部分承担的是账户资产与接口能力管理。这里的设计重点不是“更炫”，而是让企业客户能清楚管理密钥、积分和素材状态，
            形成可部署、可维护的 SaaS 工作台。
          </p>
          <div style={imageGridStyle()}>
            {accountImages.map((item) => (
              <div key={item.title} style={imageCardStyle(accentColor)}>
                <ImageWithStatus src={item.src} style={imageStyle(accentColor)} alt={item.title} />
                <div style={{ color: '#d8ccb6', fontSize: '14px', marginTop: '10px' }}>{item.title}</div>
                <p style={captionStyle()}>{item.note}</p>
              </div>
            ))}
          </div>
        </>,
      ],
    },
  ];
}
