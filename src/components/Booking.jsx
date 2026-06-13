import { useState } from "react";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { useLanguage } from "../i18n/useLanguage";
import { submitBooking } from "../api/submitBooking";

const fieldStyle = { background: "var(--panel)", padding: 0, position: "relative" };
const labelStyle = { display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gray)", padding: "0.75rem 1rem 0" };
const inputStyle = { width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--white)", fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", padding: "0.25rem 1rem 0.75rem" };
const errorStyle = { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.05em", color: "var(--orange)", padding: "0 1rem 0.6rem" };
const formErrorStyle = { ...errorStyle, padding: "0.75rem 1rem", marginTop: "0.5rem", border: "1px solid var(--orange)", background: "rgba(240,90,0,0.06)" };

const emptyForm = { name: "", contact: "", car: "", service: "", comment: "" };
const FIELD_IDS = { name: "booking-name", contact: "booking-phone", car: "booking-car", service: "booking-service", comment: "booking-comment" };

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
  const { lang, t } = useLanguage();
  const b = t.booking;
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (ev) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    if (formError) setFormError("");
  };

  const fieldWrap = (key, extra = {}) => ({
    ...fieldStyle,
    ...extra,
    ...(errors[key] ? { boxShadow: "inset 0 0 0 1px var(--orange)" } : {}),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const nextErrors = validateForm(form, b.errors);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      await submitBooking({
        name: form.name.trim(),
        phone: form.contact.trim(),
        car: form.car.trim(),
        service: form.service,
        comment: form.comment.trim(),
        language: lang,
      });
      setSent(true);
      setErrors({});
      setFormError("");
    } catch {
      setFormError(b.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setForm(emptyForm);
    setErrors({});
    setFormError("");
  };

  return (
    <section id="booking" style={{ padding: "6rem 5vw", background: "var(--dark)" }} aria-labelledby="booking-title">
      <SectionTag>{b.tag}</SectionTag>
      <SectionTitle id="booking-title">{b.title}</SectionTitle>
      <p style={{ fontSize: "1rem", color: "var(--gray)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 520 }}>
        {b.desc}
      </p>

      <div style={{ maxWidth: 700 }}>
        {sent ? (
          <div
            role="status"
            aria-live="polite"
            style={{ border: "1px solid var(--border)", padding: "2.5rem 2rem", textAlign: "center" }}
          >
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "var(--orange)", marginBottom: "0.75rem" }}>{b.successTitle}</div>
            <div style={{ color: "var(--gray)", fontSize: "0.95rem" }}>{b.successDesc}</div>
            <button
              type="button"
              onClick={resetForm}
              className="focus-ring"
              style={{ marginTop: "1.25rem", background: "transparent", border: "1px solid var(--border)", color: "var(--gray)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.55rem 1rem", cursor: "pointer" }}
            >
              {b.newRequest}
            </button>
          </div>
        ) : (
          <form
            className="booking-form"
            aria-label={b.formAriaLabel}
            onSubmit={handleSubmit}
            noValidate
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", border: "1px solid var(--border)" }}
          >
            <div style={fieldWrap("name")}>
              <label htmlFor={FIELD_IDS.name} style={labelStyle}>{b.name}</label>
              <input
                id={FIELD_IDS.name}
                name="name"
                autoComplete="name"
                className="focus-ring-inset"
                style={inputStyle}
                value={form.name}
                onChange={set("name")}
                placeholder={b.namePlaceholder}
                maxLength={80}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${FIELD_IDS.name}-error` : undefined}
              />
              {errors.name && <div id={`${FIELD_IDS.name}-error`} role="alert" style={errorStyle}>{errors.name}</div>}
            </div>
            <div style={fieldWrap("contact")}>
              <label htmlFor={FIELD_IDS.contact} style={labelStyle}>{b.phone}</label>
              <input
                id={FIELD_IDS.contact}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="focus-ring-inset"
                style={inputStyle}
                value={form.contact}
                onChange={set("contact")}
                placeholder={b.phonePlaceholder}
                maxLength={20}
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? `${FIELD_IDS.contact}-error` : undefined}
              />
              {errors.contact && <div id={`${FIELD_IDS.contact}-error`} role="alert" style={errorStyle}>{errors.contact}</div>}
            </div>
            <div style={fieldWrap("car", { gridColumn: "1 / -1" })}>
              <label htmlFor={FIELD_IDS.car} style={labelStyle}>{b.car}</label>
              <input
                id={FIELD_IDS.car}
                name="car"
                className="focus-ring-inset"
                style={inputStyle}
                value={form.car}
                onChange={set("car")}
                placeholder={b.carPlaceholder}
                maxLength={120}
                aria-invalid={Boolean(errors.car)}
                aria-describedby={errors.car ? `${FIELD_IDS.car}-error` : undefined}
              />
              {errors.car && <div id={`${FIELD_IDS.car}-error`} role="alert" style={errorStyle}>{errors.car}</div>}
            </div>
            <div style={fieldWrap("service", { gridColumn: "1 / -1" })}>
              <label htmlFor={FIELD_IDS.service} style={labelStyle}>{b.service}</label>
              <select
                id={FIELD_IDS.service}
                name="service"
                className="focus-ring-inset"
                style={{ ...inputStyle, marginTop: "0.25rem" }}
                value={form.service}
                onChange={set("service")}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? `${FIELD_IDS.service}-error` : undefined}
              >
                <option value="">{b.selectService}</option>
                {b.serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.service && <div id={`${FIELD_IDS.service}-error`} role="alert" style={errorStyle}>{errors.service}</div>}
            </div>
            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label htmlFor={FIELD_IDS.comment} style={labelStyle}>{b.comment}</label>
              <textarea
                id={FIELD_IDS.comment}
                name="comment"
                className="focus-ring-inset"
                style={{ ...inputStyle, resize: "none", height: 72 }}
                value={form.comment}
                onChange={set("comment")}
                placeholder={b.commentPlaceholder}
                maxLength={500}
              />
            </div>
            {formError && (
              <div role="alert" style={{ ...formErrorStyle, gridColumn: "1 / -1" }}>{formError}</div>
            )}
            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="focus-ring"
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
          </form>
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
