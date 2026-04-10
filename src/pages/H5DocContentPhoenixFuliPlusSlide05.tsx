import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, codeBlockStyle } from './h5Styles';

export function getPhoenixFuliPlusSlide05Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'slot-and-state',
      numeral: '',
      title: '槽位 / design state / feedback loop',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>为什么要引入槽位</h2>
          <p style={paragraphStyle()}>
            如果系统只是为了找最像的图，那么直接用 embedding retrieval 或相似图模型就够了。Fuli Plus 引入 slot / design state，不是为了更准确地找近邻，而是为了<strong>可控地制造差异</strong>，并让差异有可解释的维度结构。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>当前 design state 结构</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>first-order: color / motif / arrangement</ListItem>
              <ListItem accent={accentColor}>second-order: impression / style</ListItem>
              <ListItem accent={accentColor}>first-order 负责主要可见差异；second-order 是调制层</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}>反馈闭环</h2>
          <p style={paragraphStyle()}>
            系统核心不是“出图”，而是把用户的 like / dislike 转成 design state 的更新信号。Reducer 不是简单均值器，而是把 feedback → evidence → operator → next state 组织成可收敛的机制。
          </p>
          <pre style={codeBlockStyle()}>{`user input / reference
→ initial slot state
→ one round of cards
→ like / dislike
→ evidence extraction
→ reducer / state update
→ next round`}</pre>
        </>,
      ],
    },
  ];
}
