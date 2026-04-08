import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle, ListItem } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import unityCameraSlide01Image01 from '../images/unity3d-camera/slide01-img01.png';

function Accent({ color }: { color: string }) {
  return <span style={{ width: 3, height: 12, borderRadius: 2, background: color, opacity: 0.9, display: 'inline-block' }} />;
}

function EventTable({ accentColor }: { accentColor: string }) {
  const rows: { category: string; sub: string; event: string; adopted: boolean | null; note: string }[] = [
    { category: 'Manual Driving (D)', sub: 'Default view', event: '—', adopted: true, note: 'The baseline view for manual driving after shifting into D, balancing visual quality with practical usability.' },
    { category: '', sub: 'Speed-reactive view', event: '—', adopted: false, note: 'Driver perception gain is limited and does not justify competition for the primary view.' },
    { category: '', sub: 'Acceleration-reactive view', event: 'Hard braking / hard acceleration', adopted: false, note: 'Additional parameter changes could disrupt perceptual stability and significantly increase system complexity.' },
    { category: '', sub: 'Navigation-driving event view', event: 'Navigation activated', adopted: true, note: 'Prioritizes upcoming maneuvers while still preserving route context, traffic conditions, and nearby rear traffic.' },
    { category: '', sub: '', event: 'Passing a maneuver point (urban intersection)', adopted: false, note: 'A bird\'s-eye view cannot clearly express surrounding perception cues, which carry higher driving priority in this context.' },
    { category: '', sub: '', event: 'Passing a maneuver point (highway ramp)', adopted: false, note: 'Same rationale as above.' },
    { category: '', sub: '', event: 'Entering a tunnel', adopted: false, note: 'Removed after high-definition map support was discontinued.' },
    { category: '', sub: '', event: 'Roundabout / bridge', adopted: false, note: 'Removed after high-definition map support was discontinued.' },
    { category: 'Open-Road ADAS (ASD/LCC)', sub: 'ADAS event view under navigation', event: 'Left turn / right turn / U-turn', adopted: false, note: 'Merged into the camera response driven by steering-wheel angle.' },
    { category: '', sub: 'Generic ADAS event view', event: 'Automatic lane change', adopted: true, note: 'The driver must monitor the rear of the ego vehicle, the target lane, and forward traffic simultaneously, so the camera shifts toward the rear-side direction.' },
    { category: 'Active Safety Events', sub: '—', event: 'Forward/rear collision warning, blind-spot monitoring, rear cross-traffic warning, lane departure warning', adopted: false, note: 'These risks are already covered by higher-priority channels such as audio alerts, red edge warnings, and seat-belt locking; camera changes could distract from the critical warning itself.' },
    { category: 'Manual Reversing (R)', sub: '—', event: '—', adopted: true, note: 'When reversing, the driver must monitor the rear and rear-side areas of the vehicle while also retaining awareness of approaching traffic behind.' },
    { category: 'Parking Assist Driving', sub: 'AVP Automated Valet Parking', event: 'Path learning and path execution', adopted: true, note: 'When AVP is active, the camera prioritizes nearby road conditions and side/rear parking spaces regardless of whether the vehicle is in D, R, or P.' },
    { category: '', sub: 'APA Automated Parking Assist', event: 'Automatic parking in / out', adopted: true, note: 'Balances the vehicle and the parking space, supporting their dynamic positional changes during parking and bridging the D-gear and P-gear views.' },
    { category: '', sub: '', event: 'Selecting a parking space', adopted: true, note: 'Focuses on parking spaces within the perception range with a near top-down angle, keeping interaction hotspots clear and large enough for reliable selection.' },
    { category: 'Lateral Offset Camera', sub: 'Camera movement triggered by steering-wheel angle', event: '—', adopted: true, note: 'Triggered when speed > 0 and lateral steering deflection exceeds a threshold. Lateral camera offset = steering-angle coefficient / speed coefficient, within bounded thresholds. This substantially improves the realism of turning maneuvers.' },
  ];

  const cellBase: CSSProperties = {
    fontSize: '14px',
    color: '#a99679',
    padding: '8px 10px',
    lineHeight: 1.7,
    borderBottom: '1px solid rgba(200,169,110,0.08)',
    verticalAlign: 'top',
  };

  const headerCell: CSSProperties = {
    ...cellBase,
    color: accentColor,
    fontSize: '13px',
    letterSpacing: '0.12em',
    fontWeight: 600,
    borderBottom: '1px solid rgba(200,169,110,0.2)',
  };

  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '18%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '32%' }} />
        </colgroup>
        <thead>
          <tr>
            {['Driving State', 'View Type', 'Trigger Event', 'Used', 'Design Rationale'].map((h) => (
              <th key={h} style={headerCell}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
              <td style={cellBase}>{row.category}</td>
              <td style={cellBase}>{row.sub}</td>
              <td style={cellBase}>{row.event}</td>
              <td style={{ ...cellBase, textAlign: 'center' }}>
                {row.adopted === true && (<span style={{ color: '#7dba8a', fontSize: '13px', letterSpacing: '0.1em' }}>✓</span>)}
                {row.adopted === false && (<span style={{ color: '#c26b5a', fontSize: '13px' }}>✗</span>)}
              </td>
              <td style={{ ...cellBase, color: '#7f6f55' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function getUnityChapter2Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'overview', numeral: '01', title: 'Overview', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />System Objective</h2>
        <p style={paragraphStyle()}>Under concurrent multi-system events, define <strong style={{ color: '#efe4d0' }}>which event owns the primary view</strong> and use controlled camera interruption logic to guide driver attention toward the most important information while maintaining camera stability.</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />System Overview</h2>
        <p style={paragraphStyle()}>When different driving and environmental events are triggered, the vehicle and 3D map viewpoints shift as a means of information delivery and attention guidance. Rather than relying on isolated camera animations, all views transition smoothly within a unified camera framework. We therefore abstract them as a set of <strong style={{ color: '#efe4d0' }}>virtual camera states</strong>.</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Design Principles</h2>
        <p style={{ ...paragraphStyle(), marginBottom: 6 }}>In complex driving scenarios, the camera should no longer "respond to every event." It should <strong style={{ color: '#efe4d0' }}>serve only the most important event in the moment</strong>.</p>
        <ul style={{ margin: '0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
          {[['Attention First', 'Camera transitions should serve the driving task and occur only at critical event nodes.'], ['Minimal Camera Set', 'Merge event views with similar attention targets to avoid state explosion.'], ['Stability First', 'Limit unnecessary view changes and reduce the attentional cost of frequent camera motion.'], ['Safety-Critical Information First', 'Do not allow interruption from lower-priority states.']].map(([title, desc]) => (
            <ListItem key={title} accent={accentColor}><span style={{ color: '#c8b080' }}>{title}：</span>{desc}</ListItem>
          ))}
        </ul>
      </>],
    },
    {
      id: 'driving', numeral: '02', title: 'Driving Camera Logic', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Driving Events</h2>
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '13px', marginBottom: 10 }}>— Which system signals request camera changes</p>
        <EventTable accentColor={accentColor} />
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Driving Event Priority Rules</h2>
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '13px', marginBottom: 8 }}>— Override relationships across event-driven camera states</p>
       
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide01Image01}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Driving event priority diagram" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>Fig. 2-1 Driving event priority arbitration</div>
          </div>
        
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />Driving Camera Design</h2>
        <p style={paragraphStyle()}>In driving mode, the camera follows behind the ego vehicle in a third-person perspective, balancing immersion with sufficient visibility of the surrounding environment.</p>
        <p style={paragraphStyle()}>Because the current rendering framework does not update the ego vehicle through conventional world-coordinate movement on the map, a more flexible game-style third-person follow camera is not used at this stage.</p>
      </>],
    },


  ];
}
