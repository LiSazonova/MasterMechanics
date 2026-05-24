import { useLanguage } from "../i18n/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" style={{ background: "var(--black)", borderTop: "1px solid var(--border)", padding: "2.5rem 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gray)" }}>{t.footer.rights}</div>
      <a href="#hero" className="site-footer__logo" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
        <img
          src="/logo.png"
          alt="Master Mechanics"
          style={{ height: 48, width: "auto", maxWidth: "min(220px, 42vw)", objectFit: "contain" }}
        />
      </a>
      <style>{`
        @media (max-width: 600px) {
          .site-footer {
            flex-direction: column;
            align-items: flex-start;
          }
          .site-footer__logo img {
            max-width: min(200px, 70vw) !important;
          }
        }
      `}</style>
    </footer>
  );
}
