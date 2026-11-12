import { CONFIG } from "../config.js";

let loading;
function loadApi() {
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true; s.onload = () => resolve(globalThis.turnstile); s.onerror = reject;
    document.head.append(s);
  });
  return loading;
}

/** Optional captcha. Returns {getToken, reset}. No-op when no site key is configured. */
export async function mountTurnstile(container) {
  if (!CONFIG.turnstileSiteKey) return { enabled: false, getToken: () => "", reset() {} };
  let token = "", id;
  try {
    const api = await loadApi();
    id = api.render(container, { sitekey: CONFIG.turnstileSiteKey, callback: (v) => { token = v; }, "expired-callback": () => { token = ""; } });
  } catch { /* shows as "security check" error on submit */ }
  return { enabled: true, getToken: () => token, reset() { token = ""; try { globalThis.turnstile.reset(id); } catch { /* ignore */ } } };
}
