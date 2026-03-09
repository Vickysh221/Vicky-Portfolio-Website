import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';
import { VideoWithStatus, ImageWithStatus } from '../components/MediaWithStatus';
import unityCameraSlide04Vid01_540p from '../images/unity3d-camera/slide04-vid01-540p.mp4';
import unityCameraSlide04Vid01_720p from '../images/unity3d-camera/slide04-vid01-720p.mp4';
import unityCameraSlide04Vid02_540p from '../images/unity3d-camera/slide04-vid02-540p.mp4';
import unityCameraSlide04Vid02_720p from '../images/unity3d-camera/slide04-vid02-720p.mp4';
import unityCameraSlide02Image02 from '../images/unity3d-camera/slide02-img02.png';
import unityCameraSlide02Image03 from '../images/unity3d-camera/slide02-img03.png';
import unityCameraSlide02Image04 from '../images/unity3d-camera/slide02-img04.png';

function Accent({ color }: { color: string }) {
  return <span style={{ width: 3, height: 12, borderRadius: 2, background: color, opacity: 0.9, display: 'inline-block' }} />;
}

export function getUnityCameraSlide04Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'camera-params', numeral: '03', title: '相机参数空间变化', blocks: [<>        
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '13px', marginBottom: 12 }}>— 「一镜到底」的实现原理</p>
        <p style={paragraphStyle()}><strong style={{ color: '#efe4d0' }}>主视图竞争的结果不是「切镜头」，而是参数目标的覆盖。</strong>通过镜头参数的连续变化而非离散动画状态，实现镜头之间的平滑过渡。</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />相机模式</h2>
        <p style={paragraphStyle()}>在大部分镜头下，相机看向「自车默认焦点」或「一个被偏移过的焦点」，并与自车保持相对固定的空间位置关系。其效果为：在固定运镜状态下，自车在屏幕上的显示恒定不变。</p>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide02Image02}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="行车事件示意图" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>图 3-1 相机与自车相对位置关系</div>
          </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />选择该相机模式的原因</h2>
        <ul style={{ margin: '0 0 12px', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
          {['在人机共驾地图的特定驾驶 / 车辆功能下，需给定看车模、地图场景的视角以使特定功能较好实现。', '在车机环境中，不提倡使用灵活度较高的相机，以免导致驾驶过程中不良的视觉体验和功能体验。'].map((t) => (
            <li key={t} style={{ color: '#a99679', fontSize: '16px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
              <span style={{ color: accentColor }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />镜头事件的通用触发和流转机制</h2>
        <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide02Image03}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="行车事件示意图" 
            />
          </div>
                 <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide02Image04}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="行车事件示意图" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>图 2-1 行车事件优先级仲裁关系</div>
          </div>
      </>],
    },
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
