import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, mediaBlockStyle, h2Style } from './h5Styles';
export function getMinimapCameraSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'fuli-plus-concept',
      numeral: '01',
      title: 'broadcast-video',
      blocks: [
        <>
 
          <div style={mediaBlockStyle()}>
            <video 
              src="/src/images/fuli/slide01-vid01.mp4" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }} 
              controls 
              title="Fuli Plus 宣传视频" 
            />
          </div>
          <div style={mediaBlockStyle()}>
            <img 
              src="/src/images/fuli/slide01-img01.png" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="系统架构" 
            />
          </div>
        </>,
      ],
    },

  ];
}
