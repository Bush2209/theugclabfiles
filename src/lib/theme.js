/**
 * VISUAL TOKENS
 * ------------------------------------------------------------------
 * Maps data values (status, category, verdict, accent) to palette classes
 * so a case or ingredient only ever stores a plain string.
 */

export const ACCENTS = {
  lime: {
    bg: 'bg-lime',
    soft: 'bg-lime/35',
    border: 'border-lime',
    text: 'text-ink',
    dot: 'bg-lime',
    wash: 'bg-lime/15',
    ring: 'ring-lime',
  },
  lavender: {
    bg: 'bg-lavender',
    soft: 'bg-lavender/35',
    border: 'border-lavender',
    text: 'text-ink',
    dot: 'bg-lavender',
    wash: 'bg-lavender/15',
    ring: 'ring-lavender',
  },
  coral: {
    bg: 'bg-coral',
    soft: 'bg-coral/35',
    border: 'border-coral',
    text: 'text-ink',
    dot: 'bg-coral',
    wash: 'bg-coral/15',
    ring: 'ring-coral',
  },
  butter: {
    bg: 'bg-butter',
    soft: 'bg-butter/35',
    border: 'border-butter',
    text: 'text-ink',
    dot: 'bg-butter',
    wash: 'bg-butter/20',
    ring: 'ring-butter',
  },
  cyan: {
    bg: 'bg-cyan',
    soft: 'bg-cyan/35',
    border: 'border-cyan',
    text: 'text-ink',
    dot: 'bg-cyan',
    wash: 'bg-cyan/20',
    ring: 'ring-cyan',
  },
  ink: {
    bg: 'bg-ink',
    soft: 'bg-ink/10',
    border: 'border-ink',
    text: 'text-ivory',
    dot: 'bg-ink',
    wash: 'bg-ink/5',
    ring: 'ring-ink',
  },
};

export const accent = (key = 'ink') => ACCENTS[key] ?? ACCENTS.ink;

/** Case statuses */
export const STATUS_META = {
  'UNDER INVESTIGATION': {
    accent: 'butter',
    icon: '◐',
    meaning: 'Evidence is still coming in.',
  },
  'CASE CLOSED': {
    accent: 'lime',
    icon: '●',
    meaning: 'The question has been answered.',
  },
  'MORE EVIDENCE NEEDED': {
    accent: 'coral',
    icon: '▲',
    meaning: 'We need more reports before closing this one.',
  },
  INCONCLUSIVE: {
    accent: 'lavender',
    icon: '◆',
    meaning: 'The evidence does not settle the question.',
  },
};

/** Verdicts on case files */
export const VERDICT_META = {
  'CASE CLOSED': { accent: 'lime', icon: '●' },
  INCONCLUSIVE: { accent: 'lavender', icon: '◆' },
  'MORE EVIDENCE NEEDED': { accent: 'coral', icon: '▲' },
};

/** Ingredient verdicts */
export const INGREDIENT_VERDICT_META = {
  'WELL DOCUMENTED': { accent: 'cyan', icon: '●' },
  'CONTEXT MATTERS': { accent: 'lavender', icon: '◆' },
  'MORE RESEARCH NEEDED': { accent: 'coral', icon: '▲' },
};

/** Category colours for case files */
export const CASE_CATEGORY_ACCENT = {
  SKINCARE: 'lavender',
  HAIRCARE: 'cyan',
  BEAUTY: 'coral',
  WELLNESS: 'lime',
  LIFESTYLE: 'butter',
  COMPARISONS: 'ink',
  INGREDIENTS: 'coral',
};

/** Category colours for the ingredient database */
export const INGREDIENT_CATEGORY_ACCENT = {
  HYDRATION: 'cyan',
  'BARRIER SUPPORT': 'lime',
  'BRIGHTENING / PIGMENT': 'butter',
  EXFOLIANTS: 'coral',
  ANTIOXIDANTS: 'lime',
  SOOTHING: 'lavender',
  'OIL CONTROL': 'cyan',
  PRESERVATIVES: 'butter',
  RENEWAL: 'coral',
  'FRAGRANCE & SENSITISERS': 'coral',
};

/** Tone colours for audience evidence notes */
export const TONE_ACCENT = {
  positive: 'lime',
  mixed: 'butter',
  negative: 'coral',
  neutral: 'cyan',
};

/** Pretty colour for a keyword search hit (used by the ingredient search) */
export const SEARCH_HIGHLIGHT = 'bg-butter/60';