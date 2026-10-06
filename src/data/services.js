/**
 * WORK WITH ME — services + portfolio
 * ------------------------------------------------------------------
 * PLACEHOLDER CONTENT. Swap in real descriptions, links and media.
 *
 * Portfolio item `src` fields are intentionally empty: the MediaPlaceholder
 * component draws a labelled placeholder frame until you drop real
 * photography or video URLs in.
 */

import { cases } from './cases';
import { ingredients } from './ingredients';
import { site } from './site';

export const services = [
  {
    id: 'svc-1',
    ref: 'SERVICE 01',
    title: 'UGC',
    subtitle: 'Lifestyle product videos',
    body: 'Native-feeling short-form video built around how a product actually behaves in a real morning, a real bathroom shelf and a real routine. Shot vertical, delivered cut-ready.',
    bullets: ['Vertical-first production', 'Hook + story + verdict', 'Usage rights per brief'],
    color: 'lime',
    shot: { kind: 'tube', color: 'lime' },
  },
  {
    id: 'svc-2',
    ref: 'SERVICE 02',
    title: 'PRODUCT STORYTELLING',
    subtitle: 'Turn the product into a story',
    body: 'A product is more than a feature list. I build a narrative arc around it — the problem it lives inside, why it exists, and the moment it earns its place in the routine.',
    bullets: ['Problem-first framing', 'On-camera or faceless delivery', 'Captions written for retention'],
    color: 'lavender',
    shot: { kind: 'jar', color: 'lavender' },
  },
  {
    id: 'svc-3',
    ref: 'SERVICE 03',
    title: 'RESEARCH-LED CONTENT',
    subtitle: 'Ingredient, claim and product-focused content',
    body: 'Investigation-style videos where the research is the content. Ingredient breakdowns, claim checks and comparisons — the same method used in the lab, shaped for the feed.',
    bullets: ['Ingredient literacy', 'Claim vs label', 'Sources shared in caption'],
    color: 'cyan',
    shot: { kind: 'dropper', color: 'cyan' },
  },
  {
    id: 'svc-4',
    ref: 'SERVICE 04',
    title: 'SOCIAL CONTENT',
    subtitle: 'Short-form social content',
    body: 'Repeatable content for brands that post consistently: hooks, cut-downs, comment-reply videos and carousel breakdowns built from the same evidence library.',
    bullets: ['Batch-friendly delivery', 'Comment-to-video pipeline', 'Carousel breakdowns'],
    color: 'coral',
    shot: { kind: 'box', color: 'coral' },
  },
];

export const portfolio = [
  {
    id: 'w-1',
    type: 'video',
    ref: 'FILM 001',
    title: '₹180 vs ₹1,400 facewash — same job?',
    platform: 'Instagram Reel',
    category: 'INVESTIGATION VIDEO',
    role: 'UGC · Research · Edit',
    duration: '0:58',
    views: '482K',
    src: '',
    poster: { kind: 'tube', color: 'lavender' },
    accent: 'lavender',
  },
  {
    id: 'w-2',
    type: 'video',
    ref: 'FILM 002',
    title: 'The 5 words on the front of every brightening serum',
    platform: 'YouTube Short',
    category: 'INVESTIGATION VIDEO',
    role: 'Script · Shoot · Edit',
    duration: '0:51',
    views: '311K',
    src: '',
    poster: { kind: 'dropper', color: 'butter' },
    accent: 'butter',
  },
  {
    id: 'w-3',
    type: 'photo',
    ref: 'PHOTO 001',
    title: 'Shelf evidence — six moisturisers, one price question',
    shape: 'shelf',
    platform: 'Instagram Carousel',
    category: 'PRODUCT PHOTOGRAPHY',
    role: 'Styling · Photography',
    duration: null,
    views: '9 slides',
    src: '',
    poster: { kind: 'row', color: 'lime' },
    accent: 'lime',
  },
  {
    id: 'w-4',
    type: 'video',
    ref: 'FILM 003',
    title: '3 steps vs 9 steps for curly hair',
    platform: 'Instagram Reel',
    category: 'LIFESTYLE CONTENT',
    role: 'UGC · Hosting',
    duration: '0:52',
    views: '228K',
    src: '',
    poster: { kind: 'bottle', color: 'cyan' },
    accent: 'cyan',
  },
  {
    id: 'w-5',
    type: 'video',
    ref: 'FILM 004',
    title: '“Toxin-free” — a 46 second investigation',
    platform: 'TikTok',
    category: 'INVESTIGATION VIDEO',
    role: 'Script · Shoot · Edit',
    duration: '0:46',
    views: '640K',
    src: '',
    poster: { kind: 'box', color: 'coral' },
    accent: 'coral',
  },
  {
    id: 'w-6',
    type: 'photo',
    ref: 'PHOTO 002',
    title: 'Ingredient label stills — niacinamide, unretouched',
    shape: 'label',
    platform: 'Instagram Carousel',
    category: 'PRODUCT PHOTOGRAPHY',
    role: 'Photography · Retouch',
    duration: null,
    views: '7 slides',
    src: '',
    poster: { kind: 'label', color: 'cyan' },
    accent: 'cyan',
  },
  {
    id: 'w-7',
    type: 'video',
    ref: 'FILM 005',
    title: 'Lip plumper test — 2 weeks, 3 products',
    platform: 'Instagram Reel',
    category: 'PRODUCT TEST',
    role: 'UGC · Edit',
    duration: '0:49',
    views: '176K',
    src: '',
    poster: { kind: 'tube', color: 'coral' },
    accent: 'coral',
  },
  {
    id: 'w-8',
    type: 'video',
    ref: 'FILM 006',
    title: 'Can a cream replace a good night of sleep?',
    platform: 'YouTube Short',
    category: 'INVESTIGATION VIDEO',
    role: 'Script · Shoot · Edit',
    duration: '0:55',
    views: '254K',
    src: '',
    poster: { kind: 'jar', color: 'lavender' },
    accent: 'lavender',
  },
];

/** Client-style placeholders — replace with real brands. */
/**
 * Client-side placeholders — replace with real brands.
 */
export const collaborationNotes = [
  {
    id: 'c1',
    label: 'PAID COLLABORATIONS ARE LABELLED',
    text: 'If a brand paid for a video, it says so in the caption. A brief cannot buy a better verdict.',
  },
  {
    id: 'c2',
    label: 'BRIEFS WITHOUT A CLAIM ARE FINE',
    text: 'The most useful briefs are “here is the product, ask whatever you want”. Those usually become the best videos.',
  },
  {
    id: 'c3',
    label: 'NO SCRIPT LOCK-IN',
    text: 'A hook can be agreed in advance. The verdict is mine.',
  },
];

/**
 * Work-with-me stats. Counts are derived from the actual data so the page
 * can never advertise "8 case files" while the archive holds 9.
 * `videoCount` is the only manual figure — it counts published posts, which
 * is not the same thing as the portfolio sample above.
 */
export const workStats = [
  { value: String(portfolio.filter((p) => p.type === 'video').length), label: 'SELECTED VIDEOS' },
  { value: String(cases.length), label: 'CASE FILES' },
  { value: String(ingredients.length), label: 'INGREDIENTS LOGGED' },
  { value: String(site.platforms.length), label: 'PLATFORMS' },
];