# THE UGC INVESTIGATOR

A personal creator site for a faceless UGC creator who investigates products,
claims, ingredients and real consumer experiences — then turns the research into
short-form video.

The design goal was **"a smart, slightly chaotic investigator's desk turned into
a website"**: editorial layout underneath, scrapbook detail on top. Bright, warm
and playful, never dark.

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
npm run lint
npm run qa       # visual + a11y + interaction sweep (see QA)
```

---

## Pages

| Route | Page | Notes |
| --- | --- | --- |
| `/` | Home | Investigation-desk hero, 5-stage process, current cases, people's evidence |
| `/case-files` | Case Files | Filterable archive of every investigation |
| `/case-files/:slug` | Case File | Reusable template — 5 numbered evidence sections + verdict |
| `/ingredients` | Ingredient Database | Search + category filters over the ingredient library |
| `/ingredients/:slug` | Ingredient File | Reusable template — includes the pairing relationship map |
| `/lab` | The Lab | 6-step methodology + "what we don't do" transparency rules |
| `/submit` | Submit a Case | Validated intake form + honest success state (demo mode until an endpoint is set) |
| `/work-with-me` | Work With Me | Services, portfolio grid, video lightbox |
| `/privacy` | Privacy & Data | Consent state, what is recorded, how to withdraw |
| `/links` | Bio-link hub | Instagram + YouTube follow buttons, newest case, shortcuts, attribution |
| anything else | Not Found | |

Case and ingredient detail pages redirect to their index if the slug is unknown.

---

## ⚠️ Placeholder content — read before publishing

**Every case, ingredient profile, audience quote and verdict in this build is
illustrative sample copy written to demonstrate the system.** Specifically:

- No scientific citations exist. Every ingredient has `sources: []`.
- The `contentStatus.isPlaceholder` flag in `src/data/site.js` is `true`, which
  renders the "PLACEHOLDER CONTENT · ADD SOURCES BEFORE PUBLISHING" notices on
  the case archive and ingredient pages. **Set it to `false` when the copy is
  real** — the notices disappear automatically.
- Brand names are written as `Placeholder brand A/B/C/…` on purpose.
- All "product photography" and "video posters" are drawn SVG stand-ins labelled
  `Placeholder` / `Placeholder poster` / `Placeholder photo`. Nothing on the site
  passes as a real photograph.
- Every `video.url` is empty, so case verdicts show a "video not linked" panel
  rather than a fake player.
- View counts, durations and platform handles are sample data.
- The intake form has no endpoint configured, so it runs in demo mode and says so
  instead of pretending a submission was delivered. See
  [Wiring up the form](#wiring-up-the-form).
- The Instagram and YouTube URLs in `src/data/site.js` are built from the
  `@theuginvestigator` handle. **Verify both before putting `/links` in a bio** —
  a wrong URL there is worse than no URL.

To publish: replace the copy, add real sources to `ingredients[].sources`, drop
in real media URLs, set `isPlaceholder: false`, then delete `PlaceholderNotice`
imports and their usages if you want the banners gone entirely.

---

## Editing content

All copy lives in `src/data/` as plain structured objects. Nothing is hardcoded
into page components.

| File | Holds |
| --- | --- |
| `site.js` | Brand, nav, footer, socials, process steps, lab steps, transparency rules, submission types, placeholder flag |
| `cases.js` | The case files. One object = one investigation |
| `ingredients.js` | The ingredient library. One object = one ingredient |
| `evidence.js` | Audience reports, and which case each belongs to |
| `services.js` | Service cards, portfolio items, collaboration notes, stats |

### Adding a case file

Append one object to `cases`. The archive, filters, home page, ingredient
"cases involving…" lists and prev/next links all pick it up automatically.

```js
{
  number: '015',
  slug: 'my-new-case',              // becomes /case-files/my-new-case
  title: 'THE NEW CASE FILE',
  question: 'The one-line question this case answers.',
  category: 'SKINCARE',             // must be in CASE_CATEGORIES
  status: CASE_STATUSES.OPEN,       // OPEN | CLOSED | NEEDS
  date: '18.06.2026',
  accent: 'lavender',               // lime | lavender | coral | butter | cyan | ink
  tags: ['PRICE', 'CLAIM'],
  intro: '…',
  products: [{ name, brand, category, size, price, info, ingredients: [slugs], shot: { kind, color }, note }],
  claims: { brandTitle, foundTitle, brand: [], found: [] },
  ingredients: ['niacinamide', …],  // ingredient slugs — drives the linking
  experienceIds: ['ev-01', …],      // ids from evidence.js
  process: [{ title, note }, …],    // 6 stages
  verdict: { label, headline, body, bullets: [] },
  video: { platform, handle, url: '', title, duration },
}
```

### Adding an ingredient

Append to `ingredients`. `pairsWith` takes other ingredient **slugs** — those
slugs build the relationship map and the clickable links. Use `alsoMentioned`
for names that appear on labels but are not profiled yet (they render as muted
"PENDING" chips, which is more honest than omitting them).

### Replacing media

- `MediaFrame` takes `src`; a real image replaces the illustration and the
  `Placeholder` badge disappears.
- `ProductShot` draws bottles, tubes, jars, droppers, pumps, boxes and label
  close-ups — pick `kind` in the case data.
- `VideoCard` accepts `src` for a poster image, or `embedUrl` for an Instagram /
  YouTube / TikTok embed inside the lightbox.

### Wiring up the form

`SubmissionForm` validates in the browser, then POSTs JSON to
`site.forms.endpoint` — currently `/api/intake`, a Vercel Function that creates
one GitHub Issue per submission in the **private**
`Bush2209/theugclabfiles-intake` repo. Each issue is labelled by type, source and
linked case, so submissions can be triaged, discussed and closed from GitHub's
web UI or `gh`. The issue number becomes the case reference shown to the visitor.

With `forms.endpoint` empty the form still runs in **demo mode**: it says plainly
that nothing was transmitted instead of faking a delivery. That is the fallback,
not the current setup.

To read submissions:

```bash
gh issue list -R Bush2209/theugclabfiles-intake --label submission
gh issue view 12 -R Bush2209/theugclabfiles-intake
```

Image uploads: only a `hasImage` boolean is sent today, not the file. If you want
the file, switch the request to `FormData` and accept `multipart/form-data` on the
endpoint, then update the privacy page.

### The bio-link hub

`/links` is the page to put in Instagram and YouTube bios. Instagram and YouTube
are the only platforms featured; there is no placeholder email. It shows the two
follow buttons, the newest case file, shortcuts into the lab, and a submit CTA.

Bio URLs carry attribution: `…/links?src=ig` and `…/links?src=yt`. The value is
kept in sessionStorage for the visit (`src/lib/attribution.js`) and attached to
submissions and signals, so you can tell which platform is actually sending
people — not just which one has more followers.

---

## The feedback loop

The site is built to learn from the people using it, not just talk at them. Four
small signals feed an editorial calendar that would otherwise be guesswork.

| Signal | Fires when | Answers |
|---|---|---|
| `ingredient_search` | someone searches the database | what people are actually looking for |
| `ingredient_search_zero` | a search returns nothing | **exactly which ingredients to add next** |
| `case_filter` | a category pill is tapped | which verticals deserve the next investigation |
| `case_submitted` | an intake form is sent | demand, ranked by volume and type |
| `verdict_feedback` | answered / partly / still open | which verdicts landed, which need a follow-up |
| `bio_visit` | someone lands on `/links` from a bio | which platform sends people to the site |
| `bio_link_click` | a follow / shortcut / submit link is tapped | what those visitors actually want |

`ingredient_search_zero` is the highest-value signal on the site: it is a person
naming something the lab does not cover yet.

### Consent

Nothing is recorded until the visitor presses **Allow** on the first-visit
prompt (`src/components/ConsentBanner.jsx`). Declining is one tap, is remembered,
and can be changed later from the footer's **Data settings** link or `/privacy`
— both call `openConsentSettings()`.

`track()` in `src/lib/signals.js` returns immediately unless consent is
`granted`. There is **no pre-consent buffering and no replay**, and no
third-party script anywhere in the build. Event props are non-personal by
design: never a name, email, handle or file.

### Where signals go

Both endpoints are Vercel Functions in `/api`. The SPA rewrite in `vercel.json`
uses a negative lookahead so `/api/*` reaches the functions instead of being
swallowed by the client-side fallback.

- `api/intake.js` → creates a GitHub Issue in the private intake repo.
- `api/signals.js` → appends one JSON line to `signals/YYYY-MM-DD.jsonl`.

Vercel project variables (set in the dashboard or with `vercel env add`):

| Variable | Type | Value |
| --- | --- | --- |
| `GITHUB_REPO` | Config | `Bush2209/theugclabfiles-intake` |
| `GITHUB_TOKEN` | Secret | token with write access to that private repo |

The client signals endpoint defaults to `/api/signals` and can be overridden with
`VITE_SIGNALS_ENDPOINT`. `VITE_*` values are public by design — never put a
secret in one.

Reading signals from the private repo:

```bash
gh api repos/Bush2209/theugclabfiles-intake/contents/signals/2026-11-21.jsonl \
  --jq .content | base64 -D
```

Each line is `{ event, props, path, ts, sid }`; `sid` is a random per-tab id, not
a person. With no endpoint configured, events only reach the dev console.

### Reviewing them

Weekly, fifteen minutes: read the top zero-result searches, the filter
distribution and the submission types, then choose the next investigation from
that list rather than from a hunch. The loop is only a loop if the output changes
what you publish.

### Extending it

Add an event by calling `track('name', { ...nonPersonalProps })` at the point of
interaction. Keep props flat and small. Update the table on `/privacy` and this
list in the same commit — the privacy page is the contract, not decoration.

---

## Design system

Defined in `tailwind.config.js` and `src/index.css`.

```
ivory     #FFF9EE   main background          ink      #20231F   text
lime      #B8F34A   primary accent           lavender #B99CFF   secondary accent
coral     #FF6B6B   warnings / claims        butter   #FFD85A   notes / evidence tags
cyan      #7DE3E3   lab / ingredient UI      white    #FFFFFF   cards
```

Ratio holds roughly at 60% ivory+white / 20% ink / 10% lime / 5% lavender /
5% coral+yellow+cyan.

**Type** — `Bricolage Grotesque` (display), `Archivo` (body/UI),
`IBM Plex Mono` (case numbers, dates, statuses, ingredient IDs, metadata),
`Caveat` (handwriting, used only for sticky notes and annotations).

**Reusable class utilities** in `src/index.css`: `.section`, `.btn-*`,
`.card`, `.note`, `.paper`, `.grain`, `.grid-lab`, `.dot-lab`, `.label-mono`,
`.reveal`.

Note: `tailwind.config.js` extends the `opacity` scale with the extra steps this
design uses (12, 15, 35, 55, 65, 85 …) so tints like `border-ink/12` and
`bg-lavender/35` resolve — including inside `@apply`.

### Component library

`Navigation` · `Footer` · `CaseCard` · `EvidenceCard` · `StatusBadge` ·
`IngredientCard` · `IngredientTag` · `InvestigationStep` · `CTA` · `VideoCard` +
`VideoModal` · `ProductCard` · `SearchBar` · `CategoryFilter` ·
`SubmissionForm` · `VerdictBadge` · `SectionHeading` · `Reveal` · `Hero` ·
`Doodles` (hand-drawn SVG library) · `MediaPlaceholder` · `PlaceholderNotice`

`src/lib/theme.js` maps plain data strings (`'CASE CLOSED'`, `'SKINCARE'`,
`'CONTEXT MATTERS'`) to palette classes, so content files never contain markup.

---

## Motion

Deliberately restrained. Scroll reveal, a subtle pointer parallax in the hero,
the case-folder flip, animated connector lines, hover states, lightbox and
mobile-menu transitions.

Everything is CSS-driven — no animation library. Pointer parallax is disabled on
touch devices and under `prefers-reduced-motion`, and `Reveal` degrades to plain
visible content when reduced motion is set or `IntersectionObserver` is missing.

---

## Responsive

| Width | Behaviour |
| --- | --- |
| ≥1024px | Full editorial compositions; hero desk, horizontal process steps, relationship map, 3–4 column grids |
| 640–1023px | Floating evidence simplified; 2-column grids; process steps become a vertical timeline |
| <640px | Single column, stacked evidence, hamburger nav, filter pills scroll horizontally, investigation diagrams become vertical timelines |

The layouts are designed per breakpoint rather than scaled down.

---

## QA

`npm run qa` renders all 9 routes at 3 viewports (202 frames to `qa-shots/`) and
checks:

- horizontal overflow (0px at 320 / 390 / 768 / 834 / 1440)
- heading outline (one `h1` per page, no skipped levels)
- accessible names on every form control
- duplicate ids, images missing `alt`, console/page errors
- form validation → success state, modal open/Escape, category filters,
  ingredient search + empty state, reduced-motion content, mobile menu

Latest run: **202 frames, all checks passed.** `qa-shots/report.json` holds the
machine-readable result.

`QA_BASE=https://your-deploy.example npm run qa` points the sweep at a deployed
build.

---

## Deployment

**Live:** https://ugc-investigator.vercel.app
**Repo:** https://github.com/Bush2209/theugclabfiles

```bash
git push                  # auto-deploys — GitHub is linked to this project
npx vercel --prod         # or deploy straight from the CLI
```

Deploy config is committed for all three common static hosts — pick whichever
suits you:

| Host | Config | Notes |
| --- | --- | --- |
| Vercel | `vercel.json` | CLI install as a devDependency. `npx vercel --prod` |
| Netlify | `netlify.toml` + `public/_redirects` | Or drag-and-drop the `dist/` folder |
| Cloudflare Pages | `wrangler.toml` | `npx wrangler pages deploy dist` |

**The SPA rewrite matters.** This is a client-routed React app, so a request for
`/case-files/the-facewash-file` has to return the app shell, not a 404. All three
configs do this. `vite preview` works locally because Vite supplies the fallback
itself, which can mask a missing rewrite in testing — so check a deep link on the
real host after the first deploy.

### Auto-deploy on push

GitHub is linked to the Vercel project, so **every push to `main` deploys
automatically** and you get a preview URL per commit.

To reconnect later (new machine, new repo), `npx vercel git connect` links the
remote in your local git config. If it reports:

> You need to add a Login Connection to your GitHub account first.

that step can only be done in the browser:

1. Vercel dashboard → **Account Settings** → **Login Connections**
2. Connect **GitHub** and authorise Vercel
3. Project `ugc-investigator` → **Settings** → **Git** → connect `Bush2209/theugclabfiles`

**Before launch:** replace `/og-image.png` with a real 1200×630 export. The meta
tags reference it but no image ships — link previews on Instagram, WhatsApp and
Slack will show a blank tile until you add one.

### Sitemap

`sitemap.xml` is generated at build time by a small Vite plugin that reads
`src/data/cases.js` and `src/data/ingredients.js`, so it stays in sync as you add
investigations. Override the origin with `SITE_URL`:

```bash
SITE_URL=https://your-domain.com npm run build
```

---

## Stack

React 19 · Vite 8 · React Router 7 · Tailwind 3 · oxlint · Playwright (QA only).

Routes are code-split: the homepage ships in the main bundle and the other seven
load on demand (main bundle 93 kB gzipped).