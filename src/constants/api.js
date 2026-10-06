/** Same-origin Vercel serverless route; override only for special setups. */
export const BOOKING_API_URL =
  import.meta.env.VITE_BOOKING_API_URL ?? "/api/booking";
