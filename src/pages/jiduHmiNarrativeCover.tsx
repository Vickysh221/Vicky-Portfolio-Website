import type { CSSProperties } from 'react';
import { ImageWithStatus } from '../components/MediaWithStatus';
import type { SectionData } from './H5DocContentSlideFactory';
import { mediaBlockStyle, paragraphStyle } from './h5Styles';
import unityCameraCover from '../images/covers/thumbs/cover-cam.jpg';
import map3dCover from '../images/covers/previews/2d3d-poster.jpg';
import attentionOntologyCover from '../images/covers/thumbs/cover-jidu-attention-ontology.png';
import responsibilityLanguageCover from '../images/covers/thumbs/cover-jidu-responsibility-language.png';
import avpCover from '../images/covers/thumbs/cover-avp.jpg';
import gestureCover from '../images/covers/thumbs/cover-gesture.jpg';
import slamCover from '../images/covers/thumbs/cover-slam.jpg';

export const JIDU_HMI_NARRATIVE_COVERS = {
  '/jidu-hmi/unity3d-camera': {
    title: '共驾地图：让车始终以连续视角观察世界',
    description:
      'Single-shot was not a visual effect. It was a product principle: one system, one set of eyes, multiple scenarios.',
    descriptionZh: '一镜到底不是视觉效果，而是把驾驶、导航、泊车和 AVP 统一到同一套共驾视角里的产品原则。',
    image: unityCameraCover,
    imageName: 'cover-cam.jpg',
    imageAlt: 'Unity 3D camera architecture preview for continuous co-driving map',
  },
  '/jidu-hmi/3d-map': {
    title: '机器世界模型：把环境理解推到前台',
    description:
      'The 3D map exposed what the vehicle saw, what it considered important, and how it organized the driving environment.',
    descriptionZh: '3D 地图不只负责展示道路，而是把车辆如何看见、排序和组织环境推到前台。',
    image: map3dCover,
    imageName: '2d3d-poster.jpg',
    imageAlt: '2D and 3D map fusion preview for the machine world model',
  },
  '/jidu-hmi/3d-map-driving-component-states': {
    title: '注意力本体：用线、块、点翻译机器认知',
    description:
      'Routes became lines, perception objects became blocks, and parking slots or targets became points because each represented a different cognitive role.',
    descriptionZh: '路线、感知体、车位和目标点被拆成线、块、点，是为了把机器注意力翻译成人能读懂的认知单位。',
    image: attentionOntologyCover,
    imageName: 'cover-jidu-attention-ontology.png',
    imageAlt: 'Line, block, and point attention ontology evidence preview',
  },
  '/jidu-hmi/dashboard-layout': {
    title: '责任语言：说明谁主导、何时接管',
    description:
      'In assisted driving, HMI must communicate not only state, but responsibility: who leads, what the machine asks from the human, and when takeover is required.',
    descriptionZh: '辅助驾驶界面不只是陈列状态，而是在短时间内说明谁主导、机器在请求什么、何时必须由人接管。',
    image: responsibilityLanguageCover,
    imageName: 'cover-jidu-responsibility-language.png',
    imageAlt: 'ADAS responsibility language evidence preview',
  },
  '/jidu-hmi/avp': {
    title: 'AVP 协作模型：在机器执行中保留人的判断',
    description:
      'AVP was not only an automated parking flow. It was a collaboration model where the machine executed planned routines while the human remained involved in decision-making.',
    descriptionZh: 'AVP 不是单纯的自动泊车流程，而是机器执行预设路径、人继续参与关键判断的协作模型。',
    image: avpCover,
    imageName: 'cover-avp.jpg',
    imageAlt: 'AVP collaboration model cover preview',
  },
  '/jidu-hmi/3d-map-gesture': {
    title: '共享视角：让人进入机器的观察方式',
    description:
      "Gesture and free-look interaction allowed the human to enter the machine's perspective, rather than passively receive machine output.",
    descriptionZh: '手势与自由视角不是额外操控，而是让人进入机器观察方式、参与共同理解的入口。',
    image: gestureCover,
    imageName: 'cover-gesture.jpg',
    imageAlt: '3D map gesture and shared perspective cover preview',
  },
  '/jidu-hmi/minimap-camera': {
    title: '空间证据：用 SLAM 小地图确认局部环境',
    description:
      'The minimap turns local space, route, and target points into evidence the driver can confirm, rather than a detached miniature map.',
    descriptionZh: 'SLAM 小地图把局部空间、路线和目标点变成驾驶者可以确认的证据，而不是一张孤立的小地图。',
    image: slamCover,
    imageName: 'cover-slam.jpg',
    imageAlt: 'SLAM minimap spatial evidence cover preview',
  },
} as const;

export type JiduHmiNarrativeRoute = keyof typeof JIDU_HMI_NARRATIVE_COVERS;

function coverImageStyle(accentColor: string): CSSProperties {
  return {
    width: '100%',
    height: 'auto',
    maxHeight: 420,
    display: 'block',
    objectFit: 'contain',
    borderRadius: '5px',
    border: `1px dashed ${accentColor}66`,
    background: 'rgba(255,255,255,0.018)',
  };
}

function captionStyle(): CSSProperties {
  return {
    ...paragraphStyle(),
    color: '#d8ccb6',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: '14px 0 6px',
  };
}

function supportTextStyle(): CSSProperties {
  return {
    ...paragraphStyle(),
    color: '#8e7d61',
    fontSize: '14px',
    lineHeight: 1.75,
    margin: 0,
  };
}

export function createJiduNarrativeCoverSection(route: JiduHmiNarrativeRoute, accentColor: string): SectionData {
  const cover = JIDU_HMI_NARRATIVE_COVERS[route];

  return {
    id: 'narrative-cover',
    numeral: '00',
    title: cover.title,
    blocks: [
      <>
        <div style={mediaBlockStyle()}>
          <ImageWithStatus src={cover.image} style={coverImageStyle(accentColor)} alt={cover.imageAlt} />
          <p style={captionStyle()}>{cover.description}</p>
          <p style={supportTextStyle()}>{cover.descriptionZh}</p>
        </div>
      </>,
    ],
  };
}
