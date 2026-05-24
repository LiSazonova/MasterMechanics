import { LANGUAGES } from "../i18n/translations";
import { useLanguage } from "../i18n/useLanguage";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`lang-switcher ${className}`} role="group" aria-label="Language">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`lang-switcher__btn${lang === code ? " lang-switcher__btn--active" : ""}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {label}
        </button>
      ))}
      <style>{`
        .lang-switcher {
          display: flex;
          gap: 2px;
          border: 1px solid var(--border);
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .lang-switcher__btn {
          background: transparent;
          border: none;
          color: var(--gray);
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          padding: 0.45rem 0.55rem;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .lang-switcher__btn:hover {
          color: var(--white);
        }
        .lang-switcher__btn--active {
          background: var(--orange);
          color: #000;
        }
      `}</style>
    </div>
  );
}
