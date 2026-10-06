import { handleBooking } from "../lib/bookingHandler.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await handleBooking(req.body, {
      botToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
      chatId: process.env.TELEGRAM_CHAT_ID ?? "",
    });
    return res.status(200).json(result);
  } catch (err) {
    const status = typeof err.status === "number" ? err.status : 500;
    const message = status === 500 ? "Could not submit request" : err.message;
    return res.status(status).json({ error: message });
  }
}
