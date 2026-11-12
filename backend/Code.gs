/**
 * Kanti campaign – secure form receiver (Google Apps Script web app).
 *
 * SECRETS ARE NEVER IN THIS FILE. Set them in:
 *   Apps Script editor → Project Settings (gear) → Script properties
 *     SHEET_ID          (required)  the ID in your Google Sheet URL
 *     SHEET_NAME        (optional)  default "Registrations"
 *     TURNSTILE_SECRET  (optional)  Cloudflare Turnstile SECRET key; if set, every submission is verified
 *
 * Deploy: Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * The /exec URL is public by design, so this script validates everything itself.
 */
var HEADERS = ["Time", "Type", "Name", "Mobile", "Ward", "Email", "Address", "Help", "Note", "Lang"];
var TYPES = ["जुड़ना / Join", "सुझाव / Suggestion", "शिकायत / Complaint"];
var HELPS = ["जनसंपर्क / Door-to-door", "बूथ / Booth", "सोशल मीडिया / Social media", "वाहन / Vehicle", "अन्य / Other"];
var MAX_BODY = 6000;          // bytes of JSON accepted
var GLOBAL_PER_MINUTE = 30;   // hard cap on all submissions per minute
var PER_MOBILE_SECONDS = 600; // one submission per mobile number per 10 minutes

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(v, max) {      // strip control chars, cap length, neutralise spreadsheet formulas
  var s = String(v == null ? "" : v).replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function validate_(d) {
  if (!d || typeof d !== "object") return null;
  var r = {
    type: String(d.type || ""), name: clean_(d.name, 80), mobile: String(d.mobile || ""), ward: String(d.ward || ""),
    email: clean_(d.email, 120), address: clean_(d.address, 160), note: clean_(d.note, 500),
    lang: d.lang === "en" ? "en" : "hi",
    help: (Array.isArray(d.help) ? d.help : []).filter(function (x) { return HELPS.indexOf(x) > -1; }).join(", ")
  };
  if (TYPES.indexOf(r.type) < 0) return null;
  if (r.name.length < 2) return null;
  if (!/^[6-9][0-9]{9}$/.test(r.mobile)) return null;
  if (r.ward && !/^[0-9]{1,2}$/.test(r.ward)) return null;
  if (r.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(r.email)) return null;
  return r;
}

function verifyTurnstile_(token, secret) {
  if (!token) return false;
  try {
    var res = UrlFetchApp.fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "post", payload: { secret: secret, response: String(token).slice(0, 2100) }, muteHttpExceptions: true
    });
    return JSON.parse(res.getContentText()).success === true;
  } catch (e) { return false; }
}

function doPost(e) {
  var lock = LockService.getScriptLock(), locked = false;
  try {
    if (!e || !e.postData || !e.postData.contents || e.postData.contents.length > MAX_BODY) return out_({ ok: false, error: "bad_request" });
    var d; try { d = JSON.parse(e.postData.contents); } catch (x) { return out_({ ok: false, error: "bad_request" }); }
    if (d && d.hp) return out_({ ok: true });                       // honeypot: pretend success
    var v = validate_(d);
    if (!v) return out_({ ok: false, error: "invalid" });

    var props = PropertiesService.getScriptProperties();
    var sheetId = props.getProperty("SHEET_ID");
    if (!sheetId) return out_({ ok: false, error: "server_config" });
    var secret = props.getProperty("TURNSTILE_SECRET");
    if (secret && !verifyTurnstile_(d.token, secret)) return out_({ ok: false, error: "captcha" });

    var cache = CacheService.getScriptCache();
    var mKey = "m:" + v.mobile;
    if (cache.get(mKey)) return out_({ ok: false, error: "rate_limit" });
    var gKey = "g:" + Math.floor(Date.now() / 60000), n = Number(cache.get(gKey) || 0);
    if (n >= GLOBAL_PER_MINUTE) return out_({ ok: false, error: "rate_limit" });

    lock.waitLock(10000); locked = true;
    var ss = SpreadsheetApp.openById(sheetId);
    var name = props.getProperty("SHEET_NAME") || "Registrations";
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sh.getLastRow() === 0) { sh.appendRow(HEADERS); sh.setFrozenRows(1); }
    var row = sh.getLastRow() + 1;
    sh.getRange(row, 4).setNumberFormat("@");                       // keep mobile as text
    sh.getRange(row, 1, 1, HEADERS.length).setValues([[new Date(), v.type, v.name, v.mobile, v.ward, v.email, v.address, v.help, v.note, v.lang]]);

    cache.put(mKey, "1", PER_MOBILE_SECONDS);
    cache.put(gKey, String(n + 1), 120);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: "server" });                    // never leak internals
  } finally {
    if (locked) lock.releaseLock();
  }
}

function doGet() { return out_({ ok: true, service: "registration" }); }
