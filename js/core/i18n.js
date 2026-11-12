import { CONFIG } from "../config.js";

const KEY = "kanti.lang";
const listeners = new Set();
let lang = CONFIG.defaultLang;

try { // preference only; page works if storage is blocked
  const s = typeof localStorage !== "undefined" && localStorage.getItem(KEY);
  if (s === "hi" || s === "en") lang = s;
} catch { /* ignore */ }

export const getLang = () => lang;

export function setLang(next) {
  if (next !== "hi" && next !== "en") return;
  lang = next;
  try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
  if (typeof document !== "undefined") document.documentElement.lang = next;
  listeners.forEach((fn) => fn(next));
}

export const onLangChange = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

/** Pick the active language from {hi, en}; falls back to the other language. */
export const t = (v) => (v && typeof v === "object" ? (v[lang] ?? v.hi ?? v.en ?? "") : String(v ?? ""));
