import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubPage {
  route: string;
  label: string;
  numeral: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  desc: string;
  color: string;
  route: string;
  subPages: SubPage[];
}

interface ExperienceDetail {
  company: string;
  shortName: string;
  role: string;
  period: string;
  sections: { title: string; bullets: string[] }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "01",
    title: "JIDU HMI",
    subtitle: "JIDU Automotive · HMI Design",
    year: "2022–2024",
    tags: ["Unity3D", "HMI", "3D Map", "Camera Rig", "ADAS"],
    desc: "3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU's in-car HMI. Prototyped directly in Unity3D.",
    color: "#c8a96e",
    route: "/jidu-hmi",
    subPages: [
      { route: "/jidu-hmi/unity3d-camera", label: "Unity3D Camera System", numeral: "I" },
      { route: "/jidu-hmi/3d-map", label: "3D Map Strategy", numeral: "II" },
      { route: "/jidu-hmi/avp", label: "AVP Auto-Park", numeral: "III" },
      { route: "/jidu-hmi/minimap-camera", label: "Minimap Camera", numeral: "IV" },
      { route: "/jidu-hmi/3d-map-gesture", label: "3D Map Gestures", numeral: "V" },
      { route: "/jidu-hmi/simo-agent-parks", label: "SIMO Agent Parks", numeral: "VI" },
    ],
  },
  {
    id: "02",
    title: "Phoenix AI Platform",
    subtitle: "Phoenix AI · SaaS",
    year: "2025",
    tags: ["AI Pipeline", "SaaS", "Three.js", "Vue3", "Agent UX"],
    desc: "Generative 3D interior design pipeline — upload, analyze, edit, render. Async task polling, rollback, multi-tenant asset isolation, and Fuli+ carpet agent.",
    color: "#7a9e8e",
    route: "/phoenix-ai",
    subPages: [
      { route: "/phoenix-ai/overview", label: "Platform Overview", numeral: "I" },
      { route: "/phoenix-ai/component-framework", label: "Component Framework", numeral: "II" },
      { route: "/phoenix-ai/key-pages", label: "Key Pages", numeral: "III" },
      { route: "/phoenix-ai/semantic-system", label: "Semantic System", numeral: "IV" },
      { route: "/phoenix-ai/fuli-plus", label: "Fuli+ Agent", numeral: "V" },
    ],
  },
  {
    id: "03",
    title: "Personal Projects",
    subtitle: "Independent Work",
    year: "2024–2025",
    tags: ["Multi-Agent", "Language Learning", "Unreal", "Game Design"],
    desc: "Side projects exploring AI agent architecture, procedural city generation, and game design — built for learning, curiosity, and fun.",
    color: "#8b7db5",
    route: "/personal",
    subPages: [
      { route: "/personal/simbiocity", label: "Simbiocity", numeral: "I" },
      { route: "/personal/fortnite-demo", label: "Fortnite Demo", numeral: "II" },
      { route: "/personal/language-diary", label: "Language Diary Agent", numeral: "III" },
    ],
  },
];

const experienceDetails: ExperienceDetail[] = [
  {
    company: "上海集度汽车有限公司",
    shortName: "上海集度汽车",
    role: "HMI交互设计师",
    period: "2022.06 – 2024.12",
    sections: [
      {
        title: "3D运镜体系和框架体系的搭建",
        bullets: [
          "主导定义3D地图场景镜头并在Unity3D中构建导航3D地图虚拟相机与视角体系，设计不同状态下的镜头规则、过渡逻辑与打断机制，确保多种功能/行为在同一世界中可并存、可切换",
          "通过控制运镜频率与幅度，确保关键信息优先呈现并保持场景视觉连续性，使导航、辅助驾驶等功能在同一空间界面中稳定协同",
          "主导设计3D手势操作体系，将用户点击/滑动等行为转换为场景交互/平移/缩放/旋转等逻辑，并拓展自定义镜头系统",
          "基于屏幕空间与世界空间的映射关系，设计车机HMI元素在3D场景中的定位与交互规则，并定义3D场景在屏幕中的构图与布局逻辑",
          "参与系统安卓应用组件向Unity3D迁移的框架更新，基于基本框架设计原则定义多相机视窗的UNITY系统HMI框架体系",
          "参与梳理辅助驾驶场景元素资源库，并在Unity3D中进行分场景的资产管理，便于团队内部项目的迭代和维护",
        ],
      },
      {
        title: "辅助驾驶流程状态设计和3D化验证",
        bullets: [
          "参与设计低速辅助驾驶（自动泊车和路径学习/使用）和高速辅助驾驶（领航辅助驾驶/主动安全）的核心用户体验流程中的关键驾驶节点",
          "流程拆解化并设计各状态3D场景驾驶交互元素机制和表现，根据地图场景定义功能耦合和互斥关系",
          '参与梳理功能流程中核心3D交互元素的状态流转，设计状态叠加下的元素显示"语言"体系，如低速辅助驾驶车位类型在不同功能状态下的流转',
          "在UNITY中还原低速/高速辅助驾驶中流程和元素状态转换策略机制，满足设计先期验证",
        ],
      },
      {
        title: "3D地图和驾驶业务策略",
        bullets: [
          "设计车机3D地图的信息呈现策略，融合感知数据、地图数据与导航信息，在统一空间界面中建立元素层级与显示规则，帮助驾驶者快速理解车辆环境与驾驶决策信息",
          "基于感知和地图融合的3D地图设计方向，从设计体验侧和上下游紧密配合打造沉浸地图体验，涵盖成图元素绘制规则、地图过渡策略、元素渲染策略及异常处理",
          "基于SLAM成图元素原理，为停车场用户泊入/出自行标记的停车位设计游戏化元素交互流程，让用户能通过屏幕空间完成路径学习、自动寻路、选车位和自动泊车等操作",
        ],
      },
      {
        title: "多智能体系统交互概念设计 · Jidu 4.0 Agent Platform",
        bullets: [
          "负责多Agent交互平台的界面与交互逻辑设计，构建全屏实验室概念界面",
          "探索MBTI人格化的车载智能体概念设计，以及依托智能体平台的Agent Parks概念设计",
        ],
      },
    ],
  },
  {
    company: "上海奇趣妙想人工智能有限公司",
    shortName: "奇趣妙想AI",
    role: "交互设计师兼产品经理",
    period: "2025.01 – 2025.12",
    sections: [
      {
        title: "3D户型AI生成与资产管理系统",
        bullets: [
          "将复杂3D/图像处理流程抽象为标准化生成pipeline，构建完整户型上传/分析/编辑/修改/生成/渲染流程",
          "状态机设计每个生成步骤可控、可中断、可回溯的交互系统，支持历史记录反复生成",
          "设计支持多客户调用的SaaS架构，支持租户资产隔离与复用",
          "与算法团队共同定义2D/3D混合渲染pipeline、异步任务轮询机制、生成超时与失败回滚机制",
          "与3D前端渲染工程师共同设计和开发基于three/vue3/typescript的产品项目架构",
          "主导2/3D流程交互设计并定义产品UI资产设计和管理，产品实现行业客户可快速部署AI试装能力，预期提高电商场景转化率",
        ],
      },
      {
        title: "Fuli+ AI Agent 产品与生成式互动系统设计",
        bullets: [
          "与地毯设计师、销售多轮沟通明确行业对AI图像模型和智能体的核心诉求，参与定制产品核心架构",
          "设计AI Agent驱动的生成式互动地毯智能生成产品（Web/原型），通过对话交互帮助用户逐步明确设计需求，并生成可编辑的地毯图案方案",
          "构建基于槽位（Slot）的生成逻辑和语义匹配机制，将用户输入拆解为风格、色彩、图案等结构化参数，降低生成的不确定性",
          "负责AI Agent界面交互设计，并参与前端逻辑与组件实现，确保生成结果与用户输入之间具备可解释性",
          "验证了通过结构化约束可显著提升生成式AI在产品中的稳定性与可控性，用户能够通过多轮对话逐步收敛需求",
        ],
      },
      {
        title: "国际合作与多语沟通",
        bullets: [
          "独立负责海内外潜在客户沟通与交付，协调设计策略与国际化标准",
        ],
      },
    ],
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const cornerStyles: React.CSSProperties[] = [
  { top: "-1px", left: "-1px", borderTop: "8px solid #c8a96e", borderLeft: "8px solid #c8a96e" },
  { top: "-1px", right: "-1px", borderTop: "8px solid #c8a96e", borderRight: "8px solid #c8a96e" },
  { bottom: "-1px", left: "-1px", borderBottom: "8px solid #c8a96e", borderLeft: "8px solid #c8a96e" },
  { bottom: "-1px", right: "-1px", borderBottom: "8px solid #c8a96e", borderRight: "8px solid #c8a96e" },
];

const romans = ["I", "II", "III"];

const skills: [string, string][] = [
  ["Unity 3D", "熟练"],
  ["AI Coding", "熟练"],
  ["Three.js / Vue3", "熟练"],
  ["Figma / Unreal", "掌握"],
  ["English", "流利"],
  ["German", "日常会话"],
];

// ─── Reusable Components ──────────────────────────────────────────────────────

function CircleArrowButton({
  onClick,
  size = 26,
}: {
  onClick: () => void;
  size?: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: hov ? "rgba(200,169,110,0.07)" : "transparent",
        border: `1px solid ${hov ? "rgba(200,169,110,0.85)" : "rgba(200,169,110,0.28)"}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: hov ? "0 0 14px rgba(200,169,110,0.12)" : "none",
      }}
    >
      <svg
        width={size * 0.44}
        height={size * 0.44}
        viewBox="0 0 11 11"
        fill="none"
        style={{
          transform: hov ? "translateX(1.5px)" : "translateX(0)",
          transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <path
          d="M1.5 5.5H9.5M6 2.5L9.5 5.5L6 8.5"
          stroke={hov ? "#c8a96e" : "rgba(200,169,110,0.48)"}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function CloseButton({
  onClick,
  size = 22,
}: {
  onClick: () => void;
  size?: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: hov ? "rgba(200,169,110,0.07)" : "transparent",
        border: `1px solid ${hov ? "rgba(200,169,110,0.55)" : "rgba(200,169,110,0.15)"}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: hov ? "#c8a96e" : "#6a5a40",
        fontSize: Math.round(size * 0.6) + "px",
        lineHeight: 1,
        transition: "all 0.25s",
        fontFamily: "Georgia, serif",
      }}
    >
      ×
    </button>
  );
}

// ─── Experience Detail Panel ──────────────────────────────────────────────────

function ExperienceDetailPanel({
  exp,
  onClose,
}: {
  exp: ExperienceDetail;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        zIndex: 40,
        perspective: "1000px",
        width: "720px",
        maxWidth: "92vw",
      }}
    >
      <div
        className="panel-enter-3d"
        style={{
          background: "rgba(8,6,4,0.93)",
          border: "1px solid rgba(200,169,110,0.28)",
          backdropFilter: "blur(14px)",
          position: "relative",
          maxHeight: "78vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {cornerStyles.map((cs, i) => (
          <div
            key={i}
            style={{ position: "absolute", width: 10, height: 10, opacity: 0.65, ...cs }}
          />
        ))}

        <div
          style={{
            padding: "24px 28px 18px",
            borderBottom: "1px solid rgba(200,169,110,0.08)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: "#c8a96e", fontSize: "9px", letterSpacing: "0.3em", marginBottom: "10px" }}>
                WORK EXPERIENCE
              </div>
              <div style={{ color: "#f0e8d8", fontSize: "18px", fontStyle: "italic", lineHeight: 1.2 }}>
                {exp.company}
              </div>
              <div style={{ color: "#c0b090", fontSize: "11px", letterSpacing: "0.08em", marginTop: "5px" }}>
                {exp.role}
              </div>
              <div style={{ color: "#6a5a40", fontSize: "10px", marginTop: "3px" }}>
                {exp.period}
              </div>
            </div>
            <CloseButton onClick={onClose} size={24} />
          </div>
        </div>

        <div className="panel-scroll" style={{ padding: "20px 28px 26px", overflowY: "auto", flex: 1 }}>
          {exp.sections.map((section, si) => (
            <div key={si} style={{ marginBottom: si < exp.sections.length - 1 ? "22px" : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    background: "#c8a96e",
                    borderRadius: "50%",
                    flexShrink: 0,
                    opacity: 0.75,
                  }}
                />
                <span
                  style={{
                    color: "#c8a96e",
                    fontSize: "9.5px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {section.title}
                </span>
              </div>
              <div style={{ paddingLeft: "11px", borderLeft: "1px solid rgba(200,169,110,0.1)" }}>
                {section.bullets.map((bullet, bi) => (
                  <div
                    key={bi}
                    style={{ display: "flex", gap: "10px", marginBottom: bi < section.bullets.length - 1 ? "8px" : 0 }}
                  >
                    <span
                      style={{ color: "#4a3a28", flexShrink: 0, fontSize: "11px", lineHeight: "1.85", userSelect: "none" }}
                    >
                      –
                    </span>
                    <span style={{ color: "#a09070", fontSize: "11.5px", lineHeight: 1.85 }}>
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface PortfolioProps {
  activeCard: number | null;
  onProjectClick: (i: number) => void;
  onCloseCard: () => void;
}

export default function Portfolio({ activeCard, onProjectClick }: PortfolioProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [activeExp, setActiveExp] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Close panels and reset selection when returning home
  useEffect(() => {
    if (isHome) return;
    setShowAbout(false);
    setShowExp(false);
    setActiveExp(null);
  }, [isHome]);

  // Fade all home UI when not on home route or when a card is docked
  const homeOpacity = isHome && activeCard === null ? 1 : 0;
  const homePointerEvents = isHome && activeCard === null ? "all" : "none";
  const homeTransition = "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      className="absolute inset-0 z-20"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        pointerEvents: "none",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Warm vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,3,1,0.75) 100%)",
        }}
      />

      {/* ── TOP LEFT: Name + tagline ── */}
      <div
        className="absolute top-8 left-8 z-30"
        style={{
          opacity: mounted ? homeOpacity : 0,
          transform: mounted ? "translateY(0)" : "translateY(-12px)",
          transition: homeTransition,
          pointerEvents: homePointerEvents,
        }}
      >
        <div style={{ color: "#c8a96e", fontSize: "10px", letterSpacing: "0.25em", marginBottom: "6px" }}>
          PORTFOLIO · 2025
        </div>
        <div style={{ color: "#f0e8d8", fontSize: "28px", lineHeight: 1.1, fontStyle: "italic" }}>
          寿心悦
        </div>
        <div style={{ color: "#a09070", fontSize: "11px", letterSpacing: "0.12em", marginTop: "4px" }}>
          Xinyue Shou
        </div>
        <div style={{ width: "32px", height: "1px", background: "#c8a96e", margin: "10px 0", opacity: 0.6 }} />
        <div style={{ color: "#9a8870", fontSize: "10px", letterSpacing: "0.08em", lineHeight: 1.6, maxWidth: "180px" }}>
          AI · HMI · 3D · Product
          <br />
          Interaction Design
        </div>
      </div>

      {/* ── TOP RIGHT: About ── */}
      <div
        className="absolute top-8 right-8 z-30 text-right"
        style={{
          opacity: mounted ? homeOpacity : 0,
          transform: mounted ? "translateY(0)" : "translateY(-12px)",
          transition: homeTransition,
          pointerEvents: homePointerEvents,
        }}
      >
        <button
          onClick={() => setShowAbout(!showAbout)}
          style={{
            color: showAbout ? "#c8a96e" : "#9a8870",
            fontSize: "10px",
            letterSpacing: "0.2em",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.3s",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c8a96e")}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = showAbout ? "#c8a96e" : "#9a8870")
          }
        >
          ABOUT
        </button>

        {showAbout && (
          <div
            style={{
              marginTop: "14px",
              padding: "16px",
              background: "rgba(14,12,9,0.88)",
              border: "1px solid rgba(200,169,110,0.25)",
              maxWidth: "240px",
              color: "#c0b090",
              fontSize: "11px",
              lineHeight: 1.7,
              backdropFilter: "blur(8px)",
              textAlign: "left",
            }}
          >
            <div style={{ color: "#c8a96e", marginBottom: "8px", letterSpacing: "0.12em" }}>
              UCL · MSc Game Design & Urban Design
            </div>
            AI × HMI × 3D 方向综合产品设计师。在智能驾驶和AI生成系统领域有4年落地经验，擅长将复杂系统抽象为可理解的用户交互。
            <div
              style={{
                marginTop: "10px",
                borderTop: "1px solid rgba(200,169,110,0.15)",
                paddingTop: "10px",
                color: "#7a6a50",
              }}
            >
              xinyueshou221@outlook.com
              <br />
              (+86) 18502179697
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM LEFT: Experience ── */}
      <div
        className="absolute bottom-8 left-8 z-30"
        style={{
          opacity: mounted ? homeOpacity : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transition: homeTransition,
          pointerEvents: homePointerEvents,
          perspective: "600px",
        }}
      >
        <button
          onClick={() => setShowExp(!showExp)}
          style={{
            color: showExp ? "#c8a96e" : "#9a8870",
            fontSize: "10px",
            letterSpacing: "0.2em",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.3s",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c8a96e")}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = showExp ? "#c8a96e" : "#9a8870")
          }
        >
          EXPERIENCE
        </button>

        {showExp && (
          <div
            className="mini-panel-enter"
            style={{
              marginTop: "14px",
              padding: "14px 12px 14px 16px",
              background: "rgba(14,12,9,0.88)",
              border: "1px solid rgba(200,169,110,0.25)",
              backdropFilter: "blur(8px)",
              position: "relative",
              minWidth: "240px",
              pointerEvents: "auto",
            }}
          >
            <div style={{ position: "absolute", top: "8px", right: "8px" }}>
              <CloseButton onClick={() => setShowExp(false)} size={18} />
            </div>

            {experienceDetails.map((exp, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: i < experienceDetails.length - 1 ? "14px" : 0,
                  paddingRight: "4px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#c8a96e", fontSize: "11px", letterSpacing: "0.06em" }}>
                    {exp.shortName}
                  </div>
                  <div style={{ color: "#c0b090", fontSize: "12px", marginTop: "2px" }}>{exp.role}</div>
                  <div style={{ color: "#6a5a40", fontSize: "10px", marginTop: "2px" }}>{exp.period}</div>
                </div>
                <CircleArrowButton
                  onClick={() => {
                    setActiveExp(i);
                    setShowExp(false);
                  }}
                  size={26}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── BOTTOM RIGHT: Skills ── */}
      <div
        className="absolute bottom-8 right-8 z-30 text-right"
        style={{
          opacity: mounted ? homeOpacity : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transition: homeTransition,
          pointerEvents: homePointerEvents,
        }}
      >
        <div style={{ color: "#9a8870", fontSize: "10px", letterSpacing: "0.2em", marginBottom: "10px" }}>
          SKILLS
        </div>
        {skills.map(([skill, level]) => (
          <div key={skill} style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "4px" }}>
            <span style={{ color: "#6a5a40", fontSize: "9px" }}>{level}</span>
            <span style={{ color: "#c0b090", fontSize: "10px" }}>{skill}</span>
          </div>
        ))}
      </div>

      {/* ── CENTER: Project Directory ── */}
      <div
        className="absolute z-20"
        style={{
          top: "50%",
          left: "50%",
          transform:
            activeExp !== null
              ? "translateX(-50%) translateY(-50%) scale(0.93)"
              : "translateX(-50%) translateY(-50%) scale(1)",
          opacity: activeExp !== null ? 0 : homeOpacity,
          pointerEvents: activeExp !== null || !isHome || activeCard !== null ? "none" : "all",
          transition: "opacity 0.38s cubic-bezier(0.16,1,0.3,1), transform 0.38s cubic-bezier(0.16,1,0.3,1)",
          width: "340px",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(200,169,110,0.3)",
            padding: "28px 28px 24px",
            position: "relative",
            background: "rgba(8,6,4,0.55)",
            backdropFilter: "blur(6px)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.9s 0.4s",
          }}
        >
          <div style={{ color: "#c8a96e", fontSize: "9px", letterSpacing: "0.3em", marginBottom: "16px" }}>
            SELECTED WORKS
          </div>

          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onProjectClick(i)}
              onMouseEnter={() => setHoveredNav(i)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "baseline",
                gap: "14px",
                padding: "6px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderBottom: "1px solid rgba(200,169,110,0.08)",
                transition: "all 0.25s",
              }}
            >
              <span
                style={{
                  color: activeCard === i ? "#c8a96e" : "#4a3a28",
                  fontSize: "9px",
                  width: "18px",
                  textAlign: "right",
                  fontStyle: "italic",
                  flexShrink: 0,
                  transition: "color 0.25s",
                }}
              >
                {romans[i]}
              </span>
              <span
                style={{
                  color:
                    activeCard === i
                      ? "#f0e8d8"
                      : hoveredNav === i
                      ? "#d4c4a0"
                      : "#8a7a60",
                  fontSize: "13px",
                  textAlign: "left",
                  lineHeight: 1.3,
                  transition: "color 0.25s",
                  letterSpacing: "0.02em",
                }}
              >
                {p.title}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: activeCard === i ? p.color : "#3a2a18",
                  fontSize: "9px",
                  flexShrink: 0,
                  transition: "color 0.25s",
                }}
              >
                {p.year}
              </span>
            </button>
          ))}

          {cornerStyles.map((style, i) => (
            <div
              key={i}
              style={{ position: "absolute", width: "10px", height: "10px", opacity: 0.7, ...style }}
            />
          ))}
        </div>
      </div>

      {/* ── Experience Detail Panel ── */}
      {activeExp !== null && isHome && (
        <ExperienceDetailPanel
          key={activeExp}
          exp={experienceDetails[activeExp]}
          onClose={() => setActiveExp(null)}
        />
      )}

      {/* ── Vertical label ── */}
      <div
        className="absolute z-20"
        style={{
          top: "50%",
          right: "28px",
          transform: "translateY(-50%) rotate(90deg)",
          color: "#3a2a18",
          fontSize: "9px",
          letterSpacing: "0.25em",
          opacity: mounted && isHome ? 1 : 0,
          transition: "opacity 1.2s 1s",
          pointerEvents: "none",
        }}
      >
        SELECTED WORKS
      </div>
    </div>
  );
}
