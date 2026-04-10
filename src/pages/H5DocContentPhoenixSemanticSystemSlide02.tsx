import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle } from './h5Styles';

export function getPhoenixSemanticSystemSlide02Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'direction-weighting',
      numeral: '02',
      title: 'Three Directions, Three Different Weighting Logics',
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'tech')}>direction design</div>
          <p style={paragraphStyle()}>
            同一句输入下，三条方向不能平均改所有变量。那样只会得到三张略有不同的图，而不是三种真正不同的设计假设。系统要做的，是让每条方向有不同的主导维度与次级维度，也就是不同的 slot weighting logic。
          </p>
          <h2 style={h2Style(accentColor)}>为什么 slide 06 要回到 rug design logic</h2>
          <p style={paragraphStyle()}>
            这些方向差异必须最终落回 rug 的设计语言，否则“organic flow / calm structure / tactile richness”就只是好听的标签。真正有效的解释，是说明每条方向分别把 composition、motif、color restraint、material feel、surface depth 里的哪些部分推到前台。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>per-direction weighting example</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>Direction A｜organic flow：强调 arrangement、movement path、breathing pocket</ListItem>
              <ListItem accent={accentColor}>Direction B｜calm structure：强调 structure order、motif abstraction、color restraint</ListItem>
              <ListItem accent={accentColor}>Direction C｜tactile richness：强调 material feel、surface depth、cluster density</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}>要避免的误写方式</h2>
          <ul style={gridListStyle(6)}>
            <ListItem accent={accentColor}>不要把这页写成字段说明：impression slot → x，style slot → y</ListItem>
            <ListItem accent={accentColor}>不要把方向差异写成抽象风格词堆叠</ListItem>
            <ListItem accent={accentColor}>要写清楚：每条方向怎样组织视觉重点，为什么它在 rug 上会成立得不一样</ListItem>
          </ul>
        </>,
      ],
    },
  ];
}
