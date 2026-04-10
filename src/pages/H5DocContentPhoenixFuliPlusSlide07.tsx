import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle } from './h5Styles';

export function getPhoenixFuliPlusSlide07Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'asset-layer-and-roadmap',
      numeral: '',
      title: 'Towards an agentic project',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>项目当前阶段：从 semantic layer 走向 agent design</h2>
          <p style={paragraphStyle()}>
            当前项目已经从“参数 demo + 最近邻展示”推进到“带有 design state、反馈闭环、真实资产匹配和 early-round probing 实验的机制原型”。对我来说，这一步最重要的变化不是系统终于“更像一个 agent”了，而是 rug-specific semantic layer 已经逐渐成形：用户输入、参考图、品牌 cue 和多轮反馈，第一次可以被压到同一组可比较、可收束的中间状态里。
          </p>
          <p style={paragraphStyle()}>
            也正因为这层结构开始稳定，agent 的下一步才第一次变得可被精确定义。它不再只是一个会话壳，也不只是负责理解泛化意图，而是要开始承担更清楚的 orchestration 工作：判断当前反馈落在哪个对象层级、区分 lane switch 与 same-lane refinement、识别哪些槽位已经收束成 locked DNA、决定这一轮应继续 exploration 还是进入 second-stage control，并在用户偏好与品牌 DNA 之间组织更稳定的 semantic reinforcement。
          </p>
          <p style={paragraphStyle()}>
            所以这部分工作的意义，不是回头证明“要不要用 agent”，而是基于现有系统状态，开始设计一个真正服务于 semantic control 的多轮 design agent。技术上，前一阶段已经把 intent recognition、semantic mapping、slot matching、brand cue retrieval 和 variation control 的基础对象做了出来；下一阶段要解决的，是 agent 如何调度这些对象，让一个方向在多轮过程中被持续解释、被策略化推进，并最终收束成更可控的设计判断。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>下一步 agent design 不再是泛化助手，而是 semantic orchestration layer</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>semantic layer 已经把用户输入、参考图、品牌 cue 和多轮反馈压成可操作的 design state</ListItem>
              <ListItem accent={accentColor}>agent 的职责开始清楚：解释当前反馈落点、管理阶段切换、选择 control mode、推动方向逐步收束</ListItem>
              <ListItem accent={accentColor}>技术重点不再只是生成更多结果，而是让 retrieval、semantic matching 和 variation control 形成连续的多轮策略层</ListItem>
              <ListItem accent={accentColor}>因此，下一阶段不是继续抽象讨论 agent，而是把它具体设计成一个服务于 semantic control 的 design orchestration system</ListItem>
            </ul>
          </div>
        </>,
      ],
    },
  ];
}
