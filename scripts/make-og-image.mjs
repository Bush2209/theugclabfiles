/**
 * Generates public/og-image.png — the 1200×630 link-preview card.
 *
 * Rendered from the same design language as the site (warm ivory, ink display
 * type, lime/lavender/cyan evidence accents) so shared links look like they
 * belong to the brand rather than like a generic placeholder.
 *
 * Run after changing the brand name or tagline:
 *   node scripts/make-og-image.mjs
 */

import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';

const OUT = 'public/og-image.png';
const W = 1200;
const H = 630;

/** Pulls the live brand strings so this never drifts from src/data/site.js. */
async function readBrand() {
  const src = await readFile('src/data/site.js', 'utf8');
  return {
    name: src.match(/name: '([^']*UGC[^']*)'/)?.[1] ?? 'THE UGC INVESTIGATOR',
    tagline: src.match(/tagline: '([^']*)'/)?.[1] ?? 'Products. Claims. Ingredients. Real experiences.',
  };
}

const { name, tagline } = await readBrand();

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Caveat:wght@600&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:${W}px; height:${H}px; overflow:hidden;
    background:#FFF9EE; color:#20231F; font-family:Archivo, sans-serif;
    display:flex; flex-direction:column; padding:58px 64px;
  }
  .grid {
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(32,35,31,.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(32,35,31,.055) 1px, transparent 1px);
    background-size:32px 32px;
    mask-image:radial-gradient(ellipse 85% 85% at 70% 0%, #000 10%, transparent 78%);
  }
  .glow-a { position:absolute; width:460px; height:460px; right:-110px; top:-160px;
            background:#B8F34A; opacity:.38; border-radius:50%; filter:blur(90px); }
  .glow-b { position:absolute; width:400px; height:400px; left:-140px; bottom:-180px;
            background:#B99CFF; opacity:.26; border-radius:50%; filter:blur(90px); }

  /* ---- top bar ---- */
  .bar { display:flex; align-items:center; justify-content:space-between; gap:24px; }
  .status {
    display:inline-flex; align-items:center; gap:11px; border:2.5px solid #20231F;
    background:#fff; border-radius:999px; padding:10px 20px;
    font-family:'IBM Plex Mono', monospace; font-size:18px; font-weight:600;
    letter-spacing:.14em; text-transform:uppercase;
  }
  .dot { width:10px; height:10px; border-radius:50%; background:#FF6B6B; }
  .mark { display:flex; align-items:center; gap:13px;
          font-family:'IBM Plex Mono', monospace; font-size:18px; font-weight:600; letter-spacing:.18em; }
  .mark .box { width:44px; height:44px; border:2.5px solid #20231F; background:#B8F34A;
               border-radius:13px; display:grid; place-items:center; }

  /* ---- middle: headline left, evidence chips right ---- */
  .middle { flex:1; display:flex; align-items:center; gap:40px; }
  .copy { flex:1 1 auto; min-width:0; }
  h1 { font-family:'Bricolage Grotesque', sans-serif; font-weight:800;
       font-size:76px; line-height:.94; letter-spacing:-.035em; }
  h1 .muted { color:rgba(32,35,31,.33); }

  .evidence { flex:0 0 350px; display:flex; flex-direction:column;
              align-items:flex-end; gap:18px; padding-bottom:6px; }
  .chip {
    border:2.5px solid #20231F; border-radius:12px; padding:10px 17px;
    font-family:'IBM Plex Mono', monospace; font-size:19px; font-weight:600;
    letter-spacing:.08em; box-shadow:0 10px 22px -14px rgba(32,35,31,.55);
  }
  .e1 { background:#B8F34A; transform:rotate(-3.5deg) translateX(-14px); }
  .e2 { background:#FF6B6B; transform:rotate(2.5deg); }
  .e3 { background:#7DE3E3; transform:rotate(-2deg) translateX(-8px); }
  .glass { display:flex; align-items:center; gap:14px; margin-top:6px;
           font-family:'IBM Plex Mono', monospace; font-size:16px; font-weight:500;
           letter-spacing:.12em; color:rgba(32,35,31,.6); }

  /* ---- footer ---- */
  .foot { display:flex; align-items:flex-end; justify-content:space-between; gap:48px; }
  .tagline { font-size:26px; font-weight:600; max-width:26ch; line-height:1.28; }
  .hand { font-family:Caveat, cursive; font-size:31px; line-height:1.16;
          color:rgba(32,35,31,.6); text-align:right; max-width:17ch; }
</style></head>
<body>
  <div class="grid"></div>
  <div class="glow-a"></div><div class="glow-b"></div>

  <div class="bar">
    <div class="status"><span class="dot"></span>Investigation active</div>
    <div class="mark">
      <span class="box">
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
          <circle cx="10" cy="10" r="6.4" stroke="#20231F" stroke-width="2.2"/>
          <path d="M15 15l5.5 5.5" stroke="#20231F" stroke-width="2.6" stroke-linecap="round"/>
        </svg>
      </span>
      ${name}
    </div>
  </div>

  <div class="middle">
    <div class="copy">
      <h1>THE INTERNET<br>HAS QUESTIONS.<br><span class="muted">I HAVE A<br>CASE FILE.</span></h1>
    </div>
    <div class="evidence">
      <div class="chip e1">NIACINAMIDE</div>
      <div class="chip e2">&ldquo;BRIGHTENING&rdquo;</div>
      <div class="chip e3">FRAGRANCE</div>
      <div class="glass">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="10" cy="10" r="6.4" stroke="currentColor" stroke-width="2.2"/>
          <path d="M15 15l5.5 5.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
        </svg>
        CASE FILES · INGREDIENTS
      </div>
    </div>
  </div>

  <div class="foot">
    <div class="tagline">${tagline}</div>
    <div class="hand">&ldquo;one person&rsquo;s review isn&rsquo;t a verdict&rdquo;</div>
  </div>
</body></html>`;

await mkdir('public', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(900); // let webfonts settle
await page.screenshot({ path: OUT });
await browser.close();

console.log(`Wrote ${OUT} (${W}×${H})`);