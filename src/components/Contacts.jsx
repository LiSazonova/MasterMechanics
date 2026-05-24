import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import FadeBox from "./ui/FadeBox";

const CONTACT_ITEMS = [
  { icon: "📍", label: "Адрес", val: "ул. Левитана, д. 117/1а, бокс 11\nОдесса" },
  { icon: "📞", label: "Телефон", val: "+38 (093) 044-54-53", href: "tel:+380930445453" },
  // { icon: "💬", label: "Telegram-бот", val: "@MasterMechanics_bot", href: "https://t.me/your_bot" },
  { icon: "🕐", label: "Режим работы", val: "Пн–Сб: 10:00 – 20:00\nВс: по записи" },
];

export default function Contacts() {
  return (
    <section id="contacts" style={{ padding: "6rem 5vw", background: "var(--dark)" }}>
      <SectionTag>Найдите нас</SectionTag>
      <SectionTitle>Контакты</SectionTitle>
      <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginTop: "3rem", alignItems: "stretch" }}>
        <FadeBox style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {CONTACT_ITEMS.map((item) => (
            <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "1.4rem" }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.25rem" }}>{item.label}</div>
                {item.href
                  ? <a href={item.href} style={{ fontSize: "0.95rem", color: "var(--white)", textDecoration: "none" }}>{item.val}</a>
                  : <div style={{ fontSize: "0.95rem", color: "var(--white)", whiteSpace: "pre-line" }}>{item.val}</div>
                }
              </div>
            </div>
          ))}
        </FadeBox>
        <FadeBox>
          <div className="contacts-map" style={{ border: "1px solid var(--border)", background: "var(--panel)", minHeight: 320, height: "100%", position: "relative", overflow: "hidden" }}>
            <iframe
              className="contacts-map__frame"
              title="Master Mechanics на карте"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751.166953039946!2d30.691626376870072!3d46.40574527110505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6331c50cfa33f%3A0x81d2c7eb8111dbc0!2z0KHQotCeIE1hc3RlciBNZWNoYW5pY3M!5e0!3m2!1sru!2sua!4v1779373333510!5m2!1sru!2sua"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contacts-map__shade" aria-hidden />
          </div>
        </FadeBox>
      </div>
      <style>{`
        .contacts-map__frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          filter: invert(92%) hue-rotate(180deg) brightness(0.92) contrast(0.98) saturate(0.85);
        }
        .contacts-map__shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: rgba(10, 10, 10, 0.12);
        }
        @media (max-width: 900px) {
          .contacts-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .contacts-map {
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
