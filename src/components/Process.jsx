import { useState } from "react";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../i18n/useLanguage";

export default function Process() {
  const { t } = useLanguage();
  const p = t.process;
  const [hovered, setHovered] = useState(null);

  return (
    <section id="process" style={{ padding: "6rem 5vw", background: "var(--dark)" }}>
      <SectionTag>{p.tag}</SectionTag>
      <SectionTitle>{p.title}</SectionTitle>
      <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginTop: "3rem", position: "relative" }}>
        <div className="process-line" style={{ position: "absolute", top: 32, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg,var(--orange),rgba(240,90,0,.2))" }} />
        {p.steps.map((s, i) => (
          <div key={s.num} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: `1px solid ${hovered === i ? "var(--orange)" : "var(--border)"}`, background: hovered === i ? "rgba(240,90,0,.1)" : "var(--panel)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", position: "relative", zIndex: 1, transition: "border-color 0.2s,background 0.2s" }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "var(--orange)" }}>{s.num}</span>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>{s.title}</div>
            <div style={{ fontSize: "0.82rem", color: "var(--gray)", lineHeight: 1.6 }}>{s.text}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .process-line {
            display: none;
          }
        }
        @media (max-width: 520px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
