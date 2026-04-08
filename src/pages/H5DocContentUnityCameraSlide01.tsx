import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style } from './h5Styles';



export function getUnitySections(accentColor: string): SectionData[] {
  return [
    {
      id: 'goal',
      numeral: '01',
      title: 'Overview',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />System Objective</h2>
          <p style={paragraphStyle()}>
            In driving scenarios where navigation and assisted driving are deeply integrated, the system receives concurrent inputs from multiple sources, including navigation updates, ADAS state changes, vehicle health signals, and direct user actions such as gestures or view changes. All of these inputs compete for control of the primary view. Without a unified arbitration model, critical information can be interrupted by lower-priority states, the view can change too frequently, and overall system behavior becomes harder for drivers to predict. The core design question is therefore: under concurrent events, what should the primary view show at any given moment? This system defines how primary-view ownership is assigned and uses controlled camera interruptions to direct driver attention to the most important information in the current context.
          </p>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />Design Principles</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {['Attention First', 'Minimal Camera Set', 'Stability First', 'Safety-Critical Information First'].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />Design Goals</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              'Prioritize safety-critical information and prevent interruption from lower-priority states',
              'Keep driver attention controllable and avoid unnecessary camera changes',
              'Ensure stable, predictable system behavior aligned with the driving mental model',
              'Support future AI-driven event types as assisted-driving capabilities evolve'
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />My Role</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {
              ['Product definition and system design',
              'Event abstraction and priority-rule design',
              'State machine and view-transition strategy design',
              'Rule validation through Unity prototypes to test and refine product decisions'
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />Core Solution</h2>
          <div style={{ margin: '6px 0 0' }}>
            <div style={{ color: '#c8a96e', fontSize: '16px', margin: '12px 0 6px' }}>Primary-View Priority Arbitration</div>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6, marginLeft: 16 }}>
              {
                ['Abstract all display-affecting inputs as events',
                'Define priority and interruptibility rules for each event type',
                'Allow only one event to own the primary view at any point in time'
              ].map((item) => (
                <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                  <span style={{ color: accentColor }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ color: '#c8a96e', fontSize: '16px', margin: '12px 0 6px' }}>View State Machine</div>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6, marginLeft: 16 }}>
              {
                ['Define clear view states and transition paths for Driving, Navigation, Parking, AVP, APA, and related scenarios (see later sections)'
              ].map((item) => (
                <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                  <span style={{ color: accentColor }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ color: '#c8a96e', fontSize: '16px', margin: '12px 0 6px' }}>Information Hierarchy and Attention Management</div>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6, marginLeft: 16 }}>
              {
                ['Use viewpoint, focal target, and zoom strategy to express what matters most in the moment',
                'For example: prioritize route guidance and maneuvers in navigation, or the vehicle perimeter and rear zone in parking'
              ].map((item) => (
                <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                  <span style={{ color: accentColor }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>,
      ],
    },


  ];
}
