/**
 * One-line Chinese summaries for each sub-chapter, voiced as if an AI agent
 * were briefing the reader in a terminal session. Key is the sub-page route.
 *
 * Keep each summary to a single sentence. Avoid headline-ese;
 * aim for the texture of a thoughtful reading note.
 */
export const CHAPTER_SUMMARIES: Record<string, string> = {
  // ── Project I · Agentic Design · Prototyping
  '/agentic-design-development/language-diary':
    '把语言学习从"任务"重新组织为"抒写"——让多个智能体成为表达的陪伴者，让协作是"共同在场"。',
  '/agentic-design-development/aha-moment':
    '把原来埋在 Language Diary 里的 showcase 单独抽出来，重新说明 agent 如何在用户递交与情境感知两种参与关系里，把高价值片段变成不同强度的前台介入。',
  '/agentic-design-development/fuli-plus':
    '把创造权一部分交给系统，让一块地毯的生成，从"由人到物"，变成"由人、材料、算法三方反复商榷"。',
  '/agentic-design-development/ai-interior-system':
    '把 AI 室内设计从“生成一个房间”改写成“理解一种生活方式”——先建立用户、空间与家具之间的语义结构，再让生成能力进入产品。',
  '/agentic-design-development/personal-os':
    '把 personal OS 定义为 right aspects of memory × right aspects of agents 形成的身份切片协调机制，再用两个 skill 展示它如何进入判断与写回。',
  '/agentic-design-development/driving-authority-contracts':
    '座舱不再只是回应指令，而是在默默的注视中，慢慢建立对"你此刻是谁"的理解。',
  '/agentic-design-development/agentic-driving':
    '自动驾驶的分歧不在能力强弱，而在它要成为专家，还是成为那个最像你的人——两种假设，两种未来。',
  '/agentic-design-development/simo-agent-system':
    '一把车机里的 agent 从零散功能提升成一个可被看见的平台系统——身份、能力组织、应用生态与创建流程第一次被放进同一套沉浸式界面里。',

  // ── Project II · Academic Gamification
  '/academic-gamification/companions':
    '用游戏化的空间让音乐成为一段可以走进去的关系——你不是在听它，而是在它里面与人相遇。',

  // ── Project III · JIDU HMI
  '/jidu-hmi/unity3d-camera':
    '共驾地图：把一镜到底从视觉效果变成连续视角——车始终像用同一双眼睛在看世界。',
  '/jidu-hmi/3d-map':
    '机器世界模型：把 2D/3D 地图融合从样式问题提升成机器如何看见、组织并分配注意力的前台。',
  '/jidu-hmi/avp':
    'AVP 协作模型：自动泊车不是机器独自完成，而是机器执行预设路径、人仍参与关键判断的关系设计。',
  '/jidu-hmi/dashboard-layout':
    '责任语言：辅助驾驶界面不是状态陈列，而是在短决策窗口里说明谁主导、谁知情、何时必须接管。',
  '/jidu-hmi/minimap-camera':
    '空间证据：SLAM 小地图让局部空间、路线和目标点变成可被确认的证据，而不是一张孤立的小地图。',
  '/jidu-hmi/3d-map-gesture':
    '共享视角：手势和自由视角不是操控加分项，而是让人进入机器感知视角、参与共同观察的入口。',
  '/jidu-hmi/3d-map-driving-component-states':
    '注意力本体：线、块、点不是视觉组件分类，而是把路线、感知体、车位和目标翻译成人可读的注意力单位。',
};

export function getChapterSummary(route: string): string {
  return (
    CHAPTER_SUMMARIES[route] ??
    '这个章节的摘要正在生成——欢迎点击进入，亲自读它一遍。'
  );
}
