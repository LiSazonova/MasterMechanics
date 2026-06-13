const MAP_LANG = { en: "en", uk: "uk", ru: "ru" };

/** Google Maps embed pb tail — language segments use !3m2!1s{hl}!2sua */
const EMBED_CORE =
  "!1m18!1m12!1m3!1d2751.166953039946!2d30.691626376870072!3d46.40574527110505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6331c50cfa33f%3A0x81d2c7eb8111dbc0!2z0KHQotCeIE1hc3RlciBNZWNoYW5pY3M!5e0";

export function getMapEmbedUrl(lang) {
  const hl = MAP_LANG[lang] ?? MAP_LANG.en;
  return `https://www.google.com/maps/embed?pb=${EMBED_CORE}!3m2!1s${hl}!2sua!4v1779373333510!5m2!1s${hl}!2sua`;
}
