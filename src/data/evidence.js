/**
 * THE PEOPLE'S EVIDENCE
 * ------------------------------------------------------------------
 * Audience experiences submitted through SUBMIT A CASE.
 *
 * PLACEHOLDER CONTENT — these quotes are illustrative samples, not real
 * submissions. Replace them before publishing.
 *
 * Fields
 *   id       String   Unique reference, e.g. "REPORT #118"
 *   quote    String   What the person actually said
 *   meta     String   When it arrived, in lab notation
 *   source   String   Where it came from
 *   product  String   What they were using
 *   caseSlug String   Related case file
 *   tone     String   positive | mixed | negative | neutral — sets the note colour
 *   featured Boolean  Shown on the homepage
 */

export const evidenceNotes = [
  {
    id: 'REPORT #118',
    quote: 'This made my skin incredibly dry.',
    meta: '14 DAYS AGO',
    source: 'INSTAGRAM DM',
    product: '₹1,400 foaming facewash',
    caseSlug: 'the-facewash-file',
    tone: 'negative',
    featured: true,
  },
  {
    id: 'REPORT #119',
    quote: 'I actually noticed a difference — around week three.',
    meta: '3 WEEKS AGO',
    source: 'SUBMIT A CASE FORM',
    product: 'Niacinamide serum, 10%',
    caseSlug: 'is-expensive-skincare-better',
    tone: 'positive',
    featured: true,
  },
  {
    id: 'REPORT #120',
    quote: "Honestly, I don't know if it did anything.",
    meta: '1 WEEK AGO',
    source: 'YOUTUBE COMMENT',
    product: 'Peptide lip balm',
    caseSlug: 'do-lip-plumpers-plump',
    tone: 'neutral',
    featured: true,
  },
  {
    id: 'REPORT #104',
    quote: 'Fragrance-free fixed my chin in two weeks. Nothing else did.',
    meta: '5 WEEKS AGO',
    source: 'SUBMIT A CASE FORM',
    product: '“Sensitive skin” daily wash',
    caseSlug: 'why-is-fragrance-in-everything',
    tone: 'mixed',
  },
  {
    id: 'REPORT #105',
    quote: 'Finished the whole bottle, could not tell you a single difference.',
    meta: '5 WEEKS AGO',
    source: 'TIKTOK DM',
    product: 'Mid-range brightening serum',
    caseSlug: 'is-expensive-skincare-better',
    tone: 'neutral',
  },
  {
    id: 'REPORT #096',
    quote: 'Bought it because of the 4-week claim. Gave it 4 weeks. Nothing.',
    meta: '2 MONTHS AGO',
    source: 'INSTAGRAM DM',
    product: '“Clinical” night cream',
    caseSlug: 'sleep-skin-and-the-8-hour-claim',
    tone: 'negative',
  },
  {
    id: 'REPORT #097',
    quote: 'My pores look smaller in photos now. Could be the light.',
    meta: '2 MONTHS AGO',
    source: 'SUBMIT A CASE FORM',
    product: 'Niacinamide + zinc mattifying cream',
    caseSlug: 'is-expensive-skincare-better',
    tone: 'mixed',
  },
  {
    id: 'REPORT #088',
    quote: 'Turned orange in a month because I left it on the windowsill. Not the brand’s fault.',
    meta: '3 MONTHS AGO',
    source: 'YOUTUBE COMMENT',
    product: 'Vitamin C serum',
    caseSlug: 'what-does-brightening-mean',
    tone: 'mixed',
  },
  {
    id: 'REPORT #089',
    quote: 'Three products instead of nine and my curls behave better. I did not expect that.',
    meta: '3 MONTHS AGO',
    source: 'TIKTOK DM',
    product: 'Three-step curl routine',
    caseSlug: 'the-curl-routine-file',
    tone: 'positive',
  },
  {
    id: 'REPORT #074',
    quote: 'The “toxin-free” one had the longest label I have ever read.',
    meta: '4 MONTHS AGO',
    source: 'INSTAGRAM DM',
    product: '“Toxin-free” cream cleanser',
    caseSlug: 'is-toxin-free-meaningless',
    tone: 'neutral',
  },
];

export const featuredEvidence = evidenceNotes.filter((n) => n.featured);

export const evidenceById = Object.fromEntries(evidenceNotes.map((n) => [n.id, n]));

/** Notes attached to a given case file. */
export function evidenceForCase(caseSlug) {
  return evidenceNotes.filter((n) => n.caseSlug === caseSlug);
}