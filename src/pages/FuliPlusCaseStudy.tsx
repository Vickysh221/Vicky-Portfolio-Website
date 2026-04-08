import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import fuliHeroImage from '../images/fuli/slide01-img01.png';
import fuliSystemImage from '../images/fuli/slide02-img01.png';

export const FULI_PLUS_CASE_STUDY_PAGE_COUNT = 6;

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
  | { type: 'beforeAfter'; title?: string; before: string[]; after: string[] }
  | { type: 'pipeline'; title?: string; stages: string[] }
  | { type: 'referenceImageGrid'; title?: string; items: { label: string; body: string; crop: string }[] }
  | { type: 'semanticBuckets'; title?: string; items: { title: string; body: string }[] }
  | { type: 'roleCompare'; title?: string; left: { title: string; body: string }; right: { title: string; body: string } }
  | { type: 'caseImageStrip'; title?: string; items: { title: string; body: string; src: string }[] }
  | { type: 'closingPoints'; title?: string; items: string[] }
  | { type: 'appendixDiagram'; title?: string; groups: { title: string; items: string[] }[] }
  | { type: 'assetMap'; title?: string; columns: { title: string; items: string[] }[] }
  | { type: 'appendixC' };

interface CaseStudyPage {
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
    pageTitle: '我们需要一个懂地毯，懂品牌的「专家」',
    pageGoal: '具体展示为什么 generic image generation 在这个场景里不够用。',
    mainCopy:
      '通用图像模型很容易给出一张“看起来有风格”的图，但在 rug design 里，图像是否可用不只取决于好不好看，还取决于它是不是图案、能不能转成织物语言、有没有工艺与材料上的自洽、是不是符合品牌的审美语义。',
    contentBlocks: [
      {
        type: 'miniCaptions',
        items: ['他能解决每一次试图把模糊需求拉进真实设计流程时会遇到的所有问题。'],
      },
    ],
    visualBlocks: [
      {
        type: 'problemGrid',
        items: [
          { title: '图像太具象，像插画', body: '视觉主体很完整，却难以转成地毯图案的组织方式。', crop: '12% 28%' },
          { title: '图像太像参考图', body: '它抓住了表面相似，却没有形成新的设计判断。', crop: '42% 36%' },
          { title: '更像空间效果图', body: '画面氛围成立，但不像一张真正可讨论的 rug pattern。', crop: '72% 44%' },
          { title: '忽略表面与材料逻辑', body: '纹理、工艺和密度关系没有被纳入生成约束。', crop: '58% 72%' },
        ],
      },
    ],
  },
  {
    pageTitle: '用户与Agent共创地毯设计方向',
    pageGoal: '让读者看到你对问题的重新定义。',
    mainCopy:
      '每张生成的地毯图样背后都有一套参数槽位系统，负责把用户语言、参考图里的主体线索，以及 rug 本身的视觉与工艺逻辑，翻译成一个可以继续推进的参数化方向。',
    contentBlocks: [
      {
        type: 'shortParagraphs',
        title: '问题重定义',
        items: [
          '客户想要“再来几张”是要“朝更对的方向再延伸一点”。',
          '系统需要处理的是方向空间的建立、比较与收敛，而不是一次性生成。',
        ],
      },
    ],
    visualBlocks: [
      {
        type: 'beforeAfter',
        title: '流程对照',
        before: ['输入', 'prompt', '出图'],
        after: ['输入', '语义解释', '方向生成', '用户选择', '继续优化'],
      },
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
    pageTitle: '项目系统设计',
    pageGoal: '证明这不是概念方案，而是已有系统资产和测试结果的项目。',
    mainCopy:
      '我将这套系统凝练成一组skill.md，使其成为可运行的工作流骨架、可复用的语义参考系统，以及能持续积累案例的结构。',
    contentBlocks: [],
    visualBlocks: [
      {
        type: 'caseImageStrip',
        title: 'First-round / second-round case',
        items: [
          { title: 'First round', body: '先展开三个可比较方向，而不是急着命中答案。', src: fuliHeroImage },
          { title: 'Selected direction', body: '把用户选择变成新的 design evidence。', src: fuliSystemImage },
          { title: 'Second round', body: '沿选中方向继续长，差异更可控，判断也更聚焦。', src: fuliHeroImage },
        ],
      },
    ],
  },
  {
    pageTitle: 'Appendix C｜Slot-state 映射层',
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
    fontSize: 18,
    lineHeight: 1.3,
    marginBottom: 8,
  };
}

function smallBodyStyle(): CSSProperties {
  return {
    color: '#ab9a7d',
    fontSize: 14,
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
    <div style={{ display: 'grid', gap: 18, padding: isMobile ? '0 4px 16px' : '0 10px 22px' }}>
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
