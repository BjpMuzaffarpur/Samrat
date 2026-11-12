import { isSafeHref } from "./security.js";

/**
 * Tiny element builder. Text is ALWAYS added with createTextNode (never as markup),
 * so content can never become markup. href is checked against a strict allow-list.
 */
export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else if (k === "href") { if (isSafeHref(v)) el.setAttribute("href", String(v)); }
    else if (k === "style" || k === "srcdoc") continue; // never allowed (CSP also blocks)
    else el.setAttribute(k, v === true ? "" : String(v));
  }
  add(el, kids);
  return el;
}

function add(el, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false) continue;
    el.append(k instanceof Node ? k : document.createTextNode(String(k)));
  }
}

export const clear = (el) => el.replaceChildren();

/** External link that has already passed safeExternalUrl(); opens in a new tab safely. */
export function externalLink(url, label) {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "proof";
  a.textContent = label;
  return a;
}
