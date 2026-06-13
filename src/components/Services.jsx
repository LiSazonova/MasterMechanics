import { useState } from "react";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import FadeBox from "./ui/FadeBox";
import { useLanguage } from "../i18n/useLanguage";

function ServiceCard({ service, isHovered, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: isHovered ? "#1a1a1a" : "var(--panel)",
        padding: "1.75rem 1.35rem",
        minHeight: 168,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "background 0.25s",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg,var(--orange),transparent)",
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s",
        }}
      />
      <div style={{ fontSize: "1.85rem", marginBottom: "0.85rem", transition: "transform 0.25s", transform: isHovered ? "scale(1.08)" : "scale(1)" }}>{service.icon}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.04em", marginBottom: "0.5rem", lineHeight: 1.1 }}>{service.name}</div>
      <div style={{ fontSize: "0.82rem", color: "var(--gray)", lineHeight: 1.6 }}>{service.desc}</div>
    </div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" style={{ padding: "6rem 5vw", background: "var(--dark)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(6rem,14vw,14rem)", color: "rgba(240,90,0,.04)", pointerEvents: "none", whiteSpace: "nowrap" }}>{t.a11y.servicesWatermark}</div>
      <SectionTag>{s.tag}</SectionTag>
      <SectionTitle>{s.title}</SectionTitle>
      <p style={{ fontSize: "1rem", color: "var(--gray)", maxWidth: 560, lineHeight: 1.7, marginBottom: "3rem" }}>{s.desc}</p>

      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          background: "var(--border)",
          border: "1px solid var(--border)",
        }}
      >
        {s.items.map((item, i) => (
          <FadeBox key={i}>
            <ServiceCard
              service={item}
              isHovered={hovered === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          </FadeBox>
        ))}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1100px) {
          .services-grid {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
