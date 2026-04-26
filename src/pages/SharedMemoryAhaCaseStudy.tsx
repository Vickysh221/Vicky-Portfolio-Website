import type { CSSProperties } from 'react';

import slide03Img01 from '../images/aha/slide03-img01.png';
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
    }
  | {
      type: 'showcaseImage';
      title: LocalizedText;
      caption: LocalizedText;
      src: string;
      alt: LocalizedText;
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
      '用精选 case canvas 直接替换原本的 Agent Aha Mode wireframe，把介入姿态放回真实语言学习场景里读。',
      'Replace the original Agent Aha Mode wireframe with a selected case canvas, reading intervention postures inside concrete language-learning moments.',
    ),
    mainCopy: t(
      '这一页直接让 case canvas 承担主要说明：用户递交、情境感知、回访与转化三组场景放在同一张可缩放画布里，说明 Agent Aha Mode 如何从入口、提醒、inline、saved state 一直走到 return 与 action。\n\n正文只补一层读图逻辑：不要把这些形态读成通知组件清单，而要看消息如何被递交、Aha 如何进入前台、旧片段如何在未来变成行动。',
      'This page lets the case canvas carry the argument: user handoff, context-aware intervention, and return/transformation sit on one scalable canvas, showing how Agent Aha Mode moves from entry, notification, inline help, and saved state toward return and action.\n\nThe body adds only the reading frame: do not read these forms as a notification-component catalog. Read how a message is handed off, how an Aha enters the foreground, and how an old fragment later becomes action.',
    ),
    leadContentBlocks: [
      {
        type: 'showcaseEmbed',
        title: t('精选 case canvas', 'Selected case canvas'),
        caption: t(
          '上方 canvas 用三组 use case 直接替换原来的 Agent Aha Mode wireframe：用户递交、情境感知、回访与转化。',
          'The canvas above replaces the original Agent Aha Mode wireframe with three use-case groups: user handoff, context-aware Aha, and return/transformation.',
        ),
        src: '/language-diary-ux-showcase-cases.html',
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
            title: t('先分清用户递交和情境感知', 'First separate handoff from context-aware Aha'),
            body: t(
              '左侧是用户主动把内容交给 agent，右侧和中间更多是 agent 在授权上下文里判断 Aha 候选成立。',
              'The left group is explicit handoff. The middle and right groups show the agent judging inside authorized context that an Aha candidate exists.',
            ),
          },
          {
            title: t('再看通知、inline 和保存状态', 'Then compare notification, inline, and saved state'),
            body: t(
              '同样是主动介入，可能是 banner notification、inline reply，也可能只是 saved state；差别来自 Aha 强度和当前打断成本。',
              'The same proactive intervention may become a banner notification, an inline reply, or only a saved state; the difference comes from Aha strength and interruption cost.',
            ),
          },
          {
            title: t('最后看回访如何变成行动', 'Finally read how return becomes action'),
            body: t(
              'Return card、morphing 和 micro-session 说明 Aha 不止是提醒，而是能被带回、变形，并进入用户可控制的下一步。',
              'Return cards, morphing, and micro-sessions show that an Aha is not just a reminder; it can return, transform, and enter a next step the user still controls.',
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
            'The HTML carries the main explanation. The prose only names the judgment dimensions: shared memory, generative potential, interruption cost, and rebuttable rights.',
          ),
          t(
            '这里不在文字里重讲每一种 case，避免把画布降级成说明书。',
            'This section does not retell every case in prose, so the canvas remains evidence instead of becoming an instruction manual.',
          ),
        ],
      },
    ],
  },
  {
    pageTitle: t('Aha Mode 的 Use Case 佐证', 'Aha Mode Use Case Evidence'),
    pageGoal: t(
      '把完整 UX showcase 收束成一张可缩放的精选 case canvas，用真实语言学习场景验证第二页的介入姿态。',
      'Condense the full UX showcase into a scalable selected case canvas, using concrete language-learning moments to validate the intervention postures from page 2.',
    ),
    mainCopy: t(
      '这一页不再放完整长 showcase，而是只保留能证明架构成立的精选 case canvas：用户递交、情境感知、回访与转化三组场景。\n\n读图重点不是再记一遍姿态名称，而是看第二页的介入姿态是否能落到真实语言学习时刻：消息如何递交、Aha 如何进入前台、旧片段如何在未来变成行动。',
      'This page no longer embeds the full long showcase. It keeps only a selected case canvas that proves the architecture through three groups: user handoff, context-aware intervention, and return/transformation.\n\nThe point is not to memorize posture names again. Read whether the page-2 intervention postures survive real language-learning moments: how a message is handed off, how an Aha enters the foreground, and how an old fragment returns later as action.',
    ),
    leadContentBlocks: [
      {
        type: 'showcaseImage',
        title: t('精选 case canvas', 'Selected case canvas'),
        caption: t(
          '上方 canvas 把完整 UX showcase 收束为三组 use case：用户递交、情境感知、回访与转化。',
          'The canvas above condenses the full UX showcase into three use-case groups: user handoff, context-aware Aha, and return/transformation.',
        ),
        src: slide03Img01,
        alt: t(
          'Aha Mode 第三页静态展示图',
          'Static presentation image for the third Aha Mode page',
        ),
      },
    ],
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: t('三组 case 证明什么', 'What the three case groups prove'),
        items: [
          {
            title: t('用户递交', 'User handoff'),
            body: t(
              '证明 agent 被主动召唤时，系统如何快速建立共同注意力，并把内容接成可处理的学习或表达对象。',
              'Shows how the system establishes shared attention when the agent is explicitly summoned, turning handed-off content into a learnable or expressible object.',
            ),
          },
          {
            title: t('情境感知', 'Context-aware Aha'),
            body: t(
              '证明不同强度的主动介入可以覆盖 banner notification、inline reply、saved state，而不是固定成一种通知组件。',
              'Shows that proactive intervention can range across banner notification, inline reply, and saved state instead of collapsing into one notification component.',
            ),
          },
          {
            title: t('回访与转化', 'Return and transformation'),
            body: t(
              '证明 Aha 的价值不止在当下出现，而在未来被带回、变形、共创，并转成用户可控制的行动。',
              'Shows that an Aha is valuable not only when it appears, but when it returns, morphs, co-creates, and becomes user-controlled action.',
            ),
          },
        ],
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

function imageFrameStyle(): CSSProperties {
  return {
    width: '100%',
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

  if (block.type === 'showcaseEmbed') {
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

  return (
    <div style={{ ...panelStyle(), padding: 12 }}>
      <div style={sectionLabelStyle(accentColor)}>{text(block.title)}</div>
      <div style={{ color: '#8f7d61', fontSize: 13, lineHeight: 1.7 }}>{text(block.caption)}</div>
      <div style={imageFrameStyle()}>
        <img
          src={block.src}
          alt={text(block.alt)}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
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
