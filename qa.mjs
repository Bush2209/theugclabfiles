/**
 * Visual + interaction QA sweep.
 *
 * Renders every route at desktop / tablet / mobile, scrolls each page to
 * trigger the reveal animations, captures viewport-sized frames, and checks
 * for horizontal overflow, console errors, heading-outline skips and
 * unlabelled form controls.
 *
 * Usage:
 *   npm run dev          # in one terminal
 *   npm run qa           # in another
 *
 * Frames are written to ./qa-shots. Set QA_BASE to point at a deployed build.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:5174';
const OUT = 'qa-shots';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1000 },
  { name: 'mobile', width: 390, height: 780 },
];

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/case-files', name: 'case-files' },
  { path: '/case-files/the-facewash-file', name: 'case-detail' },
  { path: '/ingredients', name: 'ingredients' },
  { path: '/ingredients/niacinamide', name: 'ingredient-detail' },
  { path: '/lab', name: 'lab' },
  { path: '/submit', name: 'submit' },
  { path: '/work-with-me', name: 'work' },
  { path: '/does-not-exist', name: 'not-found' },
];

/** Shared accessibility + overflow audit, run in the page context. */
function audit() {
  const accName = (el) => {
    const aria = el.getAttribute('aria-label')?.trim();
    if (aria) return aria;
    const by = el.getAttribute('aria-labelledby');
    if (by) {
      const t = by.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? '').join(' ');
      if (t.trim()) return t.trim();
    }
    if (el.id) {
      const l = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (l?.textContent.trim()) return l.textContent.trim();
    }
    const wrap = el.closest('label');
    if (wrap?.textContent.trim()) return wrap.textContent.trim();
    if (el.title) return el.title;
    return el.textContent.trim();
  };

  const visible = (el) =>
    el.offsetParent !== null || getComputedStyle(el).position === 'fixed';

  const unlabelled = [...document.querySelectorAll('input, select, textarea')]
    .filter((el) => el.type !== 'hidden' && visible(el))
    .filter((el) => !accName(el))
    .map((el) => el.id || el.name || el.type);

  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible);
  const skips = [];
  let prev = 0;
  headings.forEach((h) => {
    const lvl = Number(h.tagName[1]);
    if (prev && lvl > prev + 1) {
      skips.push(`h${prev}→h${lvl} "${h.textContent.trim().slice(0, 32)}"`);
    }
    prev = lvl;
  });

  const ids = new Map();
  document.querySelectorAll('[id]').forEach((el) => ids.set(el.id, (ids.get(el.id) ?? 0) + 1));
  const dupIds = [...ids].filter(([, n]) => n > 1).map(([id, n]) => `${id}×${n}`);

  const de = document.documentElement;
  const overflow = de.scrollWidth - de.clientWidth;

  // skip-link and closed mobile-menu links are intentionally off-screen
  const offscreen = [...document.querySelectorAll('a[href], button')]
    .filter((el) => visible(el) && el.getBoundingClientRect().width === 0)
    .filter((el) => !el.closest('#mobile-menu'))
    .length;

  return {
    unlabelled,
    headingSkips: skips,
    h1Count: headings.filter((h) => h.tagName === 'H1').length,
    dupIds,
    overflow,
    zeroSizeLinks: offscreen,
    imgMissingAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
  };
}

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

const consoleErrors = [];
const failures = [];
let frameTotal = 0;

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      hasTouch: vp.name === 'mobile',
    });
    const page = await ctx.newPage();

    page.on('console', (m) => {
      const text = m.text();
      // Font CDN hiccups are environmental, not site defects.
      if (m.type() !== 'error') return;
      if (/ERR_NETWORK_CHANGED|ERR_INTERNET_DISCONNECTED|ERR_NAME_NOT_RESOLVED/.test(text)) return;
      consoleErrors.push(`[${vp.name} ${route.path}] ${text}`);
    });
    page.on('pageerror', (e) => consoleErrors.push(`[${vp.name} ${route.path}] ${e.message}`));

    await page.goto(BASE + route.path, { waitUntil: 'networkidle' });

    const pageHeight = await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += 400;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 50);
          else setTimeout(resolve, 400);
        };
        step();
      });
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
      return document.body.scrollHeight;
    });

    const report = await page.evaluate(audit);
    const label = `${route.name} @ ${vp.name}`;

    const issues = [];
    if (report.overflow > 0) issues.push(`horizontal overflow ${report.overflow}px`);
    if (report.unlabelled.length) issues.push(`unlabelled controls: ${report.unlabelled.join(', ')}`);
    if (report.h1Count !== 1) issues.push(`h1 count = ${report.h1Count}`);
    if (report.headingSkips.length) issues.push(`heading skips: ${report.headingSkips.join(' | ')}`);
    if (report.dupIds.length) issues.push(`duplicate ids: ${report.dupIds.join(', ')}`);
    if (report.imgMissingAlt) issues.push(`${report.imgMissingAlt} img without alt`);
    if (report.zeroSizeLinks) issues.push(`${report.zeroSizeLinks} zero-size links`);
    if (issues.length) failures.push(`${label}: ${issues.join('; ')}`);

    // viewport-sized frames — avoids full-page stitching artefacts with
    // sticky headers and scroll-reveal transforms
    let i = 0;
    for (let y = 0; y < pageHeight; y += vp.height * 0.92) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
      await page.waitForTimeout(300);
      const file = `${OUT}/${vp.name}-${route.name}-${String(i).padStart(2, '0')}.png`;
      await page.screenshot({ path: file });
      frameTotal += 1;
      i += 1;
    }

    console.log(`✓ ${label.padEnd(34)} ${String(i).padStart(2)} frames · ${pageHeight}px`);
    await ctx.close();
  }
}

// ---- interaction tests (desktop) -------------------------------------------
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('pageerror', (e) => consoleErrors.push(`[interaction] ${e.message}`));
const assert = (label, ok) => {
  console.log(`${ok ? '✓' : '✗'} ${label}`);
  if (!ok) failures.push(`interaction: ${label}`);
};

await page.goto(`${BASE}/submit`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /send to the lab/i }).click();
await page.waitForTimeout(300);
assert('form blocks empty submit', (await page.locator('[id$="-error"]').count()) > 0);
await page.fill('#question', 'Does the expensive one do anything the cheap one does not?');
await page.fill('#product', 'The moisturiser on the top shelf');
await page.getByRole('button', { name: /send to the lab/i }).click();
await page.waitForTimeout(1300);
assert('form reaches success state', (await page.getByText(/case received/i).count()) > 0);
await page.screenshot({ path: `${OUT}/interaction-form-success.png` });

await page.goto(`${BASE}/work-with-me`, { waitUntil: 'networkidle' });
await page.locator('article button').first().click();
await page.waitForTimeout(500);
assert('video modal opens', (await page.getByRole('dialog').count()) > 0);
await page.screenshot({ path: `${OUT}/interaction-video-modal.png` });
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
assert('video modal closes on Escape', (await page.getByRole('dialog').count()) === 0);

await page.goto(`${BASE}/case-files`, { waitUntil: 'networkidle' });
const allCases = await page.locator('article').count();
await page.getByRole('button', { name: /^HAIRCARE/ }).click();
await page.waitForTimeout(300);
const filtered = await page.locator('article').count();
assert(`category filter narrows results (${allCases} → ${filtered})`, filtered > 0 && filtered < allCases);

await page.goto(`${BASE}/ingredients`, { waitUntil: 'networkidle' });
const allIngredients = await page.locator('article').count();
await page.fill('#ingredient-search', 'niacinamide');
await page.waitForTimeout(500);
const hits = await page.locator('article').count();
assert(`ingredient search filters (${allIngredients} → ${hits})`, hits > 0 && hits < allIngredients);
await page.fill('#ingredient-search', 'qqqqzz');
await page.waitForTimeout(500);
assert('search shows empty state', (await page.getByText(/nothing under that name/i).count()) > 0);
await page.screenshot({ path: `${OUT}/interaction-search-empty.png` });

// reduced motion should still show all content
const rmCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const rmPage = await rmCtx.newPage();
await rmPage.goto(BASE + '/', { waitUntil: 'networkidle' });
await rmPage.waitForTimeout(600);
const hiddenUnderReducedMotion = await rmPage.evaluate(
  () =>
    [...document.querySelectorAll('.reveal')].filter(
      (el) => parseFloat(getComputedStyle(el).opacity) < 0.9 && el.offsetParent !== null
    ).length
);
assert(`reduced motion shows all content (${hiddenUnderReducedMotion} hidden)`, hiddenUnderReducedMotion === 0);
await rmCtx.close();

// mobile menu
const mCtx = await browser.newContext({ viewport: { width: 390, height: 780 }, hasTouch: true, deviceScaleFactor: 2 });
const mPage = await mCtx.newPage();
await mPage.goto(BASE + '/', { waitUntil: 'networkidle' });
await mPage.getByRole('button', { name: /open menu/i }).click();
await mPage.waitForTimeout(500);
assert('mobile menu opens', (await mPage.locator('#mobile-menu a').count()) > 0);
await mPage.screenshot({ path: `${OUT}/interaction-mobile-menu.png` });
await mPage.locator('#mobile-menu a', { hasText: 'CASE FILES' }).first().click();
await mPage.waitForTimeout(700);
assert(
  'mobile menu navigates and closes',
  mPage.url().includes('/case-files') && (await mPage.getByRole('button', { name: /open menu/i }).count()) > 0
);
await mCtx.close();
await ctx.close();

await browser.close();

// ---- report -----------------------------------------------------------------
const report = {
  base: BASE,
  frames: frameTotal,
  checks: failures.length + consoleErrors.length,
  failures,
  consoleErrors,
};
await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));

console.log(`\n${frameTotal} frames → ${OUT}/`);
if (consoleErrors.length) {
  console.log('\nConsole / page errors:');
  consoleErrors.forEach((e) => console.log('  ' + e));
}
if (failures.length) {
  console.log('\nFAILURES:');
  failures.forEach((f) => console.log('  ' + f));
  process.exitCode = 1;
} else if (consoleErrors.length) {
  process.exitCode = 1;
} else {
  console.log('\nAll checks passed.');
}