import { type SectionData } from './H5DocContentSlideFactory';
import { mediaBlockStyle } from './h5Styles';
import { ImageWithStatus, VideoWithStatus } from '../components/MediaWithStatus';
import fuliSlide01Image01 from '../images/fuli/slide01-img01.png';
import fuliSlide01Video01_540p from '../images/fuli/slide01-vid01-540p.mp4';
import fuliSlide01Video01_720p from '../images/fuli/slide01-vid01-720p.mp4';

export function getPhoenixFuliPlusSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'fuli-plus-concept',
      numeral: '01',
      title: 'broadcast-video',
      blocks: [
        <>

          <div style={mediaBlockStyle()}>
            <VideoWithStatus
              sources={[
                { src: fuliSlide01Video01_540p, type: 'video/mp4', media: '(max-width: 768px)' },
                { src: fuliSlide01Video01_720p, type: 'video/mp4', media: '(min-width: 769px)' },
                { src: fuliSlide01Video01_720p, type: 'video/mp4' },
              ]}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed ${accentColor}66`, background: 'rgba(255,255,255,0.01)' }} 
              controls 
              title="Fuli Plus 宣传视频" 
            />
          </div>
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={fuliSlide01Image01}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="系统架构" 
            />
          </div>
        </>,
      ],
    },

  ];
}
