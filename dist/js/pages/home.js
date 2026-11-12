import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { HOME, NAV } from "../content/site.js";

export function render(app) {
  const hero = h("div", { class: "hero" }, h("div", { class: "wrap" },
    h("div", {},
      h("h1", {}, t(HOME.title)),
      h("p", { class: "post" }, t(HOME.post)),
      h("blockquote", { class: "quote" }, t(HOME.quote)),
      h("a", { class: "btn", href: "connect.html" }, t(HOME.ctaConnect)),
      h("a", { class: "btn alt", href: "proof.html" }, t(HOME.ctaProof))),
    h("img", { src: "assets/samrat.jpg", alt: t(HOME.photoAlt), width: 420, height: 451 })));
  const motto = h("div", { class: "motto" }, h("div", { class: "wrap" },
    h("p", {}, t(HOME.motto).map((l, i) => [i ? h("br") : null, l])),
    h("p", { class: "small" }, t(HOME.journey))));
  const cards = h("section", {}, h("div", { class: "wrap" },
    h("div", { class: "cards" }, NAV.filter((n) => n.page !== "home").map((n) => h("a", { class: "card", href: n.href }, h("b", {}, t(n.label)))))));
  app.append(hero, motto, cards);
}
