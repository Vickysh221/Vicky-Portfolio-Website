import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import gestureSlide01Image01 from '../images/gesture/slide01-img01.png';
import gestureSlide01Image02 from '../images/gesture/slide01-img02.png';
import gestureSlide01Image03 from '../images/gesture/slide01-img03.png';
import gestureSlide01Image04 from '../images/gesture/slide01-img04.png';

export function get3dMapGestureSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: '3d-map-gesture-design',
      numeral: '01',
      title: '3D Map Gesture Interaction Design',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            围绕 3D 地图的单指与双指手势交互，梳理触发条件、响应逻辑与空间相机映射关系，建立更稳定且可解释的车机地图操作方案。
          </p>

          <h2 style={h2Style(accentColor)}>双指滑动与地图空间映射设计</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={gestureSlide01Image01}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: '1px dashed rgba(200,169,110,0.28)',
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="双指滑动手势触发条件与 3D 空间映射设计"
            />
          </div>

          <h2 style={h2Style(accentColor)}>单指点击滑动手势与响应机制</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={gestureSlide01Image02}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: '1px dashed rgba(200,169,110,0.28)',
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="单指点击与滑动手势的交互逻辑设计"
            />
          </div>

          <h2 style={h2Style(accentColor)}>双指手势空间映射与参数规则</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={gestureSlide01Image03}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: '1px dashed rgba(200,169,110,0.28)',
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="双指手势空间映射与参数规则设计"
            />
          </div>

          <h2 style={h2Style(accentColor)}>手势响应函数与运动趋势分析</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={gestureSlide01Image04}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: '1px dashed rgba(200,169,110,0.28)',
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="手势响应函数与运动趋势分析"
            />
          </div>
        </>,
      ],
    },
  ];
}
