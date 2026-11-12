import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { PROOF } from "../content/site.js";
import { section, entries } from "./_ui.js";

export function render(app) {
  app.append(section(h("h2", {}, t(PROOF.title)), h("p", { class: "small" }, t(PROOF.intro)), entries(PROOF.items)));
}
