import type { CSSProperties } from 'react';
import { VideoWithStatus } from '../components/MediaWithStatus';
import type { SectionData } from './H5DocContentSlideFactory';

import christmasEveVideo from '../images/companions/christmas eve.mov';
import greenVideo from '../images/companions/green-1.mov';
import neverOneVideo from '../images/companions/never1-1(1).mov';
import neverTwoVideo from '../images/companions/never2-1.mov';
import nightcarVideo from '../images/companions/nightcar-1.mov';
import submarineVideo from '../images/companions/submarine-1.mov';

type CompanionSlide = {
  title: string;
  note: string;
  src: string;
};

const companionSlides: CompanionSlide[] = [
  {
    title: 'Christmas Eve',
    note: '一段节日夜色里的陪伴感，像把人慢慢带进同一个呼吸节奏。',
    src: christmasEveVideo,
  },
  {
    title: 'Green',
    note: '更偏生长感和环境氛围，让角色关系先通过空间气息被感知。',
    src: greenVideo,
  },
  {
    title: 'Never I',
    note: '把人物和场景压进更私密的观看距离里，保留一种不完全说破的情绪。',
    src: neverOneVideo,
  },
  {
    title: 'Never II',
    note: '像前一段关系的延续版本，重点不在事件，而在陪伴是如何被停留住的。',
    src: neverTwoVideo,
  },
  {
    title: 'Night Car',
    note: '把移动中的空间当成情绪容器，车窗内外共同构成观看的时间感。',
    src: nightcarVideo,
  },
  {
    title: 'Submarine',
    note: '更像一个被包裹起来的小世界，关系在封闭环境里变得更清楚。',
    src: submarineVideo,
  },
];

function videoFrameStyle(): CSSProperties {
  return {
    border: '1px solid rgba(200,169,110,0.16)',
    borderRadius: '18px',
    overflow: 'hidden',
    background: 'rgba(10,8,6,0.92)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
  };
}

function noteStyle(): CSSProperties {
  return {
    color: '#b9ab92',
    fontSize: '16px',
    lineHeight: 1.95,
    margin: 0,
  };
}

export function getPersonalCompanionsSlideSections(accentColor: string, slideIndex: number): SectionData[] {
  const slide = companionSlides[slideIndex] ?? companionSlides[0];

  return [
    {
      id: `companions-slide-${slideIndex + 1}`,
      numeral: String(slideIndex + 1).padStart(2, '0'),
      title: slide.title,
      blocks: [
        <div style={videoFrameStyle()}>
          <VideoWithStatus
            sources={[{ src: slide.src, type: 'video/quicktime' }]}
            muted
            autoPlay
            loop
            controls
            playsInline
            style={{
              width: '100%',
              display: 'block',
              background: '#050403',
            }}
          />
        </div>,
        <p style={{ ...noteStyle(), marginTop: '18px' }}>
          {slide.note}
        </p>,
        <p style={{ ...noteStyle(), fontSize: '14px', color: '#8f816c', marginTop: '10px' }}>
          当前页面直接打包原始 MOV 资源。Vite build 可以稳定输出文件；若个别浏览器对该 MOV 编码支持不足，视频区域会显示加载失败提示。
        </p>,
      ],
    },
  ];
}
