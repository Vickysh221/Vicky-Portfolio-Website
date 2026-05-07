import type { CSSProperties } from 'react';
import type { LocalizedSectionData } from '../i18n/sectionBuilders.ts';
import { MUSIC_PODCAST_SECTION_DEFINITIONS } from './H5DocContentSectionTitles.ts';
import {
  paragraphStyle,
  kickerStyle,
  dividerStyle,
  noteCardStyle,
  captionStyle,
  blockLabelStyle,
  ListItem,
} from './h5Styles';

function videoBlockStyle(): CSSProperties {
  return {
    border: '1px solid rgba(139,125,181,0.22)',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'rgba(10,8,6,0.92)',
    margin: '14px 0',
  };
}

function videoEl(src: string, label: string) {
  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        borderRadius: 12,
        border: '1px solid rgba(139,125,181,0.2)',
        background: '#08060a',
      }}
      aria-label={label}
    />
  );
}

export function getMusicPodcastSlide01Sections(_accentColor: string): LocalizedSectionData[] {
  return [
    {
      ...MUSIC_PODCAST_SECTION_DEFINITIONS.origin,
      blocks: [
        <>
          <p style={kickerStyle('#8b7db5')}>Personal Music Podcast · AI-Powered</p>
          <p style={{ ...paragraphStyle(), fontSize: '17px', lineHeight: 2, color: '#c8bda8' }}>
            我在听歌、练琴时，总会好奇这首歌在音乐历史里受到了谁的影响，有什么母题，谁又受到了它的启发。
            我庞杂的红心歌单里的其他歌，是不是和它有什么联系？在这个音乐派系的分支里，我还没拓展的版图在哪里？
          </p>
          <p style={paragraphStyle()}>
            音乐软件基于大数据给我推"相似歌曲"，但它不会在一开始告诉我为什么推荐。
            <strong style={{ color: '#c8bda8' }}>但我想要的是血缘，不是相似。</strong>
          </p>
          <div style={dividerStyle()} />
          <div style={{ display: 'grid', gap: 10 }}>
            {([
              ['读完了我的几千首红心歌', '挑出我的音乐画像中最值得探索的几条线索'],
              ['围绕某个主题生成歌单播客', '比如这首歌背后贝斯手的故事'],
              ['它给我出题，我也可以反过来给它指题', '比如"我想沿着 bassline 的 DNA 往外走"'],
              ['它做出一期十八站、跨五十七年的节目', '带我一起听吉他的诉说、贝斯的低语'],
            ] as [string, string][]).map(([title, body]) => (
              <div key={title} style={noteCardStyle()}>
                <p style={blockLabelStyle()}>{title}</p>
                <p style={{ ...paragraphStyle(), margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
          <div style={dividerStyle()} />
          <p style={paragraphStyle()}>
            我让 AI 用一种特定的口吻说话——不是 hype DJ，不是博物馆解说员，不是论文作者。
            是一个懂音乐、坐在你旁边、低声把这首歌讲清楚的人。
          </p>
          <p style={{ ...paragraphStyle(), color: '#8b7db5', fontStyle: 'italic' }}>
            这是我这几个月第一次，全神贯注地听完它给我的分享。可能是因为它真的在和我探讨关于我的音乐。
          </p>
        </>,
      ],
    },
    {
      ...MUSIC_PODCAST_SECTION_DEFINITIONS.demos,
      blocks: [
        <>
          <p style={paragraphStyle()}>
            我生成的前两期播客主题：一个是 AI 给我的灵感，另一个是我自己的建议。
          </p>
          <ul style={{ margin: '0 0 18px', padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
            <ListItem accent="#8b7db5">
              它看到我最近反复在听 Estranged，给我提了个题：<em>"双主角——人声和吉他能不能同时占据前景？"</em>
            </ListItem>
            <ListItem accent="#8b7db5">
              我给它指题：<em>"我想听 Miss You，沿着 bassline 的 DNA 往外走"</em>——它做出一期十八站、跨五十七年的节目
            </ListItem>
          </ul>

          <div style={videoBlockStyle()}>
            {videoEl('/music-podcast/demo-01.mp4', '播客演示 01')}
          </div>
          <p style={captionStyle()}>播客生成过程 · Demo 01</p>

          <div style={videoBlockStyle()}>
            {videoEl('/music-podcast/demo-02.mp4', '播客演示 02')}
          </div>
          <p style={captionStyle()}>播客生成过程 · Demo 02</p>

          <div style={videoBlockStyle()}>
            {videoEl('/music-podcast/demo-03.mp4', '播客演示 03')}
          </div>
          <p style={captionStyle()}>播客输出内容 · Demo 03</p>
        </>,
      ],
    },
    {
      ...MUSIC_PODCAST_SECTION_DEFINITIONS.shuffle,
      blocks: [
        <>
          <p style={paragraphStyle()}>
            Music Shuffle 是这个播客系统的另一面——让 AI 从我的红心歌单里随机抽签，
            以血缘为线索重新编排一次播放列表，每一首都附上它在这期节目里存在的理由。
          </p>
          <div style={videoBlockStyle()}>
            {videoEl('/music-podcast/music-shuffle.mp4', 'Music Shuffle 演示')}
          </div>
          <p style={captionStyle()}>Music Shuffle · 红心歌单随机主题播放</p>
          <p style={{ ...paragraphStyle(), color: '#8e7d61', fontSize: '14px' }}>
            小红书原帖：
            <a
              href="http://xhslink.com/o/4Ixde2DgeSm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#8b7db5', marginLeft: 6, textDecoration: 'underline' }}
            >
              xhslink.com/o/4Ixde2DgeSm
            </a>
          </p>
        </>,
      ],
    },
  ];
}
