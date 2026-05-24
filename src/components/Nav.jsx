import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/constants";

export default function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className="site-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5vw", height: 72, background: scrolled ? "rgba(10,10,10,0.96)" : "rgba(10,10,10,0.7)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", transition: "background 0.3s" }}>
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
        <img
          src="/logo.png"
          alt="Master Mechanics"
          style={{ height: 48, width: "auto", maxWidth: "min(220px, 42vw)", objectFit: "contain" }}
        />
      </a>
      <ul className="nav-links" style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: active === l.href.slice(1) ? "var(--orange)" : "var(--gray)", textDecoration: "none", transition: "color 0.2s" }}>{l.label}</a>
          </li>
        ))}
      </ul>
      <a href="#booking" className="nav-cta" style={{ background: "var(--orange)", color: "#000", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.5rem 1.2rem", textDecoration: "none", clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", flexShrink: 0 }}>
        Записаться
      </a>
      <style>{`
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 480px) {
          .site-nav { padding-left: 4vw !important; padding-right: 4vw !important; }
          .nav-cta { font-size: 0.65rem !important; padding: 0.45rem 0.85rem !important; }
        }
      `}</style>
    </nav>
  );
}
