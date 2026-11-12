import { h } from "../core/dom.js";

/** Renders a QR as an <img> with a data: URI produced by the vendored qrcode-generator. */
export function qrImage(text, alt) {
  const lib = globalThis.qrcode;
  if (typeof lib !== "function") return h("span", { class: "small" }, "QR unavailable");
  const qr = lib(0, "M");
  qr.addData(text);
  qr.make();
  return h("div", { class: "qrbox" }, h("img", { src: qr.createDataURL(5, 2), alt, width: 170, height: 170 }));
}
