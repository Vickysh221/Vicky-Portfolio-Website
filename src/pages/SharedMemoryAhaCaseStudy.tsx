import type { CSSProperties } from 'react';

import slide03Img01 from '../images/aha/slide03-img01.png';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { Language, LocalizedText } from '../i18n/types.ts';
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
      '我把 Personal OS 理解为一种选择机制。它让系统在具体场景里选择合适的记忆、合适的 agent 姿态和合适的前台介入方式。Aha Moment 是我用语言学习验证这个机制的第一块切片。',
      'I understand Personal OS as a selection mechanism. It helps the system choose the right memory, the right agent posture, and the right frontstage intervention for a specific moment. Aha Moment is my first language-learning slice for testing that mechanism.',
    ),
    mainCopy: t(
      '语言学习让我第一次看见这个问题。用户真正卡住的时刻常常不在学习 app 里。用户可能在读一篇文章。用户也可能在写一条 Slack 回复。系统如果只看当前页面，它只能给出翻译或语法建议。系统如果带着共享记忆出现，它可以判断这句话为什么和用户有关。',
      'Language learning made this problem visible to me first. The moment when a user truly gets stuck often happens outside a learning app. The user may be reading an article. The user may be writing a Slack reply. If the system only sees the current page, it can only offer translation or grammar help. If the system arrives with shared memory, it can judge why a sentence matters to that user.',
    ),
    contentBlocks: [
      {
        type: 'shortParagraphs',
        title: t('从 Personal OS 到 Aha Moment', 'From Personal OS to Aha Moment'),
        items: [
          t(
            'Personal OS 在这里不是一个总入口。Personal OS 是一套判断框架。这个框架关心三个问题。系统应该调用哪一部分用户记忆？系统应该调用哪一部分语言学习记忆？agent 应该用什么姿态进入当前场景？',
            'Personal OS is not a single entry point here. Personal OS is a judgment framework. This framework asks three questions. Which part of user memory should the system call? Which part of language-learning memory should the system call? Which agent posture should enter the current scene?',
          ),
          t(
            'Aha Moment 把这些问题压缩到一个很小的时刻。用户没有打开课程。用户只是遇到一句话，或者写不出一个语气。agent 需要判断这个片段是否值得被打亮。agent 还需要判断自己是否应该出现。',
            'Aha Moment compresses those questions into one small moment. The user has not opened a course. The user has simply met a sentence or failed to find a tone. The agent needs to judge whether this fragment deserves attention. The agent also needs to judge whether it should appear at all.',
          ),
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('场景一 · 阅读时撞上“你一直想说却说不出”的那句', 'Scene 1 · Reading and meeting the sentence you could not say'),
        items: [
          t(
            '你在小红书看到一句英文 caption。那句话写着：“I want my work to feel inevitable, not loud.” 你停了两秒。这个句子正好说出了你最近在作品集里反复修改的意思。',
            'You see an English caption on social media. The sentence says, “I want my work to feel inevitable, not loud.” You pause for two seconds. This sentence says exactly what you have been trying to express in your portfolio drafts.',
          ),
          t(
            '普通 language app 会把它当作一个好句子。共享记忆系统会把它连回你的作品集草稿。系统会知道这个句子不是泛用素材。系统会知道它正在帮你找回一个还没说清的表达。',
            'A normal language app would treat it as a good sentence. A shared-memory system would connect it back to your portfolio draft. The system would know that this sentence is not generic material. The system would know that it helps you recover an expression you have not yet clarified.',
          ),
          t(
            '这个判断需要两种记忆。一般用户记忆保存你的项目和表达偏好。语言学习记忆保存你正在练的语气、句式和表达目标。Aha Moment 发生在这两种记忆接上的那一秒。',
            'This judgment needs two kinds of memory. General user memory holds your projects and expression preferences. Language-learning memory holds the tones, sentence patterns, and expression goals you are practicing. Aha Moment happens in the second when those two memories connect.',
          ),
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('场景二 · 回复时在两种说法之间犹豫', 'Scene 2 · Drafting a reply and stuck between two phrasings'),
        items: [
          t(
            '你在 Slack 给一位英文母语的同事写消息。你想表达自己对方案有保留。你不想显得像在挑刺。你写到第二句时卡住了。一种说法太硬。另一种说法太绕。',
            'You write a Slack message to an English-speaking colleague. You want to express reservations about a proposal. You do not want to sound like you are picking a fight. You get stuck on the second sentence. One phrasing feels too blunt. Another phrasing feels too indirect.',
          ),
          t(
            '语法插件会给三个正确版本。Personal OS 视角下的 agent 会先判断关系、身份和表达目标。它会问：哪个版本更像你想成为的表达者？',
            'A grammar tool would offer three correct versions. An agent shaped by a Personal OS view would first judge relationship, identity, and expression goals. It would ask which version sounds closer to the speaker you are trying to become.',
          ),
          t(
            '系统不应该每次都跳出来。系统需要计算打断成本。系统也需要保留用户反驳和忽略的权利。',
            'The system should not jump in every time. The system needs to calculate interruption cost. The system also needs to preserve the user’s right to reject or ignore it.',
          ),
        ],
      },
      {
        type: 'comparisonCards',
        title: t('这个项目验证的机制', 'The mechanism this project tests'),
        items: [
          {
            title: t('不是 language app 变聪明', 'This is not just a smarter language app'),
            body: t(
              '用户不是只在打开课程时学习。用户在生活流里遇到表达问题。单个 app 不能完整理解这个时刻。',
              'The user does not learn only after opening a course. The user meets expression problems inside the flow of life. A single app cannot fully understand that moment.',
            ),
          },
          {
            title: t('这是 Personal OS 的一个前台切片', 'This is one frontstage slice of Personal OS'),
            body: t(
              '同一个 agent 带着共享记忆进入多个场景。系统把一般用户记忆和语言学习记忆分开使用。界面只在高价值时刻进入前台。',
              'The same agent enters multiple scenes with shared memory. The system uses general user memory and language-learning memory separately. The interface enters the foreground only at high-value moments.',
            ),
          },
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('这个项目的设计对象', 'The design object of this project'),
        items: [
          t(
            '这个项目真正设计的是一个判断链。系统先识别 moment。系统再查找相关记忆。系统随后选择介入强度。用户最后决定是否接受、保存或继续展开。',
            'This project designs a judgment chain. The system first identifies a moment. The system then retrieves related memory. The system then chooses an intervention strength. The user finally decides whether to accept it, save it, or continue with it.',
          ),
          t(
            '语言学习是这个判断链的第一种验证场景。语言学习天然发生在阅读、写作和关系沟通里。它逼迫系统从 app 边界转向生活流。',
            'Language learning is the first validation scene for this judgment chain. Language learning naturally happens in reading, writing, and relationship communication. It forces the system to move from app boundaries into the flow of life.',
          ),
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('这一版叙事的来路', 'How this framing came to be'),
        items: [
          t(
            'v1.0 把 Language Diary 看成 ritual companion。v2.0 把核心推进到 memory orchestration。v3.0 把 Aha Moment 放回 Personal OS 的方法框架里。',
            'v1.0 treated Language Diary as a ritual companion. v2.0 moved the core toward memory orchestration. v3.0 places Aha Moment back inside the method framework of Personal OS.',
          ),
          t(
            'Personal OS 提供问题意识。共享记忆提供系统能力。Aha Moment 提供前台证据。这个项目因此从一个学习 app 案例，变成一个 cross-app agent 的验证切片。',
            'Personal OS provides the problem lens. Shared memory provides the system capability. Aha Moment provides the frontstage evidence. This project therefore moves from a learning-app case into a validation slice for a cross-app agent.',
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

function renderContentBlock(
  block: ContentBlock,
  accentColor: string,
  text: (value: LocalizedText) => string,
  language: Language,
) {
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
    const separator = block.src.includes('?') ? '&' : '?';
    const localizedSrc = `${block.src}${separator}lang=${language}`;
    return (
      <div style={{ ...panelStyle(), padding: 12 }}>
        <div style={sectionLabelStyle(accentColor)}>{text(block.title)}</div>
        <div style={{ color: '#8f7d61', fontSize: 13, lineHeight: 1.7 }}>{text(block.caption)}</div>
        <div style={embedFrameStyle()}>
          <iframe
            src={localizedSrc}
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
  const { text, language } = useI18n();

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
            <div key={`lead-${block.type}-${index}`}>{renderContentBlock(block, accentColor, text, language)}</div>
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
          <div key={`${block.type}-${index}`}>{renderContentBlock(block, accentColor, text, language)}</div>
        ))}
      </section>
    </div>
  );
}
