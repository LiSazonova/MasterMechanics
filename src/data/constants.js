export const PHONE = "+38 (093) 044-54-53";
export const PHONE_HREF = "tel:+380930445453";

/** Personal Telegram chat (phone must be linked in Telegram). Override with VITE_TELEGRAM_CONTACT. */
export const TELEGRAM_HREF =
  import.meta.env.VITE_TELEGRAM_CONTACT ?? "https://t.me/+380930445453";
