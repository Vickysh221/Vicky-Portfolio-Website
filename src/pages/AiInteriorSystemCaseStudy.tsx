import type { CSSProperties } from 'react';

import interiorPicture1 from '../images/interior/Picture1.png';
import interiorPicture2 from '../images/interior/Picture2.png';
import interiorPicture3 from '../images/interior/Picture3.png';
import interiorIntroVideo from '../images/interior/video02.mp4';
import interiorVideo1 from '../images/interior/video01.mp4';
import interiorVideo3 from '../images/interior/video03.mp4';
import interiorPicture4 from '../images/interior/Picture4.png';
import interiorPicture5 from '../images/interior/Picture5.png';

export const AI_INTERIOR_SYSTEM_PAGE_COUNT = 2;

type ContentBlock =
  | { type: 'shortParagraphs'; title?: string; items: string[] }
  | {
      type: 'comparisonCards';
      title: string;
      items: Array<{
        title: string;
        body: string;
      }>;
    };

type VisualBlock =
  | { type: 'videoFeature'; title?: string; src: string; caption?: string; autoPlay?: boolean; loop?: boolean }
  | { type: 'heroImage'; title?: string; src: string; caption?: string };

type AiInteriorSystemPage = {
  pageTitle: string;
  pageGoal: string;
  mainCopy: string;
  contentBlocks: ContentBlock[];
  visualBlocks: VisualBlock[];
};

const aiInteriorSystemPages: AiInteriorSystemPage[] = [
  {
    pageTitle: 'AI 室内设计系统：从房间生成到生活场景理解',
    pageGoal: '说明这是一次问题重构与产品概念定义，而不是单纯的效果图生成。',
    mainCopy:
      '从 0 到 1 重构 AI 室内设计系统的问题定义，提出“空间不是房间，而是生活场景容器”的产品概念，改变系统理解用户需求的方式。',
    contentBlocks: [
      {
        type: 'shortParagraphs',
        title: '项目说明',
        items: [
          '设计基于家庭成员、生活习惯、审美偏好、功能刚需与智能化倾向的卡牌式交互机制，以低认知负担采集高质量语义信号。',
          '建立 用户 / 空间 / 家具 的三层映射逻辑，将用户画像、空间语义与家具特征组织为统一中间层，解决底层生成能力缺少上层设计语言的问题。',
          '串联需求采集、画像生成、空间推荐、家具组合生成、商品绑定、全景预览与估价的完整链路，把 AI 3D 生成与智能排布能力包装成可理解、可推演、可商业化的设计体验。',
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'videoFeature',
        title: 'Project demo',
        src: interiorIntroVideo,
        caption: '产品功能演示',
        autoPlay: true,
        loop: true,
      },
      {
        type: 'heroImage',
        title: 'user-space-furniture mapping',
        src: interiorPicture4,
        caption: '用户、空间与家具不是孤立字段，而是同一套设计语义结构的三个入口。',
      },
      {
        type: 'heroImage',
        title: 'semantic middle layer',
        src: interiorPicture5,
        caption: '统一中间层把用户画像、空间语义与家具特征组织在一起，让上层设计语言能够稳定进入生成链路。',
      },
    ],
  },
  {
    pageTitle: '用户标签匹配与语义采集机制',
    pageGoal: '展示低负担卡牌交互如何把家庭结构、生活习惯与审美偏好变成高质量语义输入。',
    mainCopy:
      '这一页不把用户理解为一组表单字段，而是把用户标签匹配做成一种渐进式的生活方式辨认过程：家庭成员、日常习惯、审美偏好、功能刚需与智能化倾向被组织成可快速判断、可逐步收束的卡牌式交互。',
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: '从标签采集到设计推演',
        items: [
          {
            title: 'low-burden intake',
            body: '用卡牌式选择降低输入门槛，让用户愿意给出更真实、更连续的生活信号。',
          },
          {
            title: 'profile synthesis',
            body: '系统把分散标签重新组织成可作用于空间推荐和家具组合的用户画像。',
          },
          {
            title: 'product-chain continuity',
            body: '标签不是停在 intake 页，而是继续进入空间推荐、商品绑定、全景预览与估价链路。',
          },
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'heroImage',
        title: 'tag matching 01',
        src: interiorPicture1,
        caption: '标签匹配先从生活方式的主轮廓开始，而不是直接逼用户定义风格。',
      },
      {
        type: 'videoFeature',
        title: 'tag matching 02',
        src: interiorVideo1,
        caption: '卡牌式交互把语义采集变成连续判断，而不是一次性填空。',
        autoPlay: true,
        loop: true,
      },
      {
        type: 'videoFeature',
        title: 'tag matching 03',
        src: interiorVideo3,
        caption: '用户反馈会继续改变推荐链路，让系统理解不是静态快照。',
        autoPlay: true,
        loop: true,
      },
      {
        type: 'heroImage',
        title: 'tag matching 04',
        src: interiorPicture2,
        caption: '空间推荐开始把用户画像与场景容器连接起来。',
      },
      {
        type: 'heroImage',
        title: 'tag matching 05',
        src: interiorPicture3,
        caption: '家具组合、商品绑定与全景预览把语义结构推进成商业化体验。',
      },
    ],
  },
];

export function getAiInteriorSystemPages(): AiInteriorSystemPage[] {
  return aiInteriorSystemPages;
}

export function hasAiInteriorSystemCaseStudy(route: string, slideIndex = 0): boolean {
  return route === '/agentic-design-development/ai-interior-system' && slideIndex >= 0 && slideIndex < AI_INTERIOR_SYSTEM_PAGE_COUNT;
}

function panelStyle(): CSSProperties {
  return {
    background: 'linear-gradient(180deg, rgba(18,14,12,0.94), rgba(10,8,6,0.94))',
    border: '1px solid rgba(200,169,110,0.12)',
    borderRadius: 18,
    padding: '20px 22px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
  };
}

function pageTitleStyle(isMobile?: boolean): CSSProperties {
  return {
    color: '#f4ecde',
    fontSize: isMobile ? 28 : 38,
    lineHeight: 1.08,
    letterSpacing: '-0.02em',
    marginBottom: 14,
  };
}

function paragraphStyle(): CSSProperties {
  return {
    color: '#cdbfa8',
    fontSize: 16,
    lineHeight: 1.9,
  };
}

function comparisonCardTitleStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: 13,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 8,
  };
}

function comparisonCardBodyStyle(): CSSProperties {
  return {
    color: '#cdbfa8',
    fontSize: 15,
    lineHeight: 1.8,
  };
}

function sectionLabelStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    opacity: 0.9,
    marginBottom: 10,
  };
}

function mediaFrame(): CSSProperties {
  return {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid rgba(200,169,110,0.1)',
    backgroundColor: 'rgba(8,6,4,0.72)',
  };
}

function renderContentBlock(block: ContentBlock, accentColor: string) {
  if (block.type === 'shortParagraphs') {
    return (
      <div style={panelStyle()}>
        {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
        <div style={{ display: 'grid', gap: 10 }}>
          {block.items.map((item) => (
            <p key={item} style={paragraphStyle()}>
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={panelStyle()}>
      <div style={sectionLabelStyle(accentColor)}>{block.title}</div>
      <div style={{ display: 'grid', gap: 12 }}>
        {block.items.map((item) => (
          <div
            key={item.title}
            style={{
              borderRadius: 14,
              border: '1px solid rgba(200,169,110,0.1)',
              background: 'rgba(255,255,255,0.02)',
              padding: '14px 16px',
            }}
          >
            <div style={comparisonCardTitleStyle(accentColor)}>{item.title}</div>
            <div style={comparisonCardBodyStyle()}>{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderVisualBlock(block: VisualBlock, accentColor: string) {
  switch (block.type) {
    case 'videoFeature':
      return (
        <div style={{ ...panelStyle(), padding: 12 }}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <video
            src={block.src}
            autoPlay={block.autoPlay}
            muted
            loop={block.loop}
            playsInline
            controls
            preload="metadata"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: 16,
              border: `1px solid ${accentColor}33`,
              background: 'rgba(7, 6, 5, 0.9)',
            }}
            aria-label={block.title ?? 'intro video'}
          />
          {block.caption ? (
            <div style={{ color: '#8f7d61', fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>{block.caption}</div>
          ) : null}
        </div>
      );
    case 'heroImage':
      return (
        <div style={{ ...panelStyle(), padding: 12 }}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <img
            src={block.src}
            alt={block.title ?? 'hero image'}
            style={{
              ...mediaFrame(),
              display: 'block',
              height: 'auto',
            }}
          />
          {block.caption ? (
            <div style={{ color: '#8f7d61', fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>{block.caption}</div>
          ) : null}
        </div>
      );
    default:
      return null;
  }
}

function IntroReveal({
  pageTitle,
  pageGoal,
  mainCopy,
  isMobile,
}: {
  pageTitle: string;
  pageGoal: string;
  mainCopy: string;
  isMobile?: boolean;
}) {
  return (
    <section style={{ padding: isMobile ? '8px 4px 0' : '12px 8px 0', display: 'grid', gap: 16 }}>
      <div style={pageTitleStyle(isMobile)}>{pageTitle}</div>
      <div style={{ color: '#9f8d73', fontSize: 13, lineHeight: 1.7, maxWidth: 860 }}>{pageGoal}</div>
      <p style={{ ...paragraphStyle(), maxWidth: 860 }}>{mainCopy}</p>
    </section>
  );
}

export default function AiInteriorSystemCaseStudy({
  route,
  slideIndex = 0,
  accentColor,
  isMobile,
  enableMotion = false,
}: {
  route: string;
  slideIndex?: number;
  accentColor: string;
  isMobile?: boolean;
  enableMotion?: boolean;
}) {
  if (!hasAiInteriorSystemCaseStudy(route, slideIndex)) return null;

  void enableMotion;

  const page = getAiInteriorSystemPages()[slideIndex];
  if (!page) return null;

  return (
    <div style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
      <IntroReveal pageTitle={page.pageTitle} pageGoal={page.pageGoal} mainCopy={page.mainCopy} isMobile={isMobile} />

      {page.visualBlocks.length ? (
        <section style={{ display: 'grid', gap: 14 }}>
          {page.visualBlocks.map((block) => (
            <div key={block.title ?? block.caption ?? block.src}>{renderVisualBlock(block, accentColor)}</div>
          ))}
        </section>
      ) : null}

      {page.contentBlocks.length ? (
        <section style={{ display: 'grid', gap: 14 }}>
          {page.contentBlocks.map((block) => (
            <div key={block.title ?? block.items.join('|')}>{renderContentBlock(block, accentColor)}</div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
