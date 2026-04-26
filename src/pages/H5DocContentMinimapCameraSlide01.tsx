import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, mediaBlockStyle, h2Style } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import { createJiduNarrativeCoverSection } from './jiduHmiNarrativeCover';
import slamSlide01Image01 from '../images/slam/slide01-img01.png';
import slamSlide01Image02 from '../images/slam/slide01-img02.png';
import slamSlide01Image03 from '../images/slam/slide01-img03.png';
import slamSlide01Image04 from '../images/slam/slide01-img04.png';
import slamSlide01Image05 from '../images/slam/slide01-img05.png';

export function getMinimapCameraSlide01Sections(accentColor: string): SectionData[] {
  return [
    createJiduNarrativeCoverSection('/jidu-hmi/minimap-camera', accentColor),
    {
      id: 'slam-concept',
      numeral: '01',
      title: '空间证据：建立 SLAM 小地图布局',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            The process of auto valet parking (AVP) uses simultaneous localization and mapping (SLAM) technology to
            record user-generated routes and surround sensored information. A SLAM-based minimap containing overview
            information of drivers’ learning trajectories can help them track the parking process and historical
            learning records.
          </p>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={slamSlide01Image01}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="SLAM minimap concept and layout" 
            />
          </div>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={slamSlide01Image02}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Different display of the minimap" 
            />
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
            <ImageWithStatus
              src={slamSlide01Image03}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="SLAM minimap concept and layout" 
            />
          </div>
          <h2 style={h2Style(accentColor)}>Adaptive camera mechanism design</h2>
          
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={slamSlide01Image04}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Different display of the minimap" 
            />
          </div>
          <h2 style={h2Style(accentColor)}>Adaptive camera distance mechanism design</h2>
          
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={slamSlide01Image05}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="Adaptive camera mechanism design" 
            />
          </div>
        </>,
      ],
    },
  ];
}
