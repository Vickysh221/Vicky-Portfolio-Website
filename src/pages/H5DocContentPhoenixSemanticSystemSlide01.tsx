import { createLocalizedTitle, type RenderableSectionTitle, type SectionShape } from '../i18n/sectionBuilders.ts';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { LocalizedText } from '../i18n/types.ts';
import {
  PHOENIX_SEMANTIC_SYSTEM_SLIDE01_COPY,
} from '../i18n/bilingualCaseStudyFallback.ts';
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
            <Copy value={PHOENIX_SEMANTIC_SYSTEM_SLIDE01_COPY.intro} />
          </p>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '这条链路真正解决什么问题', en: 'What this chain actually solves' }} /></h2>
          <p style={paragraphStyle()}>
            <Copy value={PHOENIX_SEMANTIC_SYSTEM_SLIDE01_COPY.body} />
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
            <ListItem accent={accentColor}><Copy value={{ zh: 'semantic intake：把“温暖、自然、不要太甜”拆成可继续判断的信号层', en: 'semantic intake: break "warm, natural, not too sweet" into signal layers that can still be evaluated' }} /></ListItem>
            <ListItem accent={accentColor}><Copy value={{ zh: 'ambiguity / certainty split：区分哪些偏好已明确，哪些维度还应该被展开比较', en: 'ambiguity / certainty split: separate what is clear from what still needs comparison' }} /></ListItem>
            <ListItem accent={accentColor}><Copy value={{ zh: '3 direction hypotheses：不是 3 个 prompt 版本，而是 3 条不同的设计成立方式', en: '3 direction hypotheses: not three prompt variants, but three different ways a design can become viable' }} /></ListItem>
            <ListItem accent={accentColor}><Copy value={{ zh: 'rug-language translation：把语义词压回 composition / motif / color / material / pile / relief / density', en: 'rug-language translation: map semantics back into composition / motif / color / material / pile / relief / density' }} /></ListItem>
            <ListItem accent={accentColor}><Copy value={{ zh: 'prompt assembly：prompt 只是编译结果，不是创意起点', en: 'prompt assembly: prompt is only the compiled result, not the creative starting point' }} /></ListItem>
          </ul>
        </>,
      ],
    },
  ];
}
