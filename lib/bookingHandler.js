function isValidPhone(value) {
  const digits = String(value).replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 12;
}

function validationError(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

/**
 * @param {unknown} raw
 */
export function normalizeBookingPayload(raw) {
  if (!raw || typeof raw !== "object") {
    throw validationError("Invalid payload");
  }
  const body = /** @type {Record<string, unknown>} */ (raw);
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const car = String(body.car ?? "").trim();
  const service = String(body.service ?? "").trim();
  const comment = String(body.comment ?? "").trim();
  const language = String(body.language ?? "").trim() || "en";

  if (name.length < 2) throw validationError("Invalid name");
  if (!isValidPhone(phone)) throw validationError("Invalid phone");
  if (!car) throw validationError("Invalid car");
  if (!service) throw validationError("Invalid service");

  return { name, phone, car, service, comment, language };
}

/**
 * @param {{ name: string, phone: string, car: string, service: string, comment: string, language: string }} payload
 */
export function formatTelegramMessage(payload) {
  const lines = [
    "New booking request",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Vehicle: ${payload.car}`,
    `Service: ${payload.service}`,
  ];
  if (payload.comment) lines.push(`Comment: ${payload.comment}`);
  return lines.join("\n");
}

/**
 * @param {{ name: string, phone: string, car: string, service: string, comment: string, language: string }} payload
 * @param {{ botToken: string, chatId: string }} config
 */
export async function sendBookingToTelegram(payload, { botToken, chatId }) {
  const text = formatTelegramMessage(payload);
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!res.ok) {
    const err = new Error("Telegram API error");
    err.status = 502;
    throw err;
  }
}

/**
 * @param {unknown} rawBody
 * @param {{ botToken: string, chatId: string }} config
 */
export async function handleBooking(rawBody, config) {
  if (!config.botToken || !config.chatId) {
    const err = new Error("Booking is not configured");
    err.status = 503;
    throw err;
  }
  const payload = normalizeBookingPayload(rawBody);
  await sendBookingToTelegram(payload, config);
  return { ok: true };
}
