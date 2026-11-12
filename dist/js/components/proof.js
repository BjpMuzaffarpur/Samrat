import { externalLink } from "../core/dom.js";
import { safeExternalUrl } from "../core/security.js";
import { t } from "../core/i18n.js";
import { CONFIG } from "../config.js";
import { SOURCES } from "../content/site.js";

/** Returns validated proof anchors for the given keys (empty/invalid sources are skipped). */
export function proofLinks(keys = []) {
  const out = [];
  for (const k of keys) {
    const s = SOURCES[k];
    const url = s ? safeExternalUrl(s.url, CONFIG.proofHosts) : "";
    if (url) out.push(externalLink(url, t(s.label)));
  }
  return out;
}

/** An item flagged needsProof is shown only when at least one of its links is valid. */
export const isVisible = (item) => !item.needsProof || proofLinks(item.proof).length > 0;
