# AVEX41.github.io

Personal portfolio site for Aleksander Hoff — cybersecurity, infrastructure, and photography.

## Stack
- Vite + TypeScript
- three.js (animated network-graph hero background)
- Deployed via GitHub Actions to GitHub Pages

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deployment
Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it via GitHub Pages. In the repo settings, set
**Settings > Pages > Source** to **GitHub Actions** (one-time setup).

## TODO before going live
- [ ] Add real Hack The Box / TryHackMe profile links in the Pentesting section
- [ ] Add a retired-machine writeup once published
- [ ] Replace placeholder photography grid with real images
- [ ] Replace placeholder email/LinkedIn in the Contact section
- [ ] Point custom domain (if registered) via repo Settings > Pages > Custom domain
