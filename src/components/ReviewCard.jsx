import { useState } from "react";

export default function ReviewCard({ stars, text, name, car, initials }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? "#1a1a1a" : "var(--panel)", padding: "2rem", transition: "background 0.2s", height: "100%", minHeight: 220 }}>
      <div style={{ color: "var(--orange)", fontSize: "0.9rem", marginBottom: "1rem" }}>{"★".repeat(stars)}</div>
      <p style={{ fontSize: "0.9rem", color: "var(--light)", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>«{text}»</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 36, height: 36, background: "var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: "var(--orange)" }}>{initials}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{name}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--gray)" }}>{car}</div>
        </div>
      </div>
    </div>
  );
}
