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
  leadContentBlocks?: ContentBlock[];
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
      '把原本埋在 Language Diary 里的 Agent Aha Mode wireframes 单独抽出来，重读为三层介入强度下的前台姿态选择问题。',
      'Pull the Agent Aha Mode wireframes out of Language Diary and reread them as a frontstage posture-selection problem across three intervention tiers.',
    ),
    mainCopy: t(
      '这一页先让 wireframe 自己说话。上方 canvas 只保留 Agent Aha Mode 这一组：它把 Aha 的前台出现方式从轻到重排成三层，具体的 UI 关系已经在图里完成，不需要在正文里再复述一遍。\n\n正文只补一层读图逻辑：这些姿态不是通知组件清单，而是 agent 在共享记忆、生成潜力、打断成本和用户可反驳权之间做出的介入判断。',
      'This page lets the wireframe carry the argument first. The canvas above keeps only the Agent Aha Mode group: it orders Aha surfacing from light to heavy across three tiers, while the concrete UI relationships are already handled by the drawing and do not need to be repeated in prose.\n\nThe body adds only the reading frame: these postures are not a notification-component catalog, but intervention decisions made across shared memory, generative potential, interruption cost, and the user\'s right to rebut.',
    ),
    leadContentBlocks: [
      {
        type: 'showcaseEmbed',
        title: t('Agent Aha Mode Wireframes', 'Agent Aha Mode Wireframes'),
        caption: t(
          '上方 canvas 只保留 Agent Aha Mode 三张 artboard，作为这一页的主要证据。',
          'The canvas above keeps only the three Agent Aha Mode artboards as the primary evidence for this page.',
        ),
        src: '/language-diary-wireframes-standalone.html',
      },
    ],
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: t('两种 agent 参与模式', 'Two agent participation modes'),
        items: [
          {
            title: t('用户递交型参与', 'User-handoff participation'),
            body: t(
              '用户已经把内容、草稿、问题或意图交给 agent，重点是接住请求并完成回应；Aha Mode 不是主要发生在这里。',
              'The user has already handed content, a draft, a question, or an intention to the agent. The focus is receiving the request and responding; Aha Mode is not primarily happening here.',
            ),
          },
          {
            title: t('情境感知型介入', 'Context-aware intervention'),
            body: t(
              'agent 没有被显式召唤，但在授权上下文里判断 Aha 候选成立；这才是上方 canvas 讨论的范围。',
              'The agent has not been explicitly summoned, but judges inside an authorized context that an Aha candidate exists; this is the scope of the canvas above.',
            ),
          },
        ],
      },
      {
        type: 'comparisonCards',
        title: t('三种读图方式', 'Three ways to read the canvas'),
        items: [
          {
            title: t('从低介入到高介入', 'From lighter to heavier intervention'),
            body: t(
              '先看 agent 如何逐步取得前台资格：从只留痕，到嵌入当前动作，再到把用户带入一个可选择的行动路径。',
              'First read how the agent gradually earns foreground permission: from leaving a trace, to embedding inside the current action, to opening a selectable action path.',
            ),
          },
          {
            title: t('从保存状态到生成动作', 'From saved state to generated action'),
            body: t(
              '不要按 UI 组件读，而要看每一步生成到什么程度：只是保存、解释关系、给一句可用表达，还是开启一个小任务。',
              'Do not read it as a UI component list. Read how far each moment is generated: saved state, relationship explanation, usable sentence, or a small task.',
            ),
          },
          {
            title: t('从系统判断到用户反驳', 'From agent judgment to user rebuttal'),
            body: t(
              '每一种介入都要留下退出口：忽略、降级、查看依据、标记不是这个意思，都是 Aha Mode 的一部分。',
              'Every intervention needs exits: ignore, downgrade, view evidence, or mark this is not what I meant. These are part of Aha Mode itself.',
            ),
          },
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('这页文字只做辅助', 'The prose stays secondary'),
        items: [
          t(
            'HTML 已经承担主要说明，正文只标出判断维度：共享记忆、生成潜力、打断成本、可反驳权。',
            'The HTML carries the main explanation. The prose only names the judgment dimensions: shared memory, generative potential, interruption cost, and rebuttal rights.',
          ),
          t(
            '这里不在文字里重讲每一种姿态，避免把图例降级成说明书。',
            'This section does not retell every posture in prose, so the drawing remains evidence instead of becoming an instruction manual.',
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
  mainCopy?: LocalizedText;
  isMobile?: boolean;
}) {
  const { text } = useI18n();

  return (
    <section style={{ padding: isMobile ? '8px 4px 0' : '12px 8px 0', display: 'grid', gap: 16 }}>
      <div style={pageTitleStyle(isMobile)}>{text(pageTitle)}</div>
      <div style={{ color: '#9f8d73', fontSize: 13, lineHeight: 1.7, maxWidth: 860 }}>{text(pageGoal)}</div>
      {mainCopy ? <p style={{ ...paragraphStyle(), maxWidth: 860, whiteSpace: 'pre-line' }}>{text(mainCopy)}</p> : null}
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
  const leadContentBlocks = page.leadContentBlocks ?? [];
  const hasLeadContentBlocks = leadContentBlocks.length > 0;

  return (
    <div style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
      <IntroReveal
        pageTitle={page.pageTitle}
        pageGoal={page.pageGoal}
        mainCopy={hasLeadContentBlocks ? undefined : page.mainCopy}
        isMobile={isMobile}
      />

      {hasLeadContentBlocks ? (
        <section style={{ display: 'grid', gap: 14 }}>
          {leadContentBlocks.map((block, index) => (
            <div key={`lead-${block.type}-${index}`}>{renderContentBlock(block, accentColor, text)}</div>
          ))}
        </section>
      ) : null}

      {hasLeadContentBlocks ? (
        <section style={{ padding: isMobile ? '0 4px' : '0 8px' }}>
          <p style={{ ...paragraphStyle(), maxWidth: 860, whiteSpace: 'pre-line' }}>{text(page.mainCopy)}</p>
        </section>
      ) : null}

      <section style={{ display: 'grid', gap: 14 }}>
        {page.contentBlocks.map((block, index) => (
          <div key={`${block.type}-${index}`}>{renderContentBlock(block, accentColor, text)}</div>
        ))}
      </section>
    </div>
  );
}
