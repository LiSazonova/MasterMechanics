import { useState, useEffect, useCallback } from "react";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import ReviewCard from "./ReviewCard";
import { useLanguage } from "../i18n/useLanguage";

function usePerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

const navBtnStyle = {
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--light)",
  width: 44,
  height: 44,
  cursor: "pointer",
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "border-color 0.2s, color 0.2s",
};

export default function Reviews() {
  const { t } = useLanguage();
  const r = t.reviews;
  const reviews = r.items;
  const perView = usePerView();
  const maxIndex = Math.max(0, reviews.length - perView);
  const [index, setIndex] = useState(0);
  const safeIndex = Math.min(index, maxIndex);

  const go = useCallback(
    (dir) => setIndex((i) => Math.max(0, Math.min(maxIndex, i + dir))),
    [maxIndex]
  );

  const slideCount = maxIndex + 1;

  return (
    <section id="reviews" style={{ padding: "6rem 5vw", background: "var(--black)" }}>
      <SectionTag>{r.tag}</SectionTag>
      <SectionTitle>{r.title}</SectionTitle>

      <div style={{ marginTop: "3rem", position: "relative" }}>
        <div style={{ overflow: "hidden", border: "1px solid var(--border)", background: "var(--border)" }}>
          <div
            style={{
              display: "flex",
              transition: "transform 0.45s ease",
              transform: `translateX(-${safeIndex * (100 / perView)}%)`,
            }}
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 ${100 / perView}%`,
                  minWidth: 0,
                  boxSizing: "border-box",
                  paddingRight: 1,
                }}
              >
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1.5rem",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              aria-label={r.prev}
              style={{ ...navBtnStyle, opacity: safeIndex === 0 ? 0.35 : 1 }}
              disabled={safeIndex === 0}
              onClick={() => go(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label={r.next}
              style={{ ...navBtnStyle, opacity: safeIndex >= maxIndex ? 0.35 : 1 }}
              disabled={safeIndex >= maxIndex}
              onClick={() => go(1)}
            >
              →
            </button>
          </div>

          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {Array.from({ length: slideCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${r.slide} ${i + 1}`}
                onClick={() => setIndex(i)}
                style={{
                  width: i === safeIndex ? 20 : 6,
                  height: 6,
                  padding: 0,
                  border: "none",
                  borderRadius: 0,
                  background: i === safeIndex ? "var(--orange)" : "var(--border)",
                  cursor: "pointer",
                  transition: "width 0.25s, background 0.25s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
