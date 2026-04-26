import type { CSSProperties } from 'react';
import { ImageWithStatus } from '../components/MediaWithStatus';
import type { SectionData } from './H5DocContentSlideFactory';
import { h2Style, mediaBlockStyle, paragraphStyle } from './h5Styles';
import { createJiduNarrativeCoverSection } from './jiduHmiNarrativeCover';
import speedLimitSign01 from '../images/地图和仪表元素设计/限速标识 1.png';
import speedLimitSign02 from '../images/地图和仪表元素设计/限速标识 2.png';
import experienceLimitAdjust from '../images/地图和仪表元素设计/经验限速和手动自动调节.png';

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

export function get3dMapDrivingComponentStatesSlide01Sections(accentColor: string): SectionData[] {
  return [
    createJiduNarrativeCoverSection('/jidu-hmi/3d-map-driving-component-states', accentColor),
    {
      id: '3d-map-driving-component-states-speed-limit',
      numeral: '01',
      title: '注意力本体：定义驾驶组件状态',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            聚焦限速信息在地图与仪表中的状态表达，梳理标识展示、经验限速提示，以及手动/自动限速调节的设计关系。
          </p>

          <h2 style={h2Style(accentColor)}>限速标识状态设计</h2>
          <div style={mediaBlockStyle()}>
            <div style={stackedMediaStyle()}>
              <ImageWithStatus src={speedLimitSign01} style={imageStyle()} alt="限速标识状态设计图一" />
              <ImageWithStatus src={speedLimitSign02} style={imageStyle()} alt="限速标识状态设计图二" />
            </div>
          </div>

          <h2 style={h2Style(accentColor)}>经验限速和限速调节</h2>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus src={experienceLimitAdjust} style={imageStyle()} alt="经验限速和限速调节设计图" />
          </div>
        </>,
      ],
    },
  ];
}
