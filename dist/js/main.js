import { mountLayout } from "./core/layout.js";
import { onLangChange, getLang } from "./core/i18n.js";
import { clear } from "./core/dom.js";

// Allow-list of page modules: the page name comes from the HTML, never from the URL.
const PAGES = {
  home: () => import("./pages/home.js"),
  about: () => import("./pages/about.js"),
  issues: () => import("./pages/issues.js"),
  journey: () => import("./pages/journey.js"),
  proof: () => import("./pages/proof.js"),
  vision: () => import("./pages/vision.js"),
  connect: () => import("./pages/connect.js"),
};

const page = document.body.dataset.page;
const app = document.getElementById("app");
document.documentElement.lang = getLang();

if (PAGES[page] && app) {
  mountLayout(page);
  const mod = await PAGES[page]();
  const draw = () => { clear(app); mod.render(app); };
  draw();
  onLangChange(draw);
}
