import { createLocalizedTitle, type RenderableSectionTitle, type SectionShape } from '../i18n/sectionBuilders.ts';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { LocalizedText } from '../i18n/types.ts';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle, codeBlockStyle } from './h5Styles';

function Copy({ value }: { value: LocalizedText }) {
  const { text } = useI18n();
  return <>{text(value)}</>;
}

export function getPhoenixSemanticSystemSlide01Sections(accentColor: string): SectionShape<RenderableSectionTitle>[] {
  return [
    {
      id: 'semantic-compilation-chain',
      numeral: '01',
      title: createLocalizedTitle('Semantic-to-Rug Compilation Chain', 'Semantic-to-Rug Compilation Chain'),
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'tech')}>method appendix</div>
          <p style={paragraphStyle()}>
            <Copy value={{ zh: '这组 appendix 不再解释“页面长什么样”，而是解释系统到底如何把一句模糊输入压成三条可比较的 rug 方向。关键点不是 prompt engineering，而是 semantic compilation：先分辨确定项与含混项，再把含混项展开成几个不同的成立方式。', en: 'These appendices do not explain what the page looks like. They explain how the system compresses one ambiguous input into three comparable rug directions. The point is not prompt engineering, but semantic compilation: separate the certain parts from the ambiguous ones, then expand the ambiguous parts into several viable forms.' }} />
          </p>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '这条链路真正解决什么问题', en: 'What this chain actually solves' }} /></h2>
          <p style={paragraphStyle()}>
            <Copy value={{ zh: '用户最常给出的不是完整 brief，而是混合着 mood、偏好、限制和局部想象的句子。系统不能把这类输入直接压成一句 prompt，否则三张图往往只会变成“同一路径上的微调”。第一轮真正要解决的，是把方向空间先展开出来。', en: 'Users usually do not provide a full brief. They give sentences mixed with mood, preference, constraints, and partial imagination. The system cannot compress that input into a single prompt, or the three outputs will just become minor variations on the same path. The first round needs to expand the direction space first.' }} />
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>semantic compilation chain</div>
            <pre style={codeBlockStyle()}>{`user vague input
→ semantic intake
→ ambiguity / certainty split
→ 3 direction hypotheses
→ per-direction slot weighting
→ rug-language translation
→ prompt assembly
→ 3 generated variants`}</pre>
          </div>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '每一步在判断什么', en: 'What each step evaluates' }} /></h2>
          <ul style={gridListStyle(6)}>
            <ListItem accent={accentColor}>semantic intake：把“温暖、自然、不要太甜”拆成可继续判断的信号层</ListItem>
            <ListItem accent={accentColor}>ambiguity / certainty split：区分哪些偏好已明确，哪些维度还应该被展开比较</ListItem>
            <ListItem accent={accentColor}>3 direction hypotheses：不是 3 个 prompt 版本，而是 3 条不同的设计成立方式</ListItem>
            <ListItem accent={accentColor}>rug-language translation：把语义词压回 composition / motif / color / material / pile / relief / density</ListItem>
            <ListItem accent={accentColor}>prompt assembly：prompt 只是编译结果，不是创意起点</ListItem>
          </ul>
        </>,
      ],
    },
  ];
}
