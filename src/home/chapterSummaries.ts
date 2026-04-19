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
    '把语言学习从"任务"重新组织为"抒写"——让多个智能体成为表达的陪伴者，而非纠错的监工。',
  '/agentic-design-development/fuli-plus':
    '把创造权一部分交给系统，让一块地毯的生成，从"由人到物"，变成"由人、材料、算法三方反复商榷"。',
  '/agentic-design-development/ai-interior-system':
    '把 AI 室内设计从“生成一个房间”改写成“理解一种生活方式”——先建立用户、空间与家具之间的语义结构，再让生成能力进入产品。',
  '/agentic-design-development/driving-authority-contracts':
    '座舱不再只是回应指令，而是在默默的注视中，慢慢建立对"你此刻是谁"的理解。',
  '/agentic-design-development/agentic-driving':
    '自动驾驶的分歧不在能力强弱，而在它要成为专家，还是成为那个最像你的人——两种假设，两种未来。',
  '/agentic-design-development/simo-agent-system':
    '一个把语言、记忆与行动放在同一张结构网上的多智能体系统——让协作不是"各自跑流程"，而是"共同在场"。',

  // ── Project II · Academic Gamification
  '/academic-gamification/companions':
    '用游戏化的空间让音乐成为一段可以走进去的关系——你不是在听它，而是在它里面与人相遇。',

  // ── Project III · JIDU HMI
  '/jidu-hmi/unity3d-camera':
    '一套不用"切镜头"就能完成全场景过渡的虚拟相机架构——让地图在驾驶者注意力中，永远是连续的。',
  '/jidu-hmi/3d-map':
    '2D 的清晰与 3D 的情境之间，不是取舍，而是根据驾驶者当下需要什么，去持续切换的语法。',
  '/jidu-hmi/avp':
    '在车替你停车的那几十秒里，如何让你既相信它，又始终知道自己可以随时接管。',
  '/jidu-hmi/dashboard-layout':
    '驾驶区不是仪表的总和，而是一套按"驾驶者当下在做什么"组织起来的注意力编排。',
  '/jidu-hmi/minimap-camera':
    '当机器对自己位置并不完全确定时，地图要做的不是装作确定，而是把这份不确定诚实地表达给人。',
  '/jidu-hmi/3d-map-gesture':
    '在方向盘和屏幕之间，留出一组让手自然落下的手势——让 3D 地图的操控，像翻书，而不是像打字。',
  '/jidu-hmi/3d-map-driving-component-states':
    '把地图、驾驶组件、系统状态当作一个有节奏的整体去设计——不是拼起来的界面，而是会呼吸的驾驶舱。',
};

export function getChapterSummary(route: string): string {
  return (
    CHAPTER_SUMMARIES[route] ??
    '这个章节的摘要正在生成——欢迎点击进入，亲自读它一遍。'
  );
}
