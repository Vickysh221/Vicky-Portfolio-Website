import type { CSSProperties } from 'react';

import interiorPicture1 from '../images/interior/Picture1.png';
import interiorPicture2 from '../images/interior/Picture2.png';
import interiorPicture3 from '../images/interior/Picture3.png';
import interiorIntroVideo from '../images/interior/video02.mp4';
import interiorVideo1 from '../images/interior/video01.mp4';
import interiorVideo3 from '../images/interior/video03.mp4';
import interiorPicture4 from '../images/interior/Picture4.png';
import interiorPicture5 from '../images/interior/Picture5.png';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import { normalizeLocalizedText } from '../i18n/localization.ts';
import { AI_INTERIOR_SYSTEM_INTRO_COPY } from '../i18n/bilingualCaseStudyFallback.ts';
import type { LocalizedText } from '../i18n/types.ts';

export const AI_INTERIOR_SYSTEM_PAGE_COUNT = 2;

function t(zh: string, en: string): LocalizedText {
  return { zh, en };
}

type ContentBlock =
  | { type: 'shortParagraphs'; title?: string | LocalizedText; items: Array<string | LocalizedText> }
  | {
      type: 'comparisonCards';
      title: string | LocalizedText;
      items: Array<{
        title: string | LocalizedText;
        body: string | LocalizedText;
      }>;
    };

type VisualBlock =
  | { type: 'videoFeature'; title?: string | LocalizedText; src: string; caption?: string | LocalizedText; autoPlay?: boolean; loop?: boolean }
  | { type: 'heroImage'; title?: string | LocalizedText; src: string; caption?: string | LocalizedText };

type AiInteriorSystemPage = {
  pageTitle: LocalizedText;
  pageGoal: LocalizedText;
  mainCopy: LocalizedText;
  contentBlocks: ContentBlock[];
  visualBlocks: VisualBlock[];
};

const aiInteriorSystemPages: AiInteriorSystemPage[] = [
  {
    ...AI_INTERIOR_SYSTEM_INTRO_COPY,
    contentBlocks: [
      {
        type: 'shortParagraphs',
        title: t('项目说明', 'Project brief'),
        items: [
          t(
            '设计基于家庭成员、生活习惯、审美偏好、功能刚需与智能化倾向的卡牌式交互机制，以低认知负担采集高质量语义信号。',
            'A card-based interaction gathers semantic signals from family members, habits, taste, functional needs, and automation preferences with low cognitive load.',
          ),
          t(
            '建立 用户 / 空间 / 家具 的三层映射逻辑，将用户画像、空间语义与家具特征组织为统一中间层，解决底层生成能力缺少上层设计语言的问题。',
            'A three-layer mapping of user / space / furniture organizes user profiles, spatial semantics, and furniture traits into one shared middle layer.',
          ),
          t(
            '串联需求采集、画像生成、空间推荐、家具组合生成、商品绑定、全景预览与估价的完整链路，把 AI 3D 生成与智能排布能力包装成可理解、可推演、可商业化的设计体验。',
            'The pipeline links intake, profile generation, spatial recommendations, furniture composition, product binding, panorama preview, and pricing into a comprehensible design experience.',
          ),
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'videoFeature',
        title: t('项目演示', 'Project demo'),
        src: interiorIntroVideo,
        caption: t('产品功能演示', 'Product demo'),
        autoPlay: true,
        loop: true,
      },
      {
        type: 'heroImage',
        title: t('用户 / 空间 / 家具映射', 'User / space / furniture mapping'),
        src: interiorPicture4,
        caption: t('用户、空间与家具不是孤立字段，而是同一套设计语义结构的三个入口。', 'User, space, and furniture are three entry points into the same design-semantic structure.'),
      },
      {
        type: 'heroImage',
        title: t('语义中间层', 'Semantic middle layer'),
        src: interiorPicture5,
        caption: t('统一中间层把用户画像、空间语义与家具特征组织在一起，让上层设计语言能够稳定进入生成链路。', 'The shared middle layer keeps user profiles, spatial semantics, and furniture traits aligned so design language can enter the generation pipeline reliably.'),
      },
    ],
  },
  {
    pageTitle: t('用户标签匹配与语义采集机制', 'User tag matching and semantic intake'),
    pageGoal: t('展示低负担卡牌交互如何把家庭结构、生活习惯与审美偏好变成高质量语义输入。', 'Show how low-burden card interactions turn family structure, habits, and taste into high-quality semantic input.'),
    mainCopy: t(
      '这一页不把用户理解为一组表单字段，而是把用户标签匹配做成一种渐进式的生活方式辨认过程：家庭成员、日常习惯、审美偏好、功能刚需与智能化倾向被组织成可快速判断、可逐步收束的卡牌式交互。',
      'This page does not treat the user as a set of form fields. It turns tag matching into a gradual process of understanding a lifestyle: family members, habits, taste, functional needs, and automation preference are organized into card-based interactions that can be judged quickly and narrowed over time.',
    ),
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: t('从标签采集到设计推演', 'From tag intake to design reasoning'),
        items: [
          {
            title: t('low-burden intake', 'Low-burden intake'),
            body: t('用卡牌式选择降低输入门槛，让用户愿意给出更真实、更连续的生活信号。', 'Card-style choices lower the input barrier so users share more honest, continuous lifestyle signals.'),
          },
          {
            title: t('profile synthesis', 'Profile synthesis'),
            body: t('系统把分散标签重新组织成可作用于空间推荐和家具组合的用户画像。', 'The system reorganizes scattered tags into a usable user profile for spatial recommendations and furniture composition.'),
          },
          {
            title: t('product-chain continuity', 'Product-chain continuity'),
            body: t('标签不是停在 intake 页，而是继续进入空间推荐、商品绑定、全景预览与估价链路。', 'Tags do not stop at intake; they continue into recommendations, product binding, panorama preview, and pricing.'),
          },
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'heroImage',
        title: t('tag matching 01', 'Tag matching 01'),
        src: interiorPicture1,
        caption: t('标签匹配先从生活方式的主轮廓开始，而不是直接逼用户定义风格。', 'Tag matching starts with the outline of a lifestyle instead of forcing a style label up front.'),
      },
      {
        type: 'videoFeature',
        title: t('tag matching 02', 'Tag matching 02'),
        src: interiorVideo1,
        caption: t('卡牌式交互把语义采集变成连续判断，而不是一次性填空。', 'Card-based interaction turns semantic intake into a continuous judgment instead of a one-shot form fill.'),
        autoPlay: true,
        loop: true,
      },
      {
        type: 'videoFeature',
        title: t('tag matching 03', 'Tag matching 03'),
        src: interiorVideo3,
        caption: t('用户反馈会继续改变推荐链路，让系统理解不是静态快照。', 'User feedback keeps changing the recommendation path, so understanding is never treated as a static snapshot.'),
        autoPlay: true,
        loop: true,
      },
      {
        type: 'heroImage',
        title: t('tag matching 04', 'Tag matching 04'),
        src: interiorPicture2,
        caption: t('空间推荐开始把用户画像与场景容器连接起来。', 'Spatial recommendations begin to connect user profiles with the room container.'),
      },
      {
        type: 'heroImage',
        title: t('tag matching 05', 'Tag matching 05'),
        src: interiorPicture3,
        caption: t('家具组合、商品绑定与全景预览把语义结构推进成商业化体验。', 'Furniture composition, product binding, and panorama preview turn semantic structure into a commercial experience.'),
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

function renderContentBlock(block: ContentBlock, accentColor: string, text: (value: LocalizedText) => string) {
  if (block.type === 'shortParagraphs') {
    return (
      <div style={panelStyle()}>
        {block.title ? <div style={sectionLabelStyle(accentColor)}>{text(normalizeLocalizedText(block.title))}</div> : null}
        <div style={{ display: 'grid', gap: 10 }}>
          {block.items.map((item) => (
            <p key={typeof item === 'string' ? item : item.zh} style={paragraphStyle()}>
              {text(normalizeLocalizedText(item))}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={panelStyle()}>
      <div style={sectionLabelStyle(accentColor)}>{text(normalizeLocalizedText(block.title))}</div>
      <div style={{ display: 'grid', gap: 12 }}>
        {block.items.map((item) => (
          <div
            key={typeof item.title === 'string' ? item.title : item.title.zh}
            style={{
              borderRadius: 14,
              border: '1px solid rgba(200,169,110,0.1)',
              background: 'rgba(255,255,255,0.02)',
              padding: '14px 16px',
            }}
          >
            <div style={comparisonCardTitleStyle(accentColor)}>{text(normalizeLocalizedText(item.title))}</div>
            <div style={comparisonCardBodyStyle()}>{text(normalizeLocalizedText(item.body))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderVisualBlock(block: VisualBlock, accentColor: string, text: (value: LocalizedText) => string) {
  switch (block.type) {
    case 'videoFeature':
      return (
        <div style={{ ...panelStyle(), padding: 12 }}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{text(normalizeLocalizedText(block.title))}</div> : null}
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
            aria-label={text(normalizeLocalizedText(block.title ?? 'intro video'))}
          />
          {block.caption ? (
            <div style={{ color: '#8f7d61', fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>{text(normalizeLocalizedText(block.caption))}</div>
          ) : null}
        </div>
      );
    case 'heroImage':
      return (
        <div style={{ ...panelStyle(), padding: 12 }}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{text(normalizeLocalizedText(block.title))}</div> : null}
          <img
            src={block.src}
            alt={text(normalizeLocalizedText(block.title ?? 'hero image'))}
            style={{
              ...mediaFrame(),
              display: 'block',
              height: 'auto',
            }}
          />
          {block.caption ? (
            <div style={{ color: '#8f7d61', fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>{text(normalizeLocalizedText(block.caption))}</div>
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
  pageTitle: LocalizedText;
  pageGoal: LocalizedText;
  mainCopy: LocalizedText;
  isMobile?: boolean;
}) {
  const { text } = useI18n();

  return (
    <section style={{ padding: isMobile ? '8px 4px 0' : '12px 8px 0', display: 'grid', gap: 16 }}>
      <div style={pageTitleStyle(isMobile)}>{text(pageTitle)}</div>
      <div style={{ color: '#9f8d73', fontSize: 13, lineHeight: 1.7, maxWidth: 860 }}>{text(pageGoal)}</div>
      <p style={{ ...paragraphStyle(), maxWidth: 860 }}>{text(mainCopy)}</p>
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
  const { text } = useI18n();

  const page = getAiInteriorSystemPages()[slideIndex];
  if (!page) return null;

  return (
    <div style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
      <IntroReveal pageTitle={page.pageTitle} pageGoal={page.pageGoal} mainCopy={page.mainCopy} isMobile={isMobile} />

          {page.visualBlocks.length ? (
        <section style={{ display: 'grid', gap: 14 }}>
          {page.visualBlocks.map((block) => (
            <div
              key={
                typeof block.title === 'string'
                  ? block.title
                  : block.title?.zh ?? (typeof block.caption === 'string' ? block.caption : block.caption?.zh) ?? block.src
              }
            >
              {renderVisualBlock(block, accentColor, text)}
            </div>
          ))}
        </section>
      ) : null}

      {page.contentBlocks.length ? (
        <section style={{ display: 'grid', gap: 14 }}>
          {page.contentBlocks.map((block, index) => (
            <div key={`content-${index}`}>
              {renderContentBlock(block, accentColor, text)}
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
