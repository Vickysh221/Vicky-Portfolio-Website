import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle } from './h5Styles';

export function getPhoenixFuliPlusSlide06Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'exploration-mechanism',
      numeral: '',
      title: '探索机制：从 nearest ref 到 hypothesis carrier',
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'tech')}>mechanism shift</div>
          <h2 style={h2Style(accentColor)}>旧问题</h2>
          <p style={paragraphStyle()}>
            如果 early rounds 只是 per-variant nearest retrieval，那么系统最终只会给出一组局部相近的图。用户看到的是一组微小扰动，而不是几种真正不同的方向。
          </p>
          <h2 style={h2Style(accentColor)}>新方向</h2>
          <p style={paragraphStyle()}>
            early rounds 应该做的是 dimensional probing / anchored possibility exploration。也就是说，系统先决定这一轮要 probing 哪些维度，再构造 4 个 keep / vary hypotheses，让每张卡都代表一个有张力的方向假设。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>关键角色变化</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>资产图不再只是 nearest ref</ListItem>
              <ListItem accent={accentColor}>资产图要成为 hypothesis carrier</ListItem>
              <ListItem accent={accentColor}>用户点 like / dislike，不只是在评价图片，更是在评价一条方向假设</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}>为什么这里要接一组 method appendix</h2>
          <p style={paragraphStyle()}>
            但如果页面只停在“hypothesis carrier”这个判断上，读者还是会问：这些方向到底怎么被构出来？差异到底落在哪些 rug design dimensions 上？所以这里最自然的下一步，不是直接跳到 roadmap，而是先补一组方法附录，把 semantic compilation chain、per-direction weighting 与 rug-language translation 讲清楚。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>appendix 要回答的三个问题</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>模糊输入如何先被拆成 certainty / ambiguity</ListItem>
              <ListItem accent={accentColor}>三个方向为什么不是三张随机图，而是三种成立方式</ListItem>
              <ListItem accent={accentColor}>prompt 为什么只是最后一层，而不是方法本体</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}>列表机制</h2>
          <p style={paragraphStyle()}>
            当前原型中，liked 的卡会在继续下一轮后沉到下方历史区保留；disliked 的卡会消失，并进入 hard exclude。这样当前列表只承担“正在判断的候选”，而下方历史区承担“已保留方向”。
          </p>
        </>,
      ],
    },
  ];
}
