// Builds ./dist : only the files that must be public, with PUBLIC settings injected from
// environment variables (GitHub repository *Variables*). Secrets never pass through here.
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const PAGES = ["index", "about", "issues", "journey", "proof", "vision", "connect"].map((p) => p + ".html");
const INCLUDE = [...PAGES, "css", "assets", "js", "_headers"];

const RULES = {
  formEndpoint: { env: "FORM_ENDPOINT", re: /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/ },
  turnstileSiteKey: { env: "TURNSTILE_SITE_KEY", re: /^0x[\w-]{10,}$/ },
  upiId: { env: "UPI_ID", re: /^[\w.\-]{2,256}@[A-Za-z]{2,64}$/ },
};

/** Returns config.js text with any provided, validated values filled in. Throws on invalid input. */
export function injectConfig(source, env = {}) {
  let out = source;
  for (const [key, { env: name, re }] of Object.entries(RULES)) {
    const val = (env[name] || "").trim();
    if (!val) continue;
    if (!re.test(val)) throw new Error(`${name} has an invalid format; refusing to build.`);
    const pattern = new RegExp(`(${key}:\\s*)"[^"]*"`);
    if (!pattern.test(out)) throw new Error(`config.js has no ${key} field to fill.`);
    out = out.replace(pattern, (_, p) => `${p}${JSON.stringify(val)}`);
  }
  return out;
}

export function build({ root = ROOT, out = resolve(ROOT, "dist"), env = process.env } = {}) {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  for (const item of INCLUDE) cpSync(resolve(root, item), resolve(out, item), { recursive: true });
  const cfgPath = resolve(out, "js/config.js");
  writeFileSync(cfgPath, injectConfig(readFileSync(cfgPath, "utf8"), env));
  writeFileSync(resolve(out, ".nojekyll"), ""); // serve files starting with "_" (e.g. js/pages/_ui.js)
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log("Built:", build());
}
