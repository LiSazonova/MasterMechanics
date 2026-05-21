export default function Footer() {
  return (
    <footer style={{ background: "var(--black)", borderTop: "1px solid var(--border)", padding: "2.5rem 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gray)" }}>© 2025 Master Mechanics. Все права защищены.</div>
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0, marginLeft: "auto" }}>
        <img
          src="/logo.png"
          alt="Master Mechanics"
          style={{ height: 48, width: "auto", maxWidth: "min(220px, 42vw)", objectFit: "contain" }}
        />
      </a>
    </footer>
  );
}
