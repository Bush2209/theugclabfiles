/**
 * INGREDIENT DATABASE
 * ------------------------------------------------------------------
 * Each ingredient follows one shape, so adding a new one means copying
 * an existing object and editing it.
 *
 * IMPORTANT: `sources: []` is intentionally empty. No scientific citations
 * have been added to this build. Fill this in with real references before
 * publishing so every claim on the ingredient page has a source.
 *
 * Fields
 *   id            String   Display reference, e.g. "INGREDIENT #017"
 *   slug          String   URL segment
 *   name          String   Ingredient name as printed on labels
 *   aka           String   Common name / nickname ("VITAMIN B3")
 *   akaSub        String   Short clarification line
 *   category      String   One of INGREDIENT_CATEGORIES
 *   tags          String[] Short mono tags shown on cards
 *   color         String   Accent token (lime | lavender | coral | butter | cyan)
 *   whatIsIt      String   WHAT IS IT?
 *   usedFor       String   WHAT IS IT COMMONLY USED FOR?
 *   foundIn       String[] WHERE WILL YOU FIND IT?
 *   pairsWith     String[] Ingredient slugs — used to draw the relationship map
 *   brandsSay     String[] WHAT BRANDS SAY
 *   evidence      String[] WHAT THE EVIDENCE SUGGESTS (placeholder copy)
 *   peopleReport  String[] WHAT PEOPLE REPORT
 *   verdict       Object   { label, note } — see VERDICT_LABELS
 *   funFact       String   Small scrapbook detail
 *   sources       Array    Real references go here
 */

export const VERDICT_LABELS = {
  DOCUMENTED: 'WELL DOCUMENTED',
  CONTEXT: 'CONTEXT MATTERS',
  RESEARCH: 'MORE RESEARCH NEEDED',
};

export const INGREDIENT_CATEGORIES = [
  'HYDRATION',
  'BARRIER SUPPORT',
  'BRIGHTENING / PIGMENT',
  'EXFOLIANTS',
  'ANTIOXIDANTS',
  'SOOTHING',
  'OIL CONTROL',
  'PRESERVATIVES',
  'RENEWAL',
  'FRAGRANCE & SENSITISERS',
];

export const ingredients = [
  {
    id: 'INGREDIENT #017',
    slug: 'niacinamide',
    name: 'NIACINAMIDE',
    aka: 'VITAMIN B3',
    akaSub: 'Also labelled NICOTINAMIDE. One of the most-referenced names in skincare.',
    category: 'BARRIER SUPPORT',
    tags: ['BARRIER', 'OIL', 'TONE'],
    color: 'lime',
    whatIsIt:
      'Niacinamide is a form of vitamin B3 — the same broad family as niacin. It is stable, cheap to make and used in a very large share of skincare formulas.',
    usedFor:
      'It shows up in formulas that want to support the skin barrier, reduce excess oil, and even out the look of tone. It is one of the more common “multi-job” ingredients in mass-market skincare.',
    foundIn: [
      'Serums and essences',
      'Moisturisers',
      'Face washes (higher strength)',
      'Body lotions',
      'Sheet masks',
    ],
    pairsWith: ['ceramides', 'hyaluronic-acid', 'zinc-pca', 'panthenol'],
    brandsSay: [
      '“Brightens and evens out skin tone.”',
      '“Minimises pores and controls shine.”',
      '“Strengthens your moisture barrier.”',
    ],
    evidence: [
      'Placeholder summary: niacinamide is one of the more extensively discussed ingredients in skincare, so there is a lot of public discussion to compare against marketing language.',
      'The strength on the label matters — the same ingredient name can appear at very different concentrations.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“My skin looked calmer about three weeks in.”',
      '“Great texture, no dramatic change for me.”',
      '“The 10% version stingled for the first week.”',
    ],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'Widely used and widely discussed, but the result depends heavily on the formula it sits in and the percentage on the label. Judge the whole product, not one ingredient.',
    },
    funFact: 'Niacinamide is also added to some foods and supplements — the same name shows up in very different contexts.',
    sources: [],
  },
  {
    id: 'INGREDIENT #018',
    slug: 'salicylic-acid',
    name: 'SALICYLIC ACID',
    aka: 'BETA-HYDROXY ACID (BHA)',
    akaSub: 'Oil-soluble exfoliant. Found in BHA exfoliants and some anti-acne products.',
    category: 'EXFOLIANTS',
    tags: ['CLARIFYING', 'PORES'],
    color: 'coral',
    whatIsIt:
      'An oil-soluble exfoliating acid. Because it dissolves in oil, it can get further into oily areas than its water-soluble counterpart.',
    usedFor:
      'Used in products aimed at congestion — clogged-looking pores, oily T-zones and the texture of oily skin. Often found in leave-on exfoliants and washes.',
    foundIn: [
      'BHA exfoliating toners',
      'Anti-acne treatments',
      'Clarifying face washes',
      'Acne patches',
    ],
    pairsWith: ['niacinamide', 'zinc-pca', 'glycerin'],
    brandsSay: [
      '“Unclogs pores deep down.”',
      '“Clears blackheads overnight.”',
      '“Gentle enough for daily use.”',
    ],
    evidence: [
      'Placeholder summary: salicylic acid is the better-known oil-soluble exfoliant, and it is widely discussed in dermatology-adjacent public information.',
      '“Gentle daily use” depends on the concentration and how long it is left on.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“Dried me out completely after three days.”',
      '“Used it twice a week and my nose is much calmer.”',
      '“Tingled for a minute, then nothing.”',
    ],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'A tool, not a default. How often you use it and what you pair it with matters more than whether the bottle contains it.',
    },
    funFact: 'BHA is technically just the “oil-soluble” half of a chemical exfoliant family — AHA is the water-soluble half.',
    sources: [],
  },
  {
    id: 'INGREDIENT #019',
    slug: 'glycerin',
    name: 'GLYCERIN',
    aka: 'HUMECTANT',
    akaSub: 'One of the most common ingredients in skincare. Often listed near the top.',
    category: 'HYDRATION',
    tags: ['HUMECTANT', 'BASE'],
    color: 'cyan',
    whatIsIt:
      'A small molecule that attracts and holds water. It has been used in skin and pharmacy products for over a century.',
    usedFor:
      'It is the quiet base layer of a lot of moisturising formulas — the thing that helps a product feel less thirsty on the skin.',
    foundIn: ['Most moisturisers', 'Cleansers', 'Body washes', 'Lip balms', 'Hair masks'],
    pairsWith: ['ceramides', 'panthenol', 'hyaluronic-acid', 'niacinamide'],
    brandsSay: ['“Deeply hydrates.”', '“Replenishes moisture.”', '“Leaves skin soft and smooth.”'],
    evidence: [
      'Placeholder summary: glycerin is one of the most-used ingredients in skincare overall and is rarely the reason a product is expensive.',
      'Being early on the list mostly tells you the formula is built around water.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“Boring in the best way — it just works.”',
      '“I bought it for my hands and ended up using it on my face.”',
    ],
    verdict: {
      label: VERDICT_LABELS.DOCUMENTED,
      note: 'A base ingredient you can expect to find in most of the category. Its presence is not a selling point; its absence would be notable.',
    },
    funFact: 'Glycerin is also in toothpaste, hand sanitiser and most of the food you have eaten this week.',
    sources: [],
  },
  {
    id: 'INGREDIENT #020',
    slug: 'hyaluronic-acid',
    name: 'HYALURONIC ACID',
    aka: 'SODIUM HYALURONATE',
    akaSub: 'On labels it is usually listed as its salt form. The name on the front is the marketing version.',
    category: 'HYDRATION',
    tags: ['HUMECTANT', 'PLUMPING'],
    color: 'cyan',
    whatIsIt:
      'A sugar-like molecule that holds a large amount of water. It exists naturally in the body as part of the extracellular matrix.',
    usedFor:
      'Used to make skin look plumper and more hydrated, usually in leave-on serums and moisturisers.',
    foundIn: ['Serums', 'Moisturisers', 'Sheet masks', 'Eye products'],
    pairsWith: ['glycerin', 'niacinamide', 'ceramides'],
    brandsSay: ['“Instantly plumps.”', '“Delivers 1,000x more water.”', '“Fills in fine lines.”'],
    evidence: [
      'Placeholder summary: hyaluronic acid is heavily used in hydration products; the marketing versions of the claim are usually about molecules, which is a different question from visible results.',
      'Humectants work best on damp skin and alongside something that seals them in.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“Instantly smoother for about an hour.”',
      '“Made my dry patches worse until I used it under moisturiser.”',
    ],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'Useful hydration support. Expect a surface effect rather than a permanent change, and read the full formula around it.',
    },
    funFact: 'The “1,000x” number on the front of the bottle is about water-binding in the lab, not about your face.',
    sources: [],
  },
  {
    id: 'INGREDIENT #021',
    slug: 'retinol',
    name: 'RETINOL',
    aka: 'VITAMIN A DERIVATIVE',
    akaSub: 'Part of a family of vitamin A derivatives. Always one of the strongest active ingredients to investigate.',
    category: 'RENEWAL',
    tags: ['ACTIVE', 'STRONG'],
    color: 'coral',
    whatIsIt:
      'A vitamin A derivative used in leave-on skincare to speed up how quickly skin turns over.',
    usedFor:
      'Used in formulas aimed at texture, fine lines and the appearance of breakouts. It is also the active ingredient in some prescription retinoids.',
    foundIn: ['Night serums', 'Night creams', 'Retinoid treatments', 'Some anti-ageing creams'],
    pairsWith: ['niacinamide', 'ceramides', 'glycerin', 'panthenol'],
    brandsSay: [
      '“Powered by retinol — visibly younger skin.”',
      '“Smooths fine lines in 4 weeks.”',
      '“Now with encapsulated retinol for stability.”',
    ],
    evidence: [
      'Placeholder summary: vitamin A derivatives are among the most discussed actives in public skincare information.',
      'Over-the-counter retinol is not the same strength as a prescription retinoid — the label matters.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“Peeling for six weeks, then genuinely smoother.”',
      '“I gave up at week two.”',
      '“My cheeks were angry until I started sandwiching it.”',
    ],
    verdict: {
      label: VERDICT_LABELS.RESEARCH,
      note: 'Strong active with a real adjustment period. Needs patience, a routine that supports the barrier, and honest expectations.',
    },
    funFact: 'Retinol is sensitive to light and air — which is why it lives in opaque, airless packaging.',
    sources: [],
  },
  {
    id: 'INGREDIENT #022',
    slug: 'vitamin-c',
    name: 'VITAMIN C',
    aka: 'L-ASCORBIC ACID',
    akaSub: 'On a label it may appear as L-ASCORBIC ACID, ASCORBYL PALMITATE or a long derivative name.',
    category: 'BRIGHTENING / PIGMENT',
    tags: ['ANTIOXIDANT', 'BRIGHT'],
    color: 'butter',
    whatIsIt:
      'Vitamin C in its various forms. L-ascorbic acid is the pure form; the derivatives are stabilised versions.',
    usedFor:
      'Used in formulas aimed at dullness and the look of uneven tone, and as an antioxidant alongside other actives.',
    foundIn: ['Brightening serums', 'Morning creams', 'Eye products'],
    pairsWith: ['niacinamide'],
    alsoMentioned: ['VITAMIN E', 'FERULIC ACID'],
    brandsSay: ['“Brightens in 2 weeks.”', '“10% pure vitamin C.”', '“Fades dark spots.”'],
    evidence: [
      'Placeholder summary: vitamin C is one of the most marketed ingredient names in skincare — the front of the bottle often says more than the back.',
      'Pure L-ascorbic acid oxidises; a brown bottle is a legitimate packaging decision.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“Turned orange in a month — that was not in the tutorial.”',
      '“Morning texture is noticeably brighter.”',
      '“Could not tell the difference from the cheaper one.”',
    ],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'Real ingredient, heavily marketed ingredient. Read the back label and the packaging before you believe the front.',
    },
    funFact: 'If your vitamin C serum has gone dark orange-brown, it has oxidised — that is a packaging story, not a formulation myth.',
    sources: [],
  },
  {
    id: 'INGREDIENT #023',
    slug: 'ceramides',
    name: 'CERAMIDES',
    aka: 'SKIN-IDENTICAL LIPIDS',
    akaSub: 'Listed with a number — Ceramide NP, AP, EOP. They are a family, not one chemical.',
    category: 'BARRIER SUPPORT',
    tags: ['BARRIER', 'REPAIR'],
    color: 'lavender',
    whatIsIt:
      'A family of waxy lipids that exist naturally in the outer layer of skin. Formulas add them to top that layer back up.',
    usedFor:
      'Used in moisturisers and barrier-focused creams aimed at dry, tight or compromised-feeling skin.',
    foundIn: ['Ceramide moisturisers', 'Repair creams', 'Cleansers', 'Body washes'],
    pairsWith: ['niacinamide', 'glycerin'],
    alsoMentioned: ['CHOLESTEROL', 'FATTY ACIDS'],
    brandsSay: ['“Repairs your barrier.”', '“3x ceramides.”', '“Clinically proven barrier support.”'],
    evidence: [
      'Placeholder summary: ceramides are one of the more thoroughly discussed barrier ingredients in public skincare information.',
      'Look for a named ceramide on the label — “ceramide complex” alone tells you less.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“Saved my skin after I over-exfoliated.”',
      '“Stopped my winter flaking completely.”',
      '“Heavier than I expected.”',
    ],
    verdict: {
      label: VERDICT_LABELS.DOCUMENTED,
      note: 'A sensible default for dry or barrier-stressed skin. The specific ceramide matters more than the claim on the front.',
    },
    funFact: 'Ceramides are named by letters — Ceramide NP, AP and EOP are different molecules, not different strengths.',
    sources: [],
  },
  {
    id: 'INGREDIENT #024',
    slug: 'zinc-pca',
    name: 'ZINC PCA',
    aka: 'ZINC SALT',
    akaSub: 'Zinc in a form commonly used in oil-control products.',
    category: 'OIL CONTROL',
    tags: ['OIL', 'MATTIFYING'],
    color: 'cyan',
    whatIsIt:
      'A zinc salt used to reduce the shine that comes with oily skin. It is also widely used as an anti-dandruff active.',
    usedFor:
      'Used in mattifying moisturisers, primers and oil-control treatments, and in some anti-dandruff shampoos.',
    foundIn: ['Mattifying moisturisers', 'Primers', 'Anti-dandruff shampoo', 'Sunsticks'],
    pairsWith: ['niacinamide', 'salicylic-acid'],
    brandsSay: ['“Blurs and mattifies.”', '“24-hour shine control.”', '“Refines pores instantly.”'],
    evidence: [
      'Placeholder summary: zinc salts appear in a wide range of oil-control products, usually alongside other actives.',
      '“Instantly refines pores” is usually a finish effect, not a change in pore size.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“Great for two hours, then back to normal.”',
      '“My scalp liked it more than my face did.”',
    ],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'Practical shine management. Manage expectations — this is a surface finish, not a fix for oil production.',
    },
    funFact: 'The zinc in a sunscreen and the zinc in an anti-dandruff shampoo are doing very different jobs.',
    sources: [],
  },
  {
    id: 'INGREDIENT #025',
    slug: 'panthenol',
    name: 'PANTHENOL',
    aka: 'PRO-VITAMIN B5',
    akaSub: 'Widely used as a supporting, non-irritating ingredient in calming formulas.',
    category: 'SOOTHING',
    tags: ['CALMING', 'SUPPORT'],
    color: 'lavender',
    whatIsIt:
      'Pro-vitamin B5 — a water-soluble ingredient used to support skin and hair conditioning.',
    usedFor:
      'Appears in soothing products aimed at dryness, tightness and sensitised-feeling skin, and in hair conditioners.',
    foundIn: ['Soothing serums', 'Moisturisers', 'Hair conditioners', 'Baby-safe products', 'Suncare'],
    pairsWith: ['glycerin', 'niacinamide', 'ceramides'],
    brandsSay: ['“Calms and comforts.”', '“Supports skin recovery.”', '“Panthenol 2%.”'],
    evidence: [
      'Placeholder summary: panthenol is a common supporting ingredient across cosmetics rather than a headline active.',
      'Used in products where gentleness is the selling point.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: ['“My face stopped stinging after using this.”', '“Nothing dramatic, just comfortable.”'],
    verdict: {
      label: VERDICT_LABELS.DOCUMENTED,
      note: 'A quiet support ingredient. Useful in a routine, unlikely to be the reason a product stands out.',
    },
    funFact: 'It is sometimes listed as D-panthenol or provitamin B5 — same ingredient, different label wording.',
    sources: [],
  },
  {
    id: 'INGREDIENT #026',
    slug: 'green-tea-extract',
    name: 'GREEN TEA EXTRACT',
    aka: 'CAMELLIA SINENSIS / EGCG',
    akaSub: 'Plant extract. The specific compound usually mentioned is EGCG.',
    category: 'ANTIOXIDANTS',
    tags: ['ANTIOXIDANT', 'SOOTHE'],
    color: 'lime',
    whatIsIt:
      'An extract from green tea leaves. The compound most often referenced is EGCG, a type of polyphenol.',
    usedFor:
      'Used in formulas framed around antioxidant support and calming, often alongside other botanicals.',
    foundIn: ['Antioxidant serums', 'Sunscreens', 'Body care', 'Some toners'],
    pairsWith: ['vitamin-c'],
    alsoMentioned: ['VITAMIN E'],
    brandsSay: ['“Antioxidant defence.”', '“Calms redness.”', '“Protects against daily damage.”'],
    evidence: [
      'Placeholder summary: green tea extract is a well-known botanical in public skincare information, and heavily used in sunscreen.',
      '“Protects” is doing a lot of work on these bottles — from what, compared to what?',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: ['“Nice texture, no noticeable change.”', '“My redness looked better in a photo.”'],
    verdict: {
      label: VERDICT_LABELS.RESEARCH,
      note: 'A common botanical with plausible roles and plenty of marketing attached. Ask what the product is really doing for you.',
    },
    funFact: 'It is a standard inclusion in mineral sunscreens — one of the few places you can see a botanical doing structural work.',
    sources: [],
  },
  {
    id: 'INGREDIENT #027',
    slug: 'methylparaben',
    name: 'METHYLPARABEN',
    aka: 'PARABEN PRESERVATIVE',
    akaSub: 'A preservative. Its presence usually signals “this formula contains water”.',
    category: 'PRESERVATIVES',
    tags: ['PRESERVATIVE', 'KEEP'],
    color: 'butter',
    whatIsIt:
      'One of a family of preservatives. Water-based formulas need something to stop microbes growing once opened.',
    usedFor:
      'Present in many water-based cosmetics to keep them safe to use after opening. It is usually listed low down the ingredient list.',
    foundIn: ['Creams', 'Serums', 'Mascara', 'Shampoo', 'Body lotion'],
    pairsWith: ['fragrance'],
    alsoMentioned: ['PHENOXYETHANOL'],
    brandsSay: ['“Paraben-free formula.”', '“Clean ingredients.”', '“No preservatives.”'],
    evidence: [
      'Placeholder summary: preservatives are a required part of most water-based cosmetics and are a common source of “free-from” marketing.',
      '“Paraben-free” tells you about the preservative system, not automatically about safety or quality.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: ['“I stopped buying paraben-free for no reason.”', '“Never noticed any difference.”'],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'A functional preservative. Judge the product and its freshness, not the presence or absence of one family of preservatives.',
    },
    funFact: 'A product with no preservative system and no airless, airtight packaging is the combination actually worth asking about.',
    sources: [],
  },
  {
    id: 'INGREDIENT #028',
    slug: 'fragrance',
    name: 'FRAGRANCE',
    aka: 'PARFUM / AROMATIC',
    akaSub: 'A blend, not a single chemical. Listed as “fragrance” or “parfum”.',
    category: 'FRAGRANCE & SENSITISERS',
    tags: ['SCENT', 'SECRET'],
    color: 'coral',
    whatIsIt:
      'A blend of aromatic chemicals created to make a product smell a certain way. The label does not require the individual components to be listed.',
    usedFor:
      'Used purely for scent and for the sensory experience of using the product. It has no functional role in the formula.',
    foundIn: ['Most scented skincare', 'Shampoo', 'Body wash', 'Hair products', 'Almost every "luxury" cream'],
    pairsWith: ['methylparaben', 'alcohol-denat'],
    brandsSay: ['“Lightweight fragrance.”', '“Clean scent.”', '“Sensitive skin friendly.”'],
    evidence: [
      'Placeholder summary: fragrance is one of the most common reasons people report reactions to otherwise simple products.',
      'Because it is a blend, the label cannot tell you which aromatic is causing a reaction.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: [
      '“I have no idea what reacted, but it was this.”',
      '“Fragrance-free fixed my chin.”',
      '“I love the smell, so I keep buying it.”',
    ],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'The most commonly ignored line on a label. Worth asking whether the scent is worth whatever it costs your skin.',
    },
    funFact: '“Unscented” and “fragrance-free” are not always the same thing — read the back either way.',
    sources: [],
  },
  {
    id: 'INGREDIENT #029',
    slug: 'aloe-vera',
    name: 'ALOE VERA',
    aka: 'ALOE BARBADENSIS LEAF JUICE',
    akaSub: 'Plant juice, used mostly for feel and soothing on the label.',
    category: 'SOOTHING',
    tags: ['BOTANICAL', 'GEL'],
    color: 'lime',
    whatIsIt:
      'A plant juice used in cosmetics for its slip, its gel feel and its positioning as a soothing botanical.',
    usedFor:
      'Used in gels, after-sun products and anything that wants a cooling, hydrated feel.',
    foundIn: ['After-sun gel', 'Hair gel', 'Body lotion', 'Baby products'],
    pairsWith: ['panthenol', 'glycerin'],
    brandsSay: ['“Cooling aloe.”', '“96% aloe vera.”', '“Natural hydration.”'],
    evidence: [
      'Placeholder summary: aloe appears in a very high percentage of products marketed as hydrating or soothing.',
      '“96% aloe” is a real claim about the formula — and also a reason the rest of the formula is mostly water.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: ['“Great for sunburn relief.”', '“My hair loved it, my face did not care.”'],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'A familiar gel feel with a mild reputation. High percentages mostly mean the product is mostly water.',
    },
    funFact: 'The number on the front is often the easiest clue to what else is in the bottle.',
    sources: [],
  },
  {
    id: 'INGREDIENT #030',
    slug: 'alcohol-denat',
    name: 'ALCOHOL DENAT.',
    aka: 'DENATURED ALCOHOL / SD ALCOHOL',
    akaSub: 'An alcohol listed under one of several names. Appears high up to make a product dry fast.',
    category: 'RENEWAL',
    tags: ['DRY', 'SOLVENT'],
    color: 'ink',
    whatIsIt:
      'Alcohol used as a solvent and quick-drying base — mostly in lightweight toners, serums and setting sprays.',
    usedFor:
      'Used to make a formula dry down fast and feel weightless. It has no nourishing role and it evaporates.',
    foundIn: ['Toning essences', 'Setting sprays', 'Gel-based serums', 'Some mattifying sprays'],
    pairsWith: ['niacinamide', 'fragrance'],
    brandsSay: ['“Weightless hydration.”', '“No sticky residue.”', '“Absorbs instantly.”'],
    evidence: [
      'Placeholder summary: alcohol appears high on lists of products that feel refreshing and weightless.',
      'High on the ingredient list plus “dry” in the texture is the same information twice.',
      'Add real, cited sources here before publishing.',
    ],
    peopleReport: ['“Love the finish, hate the tightness.”', '“Layers well under sunscreen.”'],
    verdict: {
      label: VERDICT_LABELS.CONTEXT,
      note: 'A texture and drying choice rather than an active. Excellent for layering, worth watching if your skin feels tight.',
    },
    funFact: 'SD ALCOHOL 40, ALCOHOL DENAT. and ALCOHOL are usually the same thing on three different labels.',
    sources: [],
  },
];

/** Convenience lookups */
export const ingredientBySlug = Object.fromEntries(ingredients.map((i) => [i.slug, i]));

export function getIngredient(slug) {
  return ingredientBySlug[slug];
}

/** All ingredients grouped by category, used by the database page */
export function ingredientsByCategory() {
  return INGREDIENT_CATEGORIES.map((category) => ({
    category,
    items: ingredients.filter((i) => i.category === category),
  })).filter((group) => group.items.length > 0);
}