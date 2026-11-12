import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { VISION } from "../content/site.js";
import { section } from "./_ui.js";

export function render(app) {
  app.append(section(h("h2", {}, t(VISION.title)),
    h("div", { class: "facts vis" }, VISION.items.map((i) => h("div", {}, h("b", {}, t(i.head)), t(i.text))))));
}
