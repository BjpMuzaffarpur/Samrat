// PUBLIC configuration only. Everything in this file is visible to every visitor.
// NEVER put a password, API secret, Turnstile secret or Sheet ID here.
// Secrets live in Google Apps Script -> Project Settings -> Script properties.
export const CONFIG = Object.freeze({
  formEndpoint: "",        // Apps Script web-app URL (…/exec). Public by design; protected server-side.
  turnstileSiteKey: "",    // Cloudflare Turnstile SITE key (public). Leave "" to disable captcha.
  upiId: "8797858081@ybl", // e.g. "name@bank". A UPI ID is public by nature (printed on every QR).
  payeeName: "Samrat Kumar Gupta",
  phone: "8797858081",
  email: "bjp95kanti@gmail.com",
  defaultLang: "hi",
  // Only these hosts may appear in "proof" links (blocks accidental/malicious redirects).
  proofHosts: Object.freeze(["www.livehindustan.com", "indiankanoon.org", "courtmesh.ai"]),
  minFillMs: 3000,         // forms submitted faster than this are treated as bots
  clientCooldownMs: 60000, // one submission per browser per minute
});
