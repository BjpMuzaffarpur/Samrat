import { h, clear } from "../core/dom.js";
import { t, onLangChange } from "../core/i18n.js";
import { FOOTER } from "../content/site.js";

/** Site footer: contact line and publisher/printer line. Redraws on language change. */
export function mountFooter(host) {
  const draw = () => {
    clear(host);
    host.append(h("div", { class: "wrap" }, h("div", {}, t(FOOTER.contact)), h("div", {}, t(FOOTER.publisher))));
  };
  draw();
  return onLangChange(draw);
}
