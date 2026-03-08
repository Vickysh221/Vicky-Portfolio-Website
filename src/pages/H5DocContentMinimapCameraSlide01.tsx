import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, mediaBlockStyle } from './h5Styles';

function h2Style(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '14px',
    lineHeight: 1.9,
    margin: '0 0 10px',
  };
}

function mediaPlaceholderStyle(accentColor: string): CSSProperties {
  return {
    border: `1px dashed ${accentColor}66`,
    borderRadius: 8,
    minHeight: 260,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: accentColor,
    fontSize: '10px',
    letterSpacing: '0.16em',
    background: 'rgba(18, 15, 11, 0.45)',
  };
}

export function getMinimapCameraSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'slam-concept',
      numeral: '01',
      title: 'SLAM minimap concept and layout',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            The process of auto valet parking (AVP) uses simultaneous localization and mapping (SLAM) technology to
            record user-generated routes and surround sensored information. A SLAM-based minimap containing overview
            information of drivers’ learning trajectories can help them track the parking process and historical
            learning records.
          </p>
          <div style={mediaBlockStyle()}>
            <img 
              src="/src/images/slam/slide01-img01.png" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="SLAM minimap concept and layout" 
            />
          </div>
          <div style={mediaBlockStyle()}>
            <img 
              src="/src/images/slam/slide01-img02.png" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Different display of the minimap" 
            />
          </div>

          
          <div style={{ marginTop: 10 }}>
            <div style={mediaPlaceholderStyle(accentColor)}>IMAGE 1 · [Image #1]</div>
          </div>
        </>,
      ],
    },
       {
      id: 'slam-simulation',
      numeral: '01',
      title: 'SLAM minimap simulation',
      blocks: [
        <>
        <h2 style={h2Style(accentColor)}>Map elements and camera initialization</h2>

          <div style={mediaBlockStyle()}>
            <img 
              src="/src/images/slam/slide01-img01.png" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="SLAM minimap concept and layout" 
            />
          </div>
          <h2 style={h2Style(accentColor)}>Adaptive camera mechanism design</h2>
          
          <div style={mediaBlockStyle()}>
            <img 
              src="/src/images/slam/slide01-img02.png" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Different display of the minimap" 
            />
          </div>

          
          <div style={{ marginTop: 10 }}>
            <div style={mediaPlaceholderStyle(accentColor)}>IMAGE 1 · [Image #1]</div>
          </div>
        </>,
      ],
    },
  ];
}
