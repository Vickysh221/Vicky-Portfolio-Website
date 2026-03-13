import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';
import { ImageWithStatus, VideoWithStatus } from '../components/MediaWithStatus';
import dashboardLayoutVideo01 from '../images/dashboard layout/slide01-vid01.mov';
import dashboardLayoutImage01 from '../images/dashboard layout/U-LEFT.png';
import dashboardLayoutImage02 from '../images/dashboard layout/O-LEFT.png';
import dashboardLayoutImage03 from '../images/dashboard layout/O-MID.png';

export function getDashboardLayoutSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'dashboard-layout-prototype',
      numeral: '01',
      title: '驾驶区布局和驾驶状态原型设计',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            围绕辅助驾驶场景中的仪表信息、3D 地图位置与驾驶者视线关系，探索更适合驾驶区的信息组织方式，并通过原型验证不同布局方案在真实驾驶语境下的可理解性与可视性。
          </p>

          <h2 style={h2Style(accentColor)}>辅助驾驶仪表信息设计</h2>
          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              src={dashboardLayoutVideo01}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: `1px dashed ${accentColor}66`,
                background: 'rgba(255,255,255,0.01)',
              }}
              controls
              title="辅助驾驶仪表信息设计"
            />
          </div>

          <h2 style={h2Style(accentColor)}>3D地图屏幕位置和布局</h2>
          <p style={paragraphStyle()}>
            根据不同的方向盘类型和地图处于屏幕位置的偏好，系统根据人因学设定了三套地图显示屏幕位置方案，保证地图处于驾驶者视线的最佳位置。
          </p>

          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={dashboardLayoutImage01}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: '1px dashed rgba(200,169,110,0.28)',
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="U-LEFT 方向盘布局下的 3D 地图屏幕位置方案"
            />
          </div>

          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={dashboardLayoutImage02}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: '1px dashed rgba(200,169,110,0.28)',
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="O-LEFT 方向盘布局下的 3D 地图屏幕位置方案"
            />
          </div>

          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={dashboardLayoutImage03}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                border: '1px dashed rgba(200,169,110,0.28)',
                background: 'rgba(255,255,255,0.01)',
              }}
              alt="O-MID 方向盘布局下的 3D 地图屏幕位置方案"
            />
          </div>
        </>,
      ],
    },
  ];
}
