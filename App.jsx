import { useState } from "react";
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";
import ShareResult from "./components/ShareResult";
import ProgressBar from "./components/ProgressBar";
import { Card, Lbl } from "./components/ui";
import { useDarkMode } from "./components/DarkMode";
import { T } from "./i18n/translations";

import HealthScore from "./features/HealthScore";
import FirePlanner from "./features/FirePlanner";
import LifeEvent from "./features/LifeEvent";
import TaxWizard from "./features/TaxWizard";
import CouplesMoney from "./features/CouplesMoney";
import MFXray from "./features/MFXray";

const FEATURE_IDS = ["health", "fire", "life", "tax", "couple", "xray"];
const FEATURE_ICONS   = { health: "♡", fire: "◎", life: "◇", tax: "◉", couple: "⬡", xray: "◈" };
const FEATURE_COLORS  = { health: "#0ea5e9", fire: "#10b981", life: "#8b5cf6", tax: "#f59e0b", couple: "#ec4899", xray: "#6366f1" };
const FEATURE_BG      = { health: "#f0f9ff", fire: "#f0fdf4", life: "#faf5ff", tax: "#fffbeb", couple: "#fdf2f8", xray: "#eef2ff" };
const FEATURE_BORDER  = { health: "#bae6fd", fire: "#bbf7d0", life: "#e9d5ff", tax: "#fde68a", couple: "#fbcfe8", xray: "#c7d2fe" };
const FEATURE_COMPS   = { health: HealthScore, fire: FirePlanner, life: LifeEvent, tax: TaxWizard, couple: CouplesMoney, xray: MFXray };

export default function App() {
  const [dark, setDark] = useDarkMode();
  const [lang, setLang] = useState(() => localStorage.getItem("finsaathi_lang") || "en");
  const [activeId, setActiveId] = useState(null);

  const t = T[lang] || T.en;

  const bg = dark ? "#0f172a" : "#f8fafc";
  const cardBg = dark ? "#1e293b" : "#fff";
  const textPrimary = dark ? "#f1f5f9" : "#0f172a";
  const textMuted = dark ? "#64748b" : "#64748b";
  const borderColor = dark ? "#334155" : "#e2e8f0";

  const goHome = () => setActiveId(null);

  const features = FEATURE_IDS.map(id => ({
    id,
    icon: FEATURE_ICONS[id],
    color: FEATURE_COLORS[id],
    bg: FEATURE_BG[id],
    border: FEATURE_BORDER[id],
    label: t.features[id].label,
    tagline: t.features[id].tagline,
    desc: t.features[id].desc,
    component: FEATURE_COMPS[id],
  }));

  const activeFeature = features.find(f => f.id === activeId);
  const ActiveComponent = activeFeature?.component;

  return (
    <div style={{ minHeight: "100vh", background: bg, transition: "background 0.2s" }}>
      <Navbar onHome={goHome} dark={dark} setDark={setDark} lang={lang} setLang={setLang} t={t} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* Home */}
        {!activeId && (
          <>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 99, padding: "5px 14px", marginBottom: 18 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ color: "#065f46", fontSize: 12, fontWeight: 500 }}>{t.statBanner}</span>
              </div>
              <h1 style={{ fontSize: 36, fontWeight: 800, color: textPrimary, margin: "0 0 14px", lineHeight: 1.25, letterSpacing: "-1px" }}>
                {t.tagline.split(".")[0]}.<br />
                <span style={{ color: "#0ea5e9" }}>{t.tagline.split(".").slice(1).join(".").trim()}</span>
              </h1>
              <p style={{ color: textMuted, fontSize: 14, maxWidth: 480, margin: 0, lineHeight: 1.7 }}>{t.subTagline}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 40 }}>
              {features.map(f => (
                <FeatureCard key={f.id} feature={f} onClick={() => setActiveId(f.id)} dark={dark} />
              ))}
            </div>

            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 14, padding: "20px 24px" }}>
              <Lbl>{t.whyTitle}</Lbl>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20, marginTop: 12 }}>
                {t.stats.map(([v, l]) => (
                  <div key={l}>
                    <p style={{ color: textPrimary, fontSize: 18, fontWeight: 800, margin: "0 0 3px", letterSpacing: "-0.5px" }}>{v}</p>
                    <p style={{ color: textMuted, fontSize: 12, margin: 0 }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Feature view */}
        {activeId && activeFeature && ActiveComponent && (
          <div>
            <button onClick={goHome} style={{ background: "none", border: "none", color: textMuted, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 22 }}>
              {t.allTools}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 42, height: 42, background: activeFeature.bg, border: `1px solid ${activeFeature.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: activeFeature.color, fontSize: 20 }}>{activeFeature.icon}</span>
              </div>
              <div>
                <h2 style={{ color: textPrimary, fontSize: 20, fontWeight: 800, margin: 0 }}>{activeFeature.label}</h2>
                <p style={{ color: textMuted, fontSize: 12, margin: 0 }}>{activeFeature.tagline}</p>
              </div>
            </div>

            <ActiveComponent feature={activeFeature} dark={dark} t={t} lang={lang} />

            <div style={{ marginTop: 14, padding: "11px 15px", background: dark ? "#1e293b" : "#f8fafc", borderRadius: 10, border: `1px solid ${borderColor}` }}>
              <p style={{ color: "#94a3b8", fontSize: 11, margin: 0, lineHeight: 1.5 }}>{t.disclaimer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
