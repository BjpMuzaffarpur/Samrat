import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { JOURNEY } from "../content/site.js";
import { proofLinks, isVisible } from "../components/proof.js";
import { section } from "./_ui.js";

export function render(app) {
  const tl = h("div", { class: "timeline" }, JOURNEY.timeline.filter(isVisible).map((r) => {
    const links = proofLinks(r.proof);
    return h("p", {}, h("b", {}, r.year), " — ", t(r.text), links.length ? " " : null, links);
  }));
  app.append(section(h("h2", {}, t(JOURNEY.title)), tl,
    h("ul", { class: "work" }, JOURNEY.work.map((w) => h("li", {}, t(w)))),
    h("p", { class: "small" }, t(JOURNEY.note))));
}
