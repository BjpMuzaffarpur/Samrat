import { h, clear } from "../core/dom.js";
import { t, getLang, onLangChange } from "../core/i18n.js";
import { buildPayload } from "../core/security.js";
import { CONFIG } from "../config.js";
import { FORM } from "../content/site.js";
import { mountTurnstile } from "./turnstile.js";

const COOLDOWN_KEY = "kanti.lastSend";
const ERR = { rate_limit: "rate", captcha: "captcha" };

function lastSend() { try { return Number(localStorage.getItem(COOLDOWN_KEY)) || 0; } catch { return 0; } }
function markSent() { try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch { /* ignore */ } }

export function renderForm(host) {
  let form, msgEl, btn, tsHost, ts, openedAt = Date.now();
  const state = { values: { type: FORM.types[0].value, help: [] } };

  const say = (cls, key) => { msgEl.className = cls; msgEl.textContent = t(FORM.msg[key]); msgEl.dataset.key = key; };

  const field = (label, input) => h("label", { class: "f" }, label, input);

  function draw() {
    // keep typed values across language switches
    if (form) {
      const d = new FormData(form);
      Object.assign(state.values, { name: d.get("name"), mobile: d.get("mobile"), ward: d.get("ward"), email: d.get("email"), address: d.get("address"), note: d.get("note"), type: d.get("type") || state.values.type, help: d.getAll("help") });
    }
    clear(host);
    const v = state.values;
    const typeSet = h("fieldset", {}, h("legend", {}, t(FORM.typeLegend)),
      FORM.types.map((o) => h("label", {}, h("input", { type: "radio", name: "type", value: o.value, checked: v.type === o.value }), " ", t(o.label))));
    const helpSet = h("fieldset", {}, h("legend", {}, t(FORM.helpLegend)),
      FORM.helps.map((o) => h("label", {}, h("input", { type: "checkbox", name: "help", value: o.value, checked: (v.help || []).includes(o.value) }), " ", t(o.label))));
    tsHost = h("div", { class: "turnstile" });
    msgEl = h("div", { id: "msg", role: "status", "aria-live": "polite" });
    btn = h("button", { class: "btn", type: "submit" }, t(FORM.submit));
    form = h("form", { novalidate: true, autocomplete: "on", onsubmit: submit },
      typeSet,
      h("div", { class: "row" },
        field(t(FORM.name), h("input", { type: "text", name: "name", required: true, maxlength: 80, autocomplete: "name", value: v.name || "" })),
        field(t(FORM.mobile), h("input", { type: "tel", name: "mobile", required: true, inputmode: "numeric", maxlength: 10, pattern: "[6-9][0-9]{9}", autocomplete: "tel", value: v.mobile || "" }))),
      h("div", { class: "row" },
        field(t(FORM.ward), h("input", { type: "text", name: "ward", maxlength: 2, inputmode: "numeric", value: v.ward || "" })),
        field(t(FORM.email), h("input", { type: "email", name: "email", maxlength: 120, autocomplete: "email", value: v.email || "" }))),
      field(t(FORM.address), h("input", { type: "text", name: "address", maxlength: 160, autocomplete: "street-address", value: v.address || "" })),
      helpSet,
      field(t(FORM.note), h("textarea", { name: "note", rows: 3, maxlength: 500 }, v.note || "")),
      h("input", { class: "hp", type: "text", name: "website", tabindex: -1, autocomplete: "off", "aria-hidden": "true" }), // honeypot
      h("label", { class: "consent" }, h("input", { type: "checkbox", name: "consent", required: true }), " ", t(FORM.consent)),
      tsHost, btn, msgEl);
    host.append(form);
    if (CONFIG.turnstileSiteKey) mountTurnstile(tsHost).then((c) => { ts = c; });
  }

  async function submit(e) {
    e.preventDefault();
    const d = new FormData(form);
    if (d.get("website")) return;                                      // honeypot tripped: silently drop
    if (Date.now() - openedAt < CONFIG.minFillMs) return say("err", "wait");
    if (Date.now() - lastSend() < CONFIG.clientCooldownMs) return say("err", "wait");
    if (!d.get("consent")) return say("err", "consent");
    if (!CONFIG.formEndpoint) return say("err", "notReady");
    if (CONFIG.turnstileSiteKey && !(ts && ts.getToken())) return say("err", "captcha");

    const built = buildPayload({
      type: d.get("type"), name: d.get("name"), mobile: d.get("mobile"), ward: d.get("ward"), email: d.get("email"),
      address: d.get("address"), help: d.getAll("help"), note: d.get("note"), lang: getLang(),
      token: ts ? ts.getToken() : "", hp: "",
    });
    if (!built.ok) return say("err", "invalid");

    btn.disabled = true; say("", "sending");
    const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 15000);
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST", signal: ctl.signal, redirect: "follow", credentials: "omit", referrerPolicy: "no-referrer",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // "simple" request: no CORS preflight (Apps Script needs this)
        body: JSON.stringify(built.data),
      });
      const out = await res.json();
      if (out && out.ok) { markSent(); state.values = { type: FORM.types[0].value, help: [] }; draw(); say("ok", "ok"); openedAt = Date.now(); }
      else { say("err", ERR[out && out.error] || "fail"); ts && ts.reset(); btn.disabled = false; }
    } catch { say("err", "fail"); btn.disabled = false; }
    finally { clearTimeout(timer); }
  }

  draw();
  onLangChange(() => { const key = msgEl && msgEl.dataset.key; const cls = msgEl && msgEl.className; draw(); if (key) say(cls, key); });
}
