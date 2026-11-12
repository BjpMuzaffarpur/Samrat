import { h } from "../core/dom.js";
import { t } from "../core/i18n.js";
import { CONFIG } from "../config.js";
import { CONNECT } from "../content/site.js";
import { qrImage } from "../components/qr.js";
import { renderForm } from "../components/form.js";
import { section } from "./_ui.js";

let formHost; // form keeps its own state; mount once, never re-created on language change

export function render(app) {
  if (!formHost) { formHost = h("div", { class: "formhost" }); renderForm(formHost); }
  const upi = CONFIG.upiId
    ? "upi://pay?pa=" + encodeURIComponent(CONFIG.upiId) + "&pn=" + encodeURIComponent(CONFIG.payeeName) + "&cu=INR"
    : "";
  const note = h("p", { class: "small", role: "status" });
  const copy = h("button", { class: "btn alt", type: "button", onclick: async () => {
    if (!CONFIG.upiId) return;
    try { await navigator.clipboard.writeText(CONFIG.upiId); note.textContent = t(CONNECT.copied); } catch { note.textContent = CONFIG.upiId; }
  } }, t(CONNECT.copyUpi));

  app.append(
    section(h("h2", {}, t(CONNECT.title)),
      h("p", {}, "☎ ", h("a", { href: "tel:" + CONFIG.phone }, CONFIG.phone), "  ✉ ", h("a", { href: "mailto:" + CONFIG.email }, CONFIG.email)),
      formHost),
    section(h("h2", {}, t(CONNECT.supportTitle)),
      h("div", { class: "support" },
        upi ? qrImage(upi, "UPI QR") : h("p", { class: "small" }, t(CONNECT.upiNotSet)),
        h("div", {}, h("p", {}, t(CONNECT.upiText)), upi ? copy : null, note, h("p", { class: "small" }, t(CONNECT.upiRule)))),
      h("h3", {}, t(CONNECT.shareTitle)),
      qrImage(location.href.split("#")[0].split("?")[0], "Page QR")));
}
