import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import slide03Img01 from '../images/unity3d-camera/slide03-img01.png';
import slide03Img02 from '../images/unity3d-camera/slide03-img02.png';
import slide03Img03 from '../images/unity3d-camera/slide03-img03.png';
import slide03Img04 from '../images/unity3d-camera/slide03-img04.png';
import slide03Img05 from '../images/unity3d-camera/slide03-img05.png';
import slide03Img07 from '../images/unity3d-camera/slide03-img07.png';
import slide03Img08 from '../images/unity3d-camera/slide03-img08.png';
import slide03Img09 from '../images/unity3d-camera/slide03-img09.png';
import slide03Img10 from '../images/unity3d-camera/slide03-img10.png';



function Accent({ color }: { color: string }) {
  return <span style={{ width: 3, height: 12, borderRadius: 2, background: color, opacity: 0.9, display: 'inline-block' }} />;
}

function ParkingEventList({ accentColor }: { accentColor: string }) {
  const items = [
    { cat: 'Vehicle status', examples: 'Charging status' },
    { cat: 'Component-linked interactions', examples: 'Door and window controls, fault indicators' },
    { cat: 'Vehicle-model interactions', examples: 'Tire temperature/pressure, door-open commands, tapping fault locations' },
  ];

  return (
    <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
      {items.map((it) => (
        <li key={it.cat} style={{ color: '#a99679', fontSize: '16px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
          <span style={{ color: accentColor }}>—</span>
          <span><span style={{ color: '#c8b080' }}>{it.cat}：</span>{it.examples}</span>
        </li>
      ))}
    </ul>
  );
}

export function getUnityCameraSlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'view-examples', numeral: '04', title: '3D Map View Examples', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Driving Camera View Examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0' }}>
          {[
            { label: 'Manual driving default view', img: slide03Img01 },
            { label: 'AVP automated parking-in view', img: slide03Img02 },
            { label: 'ADAS automatic lane-change view', img: slide03Img03 },
            { label: 'Navigation driving view', img: slide03Img04 }
          ].map((item, i) => (
            <div key={i} style={mediaBlockStyle()}>
              <ImageWithStatus
                src={item.img}
                style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }}
                alt={item.label}
              />
              <div style={{ marginTop: 6, color: '#7f6f55', fontSize: '13px' }}>Fig. 4-{i + 1} {item.label}</div>
            </div>
          ))}
        </div>
      </>],
    },
    {
      id: 'parking', numeral: '05', title: 'Parking Camera Logic', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Parking Camera Design</h2>
        <p style={paragraphStyle()}>In parking mode, the camera primarily supports vehicle-model interaction, whole-vehicle status review, or component-level state inspection within specific functions. The framing therefore becomes more focused on the vehicle body or a target point on the vehicle. The default P-gear view still needs to balance vehicle visibility with awareness of the surrounding environment.</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Parking Events</h2>
        <p style={{ ...paragraphStyle(), marginBottom: 6 }}>Parking events are grouped into three high-level state categories:</p>
        <ParkingEventList accentColor={accentColor} />
        <p style={{ ...paragraphStyle(), marginTop: 12 }}>Typical scenarios include guided demonstrations within the 3D scene, feature explanation flows linked to vehicle controls and settings, reviewing range/energy/charging states, and interacting directly with 3D scene components such as triggering door-open actions, checking tire temperature and pressure, or tapping fault markers.</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Parking Event Priority Rules</h2>
        <p style={paragraphStyle()}>The vehicle-status camera system also relies on priority arbitration. When multiple abnormal states or charging states appear simultaneously, the higher-priority event view is selected for presentation.</p>
        <div style={mediaBlockStyle()}>
          <ImageWithStatus
            src={slide03Img05}
            style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }}
            alt="Parking event sources and priority arbitration overview"
          />
          <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>Fig. 5-2 Parking event sources and priority arbitration</div>
        </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Parking Camera View Examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0' }}>
          {[
            { label: 'Sensor L1 fault inspection view', img: slide03Img07 },
            { label: 'Door R1 fault inspection view', img: slide03Img08 },
            { label: 'Charging view', img: slide03Img09 },
            { label: 'Tire temperature and pressure alert view', img: slide03Img10 }
          ].map((item, i) => (
            <div key={i} style={mediaBlockStyle()}>
              <ImageWithStatus
                src={item.img}
                style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }}
                alt={item.label}
              />
              <div style={{ marginTop: 6, color: '#7f6f55', fontSize: '13px' }}>Fig. 5-{i + 3} {item.label}</div>
            </div>
          ))}
        </div>
      </>],
    },
  ];
}
