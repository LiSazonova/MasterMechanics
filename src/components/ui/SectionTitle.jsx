export default function SectionTitle({ children, style, ...rest }) {
  return (
    <h2
      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: "1rem", ...style }}
      {...rest}
    >
      {children}
    </h2>
  );
}
