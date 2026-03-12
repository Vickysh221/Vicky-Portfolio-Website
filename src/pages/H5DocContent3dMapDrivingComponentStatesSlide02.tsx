import type { CSSProperties } from 'react';
import { ImageWithStatus } from '../components/MediaWithStatus';
import type { SectionData } from './H5DocContentSlideFactory';
import { h2Style, mediaBlockStyle, paragraphStyle } from './h5Styles';
import activeSafety01 from '../images/地图和仪表元素设计/主动安全 01.png';
import activeSafety02 from '../images/地图和仪表元素设计/主动安全 02.png';
import activeSafety03 from '../images/地图和仪表元素设计/主动安全 03.png';
import activeSafety04 from '../images/地图和仪表元素设计/主动安全 04.png';

function imageStyle(): CSSProperties {
  return {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '5px',
    border: '1px dashed rgba(200,169,110,0.28)',
    background: 'rgba(255,255,255,0.01)',
  };
}

function stackedMediaStyle(): CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    alignItems: 'start',
  };
}

export function get3dMapDrivingComponentStatesSlide02Sections(accentColor: string): SectionData[] {
  return [
    {
      id: '3d-map-driving-component-states-active-safety',
      numeral: '02',
      title: 'Active Safety Element States',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            梳理主动安全相关元素在地图和仪表中的状态表达，覆盖不同风险等级下的提醒、反馈与视觉层级关系。
          </p>

          <h2 style={h2Style(accentColor)}>主动安全元素状态</h2>
          <div style={mediaBlockStyle()}>
            <div style={stackedMediaStyle()}>
              <ImageWithStatus src={activeSafety01} style={imageStyle()} alt="主动安全元素状态图一" />
              <ImageWithStatus src={activeSafety02} style={imageStyle()} alt="主动安全元素状态图二" />
              <ImageWithStatus src={activeSafety03} style={imageStyle()} alt="主动安全元素状态图三" />
              <ImageWithStatus src={activeSafety04} style={imageStyle()} alt="主动安全元素状态图四" />
            </div>
          </div>
        </>,
      ],
    },
  ];
}
