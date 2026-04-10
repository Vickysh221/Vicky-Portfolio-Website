import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle } from './h5Styles';

export function getPhoenixSemanticSystemSlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'prompt-serialization',
      numeral: '03',
      title: 'Prompt Is the Last Layer, Not the Core Method',
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'tech')}>serialization layer</div>
          <p style={paragraphStyle()}>
            这一页的任务，是把 prompt 从“方法本体”降回“外部表达层”。如果前面两页已经讲清 semantic compilation chain 和 per-direction weighting，那么这里就能顺势说明：prompt 只是把已成立的 design state 序列化给模型，而不是替系统做判断。
          </p>
          <h2 style={h2Style(accentColor)}>三层关系</h2>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>from method to model instruction</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>Layer 1｜semantic hypothesis：这一轮到底想验证哪种设计成立方式</ListItem>
              <ListItem accent={accentColor}>Layer 2｜rug design language：把方向翻成 composition / motif / color / material / pile / relief / density</ListItem>
              <ListItem accent={accentColor}>Layer 3｜prompt assembly：再把这些状态组织成模型可执行的 generation instruction</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}>这页为什么比 roadmap 更重要</h2>
          <p style={paragraphStyle()}>
            资产层和推荐系统当然重要，但那是下一阶段机制系统化的问题；它不能替代 method appendix。对作品集读者来说，先证明“模糊语义如何被编译成可比较方向”，比先讲未来推荐系统更能解释你的能力结构。
          </p>
          <h2 style={h2Style(accentColor)}>读者最后应该带走什么</h2>
          <ul style={gridListStyle(6)}>
            <ListItem accent={accentColor}>这个项目的核心不是随机生成三张图，而是先组织三个可判断的方向</ListItem>
            <ListItem accent={accentColor}>方向差异不是措辞差异，而是 rug design logic 的差异</ListItem>
            <ListItem accent={accentColor}>prompt 在这里是结果层，不是思考层</ListItem>
          </ul>
        </>,
      ],
    },
  ];
}
