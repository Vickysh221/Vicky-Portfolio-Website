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
      id: 'camera-params', numeral: '03', title: 'Camera Parameter Space and Transitions', blocks: [<>        
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '13px', marginBottom: 12 }}>— How the seamless single-take camera is implemented</p>
        <p style={paragraphStyle()}><strong style={{ color: '#efe4d0' }}>The result of primary-view competition is not a hard camera cut, but an override of target parameters.</strong> Smooth transitions are achieved through continuous parameter interpolation rather than discrete animation states.</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Camera Mode</h2>
        <p style={paragraphStyle()}>In most camera states, the camera looks toward either the ego vehicle&apos;s default focal point or an offset focal point while maintaining a relatively fixed spatial relationship to the vehicle. The result is that, within a given motion state, the vehicle remains visually stable on screen.</p>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide02Image02}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Relative position between camera and ego vehicle" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>Fig. 3-1 Relative position between camera and ego vehicle</div>
          </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Why This Camera Mode</h2>
        <ul style={{ margin: '0 0 12px', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
          {['Specific driving and vehicle functions within the shared human-machine map require predefined views of the vehicle model and map scene to support clear task execution.', 'In an in-vehicle environment, highly flexible free cameras are intentionally avoided because they can create unstable visual and functional experiences while driving.'].map((t) => (
            <li key={t} style={{ color: '#a99679', fontSize: '16px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
              <span style={{ color: accentColor }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Generic Triggering and Transition Logic</h2>
        <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide02Image03}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Generic camera event trigger flow" 
            />
          </div>
                 <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide02Image04}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Driving event priority arbitration" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>Fig. 2-1 Driving event priority arbitration</div>
          </div>
      </>],
    },
    {
      id: 'unity-camera-simulation',
      numeral: '04',
      title: 'Camera System Simulation in Unity',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Transition and Interruption Strategy</h2>
          <p style={paragraphStyle()}>A unified camera-state model and shared priority rules enable smooth transitions and controlled interruptions across different driving events.</p>
          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              sources={[
                { src: unityCameraSlide04Vid01_540p, type: 'video/mp4', media: '(max-width: 768px)' },
                { src: unityCameraSlide04Vid01_720p, type: 'video/mp4', media: '(min-width: 769px)' },
                { src: unityCameraSlide04Vid01_720p, type: 'video/mp4' },
              ]}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }}
              controls
              title="Camera transition and interruption strategy"
            />
          </div>

          <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Camera Parameter Tuning</h2>
          <p style={paragraphStyle()}>By coordinating position, orientation, and focal targets, the system continuously optimizes viewpoint expression and information readability across scenarios.</p>
          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              sources={[
                { src: unityCameraSlide04Vid02_540p, type: 'video/mp4', media: '(max-width: 768px)' },
                { src: unityCameraSlide04Vid02_720p, type: 'video/mp4', media: '(min-width: 769px)' },
                { src: unityCameraSlide04Vid02_720p, type: 'video/mp4' },
              ]}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }}
              controls
              title="Camera parameter tuning"
            />
          </div>
        </>,
      ],
    },
  ];
}
