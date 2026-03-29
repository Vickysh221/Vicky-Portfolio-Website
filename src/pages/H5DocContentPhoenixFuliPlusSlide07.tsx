import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle } from './h5Styles';

export function getPhoenixFuliPlusSlide07Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'asset-layer-and-roadmap',
      numeral: '08',
      title: '资产层、推荐系统与下一阶段',
      blocks: [
        <>
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
            当前项目已经从“参数 demo + 最近邻展示”推进到“带有 design state、反馈闭环、真实资产匹配和 early-round probing 实验的机制原型”。下一阶段的重点，不是继续堆 UI，而是把 hypothesis construction、carrier selection、资产分层标注与 recommendation system 真正串起来。
          </p>
        </>,
      ],
    },
  ];
}
