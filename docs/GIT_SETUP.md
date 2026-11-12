# Git + GitHub workflow

## 1. Create the repo (once)
```bash
cd kanti-site
git init -b main
npm test                      # must pass before the first commit
git add .
git commit -m "Initial site"
# create an EMPTY repo on GitHub (no README), then:
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```
GitHub Pages on a *private* repo needs a paid plan. The site holds no secrets, so a public repo is fine.

## 2. Public settings as repository Variables (not Secrets)
GitHub → Settings → Secrets and variables → Actions → **Variables**:

| Variable | Example |
|---|---|
| `FORM_ENDPOINT` | `https://script.google.com/macros/s/…/exec` |
| `TURNSTILE_SITE_KEY` | `0x4AAAA…` |
| `UPI_ID` | `name@bank` |

The build injects them into `dist/js/config.js` and **fails** if a value has the wrong format. The Turnstile *secret* and Sheet ID never go to GitHub: they stay in Apps Script *Script properties*.

## 3. Turn on Pages
Settings → Pages → Source: **GitHub Actions**. Every push to `main` runs tests, builds `dist/`, and deploys.
GitHub Pages ignores `_headers`, so only the `<meta>` CSP applies. For full headers use the optional Cloudflare workflow.

## 4. Protect `main`
Settings → Branches → Add rule for `main`: require a pull request, require the **CI / test** check, block force-pushes.

## 5. Daily flow
```bash
git switch -c fix/ward-validation
# edit → npm test
git commit -am "Fix ward validation" && git push -u origin HEAD
# open PR → CI runs → merge → site deploys automatically
```

## 6. Apps Script (backend) is deployed separately
`backend/Code.gs` is version-controlled here but deployed by hand: Apps Script → paste → Deploy → *New version*.
After editing `Code.gs`, redeploy a new version or the live `/exec` keeps running the old code.

## Optional: Cloudflare Pages
Add secrets `CLOUDFLARE_API_TOKEN` (Pages:Edit only) and `CLOUDFLARE_ACCOUNT_ID`, variable `CF_PAGES_PROJECT`, then run the *Deploy to Cloudflare Pages* workflow manually.
