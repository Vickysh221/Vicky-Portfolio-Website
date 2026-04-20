import { createLocalizedTitle, type RenderableSectionTitle, type SectionShape } from '../i18n/sectionBuilders.ts';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { LocalizedText } from '../i18n/types.ts';
import { PHOENIX_SEMANTIC_SYSTEM_SLIDE02_BODY_COPY } from '../i18n/bilingualCaseStudyFallback.ts';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle } from './h5Styles';

function Copy({ value }: { value: LocalizedText }) {
  const { text } = useI18n();
  return <>{text(value)}</>;
}

export function getPhoenixSemanticSystemSlide02Sections(accentColor: string): SectionShape<RenderableSectionTitle>[] {
  return [
    {
      id: 'direction-weighting',
      numeral: '02',
      title: createLocalizedTitle('Three Directions, Three Different Weighting Logics', 'Three Directions, Three Different Weighting Logics'),
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'tech')}>direction design</div>
          <p style={paragraphStyle()}>
            <Copy value={{
              zh: '同一句输入下，三条方向不能平均改所有变量。那样只会得到三张略有不同的图，而不是三种真正不同的设计假设。系统要做的，是让每条方向有不同的主导维度与次级维度，也就是不同的 slot weighting logic。',
              en: 'With the same input, the three directions cannot change every variable evenly. That would only produce three slightly different images, not three genuinely different design hypotheses. The system needs each direction to have different primary and secondary dimensions, which means different slot weighting logic.',
            }} />
          </p>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '为什么 slide 06 要回到 rug design logic', en: 'Why slide 06 returns to rug design logic' }} /></h2>
          <p style={paragraphStyle()}>
            <Copy value={PHOENIX_SEMANTIC_SYSTEM_SLIDE02_BODY_COPY} />
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>per-direction weighting example</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>
                <Copy value={{ zh: 'Direction A｜organic flow：强调 arrangement、movement path、breathing pocket', en: 'Direction A | organic flow: emphasize arrangement, movement path, and breathing pockets' }} />
              </ListItem>
              <ListItem accent={accentColor}>
                <Copy value={{ zh: 'Direction B｜calm structure：强调 structure order、motif abstraction、color restraint', en: 'Direction B | calm structure: emphasize structural order, motif abstraction, and color restraint' }} />
              </ListItem>
              <ListItem accent={accentColor}>
                <Copy value={{ zh: 'Direction C｜tactile richness：强调 material feel、surface depth、cluster density', en: 'Direction C | tactile richness: emphasize material feel, surface depth, and cluster density' }} />
              </ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '要避免的误写方式', en: 'What to avoid when writing this slide' }} /></h2>
          <ul style={gridListStyle(6)}>
            <ListItem accent={accentColor}><Copy value={{ zh: '不要把这页写成字段说明：impression slot → x，style slot → y', en: 'Do not turn this slide into field documentation: impression slot → x, style slot → y' }} /></ListItem>
            <ListItem accent={accentColor}><Copy value={{ zh: '不要把方向差异写成抽象风格词堆叠', en: 'Do not reduce the difference to a stack of abstract style words' }} /></ListItem>
            <ListItem accent={accentColor}><Copy value={{ zh: '要写清楚：每条方向怎样组织视觉重点，为什么它在 rug 上会成立得不一样', en: 'Be explicit about how each direction organizes visual emphasis and why it becomes viable differently on a rug' }} /></ListItem>
          </ul>
        </>,
      ],
    },
  ];
}
