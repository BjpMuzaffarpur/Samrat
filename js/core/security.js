// Pure helpers (no DOM) so they can be unit-tested in Node.

/** Returns a normalised https URL only if its host is in `hosts`; otherwise "". */
export function safeExternalUrl(value, hosts) {
  try {
    const u = new URL(String(value));
    if (u.protocol !== "https:" || u.username || u.password) return "";
    return hosts.includes(u.hostname) ? u.href : "";
  } catch { return ""; }
}

/** Relative same-site links, in-page anchors, mailto: and tel: only. */
export function isSafeHref(value) {
  const v = String(value).trim();
  return /^(#[\w-]*|[\w-]+\.html(#[\w-]*)?|mailto:[^\s<>"']+|tel:\+?\d{6,15})$/.test(v);
}

/** Trim, collapse control chars, cap length. Output is only ever inserted via textContent. */
export function cleanText(value, max = 200) {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export const isMobile = (v) => /^[6-9][0-9]{9}$/.test(String(v));
export const isEmail = (v) => v === "" || (v.length <= 120 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v));
export const isWard = (v) => v === "" || /^[0-9]{1,2}$/.test(v);

export const FORM_TYPES = Object.freeze(["जुड़ना / Join", "सुझाव / Suggestion", "शिकायत / Complaint"]);
export const HELP_OPTIONS = Object.freeze([
  "जनसंपर्क / Door-to-door", "बूथ / Booth", "सोशल मीडिया / Social media", "वाहन / Vehicle", "अन्य / Other",
]);

/** Builds the exact payload the server accepts; returns {ok, data} or {ok:false, error}. */
export function buildPayload(raw) {
  const d = {
    type: cleanText(raw.type, 40),
    name: cleanText(raw.name, 80),
    mobile: cleanText(raw.mobile, 20),   // cap AFTER validation rules can reject overflow
    ward: cleanText(raw.ward, 20),
    email: cleanText(raw.email, 120),
    address: cleanText(raw.address, 160),
    help: (raw.help || []).filter((h) => HELP_OPTIONS.includes(h)),
    note: cleanText(raw.note, 500),
    lang: raw.lang === "en" ? "en" : "hi",
    token: cleanText(raw.token, 2100),
    hp: cleanText(raw.hp, 50),
  };
  if (!FORM_TYPES.includes(d.type)) return { ok: false, error: "type" };
  if (d.name.length < 2) return { ok: false, error: "name" };
  if (!isMobile(d.mobile)) return { ok: false, error: "mobile" };
  if (!isWard(d.ward)) return { ok: false, error: "ward" };
  if (!isEmail(d.email)) return { ok: false, error: "email" };
  return { ok: true, data: d };
}
