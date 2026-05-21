import { useFadeUp } from "../../hooks/useFadeUp";

export default function FadeBox({ children, style }) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
