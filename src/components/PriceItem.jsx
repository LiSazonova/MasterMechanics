import { useState } from "react";

export default function PriceItem({ name, price }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1a1a1a" : "var(--panel)",
        padding: "1.5rem 1.25rem",
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "0.75rem",
        transition: "background 0.2s",
        height: "100%",
      }}
    >
      <span style={{ fontSize: "0.88rem", color: "var(--light)", lineHeight: 1.45 }}>{name}</span>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.55rem", color: "var(--orange)", lineHeight: 1, alignSelf: "flex-start" }}>{price}</span>
    </div>
  );
}
