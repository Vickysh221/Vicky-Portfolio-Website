import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PROJECTS } from "./projectRegistry";
import { useI18n } from "./i18n/LanguageProvider.tsx";

const projects = PROJECTS;

// ─── Constants ────────────────────────────────────────────────────────────────

const cornerStyles: React.CSSProperties[] = [
  { top: "-1px", left: "-1px", borderTop: "8px solid #c8a96e", borderLeft: "8px solid #c8a96e" },
  { top: "-1px", right: "-1px", borderTop: "8px solid #c8a96e", borderRight: "8px solid #c8a96e" },
  { bottom: "-1px", left: "-1px", borderBottom: "8px solid #c8a96e", borderLeft: "8px solid #c8a96e" },
  { bottom: "-1px", right: "-1px", borderBottom: "8px solid #c8a96e", borderRight: "8px solid #c8a96e" },
];

const romans = ["I", "II", "III", "IV"];

// ─── Main Component ───────────────────────────────────────────────────────────

interface PortfolioProps {
  activeCard: number | null;
  onProjectClick: (i: number) => void;
  onCloseCard: () => void;
  showProjectDirectory?: boolean;
}

export default function Portfolio({ activeCard, onProjectClick, showProjectDirectory = true }: PortfolioProps) {
  const { text } = useI18n();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Close panels and reset selection when returning home
  useEffect(() => {
    if (isHome) return;
    setShowAbout(false);
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
        className="absolute top-20 right-8 z-30 text-right"
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

      {/* ── CENTER: Project Directory ── */}
      {showProjectDirectory && <div
        className="absolute z-20"
        style={{
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%) scale(1)",
          opacity: homeOpacity,
          pointerEvents: !isHome || activeCard !== null ? "none" : "all",
          transition: "opacity 0.38s cubic-bezier(0.16,1,0.3,1), transform 0.38s cubic-bezier(0.16,1,0.3,1)",
          width: "510px",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(200,169,110,0.3)",
            padding: "40px 40px 36px",
            position: "relative",
            background: "rgba(8,6,4,0.55)",
            backdropFilter: "blur(6px)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.9s 0.4s",
          }}
        >
          <div style={{ color: "#c8a96e", fontSize: "13px", letterSpacing: "0.3em", marginBottom: "24px" }}>
            SELECTED WORKS
          </div>

          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                if (p.disabled) return;
                onProjectClick(i);
              }}
              onMouseEnter={() => {
                if (p.disabled) return;
                setHoveredNav(i);
              }}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "baseline",
                gap: "22px",
                padding: "10px 0",
                background: "none",
                border: "none",
                cursor: p.disabled ? "default" : "pointer",
                borderBottom: "1px solid rgba(200,169,110,0.08)",
                transition: "all 0.25s",
                opacity: p.disabled ? 0.42 : 1,
              }}
            >
              <span
                style={{
                  color: p.disabled ? "#3a3126" : activeCard === i ? "#c8a96e" : "#4a3a28",
                  fontSize: "13px",
                  width: "28px",
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
                    p.disabled
                      ? "#5f5340"
                      : activeCard === i
                      ? "#f0e8d8"
                      : hoveredNav === i
                      ? "#d4c4a0"
                      : "#8a7a60",
                  fontSize: "18px",
                  textAlign: "left",
                  lineHeight: 1.3,
                  transition: "color 0.25s",
                  letterSpacing: "0.02em",
                }}
              >
                {text(p.title)}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: p.disabled ? "#4f4537" : activeCard === i ? p.color : "#3a2a18",
                  fontSize: "13px",
                  flexShrink: 0,
                  transition: "color 0.25s",
                }}
              >
                {p.disabled ? "敬请期待" : p.year}
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
      </div>}

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
