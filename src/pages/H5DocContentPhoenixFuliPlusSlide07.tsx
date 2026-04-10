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
