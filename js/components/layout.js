import { mountHeader } from "../components/header.js";
import { mountFooter } from "../components/footer.js";

/** Mounts the shared header and footer (each is its own module) into the page shell. */
export function mountLayout(page) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) mountHeader(header, page);
  if (footer) mountFooter(footer);
}
