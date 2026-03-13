import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style } from './h5Styles';

export function get3dMapDrivingComponentStatesSlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: '3d-map-driving-component-states-coming-soon',
      numeral: '03',
      title: '更多内容敬请期待',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            该章节后续将继续补充更多 3D 地图与驾驶组件状态设计的案例内容，包括更完整的状态拆解、场景约束和设计验证过程。
          </p>
          <h2 style={h2Style(accentColor)}>更多内容敬请期待</h2>
          <p style={paragraphStyle()}>
            当前先保留已公开的核心页面，详细方案会在后续整理后继续更新。
          </p>
        </>,
      ],
    },
  ];
}
