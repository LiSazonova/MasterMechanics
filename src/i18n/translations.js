import { uk } from "./uk.js";
import { ru } from "./ru.js";
import { en } from "./en.js";

export const LANGUAGES = [
  { code: "uk", label: "UA" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export const translations = { uk, ru, en };

export const DEFAULT_LANG = "en";

export const NAV_HREFS = [
  { href: "#services", key: "services" },
  { href: "#why", key: "why" },
  { href: "#prices", key: "prices" },
  { href: "#process", key: "process" },
  { href: "#reviews", key: "reviews" },
  { href: "#contacts", key: "contacts" },
];
