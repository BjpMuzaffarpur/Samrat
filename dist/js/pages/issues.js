import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { ISSUES } from "../content/site.js";
import { section, entries } from "./_ui.js";

export function render(app) {
  app.append(
    section(h("h2", {}, t(ISSUES.struggleTitle)), entries(ISSUES.struggle)),
    section(h("h2", {}, t(ISSUES.issuesTitle)), entries(ISSUES.issues)));
}
