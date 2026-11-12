import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { ABOUT } from "../content/site.js";
import { title, section } from "./_ui.js";

export function render(app) {
  app.append(title(ABOUT.title),
    section(
      h("div", { class: "facts" }, ABOUT.facts.map((f) => h("div", {}, h("b", {}, t(f.big)), t(f.text)))),
      h("p", { class: "prose" }, t(ABOUT.bio))),
    section(h("h2", {}, t(ABOUT.ideologyTitle)),
      h("ul", { class: "work" }, ABOUT.ideology.map((i) => h("li", {}, h("b", {}, t(i.head), ": "), t(i.text))))));
}
