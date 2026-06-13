/** Set VITE_SITE_URL in .env to your production domain (e.g. Vercel deploy URL). */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://master-mechanics-yxq6.vercel.app";

export const OG_IMAGE_PATH = "/og-image.png";

export function getOgImageUrl() {
  return `${SITE_URL.replace(/\/$/, "")}${OG_IMAGE_PATH}`;
}
