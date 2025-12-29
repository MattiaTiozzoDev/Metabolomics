# GitHub Copilot / AI Agent Instructions for Metabolomics

Purpose: give AI contributors the minimal, actionable context to be productive quickly.

## Quick start ✅
- Run dev server: `npm start` (executes `ng serve`).
- Run Electron hot: `npm run start:hot` (sets NODE_ENV=development and launches Electron).
- Build for production: `npm run build` (Angular build). To build Electron package: `npm run electron:build`.
- Asset server used for Electron production build: see `server.js` (exports `startAssetServer()` / `stopAssetServer()`).

## High-level architecture 🏗️
- Frontend: Angular 20 (see `src/`), single-page app with routes defined in `src/app/app.routes.ts`.
- Desktop packaging: Electron (`electron-main.js`, `electron.preload.js`) — the app can run in-browser or as a desktop app.
- Optional lightweight static express server for assets: `server.js` serves `dist/metabolomics/browser` assets at runtime.
- Data flow: static JSONs (in `src/assets/jsons/`) are loaded by `StaticDataService` and seeded into `CustomersDataService` at app init (`src/app/app.ts`).

## Key files to inspect 🔍
- `src/app/app.ts` — app bootstrap and initial static data load
- `src/services/static-data.service.ts` — loads `assets/jsons/{example,explanations,limit}.json`
- `src/services/file-reader.service.ts` — parses Excel files via `xlsx` into JSON (see `generateJSON` and `generateJSONFromDrop`)
- `electron-main.js`, `electron.preload.js` — Electron lifecycle and IPC points
- `server.js` — asset server used by Electron builds
- `package.json` — important npm scripts and electron-builder config

## Project-specific patterns & conventions ⚙️
- Translation: ngx-translate is used; default language set to `it` in `App` constructor.
- Static data pattern: small `loadX()` methods that both return an Observable and set a local property (e.g., `StaticDataService.limit`). Prefer using the service cache rather than extra HTTP calls when possible.
- File uploads: Excel files are parsed on the client using `xlsx` and `FileReader` — resulting JSON is passed through services (no backend conversion).
- Styling: SCSS modules under `src/styles/` and component-level `.scss` files.

## Testing & Debugging 🧪🔧
- Unit tests: `npm test` (Karma + Jasmine). Tests live next to sources with `.spec.ts` suffix.
- Debugging Electron: `npm run electron-build-like` will build production assets and start Electron with `--inspect=5858`.
- When running `npm run start:hot`, Electron expects environment `NODE_ENV=development`—use PowerShell on Windows as provided in the script.

## Common PR / change examples 💡
- Adding a new static JSON: add file `src/assets/jsons/foo.json`, add `loadFoo()` to `StaticDataService` and include in `forkJoin` in `App` initialization if needed.
- Changing Excel parsing behavior: modify `src/services/file-reader.service.ts` — examples use `XLSX.utils.sheet_to_json(sheet, { defval: null })`.
- Adding a new page/component: use Angular CLI (`ng generate component path/name`) then add route in `app.routes.ts` and import into the app module.

## External deps & integration points 🔗
- `xlsx` used for client-side Excel parsing (see `file-reader.service.ts`).
- `electron` + `electron-builder` used to package desktop app (see `package.json` scripts and `build` config).
- Express (`server.js`) is used only to serve built assets for Electron; there is no separate backend API in this repo.

## What not to change without verifying 🚩
- `src/assets/jsons/` contents — these are treated as canonical example data and referenced in app init.
- `electron-main.js` / `electron.preload.js` — breaking changes can prevent the desktop build from starting or cause IPC failures.
- `package.json` electron-builder `build` block — changes will affect packaging targets (Windows NSIS is configured).

## Helpful grep targets for quick edits
- Search for `StaticDataService` to find all static loads
- Search `file-reader.service.ts` to find Excel parsing logic
- Search `electron` or `electron-main.js` for Electron lifecycle and packaging details

---
If any section is unclear or you'd like short, concrete examples added (for example: a sample PR diff that modifies `StaticDataService` or a pattern for adding a new routed page), tell me which area and I'll expand the doc. Thanks!