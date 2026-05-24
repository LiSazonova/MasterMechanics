import { REASONS } from "../data/constants";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import FadeBox from "./ui/FadeBox";

export default function WhyUs() {
  return (
    <section id="why" style={{ padding: "6rem 5vw", background: "var(--black)" }}>
      <SectionTag>Почему мы</SectionTag>
      <SectionTitle>Нам доверяют</SectionTitle>
      <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginTop: "3rem", alignItems: "center" }}>
        <FadeBox>
          <div style={{ position: "relative", height: 420, border: "1px solid var(--border)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%,rgba(240,90,0,.18) 0%,transparent 50%),radial-gradient(circle at 70% 70%,rgba(240,90,0,.1) 0%,transparent 40%)" }} />
            <div
              role="img"
              aria-label="Master Mechanics"
              style={{
                position: "relative",
                zIndex: 1,
                width: "min(420px, 88%)",
                height: "auto",
                aspectRatio: "2.8 / 1",
                background: "rgba(240,90,0,0.15)",
                maskImage: "url(/logo.png)",
                WebkitMaskImage: "url(/logo.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
            <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "var(--orange)", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.05em", padding: "0.75rem 1.25rem", clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}>
              С 2016 года
            </div>
          </div>
        </FadeBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {REASONS.map((r) => (
            <FadeBox key={r.num}>
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1.25rem", border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", lineHeight: 1, color: "var(--orange)", minWidth: 48 }}>{r.num}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{r.title}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--gray)", lineHeight: 1.6 }}>{r.text}</div>
                </div>
              </div>
            </FadeBox>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .why-grid > div:first-child > div {
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
