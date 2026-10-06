# FORE

A golf card game for the course. One phone, no accounts, no network. Draw a
card, show the group. Modeled on the FORE! Cards deck, for regular ball golf.

- **Format cards** change the hole for everyone, then expire. Each is worth points.
- **Keeps cards** are personal. Hold them, spend them whenever.

## Layout

| File | Purpose |
| --- | --- |
| `cards.md` | The only place card text lives. Parsed at build time. |
| `template.html` | The whole app. Placeholder comments get filled by the build. |
| `sw.template.js` | Service worker source. Version and asset list stamped in at build. |
| `build.js` | Bumps `VERSION`, parses cards, generates icons, emits `docs/`. |
| `sounds/` | `draw.wav` and `shuffle.wav`. Copied into the build and precached. |
| `docs/` | Build output. Served by GitHub Pages. Commit it. |
| `serve.js` | Local static server for `docs/` with no-cache headers. |

## Build and run

```
node build.js
node serve.js
```

Then open http://localhost:8080/. Every build bumps the last number of
`VERSION` (it is a build count, not a decimal).

## Service worker rules

1. Navigation is fresh-first: fetch with `cache: "no-store"`, race the stored
   copy with a 1200 ms timeout, serve the winner, always write the fresh one back.
2. The build version is stamped into the worker. The page only shows the
   update banner when the worker is newer than the page.
3. Install waits on the page only. Assets precache in their own `waitUntil`.
4. Assets are fetched with `cache: "reload"` and stored under fixed keys.
   Never `cache.addAll`.
