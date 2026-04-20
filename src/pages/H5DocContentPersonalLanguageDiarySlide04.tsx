import type { CSSProperties } from 'react';
import type { LocalizedSectionData } from '../i18n/sectionBuilders.ts';
import { PERSONAL_LANGUAGE_DIARY_SLIDE04_SECTION_TITLES } from './H5DocContentSectionTitles.ts';
import { gridListStyle, infoTagStyle, kickerStyle, mediaBlockStyle, paragraphStyle, smallMetaStyle, subtitleStyle, ListItem } from './h5Styles';

function listStyle(): CSSProperties {
  return {
    ...gridListStyle(8),
    marginTop: '10px',
  };
}

export function getPersonalLanguageDiarySlide04Sections(accentColor: string): LocalizedSectionData[] {
  return [
    {
      id: 'language-diary-memory-architecture',
      numeral: '04',
      title: PERSONAL_LANGUAGE_DIARY_SLIDE04_SECTION_TITLES.memoryArchitecture,
      blocks: [
        <>
          <div style={kickerStyle(accentColor)}>四层记忆结构</div>
          <p style={paragraphStyle()}>
            Mira 在白天和 agent 自由对话，说学校里的小事、没说出口的情绪，以及那些
            “我知道自己想表达什么，但不知道怎么更准确地说”的瞬间。系统不会只把这些话当作即时输入，
            而是试图让它们活下来：先把一句话绑定到具体生活场景，再从中识别她反复出现的偏好、目标和情绪线索，
            再提炼出可复用的表达模式，最后在夜里把这些零散片段整理成她自己的日记。
          </p>
          <p style={paragraphStyle()}>
            于是，一次表达不再随着对话结束而消失，而会逐渐变成一种长期资产。
            它既属于语言学习，也属于她对自己的认识。
          </p>
        </>,
        <>
          <div style={mediaBlockStyle()}>
            <div style={smallMetaStyle()}>language app multiagent 的四层记忆结构</div>
            <p style={paragraphStyle()}>
              这个项目的核心目标，不是让用户单次学会某个词，而是建立一种能够嵌入日常生活节律的语言记忆系统。
              系统将用户在真实对话中的一次表达，逐步转化为可回忆、可复用、可反思的长期资产。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>Event Anchor：将表达绑定到具体生活场景</ListItem>
              <ListItem accent={accentColor}>Memory Fact：提取用户持续性的偏好、目标与反思</ListItem>
              <ListItem accent={accentColor}>Knowledge：从真实表达中抽取可复用的语言模式</ListItem>
              <ListItem accent={accentColor}>Diary：将对话沉淀为第一人称自我叙事</ListItem>
            </ul>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>Layer 1: Event Anchor</h2>
          <div style={mediaBlockStyle()}>
            <div style={infoTagStyle(accentColor, 'source')}>目的</div>
            <p style={paragraphStyle()}>
              Event Anchor 用于记录一次表达背后的生活片段。它的目标不是先分析语言本身，
              而是先为语言建立一个“发生过的场景坐标”。
            </p>
            <div style={infoTagStyle(accentColor, 'tech')}>记录范围</div>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>日期</ListItem>
              <ListItem accent={accentColor}>时间范围：morning / afternoon / evening / night</ListItem>
              <ListItem accent={accentColor}>事件类型：work / food / exercise / social / travel / emotion / routine / reflection / other</ListItem>
              <ListItem accent={accentColor}>summary / tags / entities（people / places / objects / activities）</ListItem>
              <ListItem accent={accentColor}>emotionTags / sourceRefs / salienceScore / reusabilityScore</ListItem>
              <ListItem accent={accentColor}>linkedKnowledgeIds / linkedWordIds / linkedGrammarPointIds</ListItem>
              <ListItem accent={accentColor}>recallCount / lastUsedAt</ListItem>
            </ul>
            <div style={infoTagStyle(accentColor, 'prompt')}>Product Role</div>
            <p style={paragraphStyle()}>
              这一层让语言学习和生活片段发生绑定。用户未来回忆的不是抽象表达本身，
              而是“那天那个时刻，我试图这样表达”。
            </p>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>Layer 2: Memory Fact</h2>
          <div style={mediaBlockStyle()}>
            <div style={infoTagStyle(accentColor, 'source')}>目的</div>
            <p style={paragraphStyle()}>
              Memory Fact 用于从一次表达中提取更稳定的人物线索。如果 Event Anchor 记录的是“发生了什么”，
              那么 Memory Fact 记录的是“这个人反复在意什么”。
            </p>
            <div style={infoTagStyle(accentColor, 'tech')}>记录范围</div>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>type：event / preference / goal / reflection</ListItem>
              <ListItem accent={accentColor}>summary / evidence / tags / entities / emotionTags</ListItem>
              <ListItem accent={accentColor}>timeScope / noveltyScore / importanceScore / retrievabilityScore</ListItem>
              <ListItem accent={accentColor}>linkedKnowledgeIds / linkedWordIds / linkedGrammarIds</ListItem>
              <ListItem accent={accentColor}>status：candidate / confirmed / archived</ListItem>
            </ul>
            <div style={infoTagStyle(accentColor, 'prompt')}>Product Role</div>
            <p style={paragraphStyle()}>
              这一层使系统具备“连续理解用户”的能力。它帮助系统逐渐形成对用户稳定偏好、
              长期目标和表达倾向的认识，而不只是停留在单次对话。
            </p>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>Layer 3: Knowledge</h2>
          <div style={mediaBlockStyle()}>
            <div style={infoTagStyle(accentColor, 'source')}>目的</div>
            <p style={paragraphStyle()}>
              Knowledge 层将用户真实表达中的语言价值提炼为可复用的学习对象。
              它的重点不在离散知识点本身，而在于把“今天说过的话”转化成“明天还能继续用的表达模式”。
            </p>
            <div style={infoTagStyle(accentColor, 'tech')}>Knowledge Card 记录范围</div>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>Mode 分类：语法升级 / 语气升级 / 表达升级</ListItem>
              <ListItem accent={accentColor}>points 抽取</ListItem>
              <ListItem accent={accentColor}>span / better / microPattern</ListItem>
              <ListItem accent={accentColor}>application scenarios</ListItem>
              <ListItem accent={accentColor}>quiz / recall 使用</ListItem>
            </ul>
            <div style={infoTagStyle(accentColor, 'prompt')}>Product Role</div>
            <p style={paragraphStyle()}>
              这一层承担语言教学功能，但并不是脱离上下文的抽象教学。它最好总能回到用户原本的生活场景：
              这句话为什么当时不好说，怎样升级后更自然，哪些表达可以迁移到未来。
            </p>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>Layer 4: Diary</h2>
          <div style={mediaBlockStyle()}>
            <div style={infoTagStyle(accentColor, 'source')}>目的</div>
            <p style={paragraphStyle()}>
              Diary 层负责将用户一天中的零散表达整理为第一人称叙事。与其他层相比，
              它更接近用户的主观感受与自我记录。
            </p>
            <div style={infoTagStyle(accentColor, 'tech')}>Diary 记录范围</div>
            <p style={paragraphStyle()}>
              它基于用户在会话中明确说过的话生成，并可保存、编辑、再次读取。
            </p>
            <div style={infoTagStyle(accentColor, 'prompt')}>Product Role</div>
            <p style={paragraphStyle()}>
              这一层的目标不是教学，而是让用户重新拥有自己的表达。它让语言学习不只留下“学到了什么”，
              也留下“我这一天是怎样被说出来的”。
            </p>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>End-to-End Flow</h2>
          <div style={mediaBlockStyle()}>
            <p style={paragraphStyle()}>
              一条用户表达进入系统后的完整路径，可以概括为：
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>用户在白天对话中说出一句真实的话</ListItem>
              <ListItem accent={accentColor}>系统生成 agent 回复</ListItem>
              <ListItem accent={accentColor}>系统尝试将这句话写入 Event Anchor</ListItem>
              <ListItem accent={accentColor}>若处于 daytime-capture 阶段，系统进一步评估是否生成 Memory Fact</ListItem>
              <ListItem accent={accentColor}>系统可将相关语言内容提炼为 Knowledge</ListItem>
              <ListItem accent={accentColor}>晚间或事后，系统将当天对话整理为 Diary</ListItem>
              <ListItem accent={accentColor}>保存 Diary 后，Diary 本身又可以再次生成新的 Event Anchor</ListItem>
            </ul>
            <p style={paragraphStyle()}>
              四层共同构成了一条从“即时表达”到“长期资产”的路径：用户说过的话，被记住、被理解、被提炼，
              也被重新写回她自己的语言里。
            </p>
          </div>
        </>,
      ],
    },
  ];
}
