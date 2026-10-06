/**
 * SITE-WIDE CONFIG
 * ------------------------------------------------------------------
 * Everything in this file is designed to be swapped out.
 * Edit the values here and the whole site updates.
 */

export const site = {
  name: 'THE UGC INVESTIGATOR',
  shortName: 'UGC INVESTIGATOR',
  tagline: 'Products. Claims. Ingredients. Real experiences.',
  description:
    'A faceless creator who investigates products, ingredients, brand claims and real consumer experiences — then turns the research into short-form content for Instagram, YouTube and TikTok.',
  role: 'Faceless UGC Creator · Product Investigator',
  status: {
    live: true,
    label: 'INVESTIGATION ACTIVE',
    // Change this to update the homepage hero status.
    currently: 'SKINCARE CLAIMS',
  },
  social: [
    { label: 'Instagram', handle: '@theuginvestigator', href: 'https://instagram.com/' },
    { label: 'YouTube', handle: '/theuginvestigator', href: 'https://youtube.com/' },
    { label: 'TikTok', handle: '@theuginvestigator', href: 'https://tiktok.com/' },
  ],
  email: 'hello@theuginvestigator.com',
  platforms: ['Instagram', 'YouTube', 'TikTok'],
};

export const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'CASE FILES', to: '/case-files' },
  { label: 'INGREDIENTS', to: '/ingredients' },
  { label: 'THE LAB', to: '/lab' },
  { label: 'SUBMIT A CASE', to: '/submit' },
  { label: 'WORK WITH ME', to: '/work-with-me' },
];

export const footerLinks = [
  { label: 'CASE FILES', to: '/case-files' },
  { label: 'INGREDIENT DATABASE', to: '/ingredients' },
  { label: 'THE LAB', to: '/lab' },
  { label: 'SUBMIT A CASE', to: '/submit' },
  { label: 'WORK WITH ME', to: '/work-with-me' },
];

export const footerTicker = ['CASE FILES', '•', 'INGREDIENTS', '•', 'INVESTIGATIONS'];

/** Homepage — "How an investigation happens" (5 steps) */
export const processSteps = [
  {
    id: '01',
    key: 'QUESTION',
    title: 'QUESTION',
    line: 'Someone in the comments asks something specific. That becomes the case.',
    doodle: 'question',
  },
  {
    id: '02',
    key: 'EVIDENCE',
    title: 'EVIDENCE',
    line: 'Products get photographed. Packaging gets read. Labels get photographed.',
    doodle: 'box',
  },
  {
    id: '03',
    key: 'RESEARCH',
    title: 'RESEARCH',
    line: 'Ingredient lists are decoded and public information is gathered.',
    doodle: 'book',
  },
  {
    id: '04',
    key: 'INVESTIGATION',
    title: 'INVESTIGATION',
    line: 'Claim versus reality. Cost versus formula. Experience versus expectation.',
    doodle: 'glass',
  },
  {
    id: '05',
    key: 'VERDICT',
    title: 'VERDICT',
    line: 'A clear answer — plus an honest note on what is still unresolved.',
    doodle: 'stamp',
  },
];

/** Lab page — full methodology (6 steps) */
export const labSteps = [
  {
    id: '01',
    title: 'THE QUESTION',
    body: 'What are we actually trying to find out? A good case is one narrow, specific question — not "is this brand good".',
    outputs: ['One clear question', 'A reason it matters', 'What would change our mind'],
  },
  {
    id: '02',
    title: 'THE EVIDENCE',
    body: 'Everything we can hold, read, photograph and measure: the products, the packaging claims, the ingredient lists, and what real people report.',
    outputs: ['Product photos', 'Claim screenshots', 'Ingredient INCI lists', 'Audience reports'],
  },
  {
    id: '03',
    title: 'THE RESEARCH',
    body: 'Finding publicly available information about the ingredients and claims involved, then comparing what is known against what is only marketing.',
    outputs: ['Ingredient profiles', 'Claim comparisons', 'Label reading notes'],
  },
  {
    id: '04',
    title: 'THE INVESTIGATION',
    body: 'Breaking the evidence down: what the brand says, what the label shows, what the ingredient list implies, and what people actually experience.',
    outputs: ['Side-by-side breakdowns', 'Cost-per-use maths', 'Experience patterns'],
  },
  {
    id: '05',
    title: 'THE VERDICT',
    body: 'A plain-language answer to the original question — including what the evidence does not settle. Uncertainty is stated, not hidden.',
    outputs: ['A verdict', 'What is still uncertain', 'Who this is / is not for'],
  },
  {
    id: '06',
    title: 'THE CONTENT',
    body: 'The investigation becomes a short-form video: one hook, one claim, one piece of evidence, one verdict.',
    outputs: ['60–90s vertical video', 'Carousel breakdown', 'Caption with sources'],
  },
];

/** Lab page — transparency: "What we don't do" (editable) */
export const transparencyRules = [
  {
    id: 't1',
    label: 'WE DON’T REPEAT BRAND CLAIMS',
    text: 'If a brand says something, we treat it as a claim to investigate — not a fact to pass on.',
  },
  {
    id: 't2',
    label: 'WE DON’T CALL ONE REVIEW PROOF',
    text: 'One person’s experience is a data point. Useful, interesting, and still only one data point.',
  },
  {
    id: 't3',
    label: 'WE DON’T SAY GOOD OR BAD WITHOUT SAYING WHY',
    text: 'A verdict always comes with the reason, the trade-off and the context it applies to.',
  },
  {
    id: 't4',
    label: 'WE DON’T GIVE MEDICAL ADVICE',
    text: 'This is consumer product investigation, not dermatology. Anything medical gets pointed to a professional.',
  },
  {
    id: 't5',
    label: 'WE DON’T HIDE UNCERTAINTY',
    text: 'If the evidence is thin, the case stays open and says so. “Inconclusive” is a real verdict here.',
  },
  {
    id: 't6',
    label: 'WE DON’T PAY FOR VERDICTS',
    text: 'Paid collaborations are labelled. A paid brief cannot buy a better verdict.',
  },
];

/** Submit page — what people can send to the lab */
export const submissionTypes = [
  'PRODUCT',
  'INGREDIENT',
  'BRAND CLAIM',
  'COMPARISON',
  'LIFESTYLE QUESTION',
  'OTHER',
];

/** Submit page — checklist of accepted submissions */
export const submissionExamples = [
  { label: 'PRODUCTS', text: 'Something on your shelf you want to know more about.' },
  { label: 'INGREDIENTS', text: 'A name on the back of a label you cannot decode.' },
  { label: 'BRAND CLAIMS', text: '“Contains X” printed on the front of a bottle.' },
  { label: 'COMPARISONS', text: 'Two products, one shelf, one very confused shopper.' },
  { label: 'LIFESTYLE QUESTIONS', text: 'Does X actually do what everyone says it does?' },
];

/**
 * HONESTY NOTE
 * ------------------------------------------------------------------
 * All cases, ingredient profiles, experiences and verdicts in this build
 * are PLACEHOLDER content written to demonstrate the system.
 * No scientific citations have been added and no research is claimed.
 * Replace the copy, add real sources in the ingredient data (`sources: []`)
 * and drop in real links before publishing.
 */
export const contentStatus = {
  isPlaceholder: true,
  notice:
    'Demo content. Every case, ingredient profile and audience quote on this site is placeholder copy written to show how the system works — no sources are cited and no research is claimed.',
  shortNotice: 'PLACEHOLDER CONTENT · ADD SOURCES BEFORE PUBLISHING',
};