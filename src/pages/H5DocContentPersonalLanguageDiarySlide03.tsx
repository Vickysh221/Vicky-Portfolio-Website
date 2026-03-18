import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { gridListStyle, infoTagStyle, kickerStyle, mediaBlockStyle, paragraphStyle, smallMetaStyle, subtitleStyle, ListItem } from './h5Styles';

function listStyle(): CSSProperties {
  return {
    ...gridListStyle(8),
    marginTop: '10px',
  };
}

export function getPersonalLanguageDiarySlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'language-diary-multi-agent-mechanism',
      numeral: '03',
      title: '多 Agent 机制 · Expression and Memory Flow',
      blocks: [
        <>
          <div style={kickerStyle(accentColor)}>Agent 机制</div>
          <p style={paragraphStyle()}>
            从系统结构上看，这个项目并不是让一个 agent 同时承担所有任务，而是通过不同阶段的 agent 协作，
            建立一种围绕表达与记忆的流动。
          </p>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>白天捕捉</h2>
          <div style={mediaBlockStyle()}>
            <div style={smallMetaStyle()}>DaytimeCaptureAgent</div>
            <p style={paragraphStyle()}>
              白天的 DaytimeCaptureAgent 更像一个低干预的对话陪伴者。它的任务不是主导 conversation，
              而是尽可能贴近用户当下的真实表达：回应当前消息、引用具体细节、避免生硬教学、避免突然切换话题。
            </p>
            <p style={paragraphStyle()}>
              它的价值在于“捕捉”，也就是在自然对话里识别表达升级的机会。系统在这一层已经具备与表达优化、
              记忆上下文和长期使用痕迹有关的结构，这意味着它不仅在聊天，也在为后续的整理和回收积累素材。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>回应用户当前消息，而不是抢占话题</ListItem>
              <ListItem accent={accentColor}>引用具体细节，维持真实表达的连续性</ListItem>
              <ListItem accent={accentColor}>在低干预陪伴中识别值得升级的表达机会</ListItem>
            </ul>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>晚间整理</h2>
          <div style={mediaBlockStyle()}>
            <div style={smallMetaStyle()}>EveningReviewAgent</div>
            <p style={paragraphStyle()}>
              晚间的 EveningReviewAgent 则承担更明确的“整理者”角色。它会把夜间复习组织成一次有限轮次的聚焦互动：
              围绕一个词、一个表达、一个句子，或者一个今天的重要瞬间，帮助用户做语义澄清、表达比较、
              句子升级和一个与实际使用相关的语法整合。
            </p>
            <p style={paragraphStyle()}>
              和传统 tutor 不同，这个 agent 的重点不只是讲解，而是帮助用户从“今天真实试图表达的东西”出发，
              把临时性的说法转化成可复用的表达模式。
            </p>
            <div style={{ marginTop: 10 }}>
              <div style={infoTagStyle(accentColor, 'tech')}>Focused Review Loop</div>
            </div>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>围绕单个词、句子或瞬间做有限轮次互动</ListItem>
              <ListItem accent={accentColor}>完成语义澄清、表达比较与句子升级</ListItem>
              <ListItem accent={accentColor}>把临时说法转成未来还能继续使用的语言形式</ListItem>
            </ul>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>日终沉淀</h2>
          <div style={mediaBlockStyle()}>
            <div style={smallMetaStyle()}>NightWrapupAgent and DiaryAgent</div>
            <p style={paragraphStyle()}>
              与此同时，NightWrapupAgent 和 DiaryAgent 进一步承担“日终沉淀”的工作。前者会从当天内容中生成轻量的收束，
              例如 closing、quiz 或日终回顾结构；后者则更克制，它不是自由创作，而是严格基于用户白天说过的话，
              把对话线程改写成第一人称日记。
            </p>
            <p style={paragraphStyle()}>
              这里非常关键的一点是：系统不凭空发明情绪或事实，而是尽量只使用用户明确说过的内容，
              把白天零散的表达沉淀成一段更像“私人记录”的语言。这使得语言学习不只通向复习，也通向自我叙述。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>NightWrapupAgent 负责轻量收束、quiz 与回顾结构</ListItem>
              <ListItem accent={accentColor}>DiaryAgent 严格基于用户原话改写为第一人称日记</ListItem>
              <ListItem accent={accentColor}>系统避免凭空发明情绪或事实，保持私人记录的可信度</ListItem>
            </ul>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>次日唤醒</h2>
          <div style={mediaBlockStyle()}>
            <div style={smallMetaStyle()}>MorningWakeAgent and MorningRecallAgent</div>
            <p style={paragraphStyle()}>
              到了第二天，MorningWakeAgent 和 MorningRecallAgent 会从前一天留下的内容中挑出一个足够轻、
              足够熟悉的入口，让记忆被重新唤醒。它不是从头引入新知识，而是让旧表达在新的生活时刻被再次碰到。
            </p>
            <p style={paragraphStyle()}>
              通过这种机制，语言和记忆之间形成闭环：白天生成，夜晚整理，早晨唤醒，随后再次进入现实对话。
            </p>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>机制意义</h2>
          <div style={mediaBlockStyle()}>
            <p style={paragraphStyle()}>
              因此，这个多 agent 结构的意义，不是技术上的“拆模块”，而是把语言学习中几个通常彼此割裂的过程
              重新编织成一条连续链路。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>表达</ListItem>
              <ListItem accent={accentColor}>记录</ListItem>
              <ListItem accent={accentColor}>复盘</ListItem>
              <ListItem accent={accentColor}>回忆</ListItem>
            </ul>
          </div>
        </>,
      ],
    },
  ];
}
