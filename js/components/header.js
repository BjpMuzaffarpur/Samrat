import { h, clear } from "../core/dom.js";
import { t, getLang, setLang, onLangChange } from "../core/i18n.js";
import { NAV } from "../content/site.js";

/** Site header: navigation + language switch. Redraws itself when the language changes. */
export function mountHeader(host, page) {
  const draw = () => {
    clear(host);
    const links = NAV.map((n) => h("a", { href: n.href, "aria-current": n.page === page ? "page" : null }, t(n.label)));
    const toggle = h("button", {
      type: "button", "aria-label": "Change language / भाषा बदलें",
      onclick: () => setLang(getLang() === "hi" ? "en" : "hi"),
    }, getLang() === "hi" ? "English" : "हिन्दी");
    host.append(h("div", { class: "wrap" }, h("nav", { "aria-label": "Main" }, links), h("div", { class: "lang" }, toggle)));
  };
  draw();
  return onLangChange(draw);
}
