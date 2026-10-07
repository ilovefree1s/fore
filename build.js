#!/usr/bin/env node
// FORE build. Reads cards.md, template.html and sw.template.js, bumps VERSION,
// and emits docs/ (index.html, sw.js, manifest.webmanifest, icons, sounds).
// No dependencies. Run with: node build.js
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'docs');
const THEME = '#14512b';

// ---------- VERSION: bump the last number (a build count, not a decimal) ----------
const versionFile = path.join(ROOT, 'VERSION');
const prev = fs.existsSync(versionFile) ? fs.readFileSync(versionFile, 'utf8').trim() : '0.1.0';
const parts = prev.split('.');
if (!parts.every((p) => /^\d+$/.test(p))) fail(`VERSION "${prev}" is not dotted integers`);
parts[parts.length - 1] = String(Number(parts[parts.length - 1]) + 1);
const VERSION = parts.join('.');

// ---------- cards.md ----------
function parseCards(md) {
  // Body is a list of blocks: { type: 'p', text } or { type: 'list', label, items }.
  const cards = [];
  let pile = null;
  let card = null;
  let para = [];   // lines of the paragraph being collected
  let list = null; // list being collected, or null
  const flushPara = () => {
    if (card && para.length) card.body.push({ type: 'p', text: para.join(' ') });
    para = [];
  };
  const flushList = () => {
    if (card && list && list.items.length) card.body.push(list);
    else if (card && list && list.label) card.body.push({ type: 'p', text: list.label + ':' });
    list = null;
  };
  const flush = () => { flushPara(); flushList(); };
  md.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trimEnd();
    const ln = i + 1;
    let m;
    if ((m = /^#\s+(.+)$/.exec(line))) {
      flush();
      card = null;
      const h = m[1].toLowerCase();
      pile = /fore-?mat|format/.test(h) ? 'format' : /keep|power/.test(h) ? 'keeps' : null;
      return;
    }
    if ((m = /^##\s+(.+)$/.exec(line))) {
      flush();
      if (!pile) fail(`cards.md:${ln}: card "${m[1]}" is not under a Fore-Mat or Power Up pile heading`);
      const title = m[1].trim();
      const id = pile + ':' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (cards.some((c) => c.id === id)) fail(`cards.md:${ln}: duplicate card "${title}" in ${pile} pile`);
      card = { id, pile, title, points: null, format: null, count: 1, body: [] };
      cards.push(card);
      return;
    }
    if (!card) return; // prose before the first pile, or under a pile heading
    if ((m = /^(points|count|format):\s*(.+?)\s*$/i.exec(line))) {
      flush();
      const key = m[1].toLowerCase();
      if (key === 'count') {
        if (!/^\d+$/.test(m[2])) fail(`cards.md:${ln}: count must be a whole number`);
        card.count = Number(m[2]);
      } else if (key === 'points') {
        if (m[2].length > 5) fail(`cards.md:${ln}: points "${m[2]}" is too long for the badge (5 chars max)`);
        card.points = m[2];
      } else {
        card.format = m[2];
      }
      return;
    }
    if (line.trim() === '') { flush(); return; }
    if ((m = /^([A-Za-z][^:]{0,40}):$/.exec(line.trim()))) { // "Restrictions:" starts a labeled list
      flush();
      list = { type: 'list', label: m[1].trim(), items: [] };
      return;
    }
    if ((m = /^-\s+(.+)$/.exec(line.trim()))) {
      flushPara();
      if (!list) list = { type: 'list', label: null, items: [] };
      list.items.push(m[1].trim());
      return;
    }
    if (list && list.items.length) { // continuation of a wrapped bullet
      list.items[list.items.length - 1] += ' ' + line.trim();
      return;
    }
    para.push(line.trim());
  });
  flush();

  cards.forEach((c) => {
    if (c.pile === 'format' && c.points == null) fail(`cards.md: Fore-Mat card "${c.title}" has no "points:" line`);
    if (c.pile === 'keeps' && (c.points != null || c.format != null)) fail(`cards.md: Power Up "${c.title}" should not have points or format`);
    if (!c.body.length) fail(`cards.md: card "${c.title}" has no body text`);
    if (c.count < 1) fail(`cards.md: card "${c.title}" has count 0`);
  });
  for (const p of ['format', 'keeps']) {
    if (!cards.some((c) => c.pile === p)) fail(`cards.md: no cards in the ${p} pile`);
  }
  return cards;
}

// ---------- PNG icon generator (no deps) ----------
const crc32 = zlib.crc32 || ((buf) => {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
});

function png(size, pixel) {
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(stride * size);
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      const [r, g, b] = pixel(x + 0.5, y + 0.5);
      const o = y * stride + 1 + x * 4;
      raw[o] = r; raw[o + 1] = g; raw[o + 2] = b; raw[o + 3] = 255;
    }
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function hex(h) { return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); }
function mix(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); }
function disc(x, y, cx, cy, r) { // anti-aliased coverage of a circle
  const d = Math.hypot(x - cx, y - cy);
  return Math.max(0, Math.min(1, r - d + 0.5));
}

// Golf ball on felt. Full-bleed background so the same file works as a
// maskable icon; the ball sits inside the 80% safe zone.
function iconPixel(size) {
  const felt = hex(THEME), feltLight = hex('#1f6b3a');
  const white = [255, 255, 255], dimple = [214, 214, 206], shadow = [8, 40, 20];
  const cx = size * 0.5, cy = size * 0.52, r = size * 0.27;
  const dimples = [];
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) {
    const dx = i * r * 0.36 + (j % 2 ? r * 0.18 : 0), dy = j * r * 0.36;
    if (Math.hypot(dx, dy) < r * 0.82) dimples.push([cx + dx, cy + dy]);
  }
  return (x, y) => {
    const t = Math.hypot(x - size * 0.5, y - size * 0.3) / size; // soft radial light
    let c = mix(feltLight, felt, Math.min(1, t * 1.6));
    c = mix(c, shadow, 0.55 * disc(x, y, cx + r * 0.12, cy + r * 0.22, r * 1.02));
    const ball = disc(x, y, cx, cy, r);
    if (ball > 0) {
      let b = white;
      for (const [dx, dy] of dimples) b = mix(b, dimple, disc(x, y, dx, dy, r * 0.085));
      b = mix(b, [225, 225, 218], Math.max(0, (Math.hypot(x - cx + r * 0.3, y - cy + r * 0.3) / r - 0.6)) * 0.5);
      c = mix(c, b, ball);
    }
    return c;
  };
}

const FAVICON_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
  `<rect width="64" height="64" rx="14" fill="${THEME}"/>` +
  `<circle cx="32" cy="34" r="18" fill="#fff"/>` +
  `<circle cx="26" cy="28" r="2" fill="#d6d6ce"/><circle cx="36" cy="28" r="2" fill="#d6d6ce"/>` +
  `<circle cx="31" cy="36" r="2" fill="#d6d6ce"/><circle cx="24" cy="38" r="2" fill="#d6d6ce"/>` +
  `<circle cx="38" cy="38" r="2" fill="#d6d6ce"/><circle cx="31" cy="45" r="2" fill="#d6d6ce"/>` +
  `</svg>`;

// ---------- emit ----------
function fail(msg) { console.error('build failed: ' + msg); process.exit(1); }
function write(rel, data) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, data);
  console.log(`  ${rel.padEnd(24)} ${String(fs.statSync(p).size).padStart(7)} B`);
}

const cards = parseCards(fs.readFileSync(path.join(ROOT, 'cards.md'), 'utf8'));
const template = fs.readFileSync(path.join(ROOT, 'template.html'), 'utf8');
const swTemplate = fs.readFileSync(path.join(ROOT, 'sw.template.js'), 'utf8');
for (const ph of ['<!--CARDS-->', '<!--VERSION-->', '<!--FAVICON-->']) {
  if (!template.includes(ph)) fail(`template.html is missing placeholder ${ph}`);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
console.log(`FORE build ${prev} -> ${VERSION}`);

const icons = [180, 192, 512];
// Only the sounds the app actually plays. shuffle.wav stays in sounds/ but is not shipped for now.
const sounds = ['draw.wav'];
const assets = [
  'manifest.webmanifest',
  ...icons.map((s) => `icon-${s}.png`),
  ...sounds.map((f) => `sounds/${f}`),
];

const cardsJson = JSON.stringify(cards).replace(/</g, '\\u003c');
const faviconHref = 'data:image/svg+xml,' + encodeURIComponent(FAVICON_SVG);
const html = template
  .split('<!--CARDS-->').join(`<script id="cards-data" type="application/json">${cardsJson}</script>`)
  .split('<!--VERSION-->').join(VERSION)
  .split('<!--FAVICON-->').join(`<link rel="icon" href="${faviconHref}">`);
write('index.html', html);

const sw = swTemplate
  .split('__VERSION__').join(VERSION)
  .split('__ASSETS__').join(JSON.stringify(assets));
write('sw.js', sw);

write('manifest.webmanifest', JSON.stringify({
  name: 'FORE',
  short_name: 'FORE',
  description: 'A golf card game. Draw a format card for the hole, hold keeps cards for later.',
  start_url: './',
  scope: './',
  display: 'standalone',
  display_override: ['fullscreen', 'standalone'],
  orientation: 'portrait',
  background_color: THEME,
  theme_color: THEME,
  icons: icons.filter((s) => s !== 180).map((s) => ({
    src: `icon-${s}.png`, sizes: `${s}x${s}`, type: 'image/png', purpose: 'any maskable',
  })),
}, null, 2));

for (const s of icons) write(`icon-${s}.png`, png(s, iconPixel(s)));
for (const f of sounds) write(`sounds/${f}`, fs.readFileSync(path.join(ROOT, 'sounds', f)));
write('.nojekyll', '');

fs.writeFileSync(versionFile, VERSION + '\n');
const byPile = (p) => cards.filter((c) => c.pile === p).reduce((n, c) => n + c.count, 0);
console.log(`cards: ${byPile('format')} fore-mats, ${byPile('keeps')} power ups (${cards.length} distinct)`);
console.log(`done: docs/ is v${VERSION}`);
