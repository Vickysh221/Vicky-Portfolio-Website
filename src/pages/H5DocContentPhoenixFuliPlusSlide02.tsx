import { type CSSProperties } from 'react';
import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle, ListItem } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import fuliSlide02Img01 from '../images/fuli/slide02-img01.png';

function eyebrowStyle(): CSSProperties {
  return {
    color: '#c8a96e',
    fontSize: '9px',
    letterSpacing: '0.2em',
    marginBottom: '8px',
  };
}

function leadTitleStyle(): CSSProperties {
  return {
    color: '#f0e8d8',
    fontSize: '24px',
    lineHeight: 1.2,
    fontStyle: 'italic',
  };
}

function imagePlaceholderStyle(accentColor: string): CSSProperties {
  return {
    ...mediaBlockStyle(),
    border: `1px dashed ${accentColor}55`,
    color: '#8f7d61',
    fontSize: '14px',
    textAlign: 'center',
    padding: '18px 12px',
  };
}

function captionStyle(): CSSProperties {
  return {
    ...paragraphStyle(),
    color: '#7f6f55',
    fontSize: '13px',
    marginTop: 6,
  };
}

function listStyle(): CSSProperties {
  return {
    margin: '6px 0 0',
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap: 6,
  };
}

export function getPhoenixFuliPlusSlide02Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'background-problem',
      numeral: '01',
      title: '背景与问题定义',
      blocks: [
        <>
          <div style={{ marginBottom: '26px', textAlign: 'left' }}>
            <div style={eyebrowStyle()}>H5 DOCUMENT SPEC · /agentic-design-development/fuli-plus</div>
            <div style={leadTitleStyle()}>基于槽位抽象、瀑布流探索与用户反馈闭环的织物图案生成系统</div>
            <p style={{ ...paragraphStyle(), marginTop: '10px' }}>
              这是一个面向织物 / 地毯 / 图案设计场景的 AI 生成系统。它不把用户输入直接粗暴地翻译成一次性 Prompt，
              而是通过「槽位语言 → 瀑布流探索 → 用户反馈闭环」逐步逼近理想设计方向，让生成结果从一次性的图，转变为可复用、可调参、可解释的设计状态。
            </p>
          </div>

          <h2 style={h2Style(accentColor)}>行业背景</h2>
          <p style={paragraphStyle()}>
            在 Midjourney、Stable Diffusion、Firefly 等 AI 图像生成工具被广泛用于设计领域的背景下，织物 / 地毯 / 图案设计暴露出一个更本质的问题：
            用户输入通常是情绪化、模糊且零散的，例如“温馨”“治愈”“有点跳出来”，很难直接转译为稳定、可复用的设计语言。
          </p>

          <h2 style={h2Style(accentColor)}>现有方式的局限</h2>
          <ul style={listStyle()}>
            {
              [
                '直接转 Prompt，容易生成写实 / 插画化结果，不适合织物语言。',
                '结果风格漂移严重，难以形成可复用的设计路径。',
                '用户只能凭感觉反复试错，没有学习与收敛机制。',
                '系统无法利用“喜欢 / 不喜欢”反馈，判断当前问题究竟出在哪个设计维度。',
              ].map((item) => (
                <ListItem key={item} accent={accentColor}>{item}</ListItem>
              ))
            }
          </ul>

          <h2 style={h2Style(accentColor)}>核心问题</h2>
          <p style={paragraphStyle()}>
            如何构建一个既支持探索、又支持逐步收敛的图案生成系统，让用户通过低负担反馈逼近理想风格，同时让系统判断“当前主要问题来自哪个设计维度”，
            并把结果沉淀为可复用的设计状态，而不只是一次性图片。
          </p>
        </>,
      ],
    },
    {
      id: 'slot-based-ai-interface',
      numeral: '02',
      title: 'slot-based AI创意生成界面探索',
      blocks: [
        <>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={fuliSlide02Img01}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }}
              alt="slot-based AI创意生成界面"
            />
          </div>
        </>,
      ],
    },
    {
      id: 'product-goals',
      numeral: '03',
      title: '产品目标',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>核心目标</h2>
          <ul style={listStyle()}>
            {[
              '将用户自然语言、选择与参考图映射为结构化的设计槽位状态。',
              '通过多维度并行探索的瀑布流，提供可比较的设计变体。',
              '通过喜欢 / 不喜欢反馈，判断当前设计主因。',
              '动态调整下一轮生成策略，逐步锁定风格方向。',
              '最终沉淀为稳定的参数组合与可复用的 Prompt / Style State。',
            ].map((item) => (
              <ListItem key={item} accent={accentColor}>{item}</ListItem>
            ))}
          </ul>

          <h2 style={h2Style(accentColor)}>非目标</h2>
          <ul style={listStyle()}>
            {[
              '不直接输出生产工艺文件。',
              '当前阶段不引入价格、打样成本等商业约束。',
              '不追求一次命中，而强调探索到收敛的过程质量。',
            ].map((item) => (
              <ListItem key={item} accent={accentColor}>{item}</ListItem>
            ))}
          </ul>
        </>,
      ],
    },
    {
      id: 'system-overview',
      numeral: '04',
      title: '系统机制总览',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>总体流程</h2>
          <p style={paragraphStyle()}>
            系统从用户输入出发，先通过意图解析器建立初始槽位状态，再由变体调度器生成一轮多维度瀑布流结果。用户只需对结果做轻量反馈，系统便可聚合反馈、
            判断主因、更新槽位状态，并进入下一轮更聚焦的推荐。
          </p>

          <h2 style={h2Style(accentColor)}>流程结构</h2>
          <p style={paragraphStyle()}>
            用户输入（语言 / 选择 / 参考图）→ Intent Parser（意图解析）→ 7 槽位语义状态初始化 → Variant Orchestrator（变体调度器）→
            瀑布流生成（多维度并行探索）→ 用户反馈（喜欢 / 不喜欢）→ 反馈聚合与主因判断 → 槽位状态更新（Open / Locked）→ 下一轮瀑布流推荐。
          </p>
        </>,
      ],
    },
    {
      id: 'slot-system',
      numeral: '05',
      title: '槽位系统：把模糊审美变成结构化设计语言',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>设计思路</h2>
          <p style={paragraphStyle()}>
            系统将图案生成中的关键设计维度抽象为一组“槽位”，槽位既是系统判断与推荐决策的最小单位，也是 Prompt 生成与反馈收敛的变量来源。
            这样用户说的就不再只是模糊感受，而会被逐渐映射成可操作的设计状态。
          </p>

          <h2 style={h2Style(accentColor)}>七个核心设计槽位</h2>
          <div style={imagePlaceholderStyle(accentColor)}>Image · 七个核心设计槽位示意图</div>
          <p style={captionStyle()}>图 5-1 槽位系统作为设计语言抽象层：用于系统判断、反馈收敛与推荐决策</p>

          <h2 style={h2Style(accentColor)}>设计价值</h2>
          <p style={paragraphStyle()}>
            对用户而言，槽位降低了表达负担；对系统而言，槽位提供了判断“问题出在哪个维度”的抓手；对后续复用而言，槽位让设计结果从单张图提升为可继承、
            可迁移的状态表示。
          </p>
        </>,
      ],
    },
    {
      id: 'waterfall-exploration',
      numeral: '06',
      title: '瀑布流探索：不是给答案，而是制造可比较的假设',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>设计动机</h2>
          <p style={paragraphStyle()}>
            用户往往很难准确说出“问题在哪”，但非常擅长做相对判断：这个更好、那个不对、颜色不喜欢、节奏太乱。因此系统不要求用户先把设计语言说清楚，
            而是通过瀑布流并行生成多个可比变体，把判断负担从“描述”转为“选择”。
          </p>

          <h2 style={h2Style(accentColor)}>生成原则</h2>
          <ul style={listStyle()}>
            {[
              '固定已确认方向的槽位。',
              '在 1–2 个槽位上制造可感知差异。',
              '每张图都代表一个明确的设计假设。',
            ].map((item) => (
              <ListItem key={item} accent={accentColor}>{item}</ListItem>
            ))}
          </ul>

          <h2 style={h2Style(accentColor)}>示例逻辑</h2>
          <p style={paragraphStyle()}>
            例如在同一轮中，Variant A 只改变 Impression，Variant B 对 Impression + Color 做轻微联动，Variant C 只改变 Color。
            这样用户的反馈就不再是“我就是不喜欢”，而是在系统内部变成了可判断的维度信号。
          </p>
        </>,
      ],
    },
    {
      id: 'feedback-loop',
      numeral: '07',
      title: '用户反馈闭环：让系统知道问题到底出在哪',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>反馈形式</h2>
          <p style={paragraphStyle()}>
            每张生成图只提供两种低负担反馈：👍 喜欢 / 👎 不喜欢。系统不强迫用户解释原因，因为用户的审美判断通常先于语言解释发生。
          </p>

          <h2 style={h2Style(accentColor)}>反馈聚合规则</h2>
          <p style={paragraphStyle()}>
            如果用户在同一轮瀑布流中，对某一槽位维度表现出一致反馈，系统就会判断这个槽位是当前的主要问题来源。
          </p>

          <h2 style={h2Style(accentColor)}>典型判断方式</h2>
          <p style={paragraphStyle()}>
            例如：用户对 Impression-only 和 Impression + Color 的结果给出喜欢，却对 Color-only 给出不喜欢，那么系统会判断 Impression 方向基本正确，
            可以锁定；Color 则是当前需要继续探索的主要问题槽位。
          </p>
        </>,
      ],
    },
    {
      id: 'slot-state-machine',
      numeral: '08',
      title: '槽位状态机：从探索走向收敛',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>极简状态设计</h2>
          <p style={paragraphStyle()}>
            每个槽位只有两种状态：Open 与 Locked。Open 表示仍处于探索中，Locked 表示该维度方向已经初步确认，不再作为主探索对象。
          </p>

          <h2 style={h2Style(accentColor)}>状态更新逻辑</h2>
          <p style={paragraphStyle()}>
            用户反馈会先经过维度一致性判断，当前主因槽位保持 Open，非主因槽位则进入 Locked。一旦 Locked，系统不会自动解锁，除非用户主动重置，
            或上传新的参考图 / 空间条件。
          </p>

          <div style={imagePlaceholderStyle(accentColor)}>Image · 槽位状态机示意图（Open / Locked）</div>
          <p style={captionStyle()}>图 8-1 槽位状态机：通过反馈闭环实现从多维探索到逐步收敛</p>
        </>,
      ],
    },
    {
      id: 'system-output',
      numeral: '09',
      title: '系统输出：从 Prompt 升级为“设计状态”',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>输出不只是 Prompt</h2>
          <p style={paragraphStyle()}>
            系统内部真正沉淀下来的不是一句 Prompt，而是一组包含槽位状态与设计语言描述的结构化状态。Prompt 只是这种状态面向生成模型时的一种外部表达。
          </p>

          <h2 style={h2Style(accentColor)}>输出结构</h2>
          <p style={paragraphStyle()}>
            例如系统会记录：哪些槽位已经锁定，哪些仍在探索；当前 Impression 的关键词是什么，当前 ColorPalette 还处于怎样的探索阶段。
            这种状态才是真正可复用、可继承、可解释的设计资产。
          </p>

          <div style={imagePlaceholderStyle(accentColor)}>Image · Design State / Slot State JSON 示意</div>
          <p style={captionStyle()}>图 9-1 系统将生成结果沉淀为可复用的设计状态，而不只是单次 Prompt</p>
        </>,
      ],
    },
    {
      id: 'success-metrics',
      numeral: '10',
      title: '成功指标',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>体验层指标</h2>
          <ul style={listStyle()}>
            {
              [
                '用户是否能在 2–4 轮内明确自己喜欢的方向。',
                '用户是否产生“我在和系统一起设计”的感受。',
              ].map((item) => (
                <ListItem key={item} accent={accentColor}>{item}</ListItem>
              ))
            }
          </ul>

          <h2 style={h2Style(accentColor)}>系统层指标</h2>
          <ul style={listStyle()}>
            {
              [
                '槽位锁定路径是否稳定、可解释。',
                '同一设计状态下生成结果是否具备一致性。',
                '系统是否能持续把模糊审美输入转化为结构化设计语言。',
              ].map((item) => (
                <ListItem key={item} accent={accentColor}>{item}</ListItem>
              ))
            }
          </ul>
        </>,
      ],
    },
  ];
}
