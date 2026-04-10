import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import fuliHeroImage from '../images/fuli/slide01-img01.png';
import fuliSystemImage from '../images/fuli/slide02-img01.png';
import lotusWarmClusterDrift from '../images/fuli/lotus and fish/Warm Cluster Drift.png';
import lotusVerticalOrganicLattice from '../images/fuli/lotus and fish/vertical organic lattice.png';
import lotusLeafAndCurrentField from '../images/fuli/lotus and fish/Leaf-and-Current Field.png';
import lotusVerticalOrganicLattice2 from '../images/fuli/lotus and fish/vertical organic lattice2.png';
import lotusVerticalOrganicLattice3 from '../images/fuli/lotus and fish/vertical organic lattice3.png';
import lotusVerticalOrganicLattice4 from '../images/fuli/lotus and fish/vertical organic lattice4.png';

export const FULI_PLUS_CASE_STUDY_PAGE_COUNT = 10;

type ContentBlock =
  | { type: 'userQuotes'; title?: string; items: string[] }
  | { type: 'shortParagraphs'; title?: string; items: string[] }
  | { type: 'bulletCluster'; title?: string; items: string[] }
  | { type: 'comparisonCards'; title?: string; items: { title: string; body: string }[] }
  | { type: 'miniCaptions'; title?: string; items: string[] };

type VisualBlock =
  | { type: 'heroImage'; title?: string; src: string; caption: string }
  | { type: 'workflowDiagram'; title?: string; nodes: string[] }
  | { type: 'problemGrid'; title?: string; items: { title: string; body: string; crop?: string }[] }
  | { type: 'rugJudgmentGrid'; items: { title: string; body: string; diagram: 'abstract' | 'led' | 'surface' | 'refinable' }[]; closing: string }
  | { type: 'beforeAfter'; title?: string; before: string[]; after: string[] }
  | { type: 'pipeline'; title?: string; stages: string[] }
  | { type: 'case05FirstRound' }
  | { type: 'case05SelectionConvergence' }
  | { type: 'referenceImageGrid'; title?: string; items: { label: string; body: string; crop: string }[] }
  | { type: 'semanticBuckets'; title?: string; items: { title: string; body: string }[] }
  | { type: 'roleCompare'; title?: string; left: { title: string; body: string }; right: { title: string; body: string } }
  | { type: 'caseImageStrip'; title?: string; items: { title: string; body: string; src: string }[] }
  | { type: 'closingPoints'; title?: string; items: string[] }
  | { type: 'appendixDiagram'; title?: string; groups: { title: string; items: string[] }[] }
  | { type: 'assetMap'; title?: string; columns: { title: string; items: string[] }[] }
  | { type: 'semanticCompilationChain' }
  | { type: 'directionWeightMatrix' }
  | { type: 'rugLanguagePromptBridge' }
  | { type: 'appendixC' };

interface CaseStudyPage {
  pageId?: string;
  pageTitle: string;
  pageGoal: string;
  mainCopy: string;
  contentBlocks: ContentBlock[];
  visualBlocks: VisualBlock[];
}

const pages: CaseStudyPage[] = [
  {
    pageTitle: '面向地毯生成的AI协作设计系统',
    pageGoal: '让读者立刻知道这是一个 AI + 设计系统项目，主题是 rug 定制与设计转化。',
    mainCopy:
      '这个项目试图把用户模糊的语言、参考图里的线索，以及一轮轮反馈里的微小判断，转成可比较、可推进的 rug 设计方向。它关心的不是单次出图，而是怎样让方向生成、选择与 refinement 形成一条能持续工作的路径。',
    contentBlocks: [
      {
        type: 'userQuotes',
        title: '用户真实输入往往是模糊的语义',
        items: [
          '“我想做个有植物风格的地毯”',
          '“整体高级一点，别太满”',
          '“这张感觉对了，但布局再看看”',
        ],
      },
      {
        type: 'shortParagraphs',
        title: '工作流里的摩擦',
        items: [
          '对销售来说，难点在于如何把用户的话转成可继续讨论的方向。',
          '对设计师来说，难点在于参考图、材料感和图案组织之间并不是一一对应的关系。',
          '客户在收到样图后，需要反复沟通和修改，才能得到符合预期的设计。',
          '这个过程也增加了设计的时间成本。',
        ],
      },
    ],
    visualBlocks: [
      { type: 'workflowDiagram', title: '传统设计流程', nodes: ['用户输入', '销售 / 设计师理解', '反复沟通', '设计出图', '继续修改'] },
    ],
  },
  {
    pageTitle: '项目被重构成一个两阶段的 AI 协作工作流',
    pageGoal: '清楚展示系统框架。',
    mainCopy:
      '在这个判断之上，项目被重构成一个两阶段系统。第一阶段负责把模糊输入翻译成方向空间，先给出几条足够有差异、但仍在同一问题域内的起点；第二阶段负责沿已选方向继续长，避免每一轮都从头开始。',
    contentBlocks: [
      {
        type: 'shortParagraphs',
        title: '两阶段分工',
        items: [
          '第一阶段负责把模糊输入翻译成方向空间。',
          '第二阶段负责沿已选方向继续长，而不是每次重新开始。',
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'pipeline',
        stages: ['输入（文本 / 参考图 / 混合输入 / 用户反馈）', '第一阶段：方向规划', '3 个初始方向', '用户选择', '第二阶段：受控变体', 'case 累积与回流'],
      },
    ],
  },
  {
    pageTitle: '我们需要一个懂地毯，懂品牌的「专家」',
    pageGoal: '具体展示为什么 generic image generation 在这个场景里不够用。',
    mainCopy:
      '生成地毯这件事，难的地方从来不只是“画面漂不漂亮”。很多图单看并不差，但一旦放到地毯这个媒介里，就会显得太像插画、太像装饰画，或者只是把参考图换了一种方式重说一遍。真正的差别在于：一个懂地毯的人，看图时不会只看题材，而会同时判断图案是怎么成立的，结构是不是稳定，表面和工艺有没有真正参与进去，最后这个方向有没有继续往下 refinement 的空间。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'rugJudgmentGrid',
        items: [
          {
            title: '先别急着看它画了什么',
            body: '鱼、荷叶、石纹、水流，这些都只是入口。真正要判断的是，这些东西最后有没有被整理成图案语言。停在题材上，出来的东西很容易像画；能往结构、单元和节奏里走，才更像地毯。',
            diagram: 'abstract',
          },
          {
            title: '我更在意它靠什么成立',
            body: '有些方向是靠一个 motif 被看见，有些方向靠的是骨架，有些靠的是密度和关系。这一步其实决定了整张 rug 的气质：它是直接、装饰性的，还是更克制、更耐看、要慢慢读出来的。',
            diagram: 'led',
          },
          {
            title: '地毯的判断，最后一定会落到表面上',
            body: '边缘软不软，纹理浮不浮，哪些地方该更密、哪些地方该退下去，这些都会改变图案最后的成立方式。所以做 rug 不能只顾着把图案想清楚，还要同时把“它以什么表面出现”想清楚。',
            diagram: 'surface',
          },
          {
            title: '还要看这个方向能不能继续做',
            body: '有些图第一眼很好看，但没有后劲；再做一轮就散。真正好的方向，往往是骨架已经立住、逻辑已经清楚，后面还能继续调密度、调节奏、调重心，而不用每次都重新来过。',
            diagram: 'refinable',
          },
        ],
        closing:
          '地毯设计里，真正重要的判断往往不只落在题材上。画面怎么被组织起来，主体靠什么成立，表面和工艺有没有进入，方向有没有后续 refinement 的空间——这些层一起成立了，一张图才真正开始像一张 rug。',
      },
    ],
  },
  {
    pageId: 'case05-first-round-expansion',
    pageTitle: '同一个输入，如何被展开成三个可比较的方向',
    pageGoal: '说明第一轮不是给一个答案，而是展开方向空间。',
    mainCopy:
      '以 Case05 Fish and Lotus 为例，系统先不急着给出一个答案，而是把参考图和用户意图转成三个不同的 rug 方向。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'case05FirstRound',
      },
    ],
  },
  {
    pageId: 'case05-selection-and-convergence',
    pageTitle: '当用户选中方向二，系统开始稳定它对偏好的理解',
    pageGoal: '展示用户选择如何收束系统判断，并进入第二轮 refinement。',
    mainCopy:
      '用户选择的不是一张更好看的图，而是一种更适合继续推进的成立方式。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'case05SelectionConvergence',
      },
    ],
  },
  {
    pageId: 'semantic-compilation-chain',
    pageTitle: '模糊语义不是 prompt：它先被编译成三条可比较的方向',
    pageGoal: '解释第一轮为什么是方向假设，而不是三张随机图。',
    mainCopy:
      '用户给出的通常不是一份完整 brief，而是一组混合着情绪、场景、审美倾向和局部限制的模糊语义。系统的第一步不是把这些话直接翻成一句 prompt，而是先判断哪些信号已经足够明确，哪些仍然含混，然后围绕同一个输入展开三条可以比较的设计方向。',
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: '第一轮真正要解决的不是“生成”，而是“展开方向空间”',
        items: [
          {
            title: 'semantic intake',
            body: '先把“温暖、自然、别太甜、适合客厅”这种混合输入拆成 impression、arrangement、motif、color restraint、material expectation 等不同层的信号。',
          },
          {
            title: 'ambiguity detection',
            body: '判断哪些维度已经相对明确，哪些维度仍然冲突或空白；第一轮的价值就在于替用户把这些未定部分展开。',
          },
          {
            title: 'three-lane hypothesis',
            body: '系统产出的不是三个 prompt 版本，而是三条共享同一输入来源、但强调点不同的设计假设。',
          },
        ],
      },
      {
        type: 'bulletCluster',
        title: '为什么必须是“方向”而不是“答案”',
        items: [
          '因为用户最擅长的是比较，而不是一开始就给出完整 specification。',
          '因为模糊语义里经常同时混着 mood、结构倾向和材料期待，不能一次性压成单一路径。',
          '因为第一轮要建立的是可继续 refinement 的判断基础，而不是一次命中。',
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'pipeline',
        stages: ['user vague input', 'semantic intake', 'certainty / ambiguity split', 'three direction hypotheses', 'direction-specific slot weighting', 'rug-language translation', 'prompt assembly', '3 first-round variants'],
      },
    ],
  },
  {
    pageId: 'direction-weighting-and-rug-language',
    pageTitle: '从语义方向到地毯语言：每条方向都通过不同的槽位重心成立',
    pageGoal: '把三方向的差异解释成可控的设计维度，而不是同义改写。',
    mainCopy:
      '同一句输入下，三个方向不会平均地改所有变量。系统会给每条方向分配不同的主导维度：有的让 arrangement 先成立，有的把 material feel 拉到前台，有的把 color restraint 和 motif abstraction 作为主轴。这样，差异才不是“看起来有点不同”，而是“成立方式不同”。',
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: '同一输入下的三种方向重心',
        items: [
          {
            title: 'Direction A｜organic flow',
            body: '重点放在 arrangement、movement path 与 breathing pocket。它更像让图案先通过流动路径成立，再决定 motif 如何附着进去。',
          },
          {
            title: 'Direction B｜calm structure',
            body: '重点放在 arrangement、style restraint 与 motif abstraction。它压低叙事性，让结构秩序和整体克制感更先被读到。',
          },
          {
            title: 'Direction C｜tactile richness',
            body: '重点放在 material feel、surface depth 与 local cluster texture。它不是单纯“更丰富”，而是把 rug 的表面关系推到前台。',
          },
        ],
      },
      {
        type: 'bulletCluster',
        title: '这里的“地毯语言”到底指什么',
        items: [
          '不是普通视觉风格词，而是可以进入 rug 判断的表面、结构与工艺特征。',
          '例如 pile height contrast、tuft density rhythm、edge softness、carved relief、cluster spread、surface sheen bias。',
          '语义词必须先被翻译成这些 rug-specific features，系统才有办法稳定地控制生成。',
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'beforeAfter',
        title: '从模糊语义到 rug-specific design language',
        before: ['温暖自然', '有流动感', '不要太甜', '适合客厅'],
        after: ['restrained warm-earth palette', 'branching organic path', 'open breathing areas', 'soft contour transitions', 'mixed-pile hand-tufted relief'],
      },
    ],
  },
  {
    pageId: 'semantic-cue-brand-reinforcement',
    pageTitle: 'Semantic cue：把品牌图像变成可调用的语义加强层',
    pageGoal: '说明品牌图像在 second-stage 中不是做风格迁移，而是作为品牌边界内的 semantic reinforcement。',
    mainCopy:
      '这里的品牌图像不只是风格迁移用的 style reference。它们如果只被拿来做表面相似匹配，系统借到的通常只是“像不像”，而不是对 rug 真正有用的判断层。我更想做的是把这些品牌历史图像 reverse-read 成 semantic cues：它们在主体形成、组织逻辑、密度节奏、边缘处理和表面语言上，各自代表什么样的整体取向。',
    contentBlocks: [
      {
        type: 'bulletCluster',
        title: 'semantic cue module 在 second-stage 的作用',
        items: [
          '系统先根据用户描述与当前选中的意向，确定这一轮已经被认可的方向。',
          '再去品牌匹配库里找那些 slot parameter vectors 整体取向接近、DNA 同向的案例。',
          '匹配目标不是视觉相似，而是 semantic structure 是否同向。',
          '这些 cues 会作为 prompt 组装前的一层 reinforcement，帮助下一轮 variation 更稳定地收束。',
        ],
      },
      {
        type: 'shortParagraphs',
        items: [
          '所以它服务的不是风格迁移，而是 brand-bounded design control：在品牌边界内，对一个已经被用户认可的方向做更可控的加强。这也让 second-stage variation 更像设计控制，而不只是继续多出几张图。',
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'assetMap',
        title: '从品牌历史图像到可调用 cues',
        columns: [
          {
            title: 'brand image',
            items: ['历史图像', '案例资产', '品牌视觉经验'],
          },
          {
            title: 'semantic read',
            items: ['主体形成', '组织逻辑', '密度节奏', '边缘处理', '表面语言'],
          },
          {
            title: 'reinforcement',
            items: ['slot vector 同向', 'DNA 同向', 'variation 收束', 'brand-bounded control'],
          },
        ],
      },
    ],
  },
  {
    pageId: 'prompt-as-serialization-layer',
    pageTitle: 'Prompt 只是最后一层：它在这里是 design state 的外部序列化结果',
    pageGoal: '说明 prompt 不是创意起点，而是编译后的对模型指令。',
    mainCopy:
      '这个系统最终当然会落到生成指令，但 prompt 在这里并不承担“替代判断”的角色。它接收的是一条已经被组织好的方向假设：包括方向重心、槽位权重、rug-specific features 和负向约束。换句话说，prompt 只是 design state 面向图像模型时的一种外部表达。',
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: '三层链路',
        items: [
          {
            title: 'Layer 1｜semantic hypothesis',
            body: '系统先确认这一轮的核心方向：例如更偏 organic flow、calm structure 或 tactile richness。',
          },
          {
            title: 'Layer 2｜rug design language',
            body: '再把方向翻译成 composition logic、motif behavior、color constraints、material cues、pile / relief relations。',
          },
          {
            title: 'Layer 3｜generation instruction',
            body: '最后才把这些状态组织成模型能执行的 prompt / control instruction，并加入 exclusion 与 variation boundary。',
          },
        ],
      },
      {
        type: 'miniCaptions',
        title: '这一步最重要的边界',
        items: [
          '它不是把中文翻译成英文。',
          '它不是把一句 vague input 改写成更长的 prompt。',
          '它是在把 design state 序列化成模型可以执行的结构化指令。',
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'pipeline',
        stages: ['semantic hypothesis', 'slot emphasis', 'rug-language features', 'negative constraints', 'prompt assembly', 'generated variant'],
      },
    ],
  },
  {
    pageTitle: 'Appendix A｜模糊语义如何被展开成三个方向',
    pageGoal: '说明第一轮不是随机给三张图，而是把模糊输入编译成三条可比较的设计假设。',
    mainCopy:
      '用户输入里的信息通常混着情绪、场景、结构倾向与材料期待。系统不会把这类输入直接翻译成一句 prompt，而会先识别哪些是相对明确的信号，哪些仍然模糊，再围绕同一组核心语义展开三条具有不同重点的 rug directions。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'semanticCompilationChain',
      },
    ],
  },
  {
    pageTitle: 'Appendix B｜三个方向如何落到地毯语言',
    pageGoal: '说明每个方向不是同义改写，而是通过不同的槽位权重和材料 / 工艺特征来分化。',
    mainCopy:
      '三条方向共享同一个语义起点，但不会平均地改所有维度。系统会为每条方向分配不同的 slot emphasis，让有的方向更强调 arrangement 和 movement，有的更强调 calm structure，有的更强调 tactile richness。真正拉开差异的，不是修辞，而是 rug-specific 的组织、表面与工艺特征。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'directionWeightMatrix',
      },
    ],
  },
  {
    pageTitle: 'Appendix C｜Prompt 只是 design state 的外部表达',
    pageGoal: '说明 prompt 不是创意来源，而是 semantic hypothesis 与 rug language 编译后的最后一层。',
    mainCopy:
      '系统最终当然会输出 generation prompt，但 prompt 在这里不是起点，而是结果。前面几层真正做的是：把语义方向转成可执行的 rug design language，再把这些判断压成适合模型理解的指令结构。这样生成出来的，不是“翻译后的句子”，而是一个经过设计判断整理的方向。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'rugLanguagePromptBridge',
      },
    ],
  },
  {
    pageTitle: 'Appendix D｜Slot-state 映射层',
    pageGoal: '把 bucket 到 slot-state 的作用链路讲清楚，但保持作品集附录的阅读感。',
    mainCopy:
      '这一页不试图把系统解释成一份规范文档。它只把最关键的一层展开：参考图如何先被解释成 semantic bucket，再继续压成可以进入生成系统的 slot-state，并最终影响方向生成与 refinement。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'appendixC',
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

function cardTitleStyle(): CSSProperties {
  return {
    color: '#f0e8d8',
    fontSize: 20,
    lineHeight: 1.3,
    marginBottom: 8,
  };
}

function smallBodyStyle(): CSSProperties {
  return {
    color: '#ab9a7d',
    fontSize: 16,
    lineHeight: 1.8,
  };
}

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return { ref, isVisible };
}

function revealStyle(isVisible: boolean, delay = 0): CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(18px)',
    filter: isVisible ? 'blur(0)' : 'blur(8px)',
    transition: `opacity 560ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 560ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 560ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };
}

function Reveal({
  children,
  delay = 0,
  className,
  style,
  disabled,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}) {
  const { ref, isVisible } = useRevealOnce<HTMLDivElement>();
  const visible = disabled ? true : isVisible;
  return (
    <div
      ref={ref}
      className={['narrative-reveal', visible ? 'is-visible' : '', className].filter(Boolean).join(' ')}
      style={{ ...style, ...revealStyle(visible, delay) }}
    >
      {children}
    </div>
  );
}

function AgentThinking({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="agentthinking narrative-card"
      style={{
        borderRadius: 14,
        border: '1px solid rgba(200,169,110,0.16)',
        background: 'linear-gradient(180deg, rgba(18,18,18,0.92), rgba(10,10,10,0.96))',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px 8px',
          borderBottom: '1px solid rgba(200,169,110,0.12)',
        }}
      >
        <span style={{ color: '#53d769', fontSize: 13, lineHeight: 1, fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace" }}>
          ◇
        </span>
        <span
          style={{
            color: '#53d769',
            fontSize: 14,
            lineHeight: 1.2,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
          }}
        >
          Agent
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.18)' }} />
      </div>
      <div
        style={{
          padding: '12px 14px 14px',
          color: '#b8b8b8',
          fontSize: 16,
          lineHeight: 1.7,
          fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
          display: 'grid',
          gap: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function IntroReveal({
  pageIndex,
  pageTitle,
  mainCopy,
  isMobile,
  disabled,
}: {
  pageIndex: number;
  pageTitle: string;
  mainCopy: string;
  isMobile?: boolean;
  disabled?: boolean;
}) {
  const { ref, isVisible } = useRevealOnce<HTMLDivElement>();
  const visible = disabled ? true : isVisible;

  return (
    <section
      ref={ref}
      style={{
        padding: isMobile ? '8px 4px 0' : '12px 8px 0',
        display: 'grid',
        gap: 16,
      }}
    >
      <div style={revealStyle(visible, 0)}>
        <div style={{ color: '#8e7f68', fontSize: 11, letterSpacing: '0.22em' }}>{`${String(pageIndex + 1).padStart(2, '0')} / ${pages.length}`}</div>
      </div>
      <div style={revealStyle(visible, 80)}>
        <div style={pageTitleStyle(isMobile)}>{pageTitle}</div>
      </div>
      <div style={revealStyle(visible, 150)}>
        <p style={{ ...paragraphStyle(), maxWidth: 860 }}>{mainCopy}</p>
      </div>
    </section>
  );
}

function renderContentBlock(block: ContentBlock, accentColor: string) {
  const blockPanel = panelStyle();

  switch (block.type) {
    case 'userQuotes':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gap: 12 }}>
            {block.items.map((item) => (
              <div key={item} className="narrative-card" style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,169,110,0.08)', color: '#f0e8d8', fontSize: 18, lineHeight: 1.7 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    case 'shortParagraphs':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gap: 10 }}>
            {block.items.map((item) => (
              <p key={item} style={paragraphStyle()}>{item}</p>
            ))}
          </div>
        </div>
      );
    case 'bulletCluster':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gap: 8 }}>
            {block.items.map((item) => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#d7cab5', fontSize: 15, lineHeight: 1.8 }}>
                <span style={{ color: accentColor }}>•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'comparisonCards':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {block.items.map((item) => (
              <div key={item.title} className="narrative-card" style={{ borderRadius: 14, padding: '16px 16px 14px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(200,169,110,0.08)' }}>
                <div style={cardTitleStyle()}>{item.title}</div>
                <div style={smallBodyStyle()}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'miniCaptions':
      return (
        <div style={{ ...blockPanel, padding: '16px 18px' }}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gap: 8 }}>
            {block.items.map((item) => (
              <div key={item} style={{ color: '#95856b', fontSize: 13, lineHeight: 1.7 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function mediaFrame(src: string, crop = 'center') {
  return {
    width: '100%',
    aspectRatio: '1.28 / 1',
    borderRadius: 16,
    backgroundImage: `linear-gradient(180deg, rgba(8,6,4,0.08), rgba(8,6,4,0.24)), url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: crop,
    border: '1px solid rgba(200,169,110,0.1)',
  } as CSSProperties;
}

function rugJudgmentDiagram(kind: 'abstract' | 'led' | 'surface' | 'refinable', accentColor: string) {
  const line = '1px solid rgba(200,169,110,0.16)';
  const labelStyle: CSSProperties = {
    color: '#9e8f76',
    fontSize: 11,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  };

  switch (kind) {
    case 'abstract':
      return (
        <div className="narrative-card" style={{ borderRadius: 14, border: line, padding: '14px 14px 12px', background: 'rgba(255,255,255,0.015)', display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <span style={labelStyle}>具象轮廓</span>
            <span style={{ color: accentColor, fontSize: 14 }}>→</span>
            <span style={labelStyle}>抽象单元 / 路径 / 格构</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div style={{ height: 54, borderRadius: 12, border: line, background: 'radial-gradient(circle at 30% 42%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 62% 60%, rgba(255,255,255,0.06), transparent 26%)' }} />
            <div style={{ height: 54, borderRadius: 12, border: line, background: 'linear-gradient(120deg, transparent 0 35%, rgba(255,255,255,0.06) 35% 39%, transparent 39% 100%), linear-gradient(150deg, transparent 0 55%, rgba(255,255,255,0.06) 55% 59%, transparent 59% 100%)' }} />
            <div style={{ height: 54, borderRadius: 12, border: line, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          </div>
        </div>
      );
    case 'led':
      return (
        <div className="narrative-card" style={{ borderRadius: 14, border: line, padding: '14px 14px 12px', background: 'rgba(255,255,255,0.015)', display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {[
              ['motif-led', '单一母题显影'],
              ['structure-led', '骨架与路径先成立'],
              ['density-led', '靠疏密与关系被读到'],
            ].map(([title, desc]) => (
              <div key={title} style={{ borderRadius: 12, border: line, padding: '10px 10px 12px', minHeight: 74 }}>
                <div style={labelStyle}>{title}</div>
                <div style={{ color: '#cdbfa8', fontSize: 13, lineHeight: 1.65, marginTop: 6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'surface':
      return (
        <div className="narrative-card" style={{ borderRadius: 14, border: line, padding: '14px 14px 12px', background: 'rgba(255,255,255,0.015)', display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 10 }}>
            <div style={{ borderRadius: 12, border: line, minHeight: 86, background: 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 70%)' }} />
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ borderRadius: 12, border: line, minHeight: 39 }} />
              <div style={{ borderRadius: 12, border: line, minHeight: 39, backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ borderRadius: 12, border: line, minHeight: 39, background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)' }} />
              <div style={{ borderRadius: 12, border: line, minHeight: 39 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, color: '#9e8f76', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span>边缘</span>
            <span>密度</span>
            <span>表面层次</span>
          </div>
        </div>
      );
    case 'refinable':
      return (
        <div className="narrative-card" style={{ borderRadius: 14, border: line, padding: '14px 14px 12px', background: 'rgba(255,255,255,0.015)', display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, alignItems: 'center' }}>
            {[
              ['初始方向', 'loose'],
              ['方向确认', 'stable'],
              ['refinement', 'refinable'],
            ].map(([title, state], index) => (
              <div key={title} style={{ position: 'relative' }}>
                <div style={{ borderRadius: 12, border: line, padding: '10px 10px 12px', minHeight: 72 }}>
                  <div style={labelStyle}>{title}</div>
                  <div style={{ color: '#cdbfa8', fontSize: 13, lineHeight: 1.65, marginTop: 6 }}>{state}</div>
                </div>
                {index < 2 ? <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', color: accentColor }}>→</div> : null}
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function renderVisualBlock(block: VisualBlock, accentColor: string, isMobile?: boolean) {
  const blockPanel = panelStyle();

  switch (block.type) {
    case 'heroImage':
      return (
        <div style={{ ...blockPanel, padding: 12 }}>
          <div className="narrative-media" style={{ ...mediaFrame(block.src, 'center'), aspectRatio: isMobile ? '1 / 1.1' : '1.45 / 1', minHeight: 320 }} />
          <div style={{ color: '#8f7d61', fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>{block.caption}</div>
        </div>
      );
    case 'workflowDiagram':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${block.nodes.length}, minmax(0, 1fr))`, gap: 10, alignItems: 'center' }}>
            {block.nodes.map((node, index) => (
              <div key={node} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="narrative-step" style={{ flex: 1, padding: '14px 12px', borderRadius: 14, border: '1px solid rgba(200,169,110,0.12)', background: 'rgba(255,255,255,0.02)', color: '#efe4d0', textAlign: 'center', lineHeight: 1.6, transitionDelay: `${index * 90}ms` }}>{node}</div>
                {!isMobile && index < block.nodes.length - 1 ? <div style={{ color: accentColor }}>→</div> : null}
              </div>
            ))}
          </div>
        </div>
      );
    case 'problemGrid':
      return (
        <div style={blockPanel}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            {block.items.map((item, index) => (
              <div key={item.title} className="narrative-card" style={{ borderRadius: 16, padding: 12, border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="narrative-media" style={mediaFrame(index % 2 === 0 ? fuliHeroImage : fuliSystemImage, item.crop ?? 'center')} />
                <div style={{ ...cardTitleStyle(), marginTop: 12 }}>{item.title}</div>
                <div style={smallBodyStyle()}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'rugJudgmentGrid':
      return (
        <div style={{ ...blockPanel, padding: isMobile ? '18px 16px 20px' : '24px 24px 26px' }}>
          <div style={{ display: 'grid', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 16, alignItems: 'stretch' }}>
              {block.items.map((item, index) => (
                <div key={item.title} className="narrative-card" style={{ borderRadius: 18, padding: '18px 18px 16px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.018)', display: 'grid', gap: 14, transitionDelay: `${index * 70}ms` }}>
                  <div style={{ color: '#f0e8d8', fontSize: isMobile ? 20 : 24, lineHeight: 1.28 }}>{item.title}</div>
                  <div style={smallBodyStyle()}>{item.body}</div>
                  {rugJudgmentDiagram(item.diagram, accentColor)}
                </div>
              ))}
            </div>
            <div style={{ ...smallBodyStyle(), maxWidth: 980, margin: '0 auto', paddingTop: 6 }}>
              {block.closing}
            </div>
          </div>
        </div>
      );
    case 'beforeAfter':
      return (
        <div
          style={{
            ...blockPanel,
            padding: isMobile ? '18px 16px 20px' : '26px 28px 30px',
            borderRadius: isMobile ? 28 : 34,
          }}
        >
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
            {[{ label: 'Before', items: block.before }, { label: 'After', items: block.after }].map((group) => (
              <div
                key={group.label}
                className="narrative-card"
                style={{ width: '100%', borderRadius: isMobile ? 24 : 28, padding: isMobile ? '18px 16px 20px' : '22px 24px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,169,110,0.12)' }}
              >
                <div style={{ color: accentColor, fontSize: isMobile ? 13 : 15, letterSpacing: isMobile ? '0.18em' : '0.22em', textTransform: 'uppercase', opacity: 0.92, marginBottom: isMobile ? 18 : 24 }}>{group.label}</div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : `repeat(${group.items.length}, minmax(0, 1fr))`,
                    gap: isMobile ? 12 : 18,
                    alignItems: 'center',
                  }}
                >
                  {group.items.map((item, index) => (
                    <div
                      key={item}
                      style={{
                        position: 'relative',
                        minWidth: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        paddingRight: !isMobile && index < group.items.length - 1 ? 28 : 0,
                      }}
                    >
                      <div
                        className="narrative-step"
                        style={{
                          width: '100%',
                          minHeight: isMobile ? 82 : 108,
                          borderRadius: isMobile ? 24 : 28,
                          padding: isMobile ? '18px 16px' : '20px 18px',
                          border: '1px solid rgba(200,169,110,0.16)',
                          background: 'rgba(255,255,255,0.02)',
                          boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.04), 0 0 24px rgba(200,169,110,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#efe4d0',
                          transitionDelay: `${index * 90}ms`,
                          overflow: 'hidden',
                          fontSize: isMobile ? 18 : 20,
                          lineHeight: 1.45,
                          textAlign: 'center',
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {item}
                      </div>
                      {!isMobile && index < group.items.length - 1 ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            width: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: accentColor,
                            opacity: 0.9,
                            fontSize: 22,
                            lineHeight: 1,
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                          }}
                        >
                          →
                        </div>
                      ) : null}
                      {isMobile && index < group.items.length - 1 ? (
                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            bottom: -11,
                            color: accentColor,
                            opacity: 0.9,
                            fontSize: 18,
                            lineHeight: 1,
                            transform: 'translateX(-50%)',
                            pointerEvents: 'none',
                          }}
                        >
                          ↓
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'pipeline':
      return (
        <div style={blockPanel}>
          <div style={{ display: 'grid', gap: 10 }}>
            {block.stages.map((stage, index) => (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ minWidth: 34, color: accentColor, fontSize: 12 }}>{String(index + 1).padStart(2, '0')}</div>
                <div className="narrative-step" style={{ flex: 1, borderRadius: 14, padding: '14px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,169,110,0.1)', color: '#f0e8d8', transitionDelay: `${index * 100}ms` }}>{stage}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'case05FirstRound': {
      const directionCards = [
        {
          title: 'Warm Cluster Drift',
          body: '更偏聚簇的组织方式，把鱼与荷的意向压进较温和的团簇节奏里。',
          src: lotusWarmClusterDrift,
          highlight: false,
        },
        {
          title: 'Vertical Organic Lattice',
          body: '更强调纵向路径和有机骨架，主体由结构节奏而不是题材描画来成立。',
          src: lotusVerticalOrganicLattice,
          highlight: true,
        },
        {
          title: 'Leaf-and-Current Field',
          body: '更偏场域与流动，鱼与荷退到背景，留下更连续的叶片与水流关系。',
          src: lotusLeafAndCurrentField,
          highlight: false,
        },
      ];

      return (
        <div style={{ ...blockPanel, padding: isMobile ? '18px 16px 20px' : '22px 22px 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 12,
              alignItems: 'start',
            }}
          >
            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)', minHeight: isMobile ? undefined : 420 }}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.88 }}>第一轮的意义</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>第一轮在做什么</div>
              <div style={{ borderRadius: 14, border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.015)', padding: '14px 14px 12px', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: accentColor, fontSize: 13, marginBottom: 8 }}>
                  <span>题材</span>
                  <span>→</span>
                  <span>结构</span>
                  <span>→</span>
                  <span>可比较方向</span>
                </div>
                <div style={{ color: '#98886f', fontSize: 16, lineHeight: 1.7 }}>从“鱼与荷是什么”过渡到“主体如何成立”。</div>
              </div>
              <div style={smallBodyStyle()}>
                第一轮的任务不是直接命中最终结果，而是把同一个主题展开成几个真正可比较的方向。到这一步，系统开始帮助用户看见方向空间：哪些版本更依赖题材，哪些更依赖结构，哪些更适合作为后续 refinement 的起点。
              </div>
            </div>

            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.88 }}>用户输入</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 10 }}>Case05｜Fish and Lotus</div>
              <div
                className="narrative-card"
                style={{
                  borderRadius: 16,
                  border: '1px solid rgba(200,169,110,0.1)',
                  background: 'linear-gradient(180deg, rgba(18,14,12,0.82), rgba(10,8,6,0.92))',
                  padding: isMobile ? '12px 12px 14px' : '14px 14px 16px',
                  marginBottom: 12,
                }}
              >
                <div style={{ display: 'grid', gap: 10 }}>
                  <div className="narrative-card" style={{ borderRadius: 12, border: '1px solid rgba(200,169,110,0.08)', padding: '10px 10px 12px', background: 'rgba(255,255,255,0.015)' }}>
                    <div style={{ color: '#f0e8d8', fontSize: 16, lineHeight: 1.4, marginBottom: 4 }}>用户输入</div>
                    <div style={{ color: '#efe4d0', fontSize: 20, lineHeight: 1.3, marginBottom: 6 }}>鱼与荷</div>
                    <div style={{ color: '#c6b79e', fontSize: 16, lineHeight: 1.7 }}>
                      “我想保留鱼和荷的意向，但不要太像传统花鸟图。整体更适合地毯，能有一点流动感和结构感。”
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, boxShadow: `0 0 0 3px ${accentColor}18` }} />
                  </div>

                  <div className="narrative-card" style={{ borderRadius: 12, border: '1px solid rgba(200,169,110,0.08)', padding: '10px 10px 12px', background: 'rgba(255,255,255,0.015)' }}>
                    <div style={{ color: '#f0e8d8', fontSize: 16, lineHeight: 1.4, marginBottom: 6 }}>语义解释</div>
                    <div style={{ marginBottom: 8 }}>
                      <AgentThinking>
                        <div>识别到这是一个需要发散思维的任务，调用诠释联想能力。</div>
                      </AgentThinking>
                    </div>
                    <div style={{ color: '#c6b79e', fontSize: 16, lineHeight: 1.7, marginBottom: 8 }}>
                      系统把它们理解成一组可以被重新组织的母体关系：鱼的流动、荷叶的展开、两者之间的疏密和方向，才是更适合进入地毯语言的部分。
                    </div>
                    <div style={{ color: '#d9ccb6', fontSize: 16, lineHeight: 1.75 }}>
                      <div>保留“鱼与荷”的来源关系</div>
                      <div>• 降低叙事性</div>
                      <div>• 提高图案组织感</div>
                      <div>• 让流动关系比物体轮廓更重要</div>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <AgentThinking>
                        <div>风格匹配：判断这个输入更适合走哪种“主体成立方式”。</div>
                      </AgentThinking>
                    </div>
                    <div style={{ marginTop: 8, color: '#c6b79e', fontSize: 16, lineHeight: 1.7 }}>
                      在这个 case 里，系统没有把它理解成传统花鸟 motif，而是更偏向路径化植物单元、流动节奏和有机组织关系。
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, boxShadow: `0 0 0 3px ${accentColor}18` }} />
                  </div>

                  <AgentThinking>
                    <div style={{ color: '#53d769', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Agent Bucket Mapping</div>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {[
                        ['Primary Bucket', 'leaf-chain unit grammar', '荷叶可以被压成重复单元或路径化单元，适合从植物来源转向图案组织。'],
                        ['Secondary Bucket', 'density-gradient textile field', '鱼与水流关系可以被转译成疏密变化和织场节奏，而不是直画鱼身。'],
                        ['Supporting Bucket', 'soft-node network', '如果保留一点有机连接感，荷叶 / 水波 / 鱼群关系可以通过更柔和的节点式组织出现。'],
                      ].map(([label, title, body], index) => (
                        <div key={label} style={{ paddingTop: index === 0 ? 0 : 10, borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ color: '#f0e8d8', fontSize: 16, lineHeight: 1.4 }}>{label}</div>
                          <div style={{ color: '#efe4d0', fontSize: 20, lineHeight: 1.45, marginTop: 2 }}>{title}</div>
                          <div style={{ color: '#c6b79e', fontSize: 16, lineHeight: 1.7, marginTop: 4 }}>{body}</div>
                        </div>
                      ))}
                    </div>
                  </AgentThinking>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {['Reference image', 'Theme cue', 'Initial intent'].map((tag) => (
                  <span key={tag} style={{ padding: '5px 9px', borderRadius: 999, border: '1px solid rgba(200,169,110,0.1)', color: '#a9987f', fontSize: 11, letterSpacing: '0.04em' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={smallBodyStyle()}>
                用户带来的起点并不是一份清晰的 brief，而是一张参考图和一个模糊但真实的期待：保留鱼与荷的意向，同时把画面从“题材”转成更适合地毯的组织方式。
              </div>
            </div>

            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.88 }}>语义解释</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>系统如何理解这个输入</div>
              <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                {[
                  ['母体来源', '鱼 + 荷'],
                  ['转化重点', '从题材走向结构'],
                  ['设计目标', '找到更适合 rug 的主体成立方式'],
                ].map(([label, value]) => (
                  <div key={label} className="narrative-card" style={{ borderRadius: 14, padding: '10px 12px', border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)' }}>
                    <div style={{ color: '#9b8a72', fontSize: 12, letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                    <div style={{ color: '#efe4d0', fontSize: 16, lineHeight: 1.5 }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={smallBodyStyle()}>
                系统没有直接把“鱼和荷”当成要描绘的对象，而是先把它们理解成一个母体来源：一部分来自鱼与水流的动势，一部分来自荷叶和植物单元的结构感。接下来的关键，不是“画得像不像”，而是决定这个主题是通过聚散、路径、网络，还是更清晰的垂直结构来成立。
              </div>
            </div>

            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ color: '#53d769', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.92, fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace" }}>Agent 第一轮成果交付</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>第一轮方向展开</div>
              <div style={{ ...smallBodyStyle(), marginBottom: 14 }}>
                从同样的输入出发，系统没有生成三张轻微不同的图，而是明确展开了三种不同的组织方法：更聚簇的、更加结构化的、以及更偏场域与流动的。这样，用户面对的就不再是“选哪张更好看”，而是“我更认同哪一种主体成立方式”。
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
                {directionCards.map((card, index) => (
                  <div
                    key={card.title}
                    className="narrative-card"
                    style={{
                      borderRadius: 16,
                      padding: '8px 8px 12px',
                      border: card.highlight ? '1px solid rgba(200,169,110,0.2)' : '1px solid rgba(200,169,110,0.08)',
                      background: card.highlight ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.016)',
                      boxShadow: card.highlight ? '0 0 0 1px rgba(200,169,110,0.08), 0 10px 28px rgba(0,0,0,0.16)' : undefined,
                      transform: !isMobile && card.highlight ? 'translateY(-4px)' : undefined,
                      transitionDelay: `${120 + index * 70}ms`,
                    }}
                  >
                    <div className="narrative-media" style={{ ...mediaFrame(card.src, 'center'), aspectRatio: '0.9 / 1', marginBottom: 10 }} />
                    <div style={{ color: '#f0e8d8', fontSize: 20, lineHeight: 1.45, marginBottom: 6 }}>{card.title}</div>
                    <div style={{ color: '#ac9c83', fontSize: 16, lineHeight: 1.65 }}>{card.body}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      );
    }
    case 'case05SelectionConvergence':
      return (
        <div style={{ ...blockPanel, padding: isMobile ? '18px 16px 20px' : '22px 22px 24px', display: 'grid', gap: 12 }}>
          <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.14)', background: 'rgba(255,255,255,0.022)' }}>
            <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.88 }}>用户选择后的主线确认</div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr', gap: 14, alignItems: 'center' }}>
              <div className="narrative-media" style={{ ...mediaFrame(lotusVerticalOrganicLattice, 'center'), aspectRatio: isMobile ? '1.15 / 1' : '1.35 / 1', border: '1px solid rgba(200,169,110,0.18)', boxShadow: '0 0 0 1px rgba(200,169,110,0.08), 0 18px 40px rgba(0,0,0,0.18)' }} />
              <div style={{ color: '#efe4d0', fontSize: isMobile ? 20 : 24, lineHeight: 1.55 }}>
                在这个案例里，用户选中的并不只是“第二张图更好看”，而是一种更适合继续推进的成立方式。
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.88 }}>选择如何改变系统理解</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>这次选择让系统确认了什么</div>
              <div style={{ marginBottom: 12 }}>
                <AgentThinking>
                  <div>接收用户选择信号，开始把候选方向从“并列比较”切换成“主线确认”。</div>
                  <div>当前任务：识别这次选择到底认可了题材、结构，还是某种更稳定的主体成立方式。</div>
                </AgentThinking>
              </div>
              <div style={{ borderRadius: 14, border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)', padding: '12px 12px 10px', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: accentColor, fontSize: 13 }}>
                  <span>题材意向</span>
                  <span>→</span>
                  <span>纵向结构</span>
                </div>
              </div>
              <div style={smallBodyStyle()}>
                相比另外两个方向，这一版没有把鱼与荷停留在可辨认的题材意向上，而是进一步转成了更明确的纵向结构和有机骨架。用户真正认可的，不是一张更顺眼的图，而是一个通过结构节奏建立主体的方向。
              </div>
              <div style={{ ...smallBodyStyle(), marginTop: 10 }}>
                到这一步，鱼与荷依然存在，但它们更多作为结构来源，而不是直接被描绘的对象。系统因此可以把“用户喜欢第二张图”重新理解成“用户认可这条结构主线值得继续长下去”。
              </div>
            </div>

            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.88 }}>收束后的核心判断</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>系统开始收束下来的判断</div>
              <div style={{ marginBottom: 12 }}>
                <AgentThinking>
                  <div>收束任务启动：冻结已被用户确认的 DNA，缩小下一轮需要重新探索的范围。</div>
                  <div>当前重点：把“为什么选中它”压成几条可继续作用于 refinement 的判断，而不是只保留一个结果编号。</div>
                </AgentThinking>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
                {[
                  ['主体如何成立', '通过结构节奏来建立主体，而不是通过具体形象来建立主体。'],
                  ['图案如何组织', '纵向路径和有机骨架开始成为更稳定的组织主线。'],
                  ['为什么适合继续做', '这一方向更容易继续 refinement，因为接下来可以调整的是密度、开合、重心和表面节奏，而不必重新定义主题。'],
                ].map(([title, body], index) => (
                  <div key={title} className="narrative-card" style={{ borderRadius: 16, padding: '14px 14px 12px', border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)', transitionDelay: `${100 + index * 60}ms` }}>
                    <div style={{ color: '#f0e8d8', fontSize: 20, lineHeight: 1.35, marginBottom: 8 }}>{title}</div>
                    <div style={{ color: '#ac9c83', fontSize: 16, lineHeight: 1.75 }}>{body}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...smallBodyStyle(), marginTop: 12 }}>
                这些判断合在一起，意味着第二轮不需要再回头争论“主题到底是什么”，而可以把精力放在怎样沿着这条已经成立的结构语言继续 refinement。
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.88 }}>这次选择如何影响下一轮</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>下一轮会如何受到这次选择的影响</div>
              <div style={smallBodyStyle()}>
                到这里，下一轮变化的重点就不再是“鱼和荷要不要继续出现”，而是围绕已经确认的结构语言，继续调整密度、开合、重心和表面节奏。系统会保留这条纵向有机骨架的主线，再沿着更清楚、更柔和或更开阔的方向继续 refinement。
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, color: accentColor, fontSize: 13 }}>
                <span>selected direction</span>
                <span>→</span>
                <span>refinement variables</span>
              </div>
            </div>

            <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 18px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ color: '#53d769', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.92, fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace" }}>Agent 第n轮成果交付</div>
              <div style={{ color: '#f0e8d8', fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>沿同一条主线继续 refinement</div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
                {[
                  ['Direction A｜纵向结构显影', '让骨架更清楚，主体更多通过结构节奏成立。', lotusVerticalOrganicLattice2],
                  ['Direction B｜柔化的格构生长', '保留骨架关系，让组织更柔和、更像自然生长。', lotusVerticalOrganicLattice3],
                  ['Direction C｜打开的罩顶格场', '打开局部单元关系，让留白和呼吸感更明显。', lotusVerticalOrganicLattice4],
                ].map(([title, body, src], index) => (
                  <div key={title} className="narrative-card" style={{ borderRadius: 16, padding: '14px 14px 12px', border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)', transitionDelay: `${140 + index * 60}ms` }}>
                    <div className="narrative-media" style={{ ...mediaFrame(src as string, 'center'), aspectRatio: '1 / 0.82', marginBottom: 12 }} />
                    <div style={{ color: '#f0e8d8', fontSize: 20, lineHeight: 1.45, marginBottom: 8 }}>{title}</div>
                    <div style={{ color: '#ac9c83', fontSize: 16, lineHeight: 1.75 }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case 'referenceImageGrid':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            {block.items.map((item) => (
              <div key={item.label} className="narrative-card" style={{ display: 'grid', gap: 10 }}>
                <div className="narrative-media" style={mediaFrame(fuliHeroImage, item.crop)} />
                <div>
                  <div style={{ color: '#f0e8d8', fontSize: 16, marginBottom: 4 }}>{item.label}</div>
                  <div style={smallBodyStyle()}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'semanticBuckets':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gap: 12 }}>
            {block.items.map((item) => (
              <div key={item.title} className="narrative-card" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px minmax(0, 1fr)', gap: 12, alignItems: 'start', padding: '14px 0', borderTop: '1px solid rgba(200,169,110,0.08)' }}>
                <div style={{ color: '#f0e8d8', fontSize: 20, lineHeight: 1.3 }}>{item.title}</div>
                <div style={smallBodyStyle()}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'roleCompare':
      return (
        <div style={blockPanel}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            {[block.left, block.right].map((item) => (
              <div key={item.title} className="narrative-card" style={{ borderRadius: 16, padding: '18px 16px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={cardTitleStyle()}>{item.title}</div>
                <div style={smallBodyStyle()}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'caseImageStrip':
      return (
        <div style={blockPanel}>
          {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${block.items.length}, minmax(0, 1fr))`, gap: 12 }}>
            {block.items.map((item, index) => (
              <div key={item.title} className="narrative-card" style={{ display: 'grid', gap: 10 }}>
                <div className="narrative-media" style={mediaFrame(item.src, index === 1 ? 'center' : '50% 40%')} />
                <div style={{ color: '#f0e8d8', fontSize: 16 }}>{item.title}</div>
                <div style={smallBodyStyle()}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'closingPoints':
      return (
        <div style={{ ...blockPanel, padding: '28px 26px' }}>
          <div style={{ display: 'grid', gap: 14 }}>
            {block.items.map((item, index) => (
              <div key={item} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '44px minmax(0, 1fr)', gap: 12, alignItems: 'start' }}>
                <div style={{ color: accentColor, fontSize: 13, letterSpacing: '0.18em' }}>{String(index + 1).padStart(2, '0')}</div>
                <div style={{ color: '#f0e8d8', fontSize: isMobile ? 20 : 24, lineHeight: 1.35 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'appendixDiagram':
      return (
        <div style={blockPanel}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            {block.groups.map((group) => (
              <div key={group.title} className="narrative-card" style={{ borderRadius: 16, padding: '16px 16px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,169,110,0.1)' }}>
                <div style={cardTitleStyle()}>{group.title}</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {group.items.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 8, color: '#b7a68a', fontSize: 14, lineHeight: 1.7 }}>
                      <span style={{ color: accentColor }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'assetMap':
      return (
        <div style={blockPanel}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            {block.columns.map((column) => (
              <div key={column.title} style={{ display: 'grid', gap: 10 }}>
                <div style={{ color: '#f0e8d8', fontSize: 18 }}>{column.title}</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {column.items.map((item) => (
                    <div key={item} className="narrative-card" style={{ padding: '12px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,169,110,0.08)', color: '#b7a68a' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'semanticCompilationChain': {
      const chainCards = [
        {
          title: 'semantic intake',
          body: '先把用户输入里的信息拆开：哪些是情绪和 impression，哪些是在暗示 arrangement、motif、color warmth、material feel 或场景约束。',
        },
        {
          title: 'certainty vs ambiguity',
          body: '系统不会假装所有词都同样明确，而是先区分哪些维度已经相对清楚，哪些仍然模糊、冲突或需要继续 probing。',
        },
        {
          title: 'three direction hypotheses',
          body: '第一轮不是三张随机图，而是三条围绕同一语义起点展开的方向假设：共享核心 DNA，但在重点维度上故意拉开。',
        },
        {
          title: 'per-direction state weighting',
          body: '每条方向都会获得不同的 slot emphasis，因此分化来自设计判断，而不是一句 prompt 的修辞变化。',
        },
        {
          title: 'rug-language translation',
          body: '方向不会直接落成普通图像风格词，而会先转成地毯能承载的 composition、motif behavior、density、surface 与 material cues。',
        },
        {
          title: 'generation prompt assembly',
          body: 'prompt 只负责把已经确定的方向组织成模型可执行的外部表达。真正的方法，发生在 prompt 之前。',
        },
      ];

      return (
        <div style={{ ...blockPanel, padding: isMobile ? '18px 16px 22px' : '24px 24px 28px', display: 'grid', gap: 18 }}>
          <div className="narrative-card" style={{ borderRadius: 18, padding: isMobile ? '18px 16px' : '20px 20px 22px', border: '1px solid rgba(200,169,110,0.12)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.9 }}>semantic-to-rug compilation chain</div>
            <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 28, lineHeight: 1.24, marginBottom: 12 }}>第一轮的 3 个方向，其实是 3 条被编译出来的设计假设</div>
            <div style={smallBodyStyle()}>
              同一句“温暖一点、自然一点、不要太甜”的输入里，系统看到的不是一条完整 specification，而是一组仍在形成中的偏好信号。第一轮的任务，就是把这些信号整理成几条真正可比较的方向，而不是草率地给出一个答案。
            </div>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {chainCards.map((card, index) => (
              <div key={card.title} style={{ position: 'relative', minWidth: 0, paddingBottom: index < chainCards.length - 1 ? 18 : 0 }}>
                <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 15px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ color: '#8e7f68', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>{String(index + 1).padStart(2, '0')}</div>
                  <div style={{ color: '#f0e8d8', fontSize: 20, lineHeight: 1.35, marginBottom: 8 }}>{card.title}</div>
                  <div style={smallBodyStyle()}>{card.body}</div>
                </div>
                {index < chainCards.length - 1 ? (
                  <div style={{ position: 'absolute', left: 18, bottom: -2, color: accentColor, fontSize: 18, lineHeight: 1 }}>↓</div>
                ) : null}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            {[
              ['Direction A', '保留 warm / natural 的总体气质，但把重点放在 organic flow 和更明显的 movement path 上。'],
              ['Direction B', '保留同样的情绪起点，但压到更 calm、more architectural 的结构秩序里。'],
              ['Direction C', '保留自然感来源，但把重点转到 tactile richness、surface relief 与材料表现上。'],
            ].map(([title, body]) => (
              <div key={title} className="narrative-card" style={{ borderRadius: 16, padding: '16px 16px 14px', border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)' }}>
                <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.35, marginBottom: 8 }}>{title}</div>
                <div style={smallBodyStyle()}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case 'directionWeightMatrix': {
      const columns = ['Direction A｜Organic Flow', 'Direction B｜Calm Structure', 'Direction C｜Tactile Richness'];
      const rows = [
        ['arrangement / movement path', 'High', 'High', 'Medium'],
        ['motif abstraction', 'Medium', 'Low–Medium', 'Medium–High'],
        ['color restraint', 'Medium', 'High', 'Medium'],
        ['surface / relief', 'Medium', 'Medium', 'High'],
        ['pile / material cue', 'Medium', 'Medium', 'High'],
      ];
      const featureGroups = [
        {
          title: 'Direction A｜强调 flow',
          items: ['更明显的 band / path 走向', '更大的开合节奏与 breathing pockets', '更柔和的 contour transition'],
        },
        {
          title: 'Direction B｜强调 structure',
          items: ['更稳定的组织骨架', '更克制的 motif density', '更安静的色彩角色分工'],
        },
        {
          title: 'Direction C｜强调 tactile richness',
          items: ['更强的 pile height contrast', '更明显的 carved relief / mixed-pile cues', '更细的 tuft density rhythm'],
        },
      ];

      return (
        <div style={{ ...blockPanel, padding: isMobile ? '18px 16px 22px' : '24px 24px 28px', display: 'grid', gap: 18 }}>
          <div className="narrative-card" style={{ borderRadius: 18, padding: isMobile ? '18px 16px' : '20px 20px 22px', border: '1px solid rgba(200,169,110,0.12)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.9 }}>direction differentiation</div>
            <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 28, lineHeight: 1.24, marginBottom: 12 }}>三个方向的差异，不在修辞上，而在主导权重上</div>
            <div style={smallBodyStyle()}>
              同样一个语义起点，系统不会平均改所有槽位。真正起作用的是：每条方向优先推动哪个维度，哪些维度保持支持层，哪些维度暂时被压低。这样出来的 3 个方向才会既相关，又足够有区分度。
            </div>
          </div>

          <div className="narrative-card" style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.018)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1.1fr repeat(3, minmax(90px, 1fr))' : '1.25fr repeat(3, minmax(0, 1fr))' }}>
              <div style={{ padding: '14px 12px', color: '#8e7f68', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>slot / emphasis</div>
              {columns.map((column) => (
                <div key={column} style={{ padding: '14px 12px', color: '#f0e8d8', fontSize: 14, lineHeight: 1.5, borderBottom: '1px solid rgba(200,169,110,0.1)', borderLeft: '1px solid rgba(200,169,110,0.08)' }}>{column}</div>
              ))}
              {rows.map((row) => (
                <>
                  <div key={`${row[0]}-label`} style={{ padding: '14px 12px', color: '#d8ccb7', fontSize: 14, lineHeight: 1.6, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>{row[0]}</div>
                  {row.slice(1).map((value, idx) => (
                    <div key={`${row[0]}-${idx}`} style={{ padding: '14px 12px', color: value === 'High' ? '#f0e8d8' : '#b8a78e', fontSize: 14, lineHeight: 1.6, borderBottom: '1px solid rgba(200,169,110,0.08)', borderLeft: '1px solid rgba(200,169,110,0.08)' }}>{value}</div>
                  ))}
                </>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            {featureGroups.map((group) => (
              <div key={group.title} className="narrative-card" style={{ borderRadius: 16, padding: '16px 16px 14px', border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)' }}>
                <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.35, marginBottom: 10 }}>{group.title}</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {group.items.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 8, color: '#b7a68a', fontSize: 14, lineHeight: 1.7 }}>
                      <span style={{ color: accentColor }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case 'rugLanguagePromptBridge': {
      const bridgeColumns = [
        {
          title: 'Layer 1｜semantic hypothesis',
          items: ['warm but not sweet', 'natural but not illustrative', '适合大面积空间落地', '更像一种成立方式，而不是一张图的风格'],
        },
        {
          title: 'Layer 2｜rug design language',
          items: ['restrained warm-earth palette', 'branching organic flow with open breathing areas', 'mixed-pile relief and hand-tufted softness', 'less figurative motif, more surface rhythm'],
        },
        {
          title: 'Layer 3｜generation instruction',
          items: ['composition logic', 'motif behavior + density rule', 'material / pile / relief cues', 'negative constraints and exclusions'],
        },
      ];

      return (
        <div style={{ ...blockPanel, padding: isMobile ? '18px 16px 22px' : '24px 24px 28px', display: 'grid', gap: 18 }}>
          <div className="narrative-card" style={{ borderRadius: 18, padding: isMobile ? '18px 16px' : '20px 20px 22px', border: '1px solid rgba(200,169,110,0.12)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.9 }}>prompt is the last layer</div>
            <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 28, lineHeight: 1.24, marginBottom: 12 }}>Prompt 在这个系统里，不是创意来源，而是 design state 的外部序列化</div>
            <div style={smallBodyStyle()}>
              系统最终确实会交付 prompt，但它不是把中文直接翻译成英文那么简单。前面的工作已经把方向假设、槽位权重、材质工艺特征和负向约束整理好了；prompt 只是把这些判断压成模型能执行的结构化指令。
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            {bridgeColumns.map((column, index) => (
              <div key={column.title} style={{ position: 'relative', minWidth: 0, paddingRight: !isMobile && index < bridgeColumns.length - 1 ? 24 : 0 }}>
                <div className="narrative-card" style={{ borderRadius: 18, padding: '16px 16px 15px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.02)', height: '100%' }}>
                  <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.35, marginBottom: 10 }}>{column.title}</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {column.items.map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 8, color: '#b7a68a', fontSize: 14, lineHeight: 1.7 }}>
                        <span style={{ color: accentColor }}>•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {!isMobile && index < bridgeColumns.length - 1 ? (
                  <div style={{ position: 'absolute', right: 0, top: '50%', width: 24, color: accentColor, textAlign: 'center', transform: 'translateY(-50%)', opacity: 0.85 }}>→</div>
                ) : null}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            <div className="narrative-card" style={{ borderRadius: 16, padding: '16px 16px 14px', border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)' }}>
              <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.35, marginBottom: 8 }}>系统真正保留下来的是什么</div>
              <div style={smallBodyStyle()}>
                真正可复用的资产不是一句 prompt，而是一组 design state：哪些维度已经被确认，哪些材质关系必须保留，哪些变量下一轮仍然开放。prompt 只是这些状态面向模型的一种外部表达。
              </div>
            </div>
            <div className="narrative-card" style={{ borderRadius: 16, padding: '16px 16px 14px', border: '1px solid rgba(200,169,110,0.08)', background: 'rgba(255,255,255,0.016)' }}>
              <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.35, marginBottom: 8 }}>为什么这比直接写 prompt 更重要</div>
              <div style={smallBodyStyle()}>
                因为直接写 prompt 很容易把模糊语义误压成普通风格词；而先经过 semantic hypothesis 和 rug language translation，系统才能保证模型接收到的是一个更接近地毯设计判断的方向，而不是表层修辞。
              </div>
            </div>
          </div>
        </div>
      );
    }
    case 'appendixC': {
      const schemaCards = [
        { zh: '主体形成方式', en: 'subjectFormationMode', body: '它描述主体不是“像什么”，而是靠什么关系被看见。', values: ['显影成立', '局部聚拢', '边界浮现'] },
        { zh: '母题抽象方式', en: 'motifAbstractionMode', body: '它控制图形离具象有多远，保留的是轮廓、节奏还是痕迹。', values: ['轮廓抽离', '片段化', '纹理化转写'] },
        { zh: '编排逻辑', en: 'arrangementLogic', body: '它决定元素如何铺开，是稳定组织，还是被局部打断。', values: ['格网展开', '中心聚焦', '带状漂移'] },
        { zh: '密度逻辑', en: 'densityLogic', body: '它控制疏密变化如何建立节奏，而不是让画面平均铺满。', values: ['中心密外围松', '渐变疏散', '团簇式聚落'] },
        { zh: '色彩角色包', en: 'colorRolePackage', body: '它不是色卡列表，而是各类颜色在画面里的职责分工。', values: ['底色场 / 主体色 / 提示色', '低对比同温层', '局部跳色'] },
        { zh: '边缘行为', en: 'edgeBehavior', body: '它说明边界是清晰切开、被擦蚀，还是慢慢消隐。', values: ['柔边渗开', '侵蚀边', '清晰截断'] },
        { zh: '表面深度模式', en: 'surfaceDepthMode', body: '它决定表面关系如何被读到，是平面层次，还是有浅深起伏。', values: ['雾化层叠', '浅浮雕感', '压平处理'] },
        { zh: '绒高层级', en: 'pileHierarchy', body: '它把视觉层次转成材料层次，让 rug 的表面更有可实现性。', values: ['双层绒高', '主体高 / 背景低', '局部强调堆高'] },
      ];

      const bucketCards = [
        {
          title: 'botanical apparition field',
          body: '主体不是被硬轮廓圈出，而是在层叠与显影中慢慢浮现出来。',
          slots: ['subjectFormationMode：显影成立', 'edgeBehavior：柔边渗开', 'surfaceDepthMode：雾化层叠'],
          value: '它适合把植物感压进 rug 语言里，而不是直接生成一幅植物插画。',
        },
        {
          title: 'eroded lattice',
          body: '稳定网格仍然存在，但被局部侵蚀和扰动，因此秩序不会显得太硬。',
          slots: ['arrangementLogic：格网展开', 'edgeBehavior：侵蚀边', 'densityLogic：局部破口'],
          value: '它让图案保持结构感，同时留下足够的呼吸和手感，适合做可讨论的版面起点。',
        },
        {
          title: 'tonal texture field',
          body: '主体靠色阶、表面颗粒和轻微层差成立，而不是靠明确轮廓。',
          slots: ['colorRolePackage：低对比同温层', 'surfaceDepthMode：压平处理', 'pileHierarchy：微层差'],
          value: '它能把图像里的气氛保留下来，又不至于脱离 rug 更擅长处理的表面关系。',
        },
        {
          title: 'density-gradient textile field',
          body: '画面的节奏来自疏密变化，主体像被织出来，而不是被贴上去。',
          slots: ['densityLogic：渐变疏散', 'arrangementLogic：带状漂移', 'pileHierarchy：主体高 / 背景低'],
          value: '这类映射很适合导向更有织物感的方向，而不是泛化成普通平面图案。',
        },
        {
          title: 'figure-fragment grammar',
          body: '主体以片段和残片的关系被读到，完整形象被故意拆开，只留下可继续组织的语法。',
          slots: ['motifAbstractionMode：片段化', 'subjectFormationMode：局部聚拢', 'arrangementLogic：中心聚焦'],
          value: '它给系统留下足够大的二次生成空间，便于第一轮找方向，第二轮再控制收敛。',
        },
      ];

      const sectionPanelStyle = (index: number): CSSProperties => ({
        borderTop: index === 0 ? 'none' : '1px solid rgba(200,169,110,0.12)',
        paddingTop: index === 0 ? 0 : isMobile ? 24 : 30,
        display: 'grid',
        gap: isMobile ? 14 : 18,
      });

      const appendixSectionCard = (delay: number): CSSProperties => ({
        borderRadius: 18,
        border: '1px solid rgba(200,169,110,0.1)',
        background: 'rgba(255,255,255,0.02)',
        transitionDelay: `${delay}ms`,
      });

      return (
        <div style={{ ...blockPanel, padding: isMobile ? '18px 16px 22px' : '24px 24px 28px', display: 'grid', gap: isMobile ? 24 : 28 }}>
          <section className="narrative-card" style={{ ...appendixSectionCard(40), padding: isMobile ? '18px 16px' : '22px 22px 24px' }}>
            <div style={sectionPanelStyle(0)}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>Section 1｜Why this layer exists</div>
              <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 26, lineHeight: 1.24 }}>为什么这一层必须存在</div>
              <p style={{ ...paragraphStyle(), margin: 0 }}>
                如果 semantic bucket 只停在“这张图像像什么、气质接近什么”的命名层，它仍然很难真正进入生成系统。系统需要的不是一个好听的标签，而是一组能继续作用于结构、密度、边缘和表面关系的状态。slot-state 的位置，正是在解释与生成之间，把图像证据压成可工作的中间层。
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))', gap: isMobile ? 10 : 12 }}>
                {['图像证据', 'semantic bucket', 'slot-state', 'compiler behavior'].map((item, index) => (
                  <div key={item} style={{ position: 'relative', minWidth: 0, paddingRight: !isMobile && index < 3 ? 22 : 0 }}>
                    <div className="narrative-step" style={{ minHeight: 72, borderRadius: 16, padding: '16px 14px', border: '1px solid rgba(200,169,110,0.12)', background: 'rgba(255,255,255,0.018)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#f0e8d8', lineHeight: 1.5, transitionDelay: `${70 + index * 70}ms` }}>
                      {item}
                    </div>
                    {!isMobile && index < 3 ? (
                      <div style={{ position: 'absolute', right: 0, top: '50%', width: 22, color: accentColor, textAlign: 'center', transform: 'translateY(-50%)', opacity: 0.85 }}>
                        →
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div style={{ color: '#e6dcc9', fontSize: isMobile ? 16 : 17, lineHeight: 1.8, padding: isMobile ? '2px 0 0' : '4px 0 0' }}>
                slot-state 让参考图的解释结果真正进入生成系统，而不是停留在命名层。
              </div>
            </div>
          </section>

          <section className="narrative-card" style={{ ...appendixSectionCard(90), padding: isMobile ? '18px 16px' : '22px 22px 24px' }}>
            <div style={sectionPanelStyle(1)}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>Section 2｜Slot-state schema</div>
              <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 26, lineHeight: 1.24 }}>Slot-state schema</div>
              <p style={{ ...paragraphStyle(), margin: 0 }}>
                这里保留的不是一套越多越好的字段表，而是最能决定 rug 方向是否成立的核心状态。它们共同回答的，是主体怎样被组织、表面怎样被看见、以及这些判断如何被继续转成生成行为。
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                {schemaCards.map((card, index) => (
                  <div key={card.en} className="narrative-card" style={{ ...appendixSectionCard(130 + index * 40), padding: '16px 16px 15px' }}>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div>
                        <div style={{ color: '#f0e8d8', fontSize: 17, lineHeight: 1.3 }}>{card.zh}</div>
                        <div style={{ color: '#8e7f68', fontSize: 12, letterSpacing: '0.08em', marginTop: 4 }}>{card.en}</div>
                      </div>
                      <div style={smallBodyStyle()}>{card.body}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {card.values.map((value) => (
                          <span key={value} style={{ borderRadius: 999, padding: '5px 10px', border: '1px solid rgba(200,169,110,0.1)', background: 'rgba(255,255,255,0.018)', color: '#cfbea4', fontSize: 12, lineHeight: 1.4 }}>
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="narrative-card" style={{ ...appendixSectionCard(140), padding: isMobile ? '18px 16px' : '22px 22px 24px' }}>
            <div style={sectionPanelStyle(2)}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>Section 3｜Representative bucket mappings</div>
              <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 26, lineHeight: 1.24 }}>代表性 bucket 映射</div>
              <p style={{ ...paragraphStyle(), margin: 0 }}>
                这里不把所有 bucket 铺平，而只挑几类最能说明问题的例子。它们各自展示了一个关键判断：图像里的成立方式，要怎样被压成一组足以影响 rug generation 的状态，而不是停留在风格描述。
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                {bucketCards.map((card, index) => (
                  <div key={card.title} className="narrative-card" style={{ ...appendixSectionCard(170 + index * 45), padding: '16px 16px 15px' }}>
                    <div style={{ display: 'grid', gap: 10 }}>
                      <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.35 }}>{card.title}</div>
                      <div style={smallBodyStyle()}>{card.body}</div>
                      <div style={{ display: 'grid', gap: 6 }}>
                        {card.slots.map((slot) => (
                          <div key={slot} style={{ color: '#d7cab5', fontSize: 13, lineHeight: 1.7 }}>
                            {slot}
                          </div>
                        ))}
                      </div>
                      <div style={{ color: '#efe4d0', fontSize: 14, lineHeight: 1.75 }}>{card.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="narrative-card" style={{ ...appendixSectionCard(190), padding: isMobile ? '18px 16px' : '22px 22px 24px' }}>
            <div style={sectionPanelStyle(3)}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>Section 4｜How this feeds the system</div>
              <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 26, lineHeight: 1.24 }}>这一层怎样进入整体 workflow</div>
              <p style={{ ...paragraphStyle(), margin: 0 }}>
                slot-state 不是附录里的说明性信息，它直接决定系统在两阶段里如何展开。第一阶段用它去拉开几个共享 DNA 但结构不同的方向；第二阶段则用它识别哪些部分已经锁定，哪些字段还应该保持可变。
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                <div className="narrative-card" style={{ ...appendixSectionCard(220), padding: '16px 16px 15px' }}>
                  <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.3, marginBottom: 10 }}>First-stage: direction finding</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={smallBodyStyle()}>slot-state 让三个方向拥有同一组核心语义，因此它们不会彼此跑成无关的答案。</div>
                    <div style={{ color: '#d7cab5', fontSize: 14, lineHeight: 1.75 }}>共享约束：主体形成方式、边缘行为、表面深度模式。</div>
                    <div style={{ color: '#d7cab5', fontSize: 14, lineHeight: 1.75 }}>可拉开的状态：编排逻辑、密度逻辑、色彩角色包、局部绒高关系。</div>
                  </div>
                </div>
                <div className="narrative-card" style={{ ...appendixSectionCard(260), padding: '16px 16px 15px' }}>
                  <div style={{ color: '#f0e8d8', fontSize: 18, lineHeight: 1.3, marginBottom: 10 }}>Second-stage: controlled variation</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={smallBodyStyle()}>进入第二阶段后，slot-state 帮系统识别哪些 DNA 已经被选中，哪些字段仍然可以被温和地推进。</div>
                    <div style={{ color: '#d7cab5', fontSize: 14, lineHeight: 1.75 }}>locked DNA：主体成立方式、母题抽象方式、关键边缘行为。</div>
                    <div style={{ color: '#d7cab5', fontSize: 14, lineHeight: 1.75 }}>variable fields：密度分布、局部配色、表面深浅、局部编排节奏。</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="narrative-card" style={{ ...appendixSectionCard(230), padding: isMobile ? '18px 16px' : '22px 22px 24px' }}>
            <div style={sectionPanelStyle(4)}>
              <div style={{ color: accentColor, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>Section 5｜One full example chain</div>
              <div style={{ color: '#f0e8d8', fontSize: isMobile ? 22 : 26, lineHeight: 1.24 }}>一个完整链路示例</div>
              <p style={{ ...paragraphStyle(), margin: 0 }}>
                以 botanical apparition field 为例，它最重要的价值不是提供“植物风”这个词，而是把一种主体如何慢慢显影出来的图像逻辑，转成了系统可以继续利用的状态链。这样，抽象系统才会重新落回真实设计判断。
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
                {[
                  {
                    title: '图像逻辑',
                    body: '边界并不封闭，主体通过层叠、轻雾化和局部聚拢慢慢浮现，植物感来自显影过程，而不是直接描画叶片。',
                  },
                  {
                    title: 'bucket',
                    body: 'botanical apparition field 把这类图像成立方式收拢成一个可复用的解释单元。',
                  },
                  {
                    title: 'slot-state',
                    body: 'subjectFormationMode 取显影成立，edgeBehavior 取柔边渗开，surfaceDepthMode 倾向雾化层叠，pileHierarchy 采用主体高 / 背景低。',
                  },
                  {
                    title: 'generation implication',
                    body: '第一轮会先拉开编排和密度方向，保持同一显影逻辑；第二轮则锁定这组 DNA，只在局部色彩、密度和表面起伏上继续 refinement。',
                  },
                ].map((item, index) => (
                  <div key={item.title} style={{ position: 'relative', minWidth: 0, paddingRight: !isMobile && index < 3 ? 24 : 0 }}>
                    <div className="narrative-card" style={{ ...appendixSectionCard(260 + index * 50), padding: '16px 16px 15px', height: '100%' }}>
                      <div style={{ color: '#f0e8d8', fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{item.title}</div>
                      <div style={smallBodyStyle()}>{item.body}</div>
                    </div>
                    {!isMobile && index < 3 ? (
                      <div style={{ position: 'absolute', right: 0, top: '50%', width: 24, color: accentColor, textAlign: 'center', transform: 'translateY(-50%)', opacity: 0.85 }}>
                        →
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                <div className="narrative-card" style={{ ...appendixSectionCard(420), padding: '16px 16px 15px' }}>
                  <div style={{ color: '#f0e8d8', fontSize: 16, lineHeight: 1.3, marginBottom: 8 }}>它如何影响 first-round direction</div>
                  <div style={smallBodyStyle()}>
                    第一轮不会把三个方向做成三种完全不同的植物图，而会让它们共享“显影成立”的主体方式，只在构图重心、疏密关系和色彩角色上拉开差异。
                  </div>
                </div>
                <div className="narrative-card" style={{ ...appendixSectionCard(470), padding: '16px 16px 15px' }}>
                  <div style={{ color: '#f0e8d8', fontSize: 16, lineHeight: 1.3, marginBottom: 8 }}>它如何影响 second-round refinement</div>
                  <div style={smallBodyStyle()}>
                    当用户选中某个方向后，系统会把显影方式、柔边关系和表面深度视为 locked DNA，只继续微调局部密度、层次对比和材料感，让 refinement 更像沿既有方向生长。
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

export function hasFuliPlusCaseStudy(route: string, slideIndex = 0): boolean {
  return (
    (route === '/agentic-design-development/fuli-plus' || route === '/web-design-develop/fuli-plus') &&
    slideIndex >= 0 &&
    slideIndex < pages.length
  );
}

export default function FuliPlusCaseStudy({
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
  if (!hasFuliPlusCaseStudy(route, slideIndex)) return null;

  const page = pages[slideIndex];

  return (
    <div id={page.pageId} style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
      <IntroReveal
        pageIndex={slideIndex}
        pageTitle={page.pageTitle}
        mainCopy={page.mainCopy}
        isMobile={isMobile}
        disabled={!enableMotion}
      />

      {page.visualBlocks.length ? (
        <section style={{ display: 'grid', gap: 14 }}>
          {page.visualBlocks.map((block, index) => (
            <Reveal key={`visual-${index}`} delay={index * 90} disabled={!enableMotion}>
              {renderVisualBlock(block, accentColor, isMobile)}
            </Reveal>
          ))}
        </section>
      ) : null}

      {page.contentBlocks.length ? (
        <section style={{ display: 'grid', gap: 14 }}>
          {page.contentBlocks.map((block, index) => (
            <Reveal key={`content-${index}`} delay={index * 90 + 80} disabled={!enableMotion}>
              {renderContentBlock(block, accentColor)}
            </Reveal>
          ))}
        </section>
      ) : null}
    </div>
  );
}
