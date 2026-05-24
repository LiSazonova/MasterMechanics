import { PRICES } from "../data/constants";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import FadeBox from "./ui/FadeBox";
import PriceItem from "./PriceItem";

export default function Prices() {
  return (
    <section id="prices" style={{ padding: "6rem 5vw", background: "var(--black)" }}>
      <SectionTag>Примерные цены</SectionTag>
      <SectionTitle>Прозрачная стоимость</SectionTitle>
      <p style={{ fontSize: "1rem", color: "var(--gray)", maxWidth: 560, lineHeight: 1.7, marginBottom: "3rem" }}>Точная цена — после диагностики. Ниже — ориентировочные цифры.</p>
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
          {PRICES.map((p) => (
            <PriceItem key={p.name} {...p} />
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
