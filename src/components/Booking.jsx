import { useState } from "react";
import { BOOKING_SERVICE_OPTIONS } from "../data/constants";
import { submitBooking } from "../api/submitBooking";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";

const fieldStyle = { background: "var(--panel)", padding: 0, position: "relative" };
const labelStyle = { display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gray)", padding: "0.75rem 1rem 0" };
const inputStyle = { width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--white)", fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", padding: "0.25rem 1rem 0.75rem" };

const emptyForm = { name: "", contact: "", car: "", service: "", comment: "" };

export default function Booking() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.contact.trim()) {
      alert("Заполните имя и телефон");
      return;
    }
    setSubmitting(true);
    try {
      await submitBooking(form);
      setSent(true);
    } catch {
      alert("Не удалось отправить заявку. Попробуйте позже или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" style={{ padding: "6rem 5vw", background: "var(--dark)" }}>
      <SectionTag>Запись</SectionTag>
      <SectionTitle>Записаться на ремонт</SectionTitle>
      <p style={{ fontSize: "1rem", color: "var(--gray)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 520 }}>
        Оставьте заявку — перезвоним и подтвердим время.
      </p>

      <div style={{ maxWidth: 700 }}>
        {sent ? (
          <div style={{ border: "1px solid var(--border)", padding: "2.5rem 2rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "var(--orange)", marginBottom: "0.75rem" }}>Заявка принята</div>
            <div style={{ color: "var(--gray)", fontSize: "0.95rem" }}>Перезвоним в течение 30 минут.</div>
            <button
              type="button"
              onClick={() => { setSent(false); setForm(emptyForm); }}
              style={{ marginTop: "1.25rem", background: "transparent", border: "1px solid var(--border)", color: "var(--gray)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.55rem 1rem", cursor: "pointer" }}
            >
              Новая заявка
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", border: "1px solid var(--border)" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Имя</label>
              <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Александр" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Телефон</label>
              <input style={inputStyle} value={form.contact} onChange={set("contact")} placeholder="+38 099 000 00 00" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Авто</label>
              <input style={inputStyle} value={form.car} onChange={set("car")} placeholder="BMW X5..." />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Услуга</label>
              <select style={{ ...inputStyle, marginTop: "0.25rem" }} value={form.service} onChange={set("service")}>
                <option value="">Выберите...</option>
                {BOOKING_SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Комментарий</label>
              <textarea style={{ ...inputStyle, resize: "none", height: 72 }} value={form.comment} onChange={set("comment")} placeholder="Кратко опишите проблему" />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                gridColumn: "1 / -1",
                background: submitting ? "var(--border)" : "var(--orange)",
                color: submitting ? "var(--gray)" : "#000",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                padding: "1rem",
                cursor: submitting ? "wait" : "pointer",
                clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
              }}
            >
              {submitting ? "Отправка…" : "Отправить заявку"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
