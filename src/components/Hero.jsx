import SectionTag from "./ui/SectionTag";
import { useLanguage } from "../i18n/useLanguage";
import { TELEGRAM_HREF } from "../data/constants";

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "3rem",
        padding: "6rem 5vw 4rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 65% at 65% 45%,rgba(240,90,0,.12) 0%,transparent 70%),radial-gradient(ellipse 35% 70% at 15% 75%,rgba(240,90,0,.06) 0%,transparent 60%),var(--black)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(240,90,0,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(240,90,0,.06) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 40% 50%,black 15%,transparent 72%)",
        }}
      />

      <div className="hero-content" style={{ position: "relative", zIndex: 2, maxWidth: 720, flex: "1 1 auto" }}>
        <SectionTag>{h.tag}</SectionTag>
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gray)",
            marginBottom: "0.75rem",
          }}
        >
          {h.brandLine}
        </p>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            marginBottom: "1.5rem",
          }}
        >
          {h.title}&nbsp;
          <span style={{ color: "var(--orange)" }}>{h.titleAccent}</span>
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.75,
            color: "var(--light)",
            maxWidth: 560,
            marginBottom: "2.5rem",
          }}
        >
          {h.desc}
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#booking"
            className="focus-ring"
            style={{
              background: "var(--orange)",
              color: "#000",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "1rem 2rem",
              textDecoration: "none",
              clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
            }}
          >
            {h.bookOnline}
          </a>
          <a
            href={TELEGRAM_HREF}
            target="_blank"
            rel="noreferrer"
            className="focus-ring"
            style={{
              background: "transparent",
              color: "var(--white)",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "1rem 2rem",
              border: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            {h.telegram}
          </a>
        </div>
      </div>

      <div
        className="hero-stats"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          flexShrink: 0,
          alignSelf: "flex-end",
          paddingBottom: "4vh",
        }}
      >
        {h.stats.map(([n, l]) => (
          <div key={l} style={{ textAlign: "right", borderRight: "2px solid var(--orange)", paddingRight: "1rem" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.8rem", lineHeight: 1, color: "var(--orange)" }}>{n}</div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gray)",
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: center !important;
          }
          .hero-stats {
            align-self: stretch !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 1.5rem !important;
            padding-bottom: 0 !important;
            margin-top: 2rem !important;
          }
          .hero-stats > div {
            text-align: left !important;
            border-right: none !important;
            border-left: 2px solid var(--orange) !important;
            padding-right: 0 !important;
            padding-left: 1rem !important;
            flex: 1 1 calc(50% - 0.75rem) !important;
            min-width: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding-top: 5.5rem !important;
            padding-left: 4vw !important;
            padding-right: 4vw !important;
          }
          .hero-stats > div {
            flex: 1 1 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
