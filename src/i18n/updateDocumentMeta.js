import { getOgImageUrl, SITE_URL } from "../constants/site.js";

function setMetaName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Sync document head with active locale (title, description, OG, Twitter). */
export function updateDocumentMeta(lang, meta) {
  const htmlLang = lang === "uk" ? "uk" : lang;
  document.documentElement.lang = htmlLang;
  document.title = meta.title;
  setMetaName("description", meta.description);

  const url = SITE_URL.replace(/\/$/, "");
  const image = getOgImageUrl();

  setCanonical(url);
  setMetaProperty("og:title", meta.title);
  setMetaProperty("og:description", meta.description);
  setMetaProperty("og:image", image);
  setMetaProperty("og:url", url);
  setMetaProperty("og:type", "website");
  setMetaProperty("og:locale", htmlLang === "en" ? "en_US" : htmlLang === "uk" ? "uk_UA" : "ru_RU");

  setMetaName("twitter:card", "summary_large_image");
  setMetaName("twitter:title", meta.title);
  setMetaName("twitter:description", meta.description);
  setMetaName("twitter:image", image);
}
