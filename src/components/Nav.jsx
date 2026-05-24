import { useState, useEffect, useCallback } from "react";
import { NAV_HREFS } from "../i18n/translations";
import { useLanguage } from "../i18n/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";

const linkStyle = (isActive) => ({
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: isActive ? "var(--orange)" : "var(--gray)",
  textDecoration: "none",
  transition: "color 0.2s",
});

export default function Nav() {
  const { t } = useLanguage();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = document.querySelectorAll("section[id]");
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav
        className="site-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5vw",
          height: 72,
          background: scrolled || menuOpen ? "rgba(10,10,10,0.96)" : "rgba(10,10,10,0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.3s",
        }}
      >
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="Master Mechanics"
            style={{ height: 48, width: "auto", maxWidth: "min(220px, 42vw)", objectFit: "contain" }}
          />
        </a>

        <ul className="nav-links" style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          {NAV_HREFS.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={linkStyle(active === l.href.slice(1))}>
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <LanguageSwitcher className="nav-lang" />
          <a
            href="#booking"
            className="nav-cta"
            style={{
              background: "var(--orange)",
              color: "#000",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.5rem 1.2rem",
              textDecoration: "none",
              clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
            }}
          >
            {t.nav.book}
          </a>

          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`nav-burger__bar${menuOpen ? " nav-burger__bar--open" : ""}`} />
            <span className={`nav-burger__bar${menuOpen ? " nav-burger__bar--open" : ""}`} />
            <span className={`nav-burger__bar${menuOpen ? " nav-burger__bar--open" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      >
        <div className="mobile-nav__panel" onClick={(e) => e.stopPropagation()}>
          <LanguageSwitcher className="mobile-nav__lang" />
          <ul className="mobile-nav__links">
            {NAV_HREFS.map((l, i) => (
              <li key={l.href} style={{ "--i": i }}>
                <a
                  href={l.href}
                  className={active === l.href.slice(1) ? "mobile-nav__link--active" : ""}
                  onClick={closeMenu}
                >
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>
          <a href="#booking" className="mobile-nav__cta" onClick={closeMenu}>
            {t.nav.book}
          </a>
        </div>
      </div>

      <style>{`
        .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 10px;
          background: transparent;
          border: 1px solid var(--border);
          cursor: pointer;
          flex-shrink: 0;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
          transition: border-color 0.2s;
        }
        .nav-burger:hover { border-color: var(--orange); }
        .nav-burger__bar {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--white);
          transition: transform 0.25s, opacity 0.2s;
          transform-origin: center;
        }
        .nav-burger__bar:nth-child(1).nav-burger__bar--open {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-burger__bar:nth-child(2).nav-burger__bar--open {
          opacity: 0;
        }
        .nav-burger__bar:nth-child(3).nav-burger__bar--open {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-nav {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .mobile-nav--open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .mobile-nav__panel {
          position: absolute;
          top: 72px;
          right: 0;
          bottom: 0;
          width: min(320px, 88vw);
          background: rgba(10, 10, 10, 0.98);
          border-left: 1px solid var(--border);
          padding: 2rem 1.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-nav--open .mobile-nav__panel {
          transform: translateX(0);
        }
        .mobile-nav__lang {
          margin-bottom: 1.5rem;
          align-self: flex-start;
        }
        .nav-lang {
          display: flex;
        }
        .mobile-nav__links {
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }
        .mobile-nav__links li {
          opacity: 0;
          transform: translateX(12px);
          transition: opacity 0.3s, transform 0.3s;
          transition-delay: calc(var(--i) * 50ms + 80ms);
        }
        .mobile-nav--open .mobile-nav__links li {
          opacity: 1;
          transform: translateX(0);
        }
        .mobile-nav__links a {
          display: block;
          padding: 1rem 0;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gray);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-nav__links a:hover,
        .mobile-nav__link--active {
          color: var(--orange);
          padding-left: 0.5rem;
        }
        .mobile-nav__cta {
          display: block;
          margin-top: 1.5rem;
          text-align: center;
          background: var(--orange);
          color: #000;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 1rem 1.5rem;
          text-decoration: none;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s 0.25s, transform 0.3s 0.25s;
        }
        .mobile-nav--open .mobile-nav__cta {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex; }
          .nav-lang { display: none !important; }
        }
        @media (max-width: 480px) {
          .site-nav { padding-left: 4vw !important; padding-right: 4vw !important; }
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
