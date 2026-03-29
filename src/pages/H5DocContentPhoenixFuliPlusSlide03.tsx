import { type CSSProperties } from 'react';
import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, kickerStyle, smallMetaStyle, documentCardStyle } from './h5Styles';

function leadTitleStyle(): CSSProperties {
  return {
    color: '#f0e8d8',
    fontSize: '26px',
    lineHeight: 1.18,
    fontStyle: 'italic',
    marginBottom: '10px',
  };
}

function twoColStyle(): CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '12px',
  };
}

export function getPhoenixFuliPlusSlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'fuli-plus-overview',
      numeral: '03',
      title: '项目总览 / PRD overview',
      blocks: [
        <>
          <div style={kickerStyle(accentColor)}>H5 DOCUMENT SPEC · /agentic-design-development/fuli-plus</div>
          <div style={leadTitleStyle()}>Fuli Plus：一个把“形成中的审美偏好”持续建模为 design state 的 agentic design system</div>
          <p style={paragraphStyle()}>
            Fuli Plus 不是一个普通的图案生成工具，也不是一个找相似图的检索系统。它要解决的问题是：当用户的偏好是模糊的、形成中的、难以一次说清楚的时候，系统如何通过多轮探索、反馈解释与状态更新，逐步逼近真正想要的设计方向。
          </p>
          <div style={twoColStyle()}>
            <div style={documentCardStyle()}>
              <div style={smallMetaStyle()}>产品一句话定义</div>
              <p style={paragraphStyle()}>
                Fuli Plus 是一个把用户模糊审美偏好持续转译为 <strong>design state</strong>，并通过多轮反馈逐步收敛设计方向的地毯 / 图案设计系统。
              </p>
            </div>
            <div style={documentCardStyle()}>
              <div style={smallMetaStyle()}>它不是什么</div>
              <ul style={gridListStyle(6)}>
                <ListItem accent={accentColor}>不是固定参数面板调图工具</ListItem>
                <ListItem accent={accentColor}>不是一次性 prompt 生图系统</ListItem>
                <ListItem accent={accentColor}>不是以“最像原图”为目标的相似图检索器</ListItem>
              </ul>
            </div>
          </div>
        </>,
      ],
    },
    {
      id: 'background-and-user-need',
      numeral: '04',
      title: '项目背景与用户诉求',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>背景</h2>
          <p style={paragraphStyle()}>
            在织物 / 地毯 / 图案设计场景里，用户往往没有办法一开始就把需求完整表达成精确参数。他们更常说的是“有点温暖”“不要太跳”“我喜欢这个感觉但不想照着来”。这类需求不是明确 specification，而是形成中的判断。
          </p>
          <h2 style={h2Style(accentColor)}>核心用户诉求</h2>
          <ul style={gridListStyle(6)}>
            <ListItem accent={accentColor}>我想先看不同方向，而不是一开始就被系统锁到一种局部答案。</ListItem>
            <ListItem accent={accentColor}>我不一定知道自己想要什么，但我能通过比较说出“这个方向更对 / 那个方向不对”。</ListItem>
            <ListItem accent={accentColor}>系统最好帮我发现可能性，而不只是重复我已经给出的原图。</ListItem>
            <ListItem accent={accentColor}>最终沉淀下来的应该是可复用的设计状态，而不只是单张图片。</ListItem>
          </ul>
        </>,
      ],
    },
  ];
}
