import type { CSSProperties } from 'react';
import { VideoWithStatus } from '../components/MediaWithStatus';
import type { LocalizedSectionData } from '../i18n/sectionBuilders.ts';
import { PERSONAL_COMPANIONS_SECTION_DEFINITIONS } from './H5DocContentSectionTitles.ts';
import { blockLabelStyle, dividerStyle, kickerStyle, noteCardStyle, paragraphStyle } from './h5Styles';

import christmasEveVideo from '../images/companions/christmas eve.mp4';
import dancingVideo from '../images/companions/dancing.mp4';
import greenVideo from '../images/companions/green-1.mp4';
import neverOneVideo from '../images/companions/never1-1(1).mp4';
import neverTwoVideo from '../images/companions/never2-1.mp4';
import nightcarVideo from '../images/companions/nightcar-1.mp4';
import submarineVideo from '../images/companions/submarine-1.mp4';

type CompanionSlideMedia = {
  note: string;
  src: string;
  frameAspectRatio?: string;
};

const projectDescription = [
  '这是一些陪你听歌的 bots。它是我最近在做的一个小探索：把网易云音乐的实际播放链路，和一个会响应歌曲情绪的像素场景系统接起来。',
  '所以这个项目慢慢变成了一个比较完整的小结构：一边是网易云音乐 CLI，负责把歌真的接进来、播起来；另一边是 scene / bot / animation skills，负责把歌变成能看的东西。',
  '其中有几层小系统在一起工作。musik-nacht-scene-bridge 是中间那层桥，它不直接画画，而是先把 song id、bot role、scene zone、lyric surface、playback binding、scene prototype 这些本来散着的信息整理成一套可重复的 scene grammar。',
  '单场景 / 像素场景类 skill 则更像在提取一首歌的情绪、场景、故事或者意向，把它们落到一个可被相信的小空间里——像夜车、楼道、厨房、窗边书桌、小店角落。画面不能只靠氛围，它还需要信箱、电梯灯、水壶、杯子、镜子、纸张、花束、书堆、路牌、桌灯这些实物去支撑。',
  '再往里一层是角色 / bot 相关 skill。有些 bot 比较像陪伴者，有些更像观察者，有些则更接近一个被歌曲激活的场景居民。像后来我给《无人知晓》做 ghost 版本，就是在试：如果不是人站在房间里，而是一个带着情绪的幽灵在空间里慢慢晃，会不会更适合某些歌。',
  '网易云音乐 CLI 在这里负责搜歌、确认 songId、判断某首歌是不是可播、控制播放，再把歌曲真正接进 bot 页面 / scene prototype。最后它慢慢长成了一个混合体：一部分是音乐界面，一部分是场景引擎，一部分是角色系统，一部分是情绪翻译器。它也是我 being with my string figure player 的一部分。',
];

type CompanionSlideKey = (typeof PERSONAL_COMPANIONS_SECTION_DEFINITIONS.slides)[number]['key'];

const companionSlideMedia: Record<CompanionSlideKey, CompanionSlideMedia> = {
  christmasEve: {
    note: '一段节日夜色里的陪伴感，像把人慢慢带进同一个呼吸节奏。',
    src: christmasEveVideo,
  },
  green: {
    note: '更偏生长感和环境氛围，让角色关系先通过空间气息被感知。',
    src: greenVideo,
  },
  dancing: {
    note: '把陪伴感放进更轻的身体节奏里，让音乐先通过动作和停顿被看见。',
    src: dancingVideo,
    frameAspectRatio: '742 / 1080',
  },
  neverOne: {
    note: '把人物和场景压进更私密的观看距离里，保留一种不完全说破的情绪。',
    src: neverOneVideo,
  },
  neverTwo: {
    note: '像前一段关系的延续版本，重点不在事件，而在陪伴是如何被停留住的。',
    src: neverTwoVideo,
  },
  nightCar: {
    note: '把移动中的空间当成情绪容器，车窗内外共同构成观看的时间感。',
    src: nightcarVideo,
  },
  submarine: {
    note: '更像一个被包裹起来的小世界，关系在封闭环境里变得更清楚。',
    src: submarineVideo,
  },
};

function videoFrameStyle(aspectRatio = '2188 / 1080'): CSSProperties {
  return {
    border: '1px solid rgba(200,169,110,0.16)',
    borderRadius: '18px',
    overflow: 'hidden',
    background: 'rgba(10,8,6,0.92)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
    aspectRatio,
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

function introLeadStyle(): CSSProperties {
  return {
    color: '#efe4d0',
    fontSize: '20px',
    lineHeight: 1.65,
    margin: '0 0 18px',
  };
}

function introGridStyle(): CSSProperties {
  return {
    display: 'grid',
    gap: '14px',
    marginTop: '18px',
  };
}

function getProjectDescriptionSections(): LocalizedSectionData[] {
  const [lead, ...body] = projectDescription;

  return [
    {
      ...PERSONAL_COMPANIONS_SECTION_DEFINITIONS.projectOverview,
      blocks: [
        <>
          <p style={kickerStyle('#6f8f92')}>Have a cup of tea with AI</p>
          <p style={introLeadStyle()}>{lead}</p>
          <div style={dividerStyle()} />
          <div style={introGridStyle()}>
            {body.map((paragraph, index) => (
              <div key={paragraph} style={noteCardStyle()}>
                <p style={blockLabelStyle()}>{String(index + 1).padStart(2, '0')}</p>
                <p style={{ ...paragraphStyle(), margin: 0 }}>
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </>,
      ],
    },
  ];
}

export function getPersonalCompanionsSlideSections(slideIndex: number, shouldPlayMedia: boolean): LocalizedSectionData[] {
  if (slideIndex === 0) return getProjectDescriptionSections();

  const companionIndex = slideIndex - 1;
  const sectionDefinition = PERSONAL_COMPANIONS_SECTION_DEFINITIONS.slides[companionIndex]
    ?? PERSONAL_COMPANIONS_SECTION_DEFINITIONS.slides[0];
  const slideMedia = companionSlideMedia[sectionDefinition.key];

  return [
    {
      ...sectionDefinition,
      blocks: [
        <div style={videoFrameStyle(slideMedia.frameAspectRatio)}>
          <VideoWithStatus
            sources={[{ src: slideMedia.src, type: 'video/mp4' }]}
            autoPlay
            loop
            controls
            playsInline
            activePlayback={shouldPlayMedia}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              background: '#050403',
              objectFit: 'contain',
            }}
          />
        </div>,
        <p style={{ ...noteStyle(), marginTop: '18px' }}>
          {slideMedia.note}
        </p>,
        <p style={{ ...noteStyle(), fontSize: '14px', color: '#8f816c', marginTop: '10px' }}>
          视频已转为更适合网页播放的 H.264 MP4，优先保证浏览器内联播放和构建兼容性。
        </p>,
      ],
    },
  ];
}
