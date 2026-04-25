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
      '我在设计的不是一个语言 app，而是一个能在你一天里穿过不同 app 出现的 agent。语言学习，只是它第一次被严肃验证的场景。',
      'I am not designing a language app. I am designing an agent that can appear across different apps throughout your day. Language learning is simply the first scenario where this has been seriously tested.',
    ),
    mainCopy: t(
      '最尖锐的语言学习时刻往往不在语言 app 里——它在你读一篇文章时、在你给朋友写回复时、在你为一段话反复改词却说不准语气时。那些时刻里，一个应用内的“practice”根本来不及。真正有价值的 agent 必须在那里，用你的记忆接你。',
      'The sharpest language-learning moments rarely happen inside a language app — they happen when you are reading an article, drafting a reply to a friend, or stuck on a phrasing that does not quite carry the tone you meant. An in-app practice flow cannot reach those moments. An agent that matters has to be there, with your memory, ready to meet you.',
    ),
    contentBlocks: [
      {
        type: 'shortParagraphs',
        title: t('场景一 · 阅读时撞上“你一直想说却说不出”的那句', 'Scene 1 · Reading and hitting the exact phrase you could never quite say'),
        items: [
          t(
            '你在小红书刷到一条 caption。里面有一句：“I want my work to feel inevitable, not loud.” 你愣了两秒——这恰好是你在 portfolio 里这两周反复改的那一段一直在试着表达的意思。你之前写的所有句子都没到位。',
            'You scroll past a caption on social media and something stops you: “I want my work to feel inevitable, not loud.” For two seconds you just sit with it — this is exactly what you have been trying to say in your portfolio drafts for the past two weeks. None of your sentences landed right.',
          ),
          t(
            '这一刻你真正需要的不是把这个句子加进生词本，不是看一段语法解释——而是有人注意到“这句对你有意义，因为它精准接住了你最近没说清的那个意思”，然后安静地把它留下，晚上还能和你的 portfolio 草稿一起召回。',
            'What you actually need is not a vocabulary card or a grammar note. You need someone to notice that this sentence matters to you — because it precisely catches the meaning you could not get out — and to quietly hold onto it so it can come back alongside your draft tonight.',
          ),
          t(
            '这件事不可能在一个 language app 里发生。你不在 language app 里——你在小红书。“这句为什么对你有意义”这个判断，依赖的是另一个 app 里你的写作痕迹。没有跨 app 的共享记忆，系统只能把它当一个好看的句子。',
            'This cannot happen inside a language app. You are not in a language app; you are on social media. Knowing why that sentence matters to you depends on evidence from another app entirely — your writing. Without shared memory across apps, the system can only see it as a pretty sentence.',
          ),
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('场景二 · 回复时在两种说法之间犹豫', 'Scene 2 · Drafting a reply and stuck between two phrasings'),
        items: [
          t(
            '你在 Slack 给一个英文母语的同事写消息。你想表达“我对这个方案有保留，但不想显得在挑刺”。写到第二句卡住——一种说法太硬，另一种太绕，两个你都不满意。',
            'You are writing a Slack message to an English-speaking colleague. You want to say that you have reservations about a proposal but you do not want to come across as picking a fight. You get stuck at the second sentence — one phrasing is too blunt, the other too convoluted, and neither feels right.',
          ),
          t(
            '你真正需要的不是翻译插件，也不是语法正确的三个候选——三个可能都对，但都不像“你”。你需要 agent 知道你和这个同事的关系调子、知道你在英语里一直想练的那个气质，给出的版本是“哪一个更像你想成为的那个表达者”，而不只是“哪一个语法没问题”。',
            'A translation plugin is not what you need, nor are three grammatically correct options — any one of them might be perfectly correct but none of them sounds like you. You need the agent to know the tone of your relationship with this person, to know the quality of expression you have been working toward in English, and to offer a version that is closer to the writer you are trying to become rather than the one with the fewest errors.',
          ),
          t(
            '这同样不可能在一个 language app 里发生。关系调子的判断在聊天记录里，语气偏好的积累在过去的写作痕迹里。没有跨 app 的连续人格，agent 的建议只能落到语法对错这种平庸层。',
            'This also cannot happen inside a language app. Relationship tone lives in your chat history. Stylistic preference accumulates across your writing. Without a continuous persona across apps, the agent’s suggestions can only reach the level of correctness, not character.',
          ),
        ],
      },
      {
        type: 'comparisonCards',
        title: t('如果只是一个 language app，vs. 这两个场景说明的', 'If this were just a language app, vs. what these two scenes reveal'),
        items: [
          {
            title: t('如果只是一个 language app', 'If this were just a language app'),
            body: t(
              '用户主动打开才学习 · 一套学习记忆 · 单个 app 边界内 · 弹出提示 = 服务',
              'Learning only when the user opens it · One set of learning memory · Bounded within a single app · Pop-up = service',
            ),
          },
          {
            title: t('这两个场景告诉我的', 'What these two scenes reveal'),
            body: t(
              '有价值的时刻不在 app 里 · 两类共生记忆（你是谁 + 你在练什么）· 跨 app 同一个 agent + 同一份理解 · 克制本身是设计',
              'The valuable moments happen outside any app · Two coexisting memory types (who you are + what you are practicing) · Same agent across apps with the same understanding · Restraint is the design',
            ),
          },
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('这是这个项目真正的设计对象', 'This is what this project is actually designing'),
        items: [
          t(
            '所以这不是“更聪明的语言 app”。当我开始严肃对待这些时刻里 agent 应该交付什么价值，我发现我实际在设计一个跨 app 的、有连续记忆的、有边界感的 agent。语言学习只是它第一次被验证的场景——因为语言学习是少数几个“必须发生在生活流里”的能力。',
            'So this is not a smarter language app. When I began seriously asking what value an agent should deliver in those moments, I found I was designing a cross-app agent with continuous memory and a genuine sense of what it should and should not do. Language learning is simply the first scenario where this was put to the test — because language learning is one of the few capabilities that must happen inside the flow of life.',
          ),
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('这一版叙事的来路', 'How this framing came to be'),
        items: [
          t(
            'v1.0 以为在做 ritual companion。v2.0 意识到核心是 memory orchestration。v3.0 才看清：我设计的对象不是语言 app，而是一个 agent——memory orchestration 是它的内脏，Aha Moment 是它最锋利的前台接口。这一页是 v3.0 的开场。',
            'v1.0 framing: a ritual companion. v2.0 reframe: the core is memory orchestration. v3.0 clarity: what I am designing is not a language app but an agent — memory orchestration is its internal logic, and Aha Moment is its sharpest frontstage expression. This page is where v3.0 begins.',
          ),
        ],
      },
    ],
  },
  {
    pageTitle: t('Aha Moment 的前台交互架构', 'Aha Moment Frontstage Interaction Architecture'),
    pageGoal: t(
      '把原本埋在 Language Diary 里的 UX showcase 单独抽出来，重读为两种 agent 参与模式下的前台形态选择问题。',
      'Pull the UX showcase out of Language Diary and reread it as a frontstage-form selection problem across two agent participation modes.',
    ),
    mainCopy: t(
      '上一页的两个时刻——刷到一句精准的英文、卡在一条 Slack 回复——是两种不同的发生方式：一种是你自己撞见的，一种是你正在表达时卡住的。同一个 agent，在这两种时刻里不该用同一种姿态出现。\n\n这一页提出 Agent Aha Mode：当 Aha 候选已经成立，agent 该用哪一种姿态出现？我把它收敛成七种介入姿态——Trace（留痕）、Ambient（呼吸）、Inline（镶嵌）、Morphing（变形）、Echo（回声）、Co-creation（共创）、Agentic Action（代理行动）。每一种对应不同的置信度、上下文合法性和关系深度，分别使用灵动岛 saved pill、ambient hint、inline 建议条、跨工作区 morphing、跨时间 return sheet、共创候选、micro-session 等不同载体。\n\nAha Moment 的共同前提是 agent 主动介入：系统发现当前生活流里出现了一个可能值得学习、保存或回访的时刻。但进入前台之前，它要先分清两种参与关系——用户递交型参与（用户主动把内容、草稿、问题或意图交给 agent）和情境感知型介入（用户没有显式召唤，但 agent 通过共享上下文判断 Aha 候选成立）。Agent Aha Mode 主要服务后者。\n\n这七种姿态有一个共同底线：可反驳原则。每一次介入都附带一组反驳通道（not now / not my point / show original context / don\'t connect these again），让用户能在低代价下中止、降级或永久排除某种连接。Agent 拥有判断权，但用户拥有最终否决权。',
      'The two moments from the previous page — stumbling on a precise English caption and getting stuck on a Slack reply — represent two different kinds of occurrence: one you walked into, one you were blocked inside. The same agent should not appear the same way in both.\n\nThis page introduces Agent Aha Mode: once an Aha candidate has been found, which posture should the agent use? I converge it into seven postures of intervention — Trace, Ambient, Inline, Morphing, Echo, Co-creation, and Agentic Action. Each corresponds to a different level of confidence, contextual legitimacy, and relationship depth, and uses a different carrier: dynamic-island saved pill, ambient hint, inline suggestion bar, cross-workspace morphing, cross-time return sheet, co-creation candidates, or a micro-session.\n\nThe shared premise of an Aha Moment is active agent intervention: the system notices that the current flow of life contains a moment worth learning from, saving, or returning to. Before it enters the foreground, it has to distinguish two participation relationships — user-handoff participation (the user actively gives content, a draft, a question, or an intention to the agent) and context-aware intervention (the user has not explicitly summoned the agent, but the agent judges from shared context that an Aha candidate exists). Agent Aha Mode primarily serves the latter.\n\nAll seven postures share a single floor: the rebuttable principle. Every intervention carries a row of rebuttal channels (not now / not my point / show original context / don\'t connect these again) so the user can stop, downgrade, or permanently exclude a connection at low cost. The agent owns judgment; the user owns the final veto.',
    ),
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: t('两种 agent 参与模式', 'Two agent participation modes'),
        items: [
          {
            title: t('用户递交型参与', 'User-handoff participation'),
            body: t(
              '用户主动把消息传给 agent：选中文本、点击入口、分享内容、请求回复、保存片段或召唤 orchestrator。前台重点是接住这次递交，并让用户知道 agent 为什么在这里。',
              'The user actively gives something to the agent: selected text, an entry click, shared content, a reply request, a saved fragment, or an orchestrator summons. The frontstage has to receive that handoff and make it clear why the agent is here.',
            ),
          },
          {
            title: t('情境感知型介入', 'Context-aware intervention'),
            body: t(
              'agent 没有收到显式递交，但已经在授权上下文里识别出 Aha 候选。系统根据 Aha 强度选择通知类型：banner、灵动岛、inline 回复、edge bubble、return card 或弹窗都可能成立。',
              'The agent has not received an explicit handoff, but has identified an Aha candidate inside an authorized context. The system chooses the notification type according to Aha strength: banner, island, inline reply, edge bubble, return card, or modal can all be valid.',
            ),
          },
        ],
      },
      {
        type: 'comparisonCards',
        title: t('Agent Aha Mode 的七种介入姿态', 'Agent Aha Mode · seven postures of intervention'),
        items: [
          {
            title: t('① Trace 留痕', '① Trace'),
            body: t(
              '低置信度时只在灵动岛 compact 闪一下、留下 marker dot，不打断阅读，但用户回头能看见。',
              'At low confidence, only flash the compact dynamic island and leave a marker dot. Reading is not interrupted, but the moment is visible if the user looks back.',
            ),
          },
          {
            title: t('② Ambient 呼吸', '② Ambient'),
            body: t(
              '中等置信度的环境提示。Hint glow 或灵动岛 expanded 短暂出现一行 "related to your Personal OS framing"，用户可点开也可忽略。',
              'A medium-confidence ambient hint. A hint glow or expanded dynamic island briefly carries one line — "related to your Personal OS framing" — to be opened or ignored.',
            ),
          },
          {
            title: t('③ Inline 镶嵌', '③ Inline'),
            body: t(
              '当用户在表达时卡住，suggestion bar 贴在键盘上方给出 softer / more direct 等候选，不替用户写。',
              'When the user is stuck mid-expression, an inline suggestion bar sits above the keyboard with softer / more direct candidates, never writing for them.',
            ),
          },
          {
            title: t('④ Morphing 变形', '④ Morphing'),
            body: t(
              '同一片 fragment 在写英文 / 做作品集 / 准备面试三个工作区里以不同 lens 呈现：same fragment · three workspaces。',
              'The same fragment appears across writing English / portfolio / interview prep with different lenses applied: same fragment, three workspaces.',
            ),
          },
          {
            title: t('⑤ Echo 回声 ★', '⑤ Echo ★'),
            body: t(
              '跨时间的核心姿态：白天静默保存 → 白天 ambient hint → 晚上场景就位 → return card 滑出 → 转化菜单。带 grabber 和"don\'t connect these again"反驳通道。',
              'The cross-time hero posture: silent daytime save → ambient hint → evening context arrival → return sheet sliding up → transformation menu. Includes a grabber and a "don\'t connect these again" rebuttal channel.',
            ),
          },
          {
            title: t('⑥ Co-creation 共创', '⑥ Co-creation'),
            body: t(
              'agent 邀请用户挑 lens（更产品化 / 更面试化 / 更诗性），生成三条候选，由用户选取并写回。共创发生在表达层。',
              'The agent invites the user to choose a lens (more product / more interview / more poetic), generates three candidates, and lets the user pick before writing back. Co-creation happens at the expression layer.',
            ),
          },
          {
            title: t('⑦ Agentic Action 代理行动', '⑦ Agentic Action'),
            body: t(
              '高置信高相关时升级为任务分叉口：灵动岛 expanded 提议 "run a 3-step prep"，进入 micro-session，每一步都可中止。',
              'At high confidence and high relevance, the posture escalates into a task fork: the expanded dynamic island proposes "run a 3-step prep" and enters a micro-session where every step can be stopped.',
            ),
          },
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('七种姿态的共同底线', 'The shared floor across all seven postures'),
        items: [
          t(
            '可反驳原则（rebuttable）。每一张 Aha 卡片都带一组反驳通道：not now / not my point / show original context / don\'t connect these again。Agent 拥有判断权，用户拥有最终否决权。',
            'The rebuttable principle. Every Aha card carries a row of rebuttal channels: not now / not my point / show original context / don\'t connect these again. The agent owns judgment; the user owns the final veto.',
          ),
          t(
            '统一的视觉语言。amber 主色 + 三层卡片结构（header / body / footer）+ marker dot / island dot / hint glow 的 marker triplet——七种姿态在视觉上是同一个 agent 的不同体态，而不是七个互不认识的功能。',
            'A unified visual language. Amber primary colour, three-layer card structure (header / body / footer), and the marker triplet (marker dot / island dot / hint glow). The seven postures look like one agent in different bodies, not seven unrelated features.',
          ),
          t(
            'Aha 不是通知，而是被带入的学习动作。用户看到之后，要么能试着说一句、改一句，要么能立刻进入下一步，而不是只被告知"这里有个知识点"。',
            'An Aha is not a notification but an invited learning action. After seeing it, the user should be able to try or revise a line, or step into the next move, instead of being told that a language point exists.',
          ),
        ],
      },
    ],
  },
  {
    pageTitle: t('HTML UX Showcase', 'HTML UX Showcase'),
    pageGoal: t(
      '把原本埋在 `A Ritual of Expression` 里的页面，作为 Aha Moment 前台 UX 证据单独放在第三页。',
      'Place the page originally embedded inside `A Ritual of Expression` on a separate third page as frontstage UX evidence for the Aha Moment.',
    ),
    mainCopy: t(
      '这份 showcase 先区分用户递交型参与与情境感知型介入，然后用七种姿态的 storyboards——Trace / Ambient / Inline / Morphing / Echo / Co-creation / Agentic Action——演示 Agent Aha Mode 在不同置信度和场景下的真实出现方式。',
      'This showcase first separates user-handoff participation from context-aware intervention, then walks through the seven posture storyboards — Trace / Ambient / Inline / Morphing / Echo / Co-creation / Agentic Action — showing how Agent Aha Mode actually surfaces under different confidence levels and scenes.',
    ),
    contentBlocks: [
      {
        type: 'showcaseEmbed',
        title: t('HTML UX Showcase', 'HTML UX Showcase'),
        caption: t(
          '下方 showcase 是这一案例的前台 UX 证据。它先区分用户递交型参与与情境感知型介入，然后用七种姿态的 storyboards 演示 Agent Aha Mode 如何在不同置信度下出现，并保持可反驳。',
          'The showcase below is the frontstage UX evidence for this case. It first separates user-handoff participation from context-aware intervention, then walks through the seven postures storyboards to show how Agent Aha Mode surfaces under different confidence levels and stays rebuttable.',
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
