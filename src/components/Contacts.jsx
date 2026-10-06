import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import FadeBox from "./ui/FadeBox";
import { PHONE, PHONE_HREF, TELEGRAM_HREF } from "../data/constants";
import { useLanguage } from "../i18n/useLanguage";
import { getMapEmbedUrl } from "../constants/maps";

export default function Contacts() {
  const { lang, t } = useLanguage();
  const c = t.contacts;

  const contactItems = [
    { icon: "📍", label: c.address, val: c.addressVal },
    { icon: "📞", label: c.phone, val: PHONE, href: PHONE_HREF },
    { icon: "✈️", label: c.telegram, val: c.telegramAction, href: TELEGRAM_HREF, external: true },
    { icon: "🕐", label: c.hours, val: c.hoursVal },
  ];

  return (
    <section id="contacts" style={{ padding: "6rem 5vw", background: "var(--dark)" }}>
      <SectionTag>{c.tag}</SectionTag>
      <SectionTitle>{c.title}</SectionTitle>
      <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginTop: "3rem", alignItems: "stretch" }}>
        <FadeBox style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {contactItems.map((item) => (
            <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "1.4rem" }} aria-hidden="true">{item.icon}</div>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.25rem" }}>{item.label}</div>
                {item.href
                  ? (
                    <a
                      href={item.href}
                      className="focus-ring"
                      style={{ fontSize: "0.95rem", color: "var(--white)", textDecoration: "none" }}
                      {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {item.val}
                    </a>
                  )
                  : <div style={{ fontSize: "0.95rem", color: "var(--white)", whiteSpace: "pre-line" }}>{item.val}</div>
                }
              </div>
            </div>
          ))}
        </FadeBox>
        <FadeBox>
          <div className="contacts-map" style={{ border: "1px solid var(--border)", background: "var(--panel)", minHeight: 320, height: "100%", position: "relative", overflow: "hidden" }}>
            <iframe
              key={lang}
              className="contacts-map__frame"
              title={c.mapTitle}
              src={getMapEmbedUrl(lang)}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contacts-map__shade" aria-hidden="true" />
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
