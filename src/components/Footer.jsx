import { useLanguage } from "../i18n/useLanguage";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" style={{ background: "var(--black)", borderTop: "1px solid var(--border)", padding: "2.5rem 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gray)" }}>
        © {year} {t.footer.brand}. {t.footer.rights}
      </div>
      <a href="#hero" className="site-footer__logo focus-ring" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }} aria-label={t.a11y.logo}>
        <img
          src="/logo.png"
          alt=""
          width={220}
          height={48}
          loading="lazy"
          decoding="async"
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
