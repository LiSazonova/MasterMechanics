import { useState } from "react";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../i18n/useLanguage";

const fieldStyle = { background: "var(--panel)", padding: 0, position: "relative" };
const labelStyle = { display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gray)", padding: "0.75rem 1rem 0" };
const inputStyle = { width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--white)", fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", padding: "0.25rem 1rem 0.75rem" };
const errorStyle = { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.05em", color: "var(--orange)", padding: "0 1rem 0.6rem" };

const emptyForm = { name: "", contact: "", car: "", service: "", comment: "" };

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 12;
}

function validateForm(form, e) {
  const errors = {};
  const name = form.name.trim();

  if (!name) errors.name = e.nameRequired;
  else if (name.length < 2) errors.name = e.nameMin;

  const contact = form.contact.trim();
  if (!contact) errors.contact = e.phoneRequired;
  else if (!isValidPhone(contact)) errors.contact = e.phoneInvalid;

  if (!form.car.trim()) errors.car = e.carRequired;
  if (!form.service) errors.service = e.serviceRequired;

  return errors;
}

export default function Booking() {
  const { t } = useLanguage();
  const b = t.booking;
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (ev) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const fieldWrap = (key, extra = {}) => ({
    ...fieldStyle,
    ...extra,
    ...(errors[key] ? { boxShadow: "inset 0 0 0 1px var(--orange)" } : {}),
  });

  const handleSubmit = async () => {
    const nextErrors = validateForm(form, b.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        "https://n8n-production-ca119.up.railway.app/webhook/9c1978c4-0b20-43bf-940e-56ae118c01c4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            phone: form.contact.trim(),
            car: form.car.trim(),
            service: form.service,
            comment: form.comment.trim(),
          }),
        }
      );
      if (!res.ok) throw new Error("submit failed");
      setSent(true);
      setErrors({});
    } catch {
      alert(b.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" style={{ padding: "6rem 5vw", background: "var(--dark)" }}>
      <SectionTag>{b.tag}</SectionTag>
      <SectionTitle>{b.title}</SectionTitle>
      <p style={{ fontSize: "1rem", color: "var(--gray)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 520 }}>
        {b.desc}
      </p>

      <div style={{ maxWidth: 700 }}>
        {sent ? (
          <div style={{ border: "1px solid var(--border)", padding: "2.5rem 2rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "var(--orange)", marginBottom: "0.75rem" }}>{b.successTitle}</div>
            <div style={{ color: "var(--gray)", fontSize: "0.95rem" }}>{b.successDesc}</div>
            <button
              type="button"
              onClick={() => { setSent(false); setForm(emptyForm); setErrors({}); }}
              style={{ marginTop: "1.25rem", background: "transparent", border: "1px solid var(--border)", color: "var(--gray)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.55rem 1rem", cursor: "pointer" }}
            >
              {b.newRequest}
            </button>
          </div>
        ) : (
          <div className="booking-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", border: "1px solid var(--border)" }}>
            <div style={fieldWrap("name")}>
              <label style={labelStyle}>{b.name}</label>
              <input style={inputStyle} value={form.name} onChange={set("name")} placeholder={b.namePlaceholder} maxLength={80} />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>
            <div style={fieldWrap("contact")}>
              <label style={labelStyle}>{b.phone}</label>
              <input type="tel" inputMode="tel" style={inputStyle} value={form.contact} onChange={set("contact")} placeholder="+38 099 000 00 00" maxLength={20} />
              {errors.contact && <div style={errorStyle}>{errors.contact}</div>}
            </div>
            <div style={fieldWrap("car", { gridColumn: "1 / -1" })}>
              <label style={labelStyle}>{b.car}</label>
              <input style={inputStyle} value={form.car} onChange={set("car")} placeholder={b.carPlaceholder} maxLength={120} />
              {errors.car && <div style={errorStyle}>{errors.car}</div>}
            </div>
            <div style={fieldWrap("service", { gridColumn: "1 / -1" })}>
              <label style={labelStyle}>{b.service}</label>
              <select style={{ ...inputStyle, marginTop: "0.25rem" }} value={form.service} onChange={set("service")}>
                <option value="">{b.selectService}</option>
                {b.serviceOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              {errors.service && <div style={errorStyle}>{errors.service}</div>}
            </div>
            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>{b.comment}</label>
              <textarea style={{ ...inputStyle, resize: "none", height: 72 }} value={form.comment} onChange={set("comment")} placeholder={b.commentPlaceholder} maxLength={500} />
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
              {submitting ? b.submitting : b.submit}
            </button>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .booking-form {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
