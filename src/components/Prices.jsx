import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import FadeBox from "./ui/FadeBox";
import PriceItem from "./PriceItem";
import { useLanguage } from "../i18n/useLanguage";

export default function Prices() {
  const { t } = useLanguage();
  const p = t.prices;

  return (
    <section id="prices" style={{ padding: "6rem 5vw", background: "var(--black)" }}>
      <SectionTag>{p.tag}</SectionTag>
      <SectionTitle>{p.title}</SectionTitle>
      <p style={{ fontSize: "1rem", color: "var(--gray)", maxWidth: 560, lineHeight: 1.7, marginBottom: "3rem" }}>{p.desc}</p>
      <FadeBox>
        <div
          className="prices-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {p.items.map((item, i) => (
            <PriceItem key={i} {...item} />
          ))}
        </div>
      </FadeBox>
      <style>{`
        @media (max-width: 480px) {
          .prices-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 640px) {
          .prices-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1100px) {
          .prices-grid {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
