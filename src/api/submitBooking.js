import { BOOKING_WEBHOOK_URL } from "../constants/api.js";

/**
 * @param {{ name: string, phone: string, car: string, service: string, comment: string, language: string }} payload
 */
export async function submitBooking(payload) {
  const res = await fetch(BOOKING_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("submit failed");
  try {
    return await res.json();
  } catch {
    return { ok: true };
  }
}
