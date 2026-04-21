import type { CSSProperties } from 'react';

import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { LocalizedText } from '../i18n/types.ts';
import { hasPersonalOsCaseStudy } from './personalOsCaseStudyMeta.ts';

function t(zh: string, en: string): LocalizedText {
  return { zh, en };
}

type InsightCard = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
};

type FewShotStep = {
  label: LocalizedText;
  body: LocalizedText;
};

type LinkCard = {
  label: LocalizedText;
  body?: LocalizedText;
  url: string;
};

type PersonalOSPage = {
  skillName: string;
  pageTitle: LocalizedText;
  pageGoal?: LocalizedText;
  mainCopy: LocalizedText;
  insightCards?: InsightCard[];
  fewShotTitle?: LocalizedText;
  fewShotScenario?: LocalizedText;
  fewShotSteps?: FewShotStep[];
  linksTitle: LocalizedText;
  linkCards: LinkCard[];
};

const personalOsPages: PersonalOSPage[] = [
  {
    skillName: 'product-ontological-analysis',
    pageTitle: t(
      'Product Ontology：把研究判断沉淀成可追溯对象',
      'Product Ontology: Turning Research Judgment into Traceable Objects',
    ),
    mainCopy: t(
      '这套产品研究 Skill，源于一个困扰我多年的问题：重要的产品信息常常散落在播客、官方发布、开发者文档、社区讨论和用户反馈中。它们既零碎又冗长，人很难持续、及时地抓住真正关键的变化；即使看见了，也很容易被叙述者的立场带偏，或受限于自己的观察角度。因此，我把产品分析重新设计成一套协作流程，而不是单次总结。系统先由信息收集者追踪不同来源的第一手材料，形成可回看的资料；再由观点提炼者将这些材料转化为清晰判断，说明发生了什么、影响落在哪一层、服务谁、缓解了什么问题，同时补充依据、可信度、信息缺口和可能的反面解释；最后由多视角评审角色与评论收束者共同工作，从产品、设计、技术、用户现实、业务和反方等角度对已有判断进行挑战、重排与校正，保留分歧，并决定哪些内容值得进入长期沉淀。我希望通过这套方式，把产品研究从“信息整理”推进到“长期判断的建立”。它的目标不是更快地下结论，而是在复杂信息环境中，帮助我持续形成更全面、更可追溯、也更不容易被单一叙述带偏的产品理解。',
      'This product research skill comes from a problem that has bothered me for years: important product signals are often scattered across podcasts, official releases, developer documentation, community discussion, and user feedback. They are fragmented and long-form, which makes it hard to keep catching the truly important changes in time. Even when you do notice them, it is easy to be pulled by the narrator’s position or limited by your own angle of observation. So I redesigned product analysis as a collaborative workflow rather than a one-off summary. The system first uses information collectors to track first-hand material from different sources and turn it into records that can be revisited. Then viewpoint synthesizers convert those materials into clear judgments that explain what changed, which layer is affected, who it serves, and what problem it relieves, while also attaching evidence, confidence, information gaps, and possible counter-explanations. Finally, multi-perspective reviewers and a commentary closer work together to challenge, reorder, and calibrate those judgments from the angles of product, design, technology, user reality, business, and opposition, preserve disagreement, and decide what deserves long-term retention. Through this process, I want to move product research from information organization toward the building of durable judgment. The goal is not to reach conclusions faster, but to help me keep forming a fuller, more traceable understanding of products in a complex information environment, one that is less likely to be biased by a single narrative.',
    ),
    linksTitle: t('GitHub 链接', 'GitHub Links'),
    linkCards: [
      {
        label: t('Repository', 'Repository'),
        url: 'https://github.com/Vickysh221/product-ontology',
      },
      {
        label: t('Public Skill', 'Public Skill'),
        url: 'https://github.com/Vickysh221/product-ontology/blob/main/agent-skills/product-ontological-analysis/SKILL.md',
      },
    ],
  },
  {
    skillName: 'zero-to-one-human-machine-ux-conductor',
    pageTitle: t(
      '0→1 Human-Machine UX Conductor：先判断方向，再展开结构',
      '0→1 Human-Machine UX Conductor: Judge the Direction Before Expanding the Structure',
    ),
    mainCopy: t(
      '在研究智能体与辅助驾驶时，反复回到同一个问题：人机协作模式作为一种产品，关系作为体验本身需要被塑造。于是我尝试建立一套通用的追问方法，从“这个方向值不值得做”，一路追问到“人和系统如何分工、何时接管、如何留下长期状态”，用它来判断一个产品的走向和核心结构。\n\n我在尝试建立一套刨根问底的问法，agent 负责根据你的回答和对决策优先级的排序，用来判断一个人机协作产品该怎么成立。\n\n第一层：方向判别\n愿景与协作信条\n当下时机、范式变化与能力匹配\n问题定义\n运行环境与风险约束\n问题求解流程（粗粒度）\n方向决策\n\n第二层：结构收束\n问题求解流程拆解（细化）\n人机协作分工配置\n协作原型与最小协作单元\n交互原型类型\n交接机制与人工介入\n注意力预算与交互模态\n持久状态与记忆治理\n界面体系与体验承载\n评估体系\n分阶段放开路径\n迭代与学习回路',
      'While researching agents and assisted driving, I kept returning to the same question: a human-machine collaboration mode is itself a product, and the relationship as an experience has to be shaped. So I started building a general questioning method that moves from “is this direction worth doing at all” to “how should the human and the system divide work, when should control hand off, and how should long-term state be retained,” using it to judge a product’s direction and core structure.\n\nI am trying to establish a root-cause questioning method, where the agent uses your answers and your ranking of decision priorities to judge how a human-machine collaboration product should be made to hold together.\n\nLayer 1: Direction Judgment\nVision and collaboration doctrine\nTiming, paradigm shift, and capability fit\nProblem definition\nOperating environment and risk constraints\nProblem-solving flow (coarse-grained)\nDirection decision\n\nLayer 2: Structural Convergence\nProblem-solving flow breakdown (detailed)\nHuman-machine collaboration allocation\nCollaboration prototypes and minimum collaboration units\nInteraction prototype types\nHandoff mechanisms and human intervention\nAttention budget and interaction modality\nDurable state and memory governance\nInterface system and experience carrier\nEvaluation system\nPhased release path\nIteration and learning loop',
    ),
    linksTitle: t('GitHub 链接', 'GitHub Links'),
    linkCards: [
      {
        label: t('Repository', 'Repository'),
        url: 'https://github.com/Vickysh221/zero-to-one-human-machine-ux-conductor',
      },
    ],
  },
];

function panelStyle(): CSSProperties {
  return {
    background: 'linear-gradient(180deg, rgba(17,13,11,0.96), rgba(9,7,6,0.94))',
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

function sectionLabelStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    opacity: 0.92,
    marginBottom: 10,
  };
}

function cardTitleStyle(): CSSProperties {
  return {
    color: '#f4ecde',
    fontSize: 17,
    lineHeight: 1.45,
    marginBottom: 8,
  };
}

function cardBodyStyle(): CSSProperties {
  return {
    color: '#cdbfa8',
    fontSize: 15,
    lineHeight: 1.8,
  };
}

function introMetaStyle(): CSSProperties {
  return {
    color: '#9f8d73',
    fontSize: 13,
    lineHeight: 1.7,
    maxWidth: 860,
  };
}

function IntroReveal({
  page,
  isMobile,
}: {
  page: PersonalOSPage;
  isMobile?: boolean;
}) {
  const { text } = useI18n();

  return (
    <section style={{ padding: isMobile ? '8px 4px 0' : '12px 8px 0', display: 'grid', gap: 16 }}>
      <div style={{ color: '#8f7d61', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        {`personal os / ${page.skillName}`}
      </div>
      <div style={pageTitleStyle(isMobile)}>{text(page.pageTitle)}</div>
      {page.pageGoal ? <div style={introMetaStyle()}>{text(page.pageGoal)}</div> : null}
      <p style={{ ...paragraphStyle(), maxWidth: 860, whiteSpace: 'pre-line' }}>{text(page.mainCopy)}</p>
    </section>
  );
}

function renderInsightCards(insightCards: InsightCard[], accentColor: string, text: (value: LocalizedText) => string) {
  return (
    <section
      style={{
        display: 'grid',
        gap: 14,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      }}
    >
      {insightCards.map((item) => (
        <div key={item.title.zh} style={panelStyle()}>
          <div style={sectionLabelStyle(accentColor)}>{text(item.eyebrow)}</div>
          <div style={cardTitleStyle()}>{text(item.title)}</div>
          <div style={cardBodyStyle()}>{text(item.body)}</div>
        </div>
      ))}
    </section>
  );
}

function renderFewShot(
  fewShotTitle: LocalizedText,
  fewShotScenario: LocalizedText,
  fewShotSteps: FewShotStep[],
  accentColor: string,
  text: (value: LocalizedText) => string,
) {
  return (
    <div style={panelStyle()}>
      <div style={sectionLabelStyle(accentColor)}>{text(fewShotTitle)}</div>
      <div style={{ ...cardTitleStyle(), marginBottom: 12 }}>{text(fewShotScenario)}</div>
      <div style={{ display: 'grid', gap: 12 }}>
        {fewShotSteps.map((step) => (
          <div
            key={step.label.zh}
            style={{
              borderRadius: 14,
              border: '1px solid rgba(200,169,110,0.1)',
              background: 'rgba(255,255,255,0.02)',
              padding: '14px 16px',
            }}
          >
            <div style={{ ...sectionLabelStyle(accentColor), marginBottom: 8 }}>{text(step.label)}</div>
            <div style={cardBodyStyle()}>{text(step.body)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function linkStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: 14,
    lineHeight: 1.6,
    textDecoration: 'none',
    wordBreak: 'break-word',
  };
}

function renderLinks(page: PersonalOSPage, accentColor: string, text: (value: LocalizedText) => string) {
  return (
    <div style={panelStyle()}>
      <div style={sectionLabelStyle(accentColor)}>{text(page.linksTitle)}</div>
      <div style={{ display: 'grid', gap: 12 }}>
        {page.linkCards.map((item) => (
          <div
            key={item.url}
            style={{
              borderRadius: 14,
              border: '1px solid rgba(200,169,110,0.1)',
              background: 'rgba(255,255,255,0.02)',
              padding: '14px 16px',
              display: 'grid',
              gap: 8,
            }}
          >
            <div style={cardTitleStyle()}>{text(item.label)}</div>
            {item.body ? <div style={cardBodyStyle()}>{text(item.body)}</div> : null}
            <a href={item.url} target="_blank" rel="noreferrer" style={linkStyle(accentColor)}>
              {item.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PersonalOSCaseStudy({
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
  const { text } = useI18n();

  if (!hasPersonalOsCaseStudy(route, slideIndex)) return null;

  void enableMotion;
  const page = personalOsPages[slideIndex];

  if (!page) return null;

  const hasInsightCards = Boolean(page.insightCards?.length);
  const hasFewShot = Boolean(page.fewShotTitle && page.fewShotScenario && page.fewShotSteps?.length);
  const hasLinks = page.linkCards.length > 0;

  return (
    <div style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
      <IntroReveal page={page} isMobile={isMobile} />

      {hasInsightCards ? renderInsightCards(page.insightCards!, accentColor, text) : null}

      {hasFewShot || hasLinks ? (
        <section
          style={{
            display: 'grid',
            gap: 14,
            gridTemplateColumns:
              !isMobile && hasFewShot && hasLinks
                ? 'minmax(0, 1.25fr) minmax(280px, 0.9fr)'
                : '1fr',
            alignItems: 'start',
          }}
        >
          {hasFewShot
            ? renderFewShot(page.fewShotTitle!, page.fewShotScenario!, page.fewShotSteps!, accentColor, text)
            : null}
          {hasLinks ? renderLinks(page, accentColor, text) : null}
        </section>
      ) : null}
    </div>
  );
}
