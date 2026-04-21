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
  body: LocalizedText;
  url: string;
};

type PersonalOSPage = {
  skillName: string;
  pageTitle: LocalizedText;
  pageGoal: LocalizedText;
  mainCopy: LocalizedText;
  insightCards: InsightCard[];
  fewShotTitle: LocalizedText;
  fewShotScenario: LocalizedText;
  fewShotSteps: FewShotStep[];
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
    pageGoal: t(
      '解决“看了很多、写了很多，但下一轮已经无法复核或复用”的研究写回问题。',
      'Solve the research-writeback problem where a team has read a lot and written a lot, but the next round can no longer audit or reuse the judgment.',
    ),
    mainCopy: t(
      '在 personal OS 里，我不把研究看成一次性 summary，而把它看成一条可回溯的判断链。这个 skill 要求 writeback 不能跳过 provenance、direction 和 tension：Source / Artifact / Evidence / Review / Writeback 必须被区分清楚，反例和不确定性也不能在润色里消失。',
      'Inside a personal OS, I do not treat research as a one-off summary. I treat it as a traceable judgment chain. This skill enforces that writeback cannot skip provenance, direction, or tension: source, artifact, evidence, review, and final writeback must remain distinct, and counter-signals cannot be polished away.',
    ),
    insightCards: [
      {
        eyebrow: t('Problem 01', 'Problem 01'),
        title: t('结论先行', 'Conclusion Drift'),
        body: t(
          '如果 agent 直接生成 polished summary，下一轮就没人知道哪些判断真的有证据支持。',
          'If the agent jumps straight to a polished summary, the next round can no longer tell which judgments are actually supported.',
        ),
      },
      {
        eyebrow: t('Problem 02', 'Problem 02'),
        title: t('provenance 丢失', 'Broken Provenance'),
        body: t(
          '一句判断到底来自 source、artifact，还是后来补进来的 intake，很容易在长文里混成一团。',
          'A long writeback can easily blur whether a judgment came from source material, artifact evidence, or a later intake decision.',
        ),
      },
      {
        eyebrow: t('Problem 03', 'Problem 03'),
        title: t('张力被抹平', 'Flattened Tension'),
        body: t(
          '反例、弱信号和冲突经常在“润色”阶段被清掉，最后只剩下无法迭代的一种声音。',
          'Counter-signals, weak signals, and conflict often get polished away, leaving only one voice that cannot be updated later.',
        ),
      },
    ],
    fewShotTitle: t('场景化 few-shot', 'Scenario few-shot'),
    fewShotScenario: t(
      '输入是一组已批准的播客 / 文章链接，目标是回答：“Agent team 是否真的进入了企业化迁移阶段？”',
      'Input: a bundle of approved podcast and article links. Goal: answer whether agent teams have actually entered an enterprise migration phase.',
    ),
    fewShotSteps: [
      {
        label: t('1. Normalize', '1. Normalize'),
        body: t(
          '先把 approved material 落成 source 与 artifact，不在缺失 transcript 或页面内容时凭空补完。',
          'Turn approved material into source and artifact records first instead of inventing missing transcript or page content.',
        ),
      },
      {
        label: t('2. Cluster', '2. Cluster'),
        body: t(
          '从 artifact 里抽 support / tension / counter-signal，再按机制聚类，而不是按情绪写观点。',
          'Extract support, tension, and counter-signals from artifacts, then cluster them by mechanism instead of writing by gut feel.',
        ),
      },
      {
        label: t('3. Write Back', '3. Write Back'),
        body: t(
          '先出 review pack，再按 intake 生成 writeback，让每条主张都能回溯到 evidence。',
          'Produce the review pack first, then derive the writeback from intake so every core claim can be traced back to evidence.',
        ),
      },
    ],
    linksTitle: t('GitHub 链接', 'GitHub Links'),
    linkCards: [
      {
        label: t('Repository', 'Repository'),
        body: t(
          '事件中心、证据约束、review 更新的产品分析知识库。',
          'An event-centered, evidence-constrained, review-updated product analysis library.',
        ),
        url: 'https://github.com/Vickysh221/product-ontology',
      },
      {
        label: t('Public Skill', 'Public Skill'),
        body: t(
          '公开 skill 入口：`product-ontological-analysis` 的可移植版本。',
          'The portable public entry for the `product-ontological-analysis` skill.',
        ),
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
    pageGoal: t(
      '解决 zero-to-one 讨论里最常见的“还没想清为什么存在，就已经开始画系统”的问题。',
      'Solve the classic zero-to-one failure mode where the team starts drawing systems before it knows why the direction should exist.',
    ),
    mainCopy: t(
      '这个 skill 是我在 personal OS 里的上游 gatekeeper。它把讨论强行分成 `Target A / Direction Framing` 和 `Target B / Structure Convergence` 两个阶段：如果 primary problem、why now、first wedge 和 actuation boundary 还没清楚，就不允许团队假装进入 UX 结构、agent 分工或记忆系统设计。',
      'This skill is the upstream gatekeeper in my personal OS. It forces discussion into `Target A / Direction Framing` and `Target B / Structure Convergence`: if the primary problem, why now, first wedge, and actuation boundary are still unclear, the team is not allowed to pretend it has already entered UX structure, agent allocation, or memory-system design.',
    ),
    insightCards: [
      {
        eyebrow: t('Problem 01', 'Problem 01'),
        title: t('阶段混淆', 'Stage Confusion'),
        body: t(
          '团队常常把“这件事该不该存在”与“它具体怎么做”混在同一轮讨论里，结果两边都讲不清。',
          'Teams often collapse “should this direction exist” and “how exactly should it work” into the same discussion, making both unclear.',
        ),
      },
      {
        eyebrow: t('Problem 02', 'Problem 02'),
        title: t('过早进入 UX 细节', 'Premature UX Detail'),
        body: t(
          'agent 分工、记忆卡、首页结构看起来很快，但往往是在方向还没过门时制造虚假进展。',
          'Agent allocation, memory cards, and home layouts feel fast, but they often create fake progress before the direction has passed the gate.',
        ),
      },
      {
        eyebrow: t('Problem 03', 'Problem 03'),
        title: t('矛盾被包装掉', 'Contradictions Get Hidden'),
        body: t(
          '当 actuation boundary、风险和 handoff 还冲突时，完整 PRD 只会把 unresolved contradiction 包装得更漂亮。',
          'When actuation boundaries, risks, and handoffs still conflict, a polished PRD only makes unresolved contradictions look prettier.',
        ),
      },
    ],
    fewShotTitle: t('场景化 few-shot', 'Scenario few-shot'),
    fewShotScenario: t(
      '团队说：“我们想做一个 personal OS，让 agent 主动帮用户整理生活。”',
      'The team says: "We want a personal OS where agents proactively organize everyday life for the user."',
    ),
    fewShotSteps: [
      {
        label: t('1. Target A', '1. Target A'),
        body: t(
          '先问这是不是一个该存在的方向：核心问题是什么，为什么是现在，第一块有效 wedge 在哪里。',
          'Start by asking whether this direction should exist at all: what the core problem is, why now, and where the first valid wedge lives.',
        ),
      },
      {
        label: t('2. Gate', '2. Gate'),
        body: t(
          '如果这些问题没过门，就给出 HOLD / SEND BACK，而不是用完整 PRD 掩盖不确定性。',
          'If those questions do not pass the gate, return HOLD or SEND BACK instead of hiding uncertainty behind a polished PRD.',
        ),
      },
      {
        label: t('3. Target B', '3. Target B'),
        body: t(
          '只有方向通过后，才进入 flow、handoff、memory policy、attention / modality 与 surface system 的 Architecture Brief。',
          'Only after the direction passes does the work move into an Architecture Brief covering flow, handoff, memory policy, attention and modality, and the surface system.',
        ),
      },
    ],
    linksTitle: t('GitHub 链接', 'GitHub Links'),
    linkCards: [
      {
        label: t('Repository', 'Repository'),
        body: t(
          '零到一的人机协作方法库，包含 stage gate、Direction Brief 与 Architecture Brief。',
          'A zero-to-one human-machine collaboration method repository with stage gates, Direction Briefs, and Architecture Briefs.',
        ),
        url: 'https://github.com/Vickysh221/zero-to-one-human-machine-ux-conductor',
      },
      {
        label: t('Skill Entry', 'Skill Entry'),
        body: t(
          '公开 skill 入口：`zero-to-one-human-machine-ux-conductor`。',
          'The public entry file for the `zero-to-one-human-machine-ux-conductor` skill.',
        ),
        url: 'https://github.com/Vickysh221/zero-to-one-human-machine-ux-conductor/blob/main/SKILL.md',
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
      <div style={introMetaStyle()}>{text(page.pageGoal)}</div>
      <p style={{ ...paragraphStyle(), maxWidth: 860 }}>{text(page.mainCopy)}</p>
    </section>
  );
}

function renderInsightCards(page: PersonalOSPage, accentColor: string, text: (value: LocalizedText) => string) {
  return (
    <section
      style={{
        display: 'grid',
        gap: 14,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      }}
    >
      {page.insightCards.map((item) => (
        <div key={item.title.zh} style={panelStyle()}>
          <div style={sectionLabelStyle(accentColor)}>{text(item.eyebrow)}</div>
          <div style={cardTitleStyle()}>{text(item.title)}</div>
          <div style={cardBodyStyle()}>{text(item.body)}</div>
        </div>
      ))}
    </section>
  );
}

function renderFewShot(page: PersonalOSPage, accentColor: string, text: (value: LocalizedText) => string) {
  return (
    <div style={panelStyle()}>
      <div style={sectionLabelStyle(accentColor)}>{text(page.fewShotTitle)}</div>
      <div style={{ ...cardTitleStyle(), marginBottom: 12 }}>{text(page.fewShotScenario)}</div>
      <div style={{ display: 'grid', gap: 12 }}>
        {page.fewShotSteps.map((step) => (
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
            <div style={cardBodyStyle()}>{text(item.body)}</div>
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

  return (
    <div style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
      <IntroReveal page={page} isMobile={isMobile} />

      {renderInsightCards(page, accentColor, text)}

      <section
        style={{
          display: 'grid',
          gap: 14,
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.25fr) minmax(280px, 0.9fr)',
          alignItems: 'start',
        }}
      >
        {renderFewShot(page, accentColor, text)}
        {renderLinks(page, accentColor, text)}
      </section>
    </div>
  );
}
