import { createLocalizedTitle, type RenderableSectionTitle, type SectionShape } from '../i18n/sectionBuilders.ts';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { LocalizedText } from '../i18n/types.ts';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle } from './h5Styles';

function Copy({ value }: { value: LocalizedText }) {
  const { text } = useI18n();
  return <>{text(value)}</>;
}

export function getPhoenixSemanticSystemSlide03Sections(accentColor: string): SectionShape<RenderableSectionTitle>[] {
  return [
    {
      id: 'prompt-serialization',
      numeral: '03',
      title: createLocalizedTitle('Prompt Is the Last Layer, Not the Core Method', 'Prompt Is the Last Layer, Not the Core Method'),
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'tech')}>serialization layer</div>
          <p style={paragraphStyle()}>
            <Copy value={{ zh: '这一页的任务，是把 prompt 从“方法本体”降回“外部表达层”。如果前面两页已经讲清 semantic compilation chain 和 per-direction weighting，那么这里就能顺势说明：prompt 只是把已成立的 design state 序列化给模型，而不是替系统做判断。', en: 'The job of this page is to move prompt back down from the “core method” to the “external expression layer.” If the previous two pages have already explained semantic compilation and per-direction weighting, this page can then show that prompt simply serializes an established design state for the model; it does not make the judgment for the system.' }} />
          </p>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '三层关系', en: 'Three layers' }} /></h2>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>from method to model instruction</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>Layer 1｜semantic hypothesis：这一轮到底想验证哪种设计成立方式</ListItem>
              <ListItem accent={accentColor}>Layer 2｜rug design language：把方向翻成 composition / motif / color / material / pile / relief / density</ListItem>
              <ListItem accent={accentColor}>Layer 3｜prompt assembly：再把这些状态组织成模型可执行的 generation instruction</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '这页为什么比 roadmap 更重要', en: 'Why this page matters more than the roadmap' }} /></h2>
          <p style={paragraphStyle()}>
            <Copy value={{ zh: '资产层和推荐系统当然重要，但那是下一阶段机制系统化的问题；它不能替代 method appendix。对作品集读者来说，先证明“模糊语义如何被编译成可比较方向”，比先讲未来推荐系统更能解释你的能力结构。', en: 'Asset layers and recommendation systems are important, but they belong to the next phase of mechanism design; they cannot replace the method appendix. For portfolio readers, proving how fuzzy semantics are compiled into comparable directions explains your capability structure better than talking about future recommendation systems first.' }} />
          </p>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '读者最后应该带走什么', en: 'What readers should take away' }} /></h2>
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
