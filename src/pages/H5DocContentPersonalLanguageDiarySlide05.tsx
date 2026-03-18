import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { gridListStyle, infoTagStyle, kickerStyle, mediaBlockStyle, paragraphStyle, smallMetaStyle, subtitleStyle, ListItem } from './h5Styles';

function listStyle(): CSSProperties {
  return {
    ...gridListStyle(8),
    marginTop: '10px',
  };
}

export function getPersonalLanguageDiarySlide05Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'language-diary-review-and-risks',
      numeral: '05',
      title: '我的反思龙虾对我项目的评估',
      blocks: [
        <>
          <div style={kickerStyle(accentColor)}>System Evaluation</div>
          <p style={paragraphStyle()}>
            当前项目已经体现出一套基础的系统执行质量控制框架。整体体验被拆分为
            `morning-recall`、`daytime-capture` 和 `night-wrapup` 三个阶段，并通过
            orchestrator 与 session store 按日期和阶段分别管理上下文，保证晨间唤醒、
            白天自由对话和夜间整理之间的体验边界清晰。
          </p>
          <p style={paragraphStyle()}>
            多 agent 的职责也相对稳定：白天负责表达捕捉，早晨负责召回，晚上负责整理与教学，
            日记与知识模块分别承担叙事沉淀和知识对象化，形成了比较明确的协作结构。
          </p>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>已有的执行质量控制</h2>
          <div style={mediaBlockStyle()}>
            <div style={smallMetaStyle()}>Context and Stage Boundaries</div>
            <p style={paragraphStyle()}>
              在执行质量上，系统已经具备一些直接可见的约束机制。多轮对话并不是简单堆叠历史，
              而是通过相关性筛选、历史裁剪、重复微问题去重和记忆注入门控来控制上下文质量，
              避免 agent 偏题、重复追问或被长记忆带偏。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>stage 切分保证 morning / daytime / night 的体验边界清晰</ListItem>
              <ListItem accent={accentColor}>orchestrator 与 session store 按日期和阶段管理上下文</ListItem>
              <ListItem accent={accentColor}>相关性筛选、历史裁剪与去重机制降低上下文污染</ListItem>
              <ListItem accent={accentColor}>记忆注入门控避免长记忆把当下对话带偏</ListItem>
            </ul>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>资产如何形成闭环</h2>
          <div style={mediaBlockStyle()}>
            <div style={infoTagStyle(accentColor, 'tech')}>Write, Recall, Write Back</div>
            <p style={paragraphStyle()}>
              记忆机制也不仅停留在存储层。Event Anchor 会被真实写入、合并、排序，并在 Morning Wake 中再次被选择和使用；
              使用后还会更新 `recallCount` 和 `lastUsedAt`，说明记忆已经形成了写入、召回、回写的闭环。
            </p>
            <p style={paragraphStyle()}>
              Knowledge 资产同样不是一次性输出，它会被保存为结构化卡片，并在 quiz、recall、night wrapup 等后续阶段再次消费。
              Diary 则把白天对话整理成第一人称叙事，并在保存后重新回流为 event anchor，使结构化记忆和叙事记忆形成双向联动。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>Event Anchor 已经进入真实写入、召回和回写循环</ListItem>
              <ListItem accent={accentColor}>Knowledge card 会在多个后续阶段被重复消费</ListItem>
              <ListItem accent={accentColor}>Diary 不只是输出文本，也会再次进入结构化记忆链路</ListItem>
            </ul>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>异常处理和 Fallback</h2>
          <div style={mediaBlockStyle()}>
            <div style={smallMetaStyle()}>Graceful Degradation</div>
            <p style={paragraphStyle()}>
              异常处理和 fallback 机制在当前项目中也有明确体现。DaytimeCaptureAgent 在主生成失败时会逐层退化到最小可用回复；
              MorningWakeAgent 在 anchor 或生成链路不可用时会回退到确定性问题或通用问题，并显式标记 `fallbackUsed`；
              DiaryAgent 在生成失败时会退回基于用户原话拼接的日记，保证输出不为空且不虚构内容；
              KnowledgeAgent 的多种 mode 也都具备 fallback card。
            </p>
            <p style={paragraphStyle()}>
              整体上，系统已经具备“关键链路不断、异常时降级运行”的基本稳定性。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>DaytimeCaptureAgent 有最小可用回复兜底</ListItem>
              <ListItem accent={accentColor}>MorningWakeAgent 会回退到确定性或通用问题</ListItem>
              <ListItem accent={accentColor}>DiaryAgent 失败时仍坚持基于用户原话输出</ListItem>
              <ListItem accent={accentColor}>KnowledgeAgent 的不同 mode 都有 fallback card</ListItem>
            </ul>
          </div>
        </>,
        <>
          <h2 style={subtitleStyle(accentColor)}>下一步真正的风险</h2>
          <div style={mediaBlockStyle()}>
            <div style={infoTagStyle(accentColor, 'source')}>Future System Risks</div>
            <p style={paragraphStyle()}>
              与此同时，项目也清楚暴露出未来复杂化后的主要风险。随着记忆数量增加，召回可能出现不稳定，
              导致相关内容没有被准确取回；相似事件或相似表达可能在不同层级被重复捕捉和重复调用；
              一些真正重要但表达不显著的记忆，也可能在阈值过滤和启发式排序中被遗漏。
            </p>
            <p style={paragraphStyle()}>
              也就是说，这个项目当前已经不只是功能拼接，而是进入了一个更典型的多 agent 系统阶段：
              功能链路基本跑通，下一步的重点将转向召回稳定性、重复控制、重要性判断和系统级质量评估。
            </p>
            <ul style={listStyle()}>
              <ListItem accent={accentColor}>召回稳定性会随着记忆规模增长而成为核心问题</ListItem>
              <ListItem accent={accentColor}>跨层级的重复捕捉与重复调用需要更严格控制</ListItem>
              <ListItem accent={accentColor}>低显著但高价值的记忆可能在当前排序机制中被漏掉</ListItem>
              <ListItem accent={accentColor}>系统级评估将比单点功能实现更重要</ListItem>
            </ul>
          </div>
        </>,
      ],
    },
  ];
}
