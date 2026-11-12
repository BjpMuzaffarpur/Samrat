import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { safeExternalUrl, isSafeHref, cleanText, buildPayload } from "../js/core/security.js";
import { t, setLang } from "../js/core/i18n.js";
import { CONFIG } from "../js/config.js";
import * as C from "../js/content/site.js";

test("safeExternalUrl allows only https + allow-listed hosts", () => {
  const H = CONFIG.proofHosts;
  assert.ok(safeExternalUrl("https://indiankanoon.org/doc/197528177/", H));
  assert.equal(safeExternalUrl("http://indiankanoon.org/x", H), "");
  assert.equal(safeExternalUrl("https://evil.example/x", H), "");
  assert.equal(safeExternalUrl("javascript:alert(1)", H), "");
  assert.equal(safeExternalUrl("https://user:pw@indiankanoon.org/", H), "");
  assert.equal(safeExternalUrl("https://indiankanoon.org.evil.com/", H), "");
});

test("isSafeHref blocks script-like links", () => {
  for (const ok of ["#a", "about.html", "mailto:a@b.co", "tel:8797858081"]) assert.ok(isSafeHref(ok), ok);
  for (const bad of ["javascript:alert(1)", "data:text/html,x", "//evil.com", "https://x.com", "vbscript:x"]) assert.ok(!isSafeHref(bad), bad);
});

test("cleanText strips control chars and caps length", () => {
  assert.equal(cleanText("a\u0000b\n\nc", 10), "a b c");
  assert.equal(cleanText("x".repeat(500), 20).length, 20);
});

test("buildPayload validates and whitelists", () => {
  const base = { type: "जुड़ना / Join", name: "राम", mobile: "9876543210", ward: "5", email: "", help: ["बूथ / Booth", "<script>"], lang: "hi" };
  const ok = buildPayload(base);
  assert.ok(ok.ok); assert.deepEqual(ok.data.help, ["बूथ / Booth"]);
  assert.equal(buildPayload({ ...base, mobile: "1234567890" }).ok, false);
  assert.equal(buildPayload({ ...base, type: "x" }).ok, false);
  assert.equal(buildPayload({ ...base, ward: "123" }).ok, false);
  assert.equal(buildPayload({ ...base, email: "bad" }).ok, false);
});

test("i18n picks language with fallback", () => {
  setLang("en"); assert.equal(t({ hi: "क", en: "a" }), "a");
  setLang("hi"); assert.equal(t({ hi: "क", en: "a" }), "क");
  assert.equal(t({ hi: "क" }), "क");
});

function walk(v, path, out) {
  if (v && typeof v === "object" && ("hi" in v || "en" in v) && !Array.isArray(v)) out.push([path, v]);
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, path + "." + k, out);
}
test("every text is bilingual and non-empty", () => {
  const found = []; for (const [k, v] of Object.entries(C)) walk(v, k, found);
  assert.ok(found.length > 80);
  for (const [p, v] of found) {
    const ok = (x) => (Array.isArray(x) ? x.length > 0 && x.every((s) => s.trim()) : String(x ?? "").trim().length > 0);
    assert.ok(ok(v.hi) && ok(v.en), "missing language at " + p);
  }
});

test("all configured proof URLs pass the allow-list; hidden ones are flagged", () => {
  for (const [k, s] of Object.entries(C.SOURCES)) if (s.url) assert.ok(safeExternalUrl(s.url, CONFIG.proofHosts), k);
  const all = [...C.ISSUES.struggle, ...C.ISSUES.issues, ...C.JOURNEY.timeline, ...C.PROOF.items];
  for (const i of all) for (const key of i.proof || []) assert.ok(key in C.SOURCES, "unknown proof key " + key);
  for (const i of all.filter((x) => x.needsProof)) for (const key of i.proof) assert.equal(C.SOURCES[key].url, "", "unverified item should stay hidden");
});

test("config holds no secrets", () => {
  const src = readFileSync(new URL("../js/config.js", import.meta.url), "utf8");
  assert.ok(!/secret\s*[:=]\s*["'][^"']+/i.test(src));
  assert.ok(!/AKfy|AIza|sk-[A-Za-z0-9]{10}/.test(src));
});

test("code never uses innerHTML/eval/inline handlers; HTML has no inline script/style", () => {
  const dirs = ["../js/core", "../js/components", "../js/pages", "../js/content"];
  for (const d of dirs) for (const f of readdirSync(new URL(d + "/", import.meta.url))) {
    const s = readFileSync(new URL(d + "/" + f, import.meta.url), "utf8");
    assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\(|new Function/.test(s), f);
  }
  for (const f of readdirSync(new URL("../", import.meta.url)).filter((n) => n.endsWith(".html"))) {
    const s = readFileSync(new URL("../" + f, import.meta.url), "utf8");
    assert.ok(!/<script(?![^>]*\bsrc=)/.test(s), f + " has inline script");
    assert.ok(!/\sstyle=|\son[a-z]+=/.test(s), f + " has inline style/handler");
    assert.ok(/Content-Security-Policy/.test(s), f + " lacks CSP");
  }
});
