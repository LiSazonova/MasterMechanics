export default function SectionTag({ children }) {
  return (
    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--orange)" }} />
      {children}
    </div>
  );
}
