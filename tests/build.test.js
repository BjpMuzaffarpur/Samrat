import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build, injectConfig } from "../scripts/build.mjs";

const cfg = readFileSync(new URL("../js/config.js", import.meta.url), "utf8");

test("injectConfig fills valid public values", () => {
  const out = injectConfig(cfg, {
    FORM_ENDPOINT: "https://script.google.com/macros/s/AKfycbxABC-123_x/exec",
    TURNSTILE_SITE_KEY: "0x4AAAAAAAabcdefghij",
    UPI_ID: "samrat@okhdfcbank",
  });
  assert.match(out, /formEndpoint:\s*"https:\/\/script\.google\.com\/macros\/s\/AKfycbxABC-123_x\/exec"/);
  assert.match(out, /upiId:\s*"samrat@okhdfcbank"/);
});

test("injectConfig rejects malformed or hostile values", () => {
  for (const env of [
    { FORM_ENDPOINT: "https://evil.example/exec" },
    { FORM_ENDPOINT: 'https://script.google.com/macros/s/x/exec"; alert(1);//' },
    { UPI_ID: 'a"b@x' }, { TURNSTILE_SITE_KEY: "nope" },
  ]) assert.throws(() => injectConfig(cfg, env));
});

test("empty variables leave config untouched", () => assert.equal(injectConfig(cfg, {}), cfg));

test("build copies only public files", () => {
  const out = build({ out: join(mkdtempSync(join(tmpdir(), "k-")), "dist"), env: {} });
  for (const f of ["index.html", "connect.html", "js/main.js", "js/pages/_ui.js", "assets/samrat.jpg", ".nojekyll"]) assert.ok(existsSync(join(out, f)), f);
  for (const f of ["backend", "tests", "scripts", "package.json", "README.md", ".github", "docs"]) assert.ok(!existsSync(join(out, f)), f + " must not be published");
});
