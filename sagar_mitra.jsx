import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MapPin,
  Bell,
  Home,
  Compass,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Layers,
  Navigation,
  Waves,
  Fish,
  Wind,
  X,
  ArrowLeft,
  Anchor,
  Radio,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const C = {
  navy: "#071A33",
  navyDeep: "#04101F",
  ocean: "#0E3A63",
  oceanLight: "#155A8A",
  teal: "#1B8F94",
  tealBright: "#22A6A0",
  aqua: "#8FE3D6",
  aquaSoft: "#D8F3ED",
  ice: "#EAF3F6",
  white: "#FFFFFF",
  danger: "#E4572E",
  dangerDeep: "#B33A1E",
  amber: "#E8A33D",
  slate: "#5B7386",
  slateLight: "#9AB0BE",
  line: "rgba(255,255,255,0.14)",
};

const tamilFont =
  "'Noto Sans Tamil', 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif";

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function StatusPulse({ color = C.tealBright }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          background: color,
          opacity: 0.5,
          animation: "sm-pulse 1.8s ease-out infinite",
        }}
      />
      <span style={{ borderRadius: 999, width: 8, height: 8, background: color }} />
    </span>
  );
}

function Chip({ children, tone = "ghost" }) {
  const tones = {
    ghost: { background: "rgba(255,255,255,0.10)", color: C.ice, border: `1px solid ${C.line}` },
    danger: { background: "rgba(228,87,46,0.16)", color: "#FFD9C9", border: "1px solid rgba(228,87,46,0.4)" },
    demo: { background: "rgba(232,163,61,0.16)", color: "#FFE3B0", border: "1px solid rgba(232,163,61,0.4)" },
    solid: { background: C.tealBright, color: C.navyDeep, border: "none" },
  };
  return (
    <span
      style={{
        ...tones[tone],
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 999,
        letterSpacing: 0.2,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function BottomNav({ active, onNavigate }) {
  const items = [
    { key: "home", label: "முகப்பு", icon: Home },
    { key: "map", label: "வரைபடம்", icon: Compass },
    { key: "alerts", label: "எச்சரிக்கை", icon: Bell },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 78,
        background: "rgba(7,26,51,0.92)",
        backdropFilter: "blur(14px)",
        borderTop: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        zIndex: 30,
      }}
    >
      {items.slice(0, 2).map((it) => (
        <NavButton key={it.key} item={it} active={active === it.key} onNavigate={onNavigate} />
      ))}
      <button
        onClick={() => onNavigate("ask")}
        style={{
          width: 58,
          height: 58,
          borderRadius: 999,
          border: "none",
          marginTop: -30,
          background: `linear-gradient(155deg, ${C.tealBright}, ${C.teal})`,
          boxShadow: "0 10px 24px rgba(34,166,160,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Mic size={24} color={C.navyDeep} strokeWidth={2.2} />
      </button>
      {items.slice(2).map((it) => (
        <NavButton key={it.key} item={it} active={active === it.key} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function NavButton({ item, active, onNavigate }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onNavigate(item.key)}
      style={{
        background: "none",
        border: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        color: active ? C.aqua : C.slateLight,
        cursor: "pointer",
        width: 56,
      }}
    >
      <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
      <span style={{ fontSize: 10, fontFamily: tamilFont, fontWeight: active ? 700 : 500 }}>
        {item.label}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// PAGE 1 — Home / Ask
// ---------------------------------------------------------------------------

function HomePage({ stage, setStage, goResult, onNav }) {
  const steps = [
    { label: "மொழி புரிதல்", done: true },
    { label: "கேள்வி புரிதல்", done: true },
    { label: "வானிலை சரிபார்க்கிறது", done: stage === "done" },
    { label: "கடல் நிலை சரிபார்க்கிறது", done: stage === "done" },
    { label: "ஆபத்து சரிபார்க்கிறது", done: stage === "done" },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "18px 20px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: `linear-gradient(155deg, ${C.tealBright}, ${C.ocean})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Anchor size={17} color={C.white} strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: C.white, letterSpacing: 0.2 }}>
                SAGAR-MITRA
              </div>
              <div style={{ fontSize: 9.5, color: C.slateLight, marginTop: -1 }}>
                Agentic Marine Intelligence
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <StatusPulse />
            <span style={{ fontSize: 10.5, color: C.aqua, fontWeight: 700, letterSpacing: 0.3 }}>LIVE</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: C.slateLight, fontSize: 12 }}>
            <MapPin size={13} />
            <span>Rameswaram</span>
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: tamilFont,
              color: C.ice,
              background: "rgba(255,255,255,0.08)",
              padding: "3px 10px",
              borderRadius: 999,
              border: `1px solid ${C.line}`,
            }}
          >
            தமிழ்
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 20px 24px" }}>
        {stage === "idle" && (
          <>
            {/* Greeting */}
            <div style={{ marginTop: 8, marginBottom: 16 }}>
              <div style={{ fontFamily: tamilFont, fontSize: 24, fontWeight: 800, color: C.white }}>
                வணக்கம்
              </div>
              <div style={{ fontFamily: tamilFont, fontSize: 15.5, color: C.ice, marginTop: 4, fontWeight: 600 }}>
                இன்று கடல் எப்படி இருக்கிறது?
              </div>
              <div style={{ fontFamily: tamilFont, fontSize: 12.5, color: C.slateLight, marginTop: 6, lineHeight: 1.5 }}>
                கடலுக்கு செல்லும் முன் தேவையான தகவல்களை ஒரே இடத்தில் தெரிந்து கொள்ளுங்கள்.
              </div>
            </div>

            {/* Hero safety card */}
            <button
              onClick={goResult}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                cursor: "pointer",
                borderRadius: 22,
                padding: 18,
                background: `linear-gradient(160deg, ${C.dangerDeep} 0%, #7A2314 100%)`,
                boxShadow: "0 14px 30px rgba(179,58,30,0.35)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 130,
                  height: 130,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#FFD9C9", fontFamily: tamilFont }}>
                <Waves size={14} /> கடல் பாதுகாப்பு
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AlertTriangle size={20} color="#FFD9C9" />
                </div>
                <div style={{ fontFamily: tamilFont, fontSize: 20, fontWeight: 800, color: C.white, lineHeight: 1.25 }}>
                  இன்று செல்ல வேண்டாம்
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                <Chip tone="danger">HIGH RISK</Chip>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)" }}>IMD + INCOIS · 10:42 AM</div>
              </div>

              <div style={{ marginTop: 12, fontSize: 12.5, color: C.white, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, fontFamily: tamilFont }}>
                விவரங்களை பார்க்க <ChevronRight size={14} />
              </div>
            </button>

            {/* Voice assistant */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 26, marginBottom: 22 }}>
              <button
                onClick={() => setStage("listening")}
                style={{
                  width: 92,
                  height: 92,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: `radial-gradient(circle at 35% 30%, ${C.tealBright}, ${C.teal} 65%, ${C.ocean})`,
                  boxShadow: "0 0 0 8px rgba(34,166,160,0.10), 0 16px 34px rgba(27,143,148,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mic size={34} color={C.white} strokeWidth={2} />
              </button>
              <div style={{ fontFamily: tamilFont, fontSize: 14.5, fontWeight: 700, color: C.white, marginTop: 12 }}>
                கேளுங்கள்
              </div>
              <div style={{ fontFamily: tamilFont, fontSize: 11.5, color: C.slateLight, marginTop: 2 }}>
                தமிழில் கேளுங்கள்
              </div>
            </div>

            {/* Question card */}
            <div
              style={{
                borderRadius: 20,
                padding: 16,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${C.line}`,
              }}
            >
              <div style={{ fontFamily: tamilFont, fontSize: 13.5, fontWeight: 700, color: C.white, marginBottom: 10 }}>
                SAGAR-MITRA-வை கேளுங்கள்
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0,0,0,0.22)",
                  borderRadius: 14,
                  padding: "12px 14px",
                }}
              >
                <div style={{ fontFamily: tamilFont, fontSize: 12.5, color: C.ice, lineHeight: 1.4, paddingRight: 10 }}>
                  இன்று ராமேஸ்வரத்திலிருந்து கடலுக்குச் செல்லலாமா?
                </div>
                <Mic size={17} color={C.aqua} style={{ flexShrink: 0 }} />
              </div>

              <button
                onClick={() => setStage("listening")}
                style={{
                  width: "100%",
                  marginTop: 12,
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 14,
                  padding: "13px 0",
                  background: `linear-gradient(135deg, ${C.tealBright}, ${C.teal})`,
                  color: C.navyDeep,
                  fontFamily: tamilFont,
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                சரிபார்க்கவும்
              </button>
            </div>

            {/* Quick actions */}
            <div style={{ marginTop: 22 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: Waves, label: "கடல் நிலை" },
                  { icon: Fish, label: "மீன்பிடி பகுதி" },
                  { icon: Compass, label: "பாதுகாப்பான பாதை" },
                  { icon: AlertTriangle, label: "எச்சரிக்கைகள்" },
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => (q.label === "எச்சரிக்கைகள்" ? goResult() : null)}
                    style={{
                      border: `1px solid ${C.line}`,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 16,
                      padding: "14px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        background: "rgba(143,227,214,0.14)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <q.icon size={15} color={C.aqua} />
                    </div>
                    <span style={{ fontFamily: tamilFont, fontSize: 12, color: C.ice, fontWeight: 600, textAlign: "left" }}>
                      {q.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {stage === "listening" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 70 }}>
            <div
              style={{
                width: 108,
                height: 108,
                borderRadius: 999,
                background: `radial-gradient(circle at 35% 30%, ${C.tealBright}, ${C.teal} 65%, ${C.ocean})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 0 14px rgba(34,166,160,0.12)",
                animation: "sm-breathe 1.6s ease-in-out infinite",
              }}
            >
              <Mic size={40} color={C.white} />
            </div>
            <div style={{ fontFamily: tamilFont, fontSize: 16, fontWeight: 700, color: C.white, marginTop: 22 }}>
              கேட்கிறேன்...
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 18, height: 26 }}>
              {[6, 14, 22, 12, 18, 8, 16].map((h, i) => (
                <span
                  key={i}
                  style={{
                    width: 4,
                    height: h,
                    borderRadius: 3,
                    background: C.aqua,
                    animation: `sm-wave 1.1s ease-in-out ${i * 0.09}s infinite`,
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div style={{ paddingTop: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Radio size={15} color={C.aqua} />
              <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.6, color: C.aqua }}>
                SAGAR-MITRA ORCHESTRATOR
              </span>
            </div>

            <div
              style={{
                marginTop: 14,
                borderRadius: 18,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${C.line}`,
                padding: 16,
              }}
            >
              {steps.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 0",
                    opacity: s.done || i < 2 ? 1 : 0.55,
                  }}
                >
                  {s.done ? (
                    <div style={{ width: 16, height: 16, borderRadius: 999, background: C.tealBright, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: C.navyDeep, fontSize: 10, fontWeight: 900 }}>✓</span>
                    </div>
                  ) : (
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: C.amber, flexShrink: 0, animation: "sm-pulse 1.2s infinite" }} />
                  )}
                  <span style={{ fontFamily: tamilFont, fontSize: 13, color: C.ice }}>{s.label}</span>
                </div>
              ))}
            </div>

            {stage === "processing" && (
              <div
                style={{
                  marginTop: 14,
                  borderRadius: 16,
                  background: "rgba(232,163,61,0.12)",
                  border: "1px solid rgba(232,163,61,0.35)",
                  padding: "12px 14px",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <AlertTriangle size={16} color={C.amber} style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: tamilFont, fontSize: 12.5, fontWeight: 700, color: "#FFE3B0" }}>
                    புதிய தகவல் கண்டறியப்பட்டது
                  </div>
                  <div style={{ fontFamily: tamilFont, fontSize: 11.5, color: "#FFE3B0", marginTop: 2, opacity: 0.85 }}>
                    திட்டத்தை மீண்டும் சரிபார்க்கிறேன்...
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                marginTop: 16,
                borderRadius: 16,
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${C.line}`,
                padding: "16px 10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px" }}>
                {["Planner", "Weather", "Ocean", "Hazard", "Cyclone", "Alert"].map((n, i) => (
                  <React.Fragment key={n}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: i === 0 ? C.aqua : C.slateLight,
                          animation: i === 0 ? "sm-pulse 1.4s infinite" : "none",
                        }}
                      />
                      <span style={{ fontSize: 8.5, color: C.slateLight, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                        {n}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 18, fontFamily: tamilFont, fontSize: 13, color: C.aqua, fontWeight: 700 }}>
              தயார் →
            </div>

            <button
              onClick={goResult}
              style={{
                width: "100%",
                marginTop: 12,
                border: "none",
                cursor: "pointer",
                borderRadius: 14,
                padding: "13px 0",
                background: `linear-gradient(135deg, ${C.tealBright}, ${C.teal})`,
                color: C.navyDeep,
                fontFamily: tamilFont,
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              பார்க்கவும்
            </button>
          </div>
        )}
      </div>
      <BottomNav active="home" onNavigate={onNav} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// PAGE 2 — Safety Result + Marine Map
// ---------------------------------------------------------------------------

function ResultPage({ onBack, onNav }) {
  const [engineOpen, setEngineOpen] = useState(false);
  const [scoreAnim, setScoreAnim] = useState(0);
  const [spoken, setSpoken] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setScoreAnim(78), 200);
    return () => clearTimeout(t);
  }, []);

  const factors = [
    { label: "Wind", pct: 60 },
    { label: "Wave", pct: 80 },
    { label: "Cyclone", pct: 100 },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ padding: "18px 20px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={onBack}
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: `1px solid ${C.line}`,
            background: "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} color={C.white} />
        </button>
        <div style={{ fontFamily: tamilFont, fontSize: 15, fontWeight: 800, color: C.white }}>
          கடல் பாதுகாப்பு
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <StatusPulse />
          <span style={{ fontSize: 10, color: C.aqua, fontWeight: 700 }}>LIVE</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 20px 24px" }}>
        {/* Safety result card */}
        <div
          style={{
            borderRadius: 22,
            padding: 18,
            background: `linear-gradient(160deg, ${C.dangerDeep} 0%, #6E200F 100%)`,
            boxShadow: "0 14px 28px rgba(179,58,30,0.3)",
          }}
        >
          <AlertTriangle size={22} color="#FFD9C9" />
          <div style={{ fontFamily: tamilFont, fontSize: 19, fontWeight: 800, color: C.white, marginTop: 10, lineHeight: 1.3 }}>
            இன்று கடலுக்குச் செல்ல வேண்டாம்
          </div>
          <div style={{ fontFamily: tamilFont, fontSize: 13, fontWeight: 700, color: "#FFD9C9", marginTop: 4 }}>
            உயர் ஆபத்து
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            {[
              { icon: Waves, label: "அதிக அலை" },
              { icon: Wind, label: "அதிக காற்று" },
              { icon: AlertTriangle, label: "அதிகாரப்பூர்வ எச்சரிக்கை" },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: 999,
                  padding: "6px 10px",
                }}
              >
                <r.icon size={12} color="#FFD9C9" />
                <span style={{ fontFamily: tamilFont, fontSize: 11, color: C.white }}>{r.label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.16)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 0.4, fontWeight: 700, marginBottom: 6 }}>
              OFFICIAL ADVISORY
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.white }}>
              <span style={{ fontWeight: 700 }}>IMD</span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Updated 10:42 AM</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.white, marginTop: 4 }}>
              <span style={{ fontWeight: 700 }}>INCOIS</span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Confirmed</span>
            </div>
          </div>
        </div>

        {/* Marine map */}
        <div
          style={{
            marginTop: 18,
            borderRadius: 22,
            overflow: "hidden",
            position: "relative",
            height: 230,
            background: `radial-gradient(circle at 30% 20%, #103652, ${C.navyDeep} 70%)`,
            border: `1px solid ${C.line}`,
          }}
        >
          {/* faux depth contours */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
            <path d="M -10 40 Q 100 10, 220 50 T 420 40" stroke={C.oceanLight} strokeWidth="1" fill="none" />
            <path d="M -10 90 Q 120 60, 240 100 T 420 90" stroke={C.oceanLight} strokeWidth="1" fill="none" />
            <path d="M -10 150 Q 110 120, 230 160 T 420 150" stroke={C.oceanLight} strokeWidth="1" fill="none" />
          </svg>

          {/* hazard zone */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 30,
              width: 88,
              height: 88,
              borderRadius: 999,
              background: "radial-gradient(circle, rgba(228,87,46,0.35), rgba(228,87,46,0.05))",
              border: "1px dashed rgba(228,87,46,0.6)",
            }}
          />

          {/* wave area */}
          <div
            style={{
              position: "absolute",
              bottom: 70,
              left: 20,
              width: 110,
              height: 60,
              borderRadius: 999,
              background: "radial-gradient(circle, rgba(143,227,214,0.22), rgba(143,227,214,0.02))",
            }}
          />

          {/* markers */}
          <MapMarker top={112} left={150} icon={Anchor} tone="aqua" pulse />
          <MapMarker top={40} left={110} icon={Fish} tone="teal" />
          <MapMarker top={150} left={230} icon={AlertTriangle} tone="danger" />
          <MapMarker top={60} left={250} icon={X} tone="danger" />

          {/* controls */}
          <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {[Navigation, Layers].map((Ic, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ic size={15} color={C.white} />
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 10, left: 14, fontSize: 10, color: C.slateLight }}>
            Gulf of Mannar · Rameswaram
          </div>
        </div>

        {/* bottom sheet */}
        <div
          style={{
            marginTop: -18,
            marginLeft: 8,
            marginRight: 8,
            position: "relative",
            zIndex: 5,
            borderRadius: 18,
            background: "rgba(20,44,68,0.96)",
            border: `1px solid ${C.line}`,
            padding: "14px 16px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ width: 34, height: 4, borderRadius: 999, background: C.slateLight, opacity: 0.5, margin: "0 auto 10px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: tamilFont, fontSize: 13.5, fontWeight: 700, color: C.white }}>
              தற்போதைய கடல் நிலை
            </div>
            <Chip tone="demo">DEMO DATA</Chip>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
            {[
              { l: "Wind", v: "28 km/h" },
              { l: "Waves", v: "2.4 m" },
              { l: "Swell", v: "1.3 m" },
              { l: "Sea State", v: "Moderate" },
            ].map((m) => (
              <div key={m.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: C.white }}>{m.v}</div>
                <div style={{ fontSize: 9.5, color: C.slateLight, marginTop: 2 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.line}`, fontSize: 10, color: C.slateLight }}>
            <span>Source: IMD + INCOIS</span>
            <span>Updated 10:42 AM</span>
          </div>
        </div>

        {/* Evidence */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: tamilFont, fontSize: 14.5, fontWeight: 800, color: C.white, marginBottom: 12 }}>
            ஏன் இந்த முடிவு?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "🌀", label: "Cyclone Warning", src: "IMD", time: "10:30 AM" },
              { icon: "🌊", label: "Wave Conditions", src: "INCOIS", time: "10:32 AM" },
              { icon: "💨", label: "Wind", src: "IMD", time: "10:31 AM" },
            ].map((e, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${C.line}`,
                  borderRadius: 14,
                  padding: "10px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{e.icon}</span>
                  <span style={{ fontSize: 12.5, color: C.ice, fontWeight: 600 }}>{e.label}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: C.aqua, fontWeight: 700 }}>{e.src}</div>
                  <div style={{ fontSize: 9.5, color: C.slateLight }}>{e.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, fontSize: 10, color: C.slateLight }}>
            <span>Evidence</span>
            <ChevronRight size={11} />
            <span>Safety Engine</span>
            <ChevronRight size={11} />
            <span>Final Decision</span>
          </div>
        </div>

        {/* Safety engine mini panel */}
        <button
          onClick={() => setEngineOpen((v) => !v)}
          style={{
            width: "100%",
            textAlign: "left",
            marginTop: 20,
            border: `1px solid ${C.line}`,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 18,
            padding: 16,
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: C.white }}>Safety Engine</span>
            <Chip tone="solid">DETERMINISTIC</Chip>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: C.white }}>{scoreAnim}</span>
            <span style={{ fontSize: 13, color: C.slateLight }}>/ 100</span>
            <Chip tone="danger">HIGH</Chip>
          </div>
          <div style={{ fontSize: 10.5, color: C.slateLight, marginTop: 2 }}>Prototype Risk Score</div>

          {engineOpen && (
            <div style={{ marginTop: 14 }}>
              {factors.map((f) => (
                <div key={f.label} style={{ marginBottom: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.ice, marginBottom: 4 }}>
                    <span>{f.label}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${f.pct}%`,
                        borderRadius: 999,
                        background: f.pct > 90 ? C.danger : f.pct > 70 ? C.amber : C.tealBright,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 10.5, color: C.slateLight, marginTop: 8, lineHeight: 1.5 }}>
                Risk score calculated from structured marine data.
              </div>
            </div>
          )}
        </button>

        {/* Final actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
          <button
            onClick={() => setSpoken(true)}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: 16,
              padding: "16px 10px",
              background: spoken ? "rgba(143,227,214,0.16)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${spoken ? "rgba(143,227,214,0.5)" : C.line}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Volume2 size={20} color={C.aqua} />
            <span style={{ fontFamily: tamilFont, fontSize: 12.5, fontWeight: 700, color: C.white }}>கேளுங்கள்</span>
            {spoken && (
              <span style={{ fontFamily: tamilFont, fontSize: 9.5, color: C.aqua, textAlign: "center", lineHeight: 1.4 }}>
                "இன்று கடலுக்குச் செல்ல வேண்டாம்..."
              </span>
            )}
          </button>

          <button
            style={{
              border: `1px solid ${C.line}`,
              background: "rgba(255,255,255,0.06)",
              cursor: "pointer",
              borderRadius: 16,
              padding: "16px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Compass size={20} color={C.aqua} />
            <span style={{ fontFamily: tamilFont, fontSize: 12.5, fontWeight: 700, color: C.white }}>
              வரைபடத்தில் பார்க்கவும்
            </span>
          </button>
        </div>
      </div>
      <BottomNav active="map" onNavigate={onNav} />
    </div>
  );
}

function MapMarker({ top, left, icon: Icon, tone, pulse }) {
  const tones = {
    aqua: { bg: C.tealBright, fg: C.navyDeep },
    teal: { bg: "rgba(143,227,214,0.9)", fg: C.navyDeep },
    danger: { bg: C.danger, fg: C.white },
  };
  const t = tones[tone];
  return (
    <div style={{ position: "absolute", top, left }}>
      {pulse && (
        <span
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 999,
            background: t.bg,
            opacity: 0.35,
            animation: "sm-pulse 1.8s ease-out infinite",
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          width: 26,
          height: 26,
          borderRadius: 999,
          background: t.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
        }}
      >
        <Icon size={13} color={t.fg} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App shell — phone frame + page router
// ---------------------------------------------------------------------------

export default function App() {
  const [page, setPage] = useState("home");
  const [stage, setStage] = useState("idle");
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (stage === "listening") {
      timers.current.push(setTimeout(() => setStage("processing"), 2200));
    }
    if (stage === "processing") {
      timers.current.push(setTimeout(() => setStage("done"), 2600));
    }
    return () => timers.current.forEach(clearTimeout);
  }, [stage]);

  const goResult = () => setPage("result");
  const goHome = () => {
    setPage("home");
    setStage("idle");
  };

  const onNav = (key) => {
    if (key === "map" || key === "alerts") setPage("result");
    else if (key === "ask") setStage("listening");
    else goHome();
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0F16",
        padding: 24,
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes sm-pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes sm-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes sm-wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>
      <div
        style={{
          width: 390,
          height: 844,
          maxWidth: "100%",
          maxHeight: "100vh",
          borderRadius: 40,
          border: "10px solid #12181F",
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navyDeep} 60%)`,
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 22,
            background: "#12181F",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            zIndex: 40,
          }}
        />

        {page === "home" ? (
          <HomePage stage={stage} setStage={setStage} goResult={goResult} onNav={onNav} />
        ) : (
          <ResultPage onBack={goHome} onNav={onNav} />
        )}
      </div>
    </div>
  );
}
