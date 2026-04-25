import type { CSSProperties } from 'react';

import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { LocalizedText } from '../i18n/types.ts';
import { hasSharedMemoryAhaCaseStudy } from './sharedMemoryAhaCaseStudyMeta.ts';

function t(zh: string, en: string): LocalizedText {
  return { zh, en };
}

type ContentBlock =
  | {
      type: 'shortParagraphs';
      title: LocalizedText;
      items: LocalizedText[];
    }
  | {
      type: 'comparisonCards';
      title: LocalizedText;
      items: Array<{
        title: LocalizedText;
        body: LocalizedText;
      }>;
    }
  | {
      type: 'showcaseEmbed';
      title: LocalizedText;
      caption: LocalizedText;
      src: string;
    };

type SharedMemoryAhaPage = {
  pageTitle: LocalizedText;
  pageGoal: LocalizedText;
  mainCopy: LocalizedText;
  contentBlocks: ContentBlock[];
};

const sharedMemoryAhaPages: SharedMemoryAhaPage[] = [
  {
    pageTitle: t(
      '共享记忆驱动的语言学习 Aha 时刻',
      'Shared-Memory Aha Moments for Language Learning',
    ),
    pageGoal: t(
      '把 Language Diary 从一个 ritual-based multi-agent case，重构成一个由记忆调度驱动的跨应用语言 companion。',
      'Reframe Language Diary from a ritual-based multi-agent case into a memory-orchestrated cross-app language companion.',
    ),
    mainCopy: t(
      '这一版叙事不再把重点放在“系统里有多少 agent”。真正被验证的是：同一个 agent 如何在用户授权的不同三方场景里，复用 shared memory、稳定 persona 和累积 user understanding，把高价值片段判断成值得进入前台的语言学习时刻。\n\n因此这个案例的核心不再是 multi-agent workflow demo，而是 memory orchestration。Aha Moment 也不再只是一个被发现的语言点，而是系统经过判断、门禁和时机控制之后，选择让用户感知到的前台结果。',
      'This framing no longer centers on how many agents exist in the system. What it actually validates is how the same agent reuses shared memory, a stable persona, and accumulated user understanding across authorized third-party contexts, then decides which fragments deserve to surface as language-learning moments.\n\nThat shifts the case away from a multi-agent workflow demo and toward memory orchestration. An Aha Moment is no longer just a discovered language point; it becomes the frontstage result that the system chooses to surface after judgment, gating, and timing control.',
    ),
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: t('系统核心', 'System core'),
        items: [
          {
            title: t('Shared memory substrate', 'Shared memory substrate'),
            body: t(
              '把 life / goal / preference 等通用用户理解，与 expression / learning progress / review 等语言学习专属记忆拆开管理。',
              'Separate general user understanding such as life, goals, and preferences from language-specific memory like expression, learning progress, and review.',
            ),
          },
          {
            title: t('Memory orchestration layer', 'Memory orchestration layer'),
            body: t(
              '系统先判断此刻该调哪些 memory、它们有资格做什么，而不是先默认所有 agent 都要参与。',
              'The system decides which memories should be called and what they are allowed to do before assuming every agent should participate.',
            ),
          },
          {
            title: t('Agentic interface layer', 'Agentic interface layer'),
            body: t(
              '用户最终看到的是被精挑过的前台接口，例如 Aha Moment、inline assist、daily review，而不是内部模块本身。',
              'What the user ultimately sees is a carefully chosen frontstage interface such as an Aha Moment, inline assist, or daily review rather than the internal modules themselves.',
            ),
          },
        ],
      },
      {
        type: 'comparisonCards',
        title: t('从观察到显化的状态链', 'State chain from observation to surfacing'),
        items: [
          {
            title: t('Observe', 'Observe'),
            body: t(
              '在授权范围内读取当前 app、可见文本和用户正在做的事，但不直接争抢前台。',
              'Read the current app, visible text, and ongoing activity within the granted scope without immediately competing for the foreground.',
            ),
          },
          {
            title: t('Aha candidate', 'Aha candidate'),
            body: t(
              '系统先判断“这里可能有一个值得留下的时刻”，这个阶段可以完全不打扰用户。',
              'The system first decides that a moment may be worth keeping, and this stage can remain completely silent.',
            ),
          },
          {
            title: t('Gate review', 'Gate review'),
            body: t(
              '再单独评估权限、时机、注意力连续性和打扰成本，决定是触发、延后、静默保留还是忽略。',
              'Permission, timing, attentional continuity, and interruption cost are reviewed separately to decide whether to trigger, defer, silently keep, or ignore.',
            ),
          },
          {
            title: t('Aha moment', 'Aha moment'),
            body: t(
              '只有通过门禁之后，系统才把高价值判断转成一个真正被用户感知到的学习动作。',
              'Only after the gate passes does the system turn a high-value judgment into a learning action the user can actually feel.',
            ),
          },
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('为什么这比 “multi-agent” 更准确', 'Why this is more accurate than “multi-agent”'),
        items: [
          t(
            '系统中心不再是 agent 数量，而是 memory router、trigger policy 和 writeback policy 如何一起工作。',
            'The center of gravity is no longer the number of agents, but how the memory router, trigger policy, and writeback policy work together.',
          ),
          t(
            'Agent 在这里更像 memory operation worker：读取、判断、组合、写回。真正的产品核心，是共享记忆如何在跨场景里持续服务同一个用户。',
            'Here an agent behaves more like a memory-operation worker that reads, judges, composes, and writes back. The real product core is how shared memory keeps serving the same user across contexts.',
          ),
        ],
      },
    ],
  },
  {
    pageTitle: t('Aha Moment 的前台交互架构', 'Aha Moment Frontstage Interaction Architecture'),
    pageGoal: t(
      '把原本埋在 Language Diary 里的 UX showcase 单独抽出来，重读为同一个 agent 如何在 4 个 perspective 的建议下，为自己选择主前台形态与副前台形态。',
      'Pull the UX showcase out of Language Diary and reread it as a design question about how the same agent, informed by four perspectives, chooses a primary and secondary frontstage form for itself.',
    ),
    mainCopy: t(
      'Aha 不是一个统一弹窗，也不是“发现了一个语点”就自动触发的提醒。它更像 frontstage mode selection：系统先判断当前是 explicit attention 还是 shared attention，再决定应该用 ambient nudge、co-reading anchor、reply suggestion、target language challenge、relation-topic invitation，还是 deferred return card 的方式出现。\n\n因此前台真正要展示的，不只是 agent 能看到什么，而是它如何在不同时机里保持克制，同时总给用户一个低成本下一步；同一个判断也可能同时保留一个主前台形态和一个副前台形态。',
      'An Aha is not one universal pop-up, nor a reminder that fires automatically after a language point is found. It behaves more like frontstage mode selection: the system first decides whether the current condition is explicit attention or shared attention, then chooses whether to appear as an ambient nudge, co-reading anchor, reply suggestion, target language challenge, relation-topic invitation, or deferred return card.\n\nWhat the frontstage really needs to show is not only what the agent can see, but how it stays restrained across different moments while still giving the user a low-cost next step; the same judgment may also keep both a primary and a secondary frontstage form in play.',
    ),
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: t('两种注意力模式', 'Two attention modes'),
        items: [
          {
            title: t('模式 1 · Explicit attention mode', 'Explicit attention mode'),
            body: t(
              '用户已经主动分享内容、选中文本或邀请 agent 对话。系统可以更直接地进入共读、回复建议或 challenge。',
              'The user has already shared content, selected text, or explicitly invited the agent in. The system can enter co-reading, reply suggestion, or a challenge more directly.',
            ),
          },
          {
            title: t('模式 2 · Shared attention mode', 'Shared attention mode'),
            body: t(
              'agent 与用户共享可见范围，但当前阅读和思考流不能被粗暴打断，所以更适合轻提示、边缘气泡或晚点回来卡片。',
              'The agent shares the user’s visible field, but the current reading and thinking flow cannot be interrupted bluntly, so lighter forms such as ambient hints, edge bubbles, or deferred cards fit better.',
            ),
          },
        ],
      },
      {
        type: 'comparisonCards',
        title: t('可复用的前台形态', 'Reusable frontstage forms'),
        items: [
          {
            title: t('轻提示 · Ambient nudge', 'Ambient nudge'),
            body: t(
              '不抢主任务，只轻轻标出“这里值得留意”。',
              'Do not hijack the main task; simply mark that something here is worth noticing.',
            ),
          },
          {
            title: t('共读锚点 · Co-reading anchor', 'Co-reading anchor'),
            body: t(
              '把注意力收在一句值得一起看的内容上，让 agent 像共同在场，而不是开始授课。',
              'Gather attention on a sentence worth looking at together so the agent feels co-present rather than instructional.',
            ),
          },
          {
            title: t('回复入口 · Reply suggestion', 'Reply suggestion'),
            body: t(
              '当用户已经想回应但卡住时，先给一个能立刻行动的表达入口。',
              'When the user wants to respond but gets stuck, provide an entry point that can be acted on immediately.',
            ),
          },
          {
            title: t('目标语言挑战 · Target language challenge', 'Target language challenge'),
            body: t(
              '不是替用户回答，而是把当前时刻转成一次轻量练习机会。',
              'Do not answer for the user; turn the current moment into a lightweight practice opportunity.',
            ),
          },
          {
            title: t('关系 / 目标话题邀请 · Relation-topic invitation', 'Relation-topic invitation'),
            body: t(
              '把当前内容和用户最近在意的目标、关系或项目重新接上。',
              'Reconnect the current content with the goals, relationships, or projects the user already cares about.',
            ),
          },
          {
            title: t('晚点回来卡片 · Deferred return card', 'Deferred return card'),
            body: t(
              '当下不适合打断，但这个时刻值得被留下，于是系统先替用户保留，晚些再带回来。',
              'If now is not the right time to interrupt but the moment deserves to survive, the system keeps it and brings it back later.',
            ),
          },
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('前台原则', 'Frontstage rules'),
        items: [
          t(
            'Aha 不是通知，而是被带入的学习动作。用户看到之后，要么能试着说一句，要么能立刻进入下一步，而不是只被告知“这里有个知识点”。',
            'An Aha is not a notification but an invited learning action. After seeing it, the user should be able to try a line or enter the next step immediately instead of being told that a language point exists.',
          ),
          t(
            '同一个 Aha 不只对应一种 UI。系统必须根据注意力拥有权、任务连续性、关系深度和打扰成本，为自己挑选最合适的前台形态。',
            'The same Aha does not map to a single UI. The system has to choose the right frontstage form for itself based on attentional ownership, task continuity, relationship depth, and interruption cost.',
          ),
          t(
            '前台也要体现连续人格。用户感受到的应当仍然是“那个知道我是谁的 agent”，只是换了一种姿态来接我。',
            'The frontstage also needs to express a continuous persona. The user should still feel that it is the same agent that knows who they are, only arriving in a different posture.',
          ),
        ],
      },
      {
        type: 'showcaseEmbed',
        title: t('HTML UX Showcase', 'HTML UX Showcase'),
        caption: t(
          '下方 showcase 是这一案例的前台 UX 证据。每个场景按 5 层结构展开：场景 → 模式 1/2 → agent 选中的交互形态 → 用户怎么被带入下一步 → 最后沉淀成什么。投票方从 UX / Research / Human 改为 Expression / Relationship / Timing / Review，由 Orchestrator 决定主与副。',
          'The showcase below is the frontstage UX evidence for this case. Each scenario unfolds through five layers: scenario, mode 1/2, the interaction form selected by the agent, how the user is carried into the next step, and what finally gets sedimented. The voters shift from UX / Research / Human to Expression / Relationship / Timing / Review, and the Orchestrator decides the primary and secondary form.',
        ),
        src: '/language-diary-ux-showcase/index.html',
      },
    ],
  },
];

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

function cardTitleStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: 13,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
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

function embedFrameStyle(): CSSProperties {
  return {
    width: '100%',
    minHeight: 720,
    height: 'min(82vh, 960px)',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid rgba(200,169,110,0.12)',
    background: '#000',
    marginTop: 12,
  };
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
      <p style={{ ...paragraphStyle(), maxWidth: 860, whiteSpace: 'pre-line' }}>{text(mainCopy)}</p>
    </section>
  );
}

function renderContentBlock(block: ContentBlock, accentColor: string, text: (value: LocalizedText) => string) {
  if (block.type === 'shortParagraphs') {
    return (
      <div style={panelStyle()}>
        <div style={sectionLabelStyle(accentColor)}>{text(block.title)}</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {block.items.map((item) => (
            <p key={item.zh} style={paragraphStyle()}>
              {text(item)}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'comparisonCards') {
    return (
      <div style={panelStyle()}>
        <div style={sectionLabelStyle(accentColor)}>{text(block.title)}</div>
        <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          {block.items.map((item) => (
            <div
              key={item.title.zh}
              style={{
                borderRadius: 14,
                border: '1px solid rgba(200,169,110,0.1)',
                background: 'rgba(255,255,255,0.02)',
                padding: '14px 16px',
              }}
            >
              <div style={cardTitleStyle(accentColor)}>{text(item.title)}</div>
              <div style={cardBodyStyle()}>{text(item.body)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...panelStyle(), padding: 12 }}>
      <div style={sectionLabelStyle(accentColor)}>{text(block.title)}</div>
      <div style={{ color: '#8f7d61', fontSize: 13, lineHeight: 1.7 }}>{text(block.caption)}</div>
      <div style={embedFrameStyle()}>
        <iframe
          src={block.src}
          title="shared-memory-aha-showcase"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            background: '#000',
          }}
        />
      </div>
    </div>
  );
}

export default function SharedMemoryAhaCaseStudy({
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

  if (!hasSharedMemoryAhaCaseStudy(route, slideIndex)) return null;

  void enableMotion;
  const page = sharedMemoryAhaPages[slideIndex];
  if (!page) return null;

  return (
    <div style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
      <IntroReveal pageTitle={page.pageTitle} pageGoal={page.pageGoal} mainCopy={page.mainCopy} isMobile={isMobile} />

      <section style={{ display: 'grid', gap: 14 }}>
        {page.contentBlocks.map((block, index) => (
          <div key={`${block.type}-${index}`}>{renderContentBlock(block, accentColor, text)}</div>
        ))}
      </section>
    </div>
  );
}
