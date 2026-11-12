import { h, clear } from "./dom.js";
import { t, getLang, setLang, onLangChange } from "./i18n.js";
import { NAV, FOOTER } from "../content/site.js";

export function mountLayout(page) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  const draw = () => {
    clear(header);
    const links = NAV.map((n) =>
      h("a", { href: n.href, "aria-current": n.page === page ? "page" : null }, t(n.label)));
    const toggle = h("button", {
      type: "button", "aria-label": "Change language / भाषा बदलें",
      onclick: () => setLang(getLang() === "hi" ? "en" : "hi"),
    }, getLang() === "hi" ? "English" : "हिन्दी");
    header.append(h("div", { class: "wrap" }, h("nav", {}, links), h("div", { class: "lang" }, toggle)));

    clear(footer);
    footer.append(h("div", { class: "wrap" },
      h("div", {}, t(FOOTER.contact)), h("div", {}, t(FOOTER.publisher))));
  };
  draw();
  onLangChange(draw);
}
