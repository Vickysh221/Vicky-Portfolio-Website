import type { LocalizedSectionData } from '../i18n/sectionBuilders.ts';
import { MUSIC_PODCAST_SECTION_DEFINITIONS } from './H5DocContentSectionTitles.ts';
import { captionStyle, paragraphStyle } from './h5Styles';

export function getMusicPodcastSlide02Sections(_accentColor: string): LocalizedSectionData[] {
  return [
    {
      ...MUSIC_PODCAST_SECTION_DEFINITIONS.explorationProcess,
      blocks: [
        <>
          <p style={paragraphStyle()}>
            在播客系统成型之前，我花了一段时间探索如何把"关联"本身做成可见的界面。
            下面是早期播放器原型（V1.0）的设计稿，以及之后把关联机制拆成两个互为镜像的面的完整探索过程。
          </p>

          <div style={{ margin: '16px 0 8px' }}>
            <img
              src="/music-podcast/musicPOD.png"
              alt="播放器设计 - 手机端 V1.0"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 10,
                border: '1px solid rgba(139,125,181,0.18)',
              }}
            />
            <p style={{ ...captionStyle(), marginTop: 8 }}>播放器设计 · 手机端 V1.0</p>
          </div>

          <div style={{ margin: '20px 0 8px' }}>
            <iframe
              src="/music-podcast/v0.2-relationship-diagram.html"
              title="v0.2 · 把关联做成界面 · 探索过程"
              style={{
                width: '100%',
                height: 640,
                border: '1px solid rgba(139,125,181,0.18)',
                borderRadius: 10,
                display: 'block',
                background: '#0a0a0c',
              }}
              allow="autoplay"
            />
            <p style={{ ...captionStyle(), marginTop: 8 }}>v0.2 · 把"关联"做成界面 · 探索到落地的心路</p>
          </div>
        </>,
      ],
    },
  ];
}
