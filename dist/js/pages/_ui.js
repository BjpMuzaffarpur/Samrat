import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { proofLinks, isVisible } from "../components/proof.js";

export const title = (txt) => h("div", { class: "page-title" }, h("div", { class: "wrap" }, h("h1", {}, t(txt))));
export const section = (...kids) => h("section", {}, h("div", { class: "wrap" }, ...kids));

/** <li> with optional bold head, body text and validated proof links. */
export function entry(item) {
  const links = proofLinks(item.proof);
  return h("li", {}, item.head ? h("b", {}, t(item.head), ": ") : null, t(item.text), links.length ? " " : null, links);
}
export const entries = (items) => h("ul", { class: "work" }, items.filter(isVisible).map(entry));
