import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle } from './h5Styles';

export function getPhoenixFuliPlusSlide07Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'asset-layer-and-roadmap',
      numeral: '08',
      title: '从方法原型走向资产系统化',
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'tech')}>next-stage systemization</div>
          <h2 style={h2Style(accentColor)}>为什么这一页不能代替 appendix</h2>
          <p style={paragraphStyle()}>
            前一组 appendix 解释的是方法如何成立：模糊语义怎样被编译成几个可比较方向，差异怎样落回 rug design logic，prompt 为什么只是最后一层。当前这一页要讲的不是方法，而是把这套方法继续做实后，需要什么样的资产层与推荐系统来支撑它。
          </p>
          <h2 style={h2Style(accentColor)}>为什么真实 FULI 资产重要</h2>
          <p style={paragraphStyle()}>
            FULI 资产不是普通图库，而是设计语义资产。它们未来要承担 probe-carrier、preference-carrier、convergence-carrier 等不同推荐角色，支撑系统在不同阶段调用不同性质的参考图。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>未来推荐系统的多目标逻辑</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>relevance：和当前 state / preference 的相关度</ListItem>
              <ListItem accent={accentColor}>diversity：同轮是否足够分散</ListItem>
              <ListItem accent={accentColor}>role suitability：当前阶段是否适合承担 probing / preference / convergence 角色</ListItem>
              <ListItem accent={accentColor}>history：seen / disliked / liked 的约束</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}>semantic cue：把品牌图像变成可调用的语义加强层</h2>
          <p style={paragraphStyle()}>
            这里的品牌图像不只是风格迁移用的 style reference。它们如果只被拿来做表面相似匹配，系统借到的通常只是“像不像”，而不是对 rug 真正有用的判断层。我更想做的是把这些品牌历史图像 reverse-read 成 semantic cues：它们在主体形成、组织逻辑、密度节奏、边缘处理和表面语言上，各自代表什么样的整体取向。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>semantic cue module 在 second-stage 的作用</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>系统先根据用户描述与当前选中的意向，确定这一轮已经被认可的方向</ListItem>
              <ListItem accent={accentColor}>再去品牌匹配库里找那些 slot parameter vectors 整体取向接近、DNA 同向的案例</ListItem>
              <ListItem accent={accentColor}>匹配目标不是视觉相似，而是 semantic structure 是否同向</ListItem>
              <ListItem accent={accentColor}>这些 cues 会作为 prompt 组装前的一层 reinforcement，帮助下一轮 variation 更稳定地收束</ListItem>
            </ul>
          </div>
          <p style={paragraphStyle()}>
            所以它服务的不是风格迁移，而是 brand-bounded design control：在品牌边界内，对一个已经被用户认可的方向做更可控的加强。这也让 second-stage variation 更像设计控制，而不只是继续多出几张图。
          </p>
          <h2 style={h2Style(accentColor)}>项目当前阶段</h2>
          <p style={paragraphStyle()}>
            当前项目已经从“参数 demo + 最近邻展示”推进到“带有 design state、反馈闭环、真实资产匹配和 early-round probing 实验的机制原型”。也因此，下一阶段的重点不再是解释方法本身，而是把 hypothesis construction、carrier selection、资产分层标注与 recommendation system 真正串起来。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>这一页读者应该带走什么</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>核心方法已经在 appendix 被解释清楚</ListItem>
              <ListItem accent={accentColor}>这一页讲的是：如何把方法原型升级成可持续工作的资产系统</ListItem>
              <ListItem accent={accentColor}>所以它是 next-stage systemization，不是 skill explanation</ListItem>
            </ul>
          </div>
        </>,
      ],
    },
  ];
}
