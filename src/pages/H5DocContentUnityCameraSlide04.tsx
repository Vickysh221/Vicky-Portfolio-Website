import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';
import { VideoWithStatus } from '../components/MediaWithStatus';
import unityCameraSlide04Vid01_540p from '../images/unity3d-camera/slide04-vid01-540p.mp4';
import unityCameraSlide04Vid01_720p from '../images/unity3d-camera/slide04-vid01-720p.mp4';
import unityCameraSlide04Vid02_540p from '../images/unity3d-camera/slide04-vid02-540p.mp4';
import unityCameraSlide04Vid02_720p from '../images/unity3d-camera/slide04-vid02-720p.mp4';

function Accent({ color }: { color: string }) {
  return <span style={{ width: 3, height: 12, borderRadius: 2, background: color, opacity: 0.9, display: 'inline-block' }} />;
}

export function getUnityCameraSlide04Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'unity-camera-simulation',
      numeral: '04',
      title: '在 Unity 中对相机进行模拟设计',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}><Accent color={accentColor} />相机的过渡和打断策略</h2>
          <p style={paragraphStyle()}>通过统一的镜头状态与优先级规则，实现不同驾驶事件间的平滑过渡与可控打断。</p>
          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              sources={[
                { src: unityCameraSlide04Vid01_540p, type: 'video/mp4', media: '(max-width: 768px)' },
                { src: unityCameraSlide04Vid01_720p, type: 'video/mp4', media: '(min-width: 769px)' },
                { src: unityCameraSlide04Vid01_720p, type: 'video/mp4' },
              ]}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }}
              controls
              title="相机的过渡和打断策略"
            />
          </div>

          <h2 style={h2Style(accentColor)}><Accent color={accentColor} />相机的参数调节</h2>
          <p style={paragraphStyle()}>通过位置、朝向与焦点等参数联动，持续优化不同场景下的视角表达与信息可读性。</p>
          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              sources={[
                { src: unityCameraSlide04Vid02_540p, type: 'video/mp4', media: '(max-width: 768px)' },
                { src: unityCameraSlide04Vid02_720p, type: 'video/mp4', media: '(min-width: 769px)' },
                { src: unityCameraSlide04Vid02_720p, type: 'video/mp4' },
              ]}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }}
              controls
              title="相机的参数调节"
            />
          </div>
        </>,
      ],
    },
  ];
}
