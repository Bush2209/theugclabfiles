/**
 * CASE FILES
 * ------------------------------------------------------------------
 * One object = one investigation. Add an object and it appears in the
 * archive, the home page, filters and the ingredient pages automatically.
 *
 * NOTE: this build ships PLACEHOLDER content. Brand names, prices,
 * quotes and verdicts are illustrative — `placeholder: true` marks the
 * copy that must be replaced before publishing. `video.url` is empty
 * until real posts are linked.
 */

export const CASE_CATEGORIES = [
  'SKINCARE',
  'HAIRCARE',
  'BEAUTY',
  'WELLNESS',
  'LIFESTYLE',
  'COMPARISONS',
  'INGREDIENTS',
];

export const CASE_STATUSES = {
  OPEN: 'UNDER INVESTIGATION',
  CLOSED: 'CASE CLOSED',
  NEEDS: 'MORE EVIDENCE NEEDED',
};

export const VERDICTS = {
  CLOSED: 'CASE CLOSED',
  INCONCLUSIVE: 'INCONCLUSIVE',
  NEEDS: 'MORE EVIDENCE NEEDED',
};

export const cases = [
  {
    number: '001',
    slug: 'the-facewash-file',
    title: 'THE FACEWASH FILE',
    kicker: 'The flagship case file',
    question: 'Is this ₹1,400 facewash actually better than the ₹180 one?',
    category: 'SKINCARE',
    status: CASE_STATUSES.CLOSED,
    date: '14.02.2026',
    accent: 'lavender',
    tags: ['FACEWASH', 'CLEANSER', 'PRICE GAP'],
    cover: { kind: 'tube', color: 'lavender' },
    placeholder: true,
    intro:
      'Two foaming facewashes sat next to each other on the same shelf. Same job, same bottle size, one priced like a small holiday and one priced like a bus fare. This case follows both from the front of the bottle to the last ingredient on the list.',
    products: [
      {
        name: 'GENTLE MILK CLEANSER',
        brand: 'Placeholder brand A',
        category: 'Creamy gel facewash',
        size: '150 ML',
        price: '₹1,400',
        info: 'Thin, low-foam texture. Claims a pH-balanced amino acid base and “clinically gentle” daily use.',
        ingredients: ['glycerin', 'niacinamide', 'fragrance'],
        shot: { kind: 'tube', color: 'lavender' },
        note: 'The expensive option. Longer ingredient list, more story on the front.',
      },
      {
        name: 'DAILY CLEANSER BAR-FREE GEL',
        brand: 'Placeholder brand B',
        category: 'Gel facewash',
        size: '150 ML',
        price: '₹180',
        info: 'Thick, slippery gel with a fast bubble. Claims a “cleanse without stripping” and lists six ingredients.',
        shot: { kind: 'bottle', color: 'lime' },
        note: 'The affordable option. Short list, big foam.',
      },
      {
        name: 'FRAGRANCE-FREE GEL',
        brand: 'Placeholder brand C',
        category: 'Gentle gel facewash',
        size: '120 ML',
        price: '₹420',
        info: 'The control sample. Unscented, no essential oils, positioned at “boring on purpose”.',
        ingredients: ['glycerin', 'panthenol'],
        shot: { kind: 'pump', color: 'cyan' },
        note: 'Included to test whether price or fragrance was doing the work.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRAND CLAIMS',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: [
        '“Clinically gentle, suitable for daily use.”',
        '“Removes 99% of daily impurities.”',
        '“Skin feels soft and never tight after cleansing.”',
      ],
      found: [
        'Both cleansers removed an identical amount of everyday sunscreen in the kitchen-sink test. Neither removed heavy makeup without a second pass.',
        'The “never tight” claim held for the fragrance-free control, not for the expensive one — which was fragranced.',
        'Price difference was roughly 8x for a broadly similar job. The extra money bought texture and packaging, not a different outcome.',
      ],
    },
    ingredients: ['glycerin', 'niacinamide', 'fragrance', 'panthenol'],
    experienceIds: ['ev-01', 'ev-03', 'ev-04'],
    process: [
      { title: 'QUESTION', note: 'Is the price gap justified by the formula, or by the bottle?' },
      { title: 'PRODUCT RESEARCH', note: 'Three facewashes photographed, labelled and logged by price per 100ml.' },
      { title: 'INGREDIENT RESEARCH', note: 'Ingredient lists read side by side. Glycerin in all three; fragrance in one.' },
      { title: 'USER EXPERIENCES', note: '47 audience reports collected through SUBMIT A CASE.' },
      { title: 'COMPARISON', note: 'Same amount of product, same sponge, same order of operations.' },
      { title: 'VERDICT', note: 'One verdict, one trade-off, and a note on who should buy which.' },
    ],
    verdict: {
      label: VERDICTS.CLOSED,
      headline: 'You are not paying for a better cleanse. You are paying for a nicer experience.',
      body: 'The expensive cleanser and the cheap one did the same job in this test. The difference was the feel during use and the scent afterwards. If tightness is not a problem for you, the ₹180 bottle is a completely defensible purchase. If scented routines are part of why you enjoy washing your face, the ₹1,400 bottle is not a scam — it is just not doing more work.',
      bullets: [
        'Winner for value: the ₹180 gel',
        'Winner for experience: the ₹1,400 tube',
        'Winner for sensitive-feeling skin: the fragrance-free control',
        'Not established: whether either is better long-term',
      ],
    },
    video: {
      platform: 'Instagram Reel',
      handle: '@theuginvestigator',
      url: '',
      title: 'I compared a ₹180 facewash to a ₹1,400 one',
      duration: '0:58',
    },
  },

  {
    number: '007',
    slug: 'is-expensive-skincare-better',
    title: 'IS EXPENSIVE SKINCARE ACTUALLY BETTER?',
    kicker: 'Currently on the desk',
    question: 'Does a higher price tag mean a better formula?',
    category: 'COMPARISONS',
    status: CASE_STATUSES.OPEN,
    date: '28.03.2026',
    accent: 'lime',
    tags: ['PRICE', 'FORMULA', 'COMPARISON'],
    cover: { kind: 'box', color: 'lime' },
    placeholder: true,
    intro:
      'Every investigation this lab runs eventually asks the money question. This one takes six products across three price brackets and asks what the extra money actually changes — the formula, the packaging, or the story.',
    products: [
      {
        name: 'ENTRY-LEVEL MOISTURISER',
        brand: 'Placeholder brand D',
        category: 'Daily moisturiser',
        size: '50 ML',
        price: '₹220',
        info: 'Short ingredient list, heavy on glycerin and ceramides, unremarkable packaging.',
        ingredients: ['glycerin', 'ceramides'],
        shot: { kind: 'jar', color: 'cyan' },
        note: '₹220 baseline.',
      },
      {
        name: 'MID-RANGE SERUM',
        brand: 'Placeholder brand E',
        category: 'Brightening serum',
        size: '30 ML',
        price: '₹890',
        info: 'Niacinamide-led, short claim list, standard amber bottle.',
        ingredients: ['niacinamide', 'hyaluronic-acid'],
        shot: { kind: 'dropper', color: 'butter' },
        note: '₹890 baseline.',
      },
      {
        name: 'PREMIUM CREAM',
        brand: 'Placeholder brand F',
        category: 'Night cream',
        size: '50 ML',
        price: '₹4,200',
        info: 'Long ingredient list, heavy jar, “clinical results in 4 weeks” on the front.',
        ingredients: ['retinol', 'ceramides', 'niacinamide', 'fragrance'],
        shot: { kind: 'jar', color: 'lavender' },
        note: '₹4,200 baseline — with a real active in it.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRANDS CLAIM',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: [
        '“Clinical results in 4 weeks.”',
        '“Luxury formulation, now accessible.”',
        '“Visible transformation — or your money back.”',
      ],
      found: [
        'Price is not a reliable signal of active concentration. The ₹4,200 cream contains a listed active; two cheaper products contain the same name at unknown levels.',
        'Packaging is the most expensive line item on all three. None of the three needed a heavy jar to stay stable.',
        'Still open: whether the ₹890 serum outperforms the ₹220 moisturiser for a specific person. Needs more audience reports.',
      ],
    },
    ingredients: ['niacinamide', 'retinol', 'ceramides', 'glycerin', 'hyaluronic-acid'],
    experienceIds: ['ev-05', 'ev-07'],
    verdict: {
      label: VERDICTS.NEEDS,
      headline: 'Price buys you packaging and certainty — not automatically a better formula.',
      body: 'Across three brackets, the clearest difference was legibility: the more expensive product told you less about what was inside and more about why it was expensive. The premium cream is the only one of the three with a listed active, which is a real difference — but it is also the one most likely to need a routine that supports it. This case stays open while we gather more reports.',
      bullets: [
        'Established: price does not equal concentration',
        'Established: packaging cost is significant across all three',
        'Open: whether the mid-range serum outperforms the entry moisturiser',
      ],
    },
    video: {
      platform: 'YouTube Short',
      handle: '/theuginvestigator',
      url: '',
      title: 'Does expensive skincare actually work better?',
      duration: '0:44',
    },
  },

  {
    number: '008',
    slug: 'what-does-brightening-mean',
    title: 'WHAT DOES “BRIGHTENING” ACTUALLY MEAN?',
    kicker: 'Claim detected',
    question: 'When a brand says “brightening”, what are they promising?',
    category: 'SKINCARE',
    status: CASE_STATUSES.NEEDS,
    date: '04.04.2026',
    accent: 'butter',
    tags: ['CLAIM', 'VOCABULARY', 'PIGMENT'],
    cover: { kind: 'dropper', color: 'butter' },
    placeholder: true,
    intro:
      'Brightening appears on almost every brightening product on the shelf — and it means at least four different things. This case separates the word from the work.',
    products: [
      {
        name: 'BRIGHTENING VITAMIN C SERUM',
        brand: 'Placeholder brand G',
        category: 'Morning serum',
        size: '30 ML',
        price: '₹1,150',
        info: 'Front label leads with “brightening”. Back label lists L-ascorbic acid near the end.',
        ingredients: ['vitamin-c', 'fragrance'],
        shot: { kind: 'dropper', color: 'butter' },
        note: '“Brightening” #1: dullness.',
      },
      {
        name: 'DAILY VITAMIN C CREAM',
        brand: 'Placeholder brand H',
        category: 'Day cream with SPF',
        size: '50 ML',
        price: '₹780',
        info: 'Same word on the front, very different mechanism — the SPF does the tone work.',
        ingredients: ['vitamin-c', 'green-tea-extract'],
        shot: { kind: 'jar', color: 'lime' },
        note: '“Brightening” #2: sun protection.',
      },
      {
        name: 'OVERTONE CREAM',
        brand: 'Placeholder brand I',
        category: 'Tinted moisturiser',
        size: '40 ML',
        price: '₹640',
        info: 'Contains no tone-targeting active at all. The colour does the work immediately.',
        shot: { kind: 'tube', color: 'coral' },
        note: '“Brightening” #3: colour, instantly.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRANDS CLAIM',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: [
        '“Visibly brighter skin.”',
        '“Fades dark spots and evens tone.”',
        '“Glow in 7 days.”',
      ],
      found: [
        '“Brightening” here means at least four different things: reducing dullness, protecting against sun, adding colour, or targeting pigment over weeks.',
        'Two of the three products doing the most visible brightening were doing it with SPF or colour — not with the hero active on the front.',
        'Still missing: what each brand means by it internally. That question goes to the brands next.',
      ],
    },
    ingredients: ['vitamin-c', 'green-tea-extract', 'niacinamide', 'fragrance'],
    experienceIds: ['ev-02', 'ev-06'],
    verdict: {
      label: VERDICTS.NEEDS,
      headline: '“Brightening” is a container word, not a claim you can check.',
      body: 'The honest translation is: this product will make your skin look brighter in some way, and the mechanism determines whether that matters to you. Sunscreen brightens over weeks by preventing damage. Tinted cream brightens immediately with colour. A vitamin C serum claims a slower pigment-focused change. Buying the word instead of the mechanism is the single most common expensive mistake in this category.',
      bullets: [
        'Established: the word covers four different mechanisms',
        'Established: immediate vs gradual results come from different ingredients',
        'Open: brand-by-brand definitions, pending contact',
      ],
    },
    video: {
      platform: 'Instagram Reel',
      handle: '@theuginvestigator',
      url: '',
      title: '“Brightening” means four different things',
      duration: '0:51',
    },
  },

  {
    number: '009',
    slug: 'why-is-fragrance-in-everything',
    title: 'WHY IS FRAGRANCE IN EVERYTHING?',
    kicker: 'The most common hidden line',
    question: 'Why is fragrance in products that claim to be gentle?',
    category: 'INGREDIENTS',
    status: CASE_STATUSES.OPEN,
    date: '19.04.2026',
    accent: 'coral',
    tags: ['FRAGRANCE', 'SENSITIVITY', 'LABELS'],
    cover: { kind: 'bottle', color: 'coral' },
    placeholder: true,
    intro:
      'Fragrance is a blend, the label does not require its components to be listed, and it appears in products marketed for sensitive skin. This case tracks the most ignored line in the beauty aisle.',
    products: [
      {
        name: '“SENSITIVE SKIN” DAILY WASH',
        brand: 'Placeholder brand J',
        category: 'Face wash',
        size: '150 ML',
        price: '₹520',
        info: 'Front: “for sensitive skin”. Back: fragrance, listed fifth.',
        ingredients: ['glycerin', 'fragrance', 'panthenol'],
        shot: { kind: 'tube', color: 'coral' },
        note: 'The contradiction, in one bottle.',
      },
      {
        name: 'UNSCENTED BARRIER CREAM',
        brand: 'Placeholder brand K',
        category: 'Moisturiser',
        size: '50 ML',
        price: '₹640',
        info: 'No fragrance listed at all. Plain white bottle, plain label.',
        ingredients: ['ceramides', 'glycerin', 'panthenol'],
        shot: { kind: 'jar', color: 'cyan' },
        note: 'The control that actually says what it is.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRANDS CLAIM',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: [
        '“Formulated for sensitive skin.”',
        '“Gentle daily cleanser.”',
        '“Dermatologically tested.”',
      ],
      found: [
        'Fragrance appears on the front-adjacent ingredients of products making sensitive-skin claims in this sample.',
        'Because fragrance is a blend, the label cannot tell you which aromatic is in it — so reactions cannot be traced back to a specific chemical.',
        'Still open: how many of the reported reactions in the audience pool mention fragrance. Collecting now.',
      ],
    },
    ingredients: ['fragrance', 'glycerin', 'ceramides', 'panthenol'],
    experienceIds: ['ev-08', 'ev-01'],
    verdict: {
      label: VERDICTS.NEEDS,
      headline: 'The gentlest product in the sample was the one that added nothing.',
      body: 'Fragrance has no functional role in a face wash. It exists for the experience, and the experience matters — but so does the fact that it can be the reason a “sensitive skin” product causes a reaction. In this sample, the product with the shortest ingredient list and no fragrance was the most defensible option for someone already reacting to things.',
      bullets: [
        'Established: fragrance serves no functional purpose here',
        'Established: blends cannot be traced through a label',
        'Open: how often it is the actual culprit, per audience reports',
      ],
    },
    video: {
      platform: 'TikTok',
      handle: '@theuginvestigator',
      url: '',
      title: 'The gentlest “sensitive skin” product had the most in it',
      duration: '0:47',
    },
  },

  {
    number: '011',
    slug: 'the-curl-routine-file',
    title: 'THE CURL ROUTINE FILE',
    kicker: 'Three steps or nine?',
    question: 'Does a nine-step curly routine actually do more than three steps?',
    category: 'HAIRCARE',
    status: CASE_STATUSES.NEEDS,
    date: '02.05.2026',
    accent: 'cyan',
    tags: ['CURLS', 'ROUTINE', 'HAIR'],
    cover: { kind: 'bottle', color: 'cyan' },
    placeholder: true,
    intro:
      'A three-step routine and a nine-step routine, side by side, same wash day. This case looks at what each step is actually contributing.',
    products: [
      {
        name: 'MINIMAL CURL ROUTINE',
        brand: 'Placeholder brand L',
        category: 'Shampoo, conditioner, cream',
        size: '3 products',
        price: '₹1,100 total',
        info: 'Three steps. No leave-in, no oil, no styling product.',
        ingredients: ['glycerin', 'panthenol'],
        shot: { kind: 'bottle', color: 'cyan' },
        note: 'The three-step baseline.',
      },
      {
        name: 'NINE-STEP ROUTINE',
        brand: 'Placeholder brand M',
        category: 'Nine products',
        size: '9 products',
        price: '₹6,400 total',
        info: 'Nine steps, four of them overlapping in purpose, plus a styling cream and two oils.',
        ingredients: ['glycerin', 'panthenol', 'fragrance'],
        shot: { kind: 'bottle', color: 'lavender' },
        note: 'The nine-step version.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRANDS CLAIM',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: [
        '“The complete curl journey in nine steps.”',
        '“Layering is how you build healthy curls.”',
        '“Every step is essential.”',
      ],
      found: [
        'Four of the nine steps listed conditioning or hydration as their job — the same job. That is not necessarily wrong, but it is not nine different benefits.',
        'The three-step routine performed comparably on wash day and used a third of the products.',
        'Still open: what happens over several months, which is where routine length usually gets justified.',
      ],
    },
    ingredients: ['glycerin', 'panthenol', 'fragrance'],
    experienceIds: ['ev-09', 'ev-05'],
    verdict: {
      label: VERDICTS.NEEDS,
      headline: 'Four of the nine steps were doing the same job.',
      body: 'More steps is not automatically more care. When several products share a job — conditioning, hydrating, sealing — you are usually layering similar things, not adding new ones. The short routine was the better value story on a single wash day. Whether that holds over months is exactly the question this case has not answered yet.',
      bullets: [
        'Established: overlapping job descriptions across steps',
        'Established: three steps matched nine on wash day',
        'Open: multi-week comparison, not yet collected',
      ],
    },
    video: {
      platform: 'Instagram Reel',
      handle: '@theuginvestigator',
      url: '',
      title: '3 steps vs 9 steps for curly hair',
      duration: '0:52',
    },
  },

  {
    number: '012',
    slug: 'do-lip-plumpers-plump',
    title: 'DO LIP PLUMPERS PLUMP?',
    kicker: 'A file on temporary results',
    question: 'Do lip plumping products actually make lips look fuller?',
    category: 'BEAUTY',
    status: CASE_STATUSES.CLOSED,
    date: '21.05.2026',
    accent: 'coral',
    tags: ['LIPS', 'TEMPORARY', 'CLAIM'],
    cover: { kind: 'tube', color: 'coral' },
    placeholder: true,
    intro:
      'Three lip plumping products, one baseline lip balm. The question is simple: is the effect real, how long does it last, and what is it actually doing?',
    products: [
      {
        name: 'PLUMPING GLOSS',
        brand: 'Placeholder brand N',
        category: 'Lip gloss',
        size: '6 ML',
        price: '₹590',
        info: 'Claims “visibly fuller lips in 5 minutes”. Contains a mild irritant-type ingredient near the end of the list.',
        ingredients: ['fragrance', 'glycerin'],
        shot: { kind: 'dropper', color: 'coral' },
        note: 'Fast effect version.',
      },
      {
        name: 'PEPTIDE LIP BALM',
        brand: 'Placeholder brand O',
        category: 'Tinted lip balm',
        size: '4.5 G',
        price: '₹420',
        info: 'Claims “plumping over time”, no immediate effect advertised.',
        ingredients: ['glycerin', 'panthenol'],
        shot: { kind: 'tube', color: 'butter' },
        note: 'Slow version.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRANDS CLAIM',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: ['“Visibly fuller in 5 minutes.”', '“Plumps over time with peptides.”', '“Instant and long-lasting volume.”'],
      found: [
        'The 5-minute effect is immediate and temporary. It fades within the hour, and in this sample the strongest versions also caused the most tingling.',
        'The peptide version showed no obvious change over the observation window — which is too short to call it either way.',
        'A visible, temporary effect is not automatically a bad thing. It is just not a permanent change, and the packaging does not always say so.',
      ],
    },
    ingredients: ['glycerin', 'panthenol', 'fragrance'],
    experienceIds: ['ev-02', 'ev-06'],
    verdict: {
      label: VERDICTS.CLOSED,
      headline: 'Yes — briefly. That is a description, not a benefit.',
      body: 'The plumping products did make lips look fuller for under an hour. The mechanism is a temporary effect, and the strongest one was also the most irritating. Call it what it is: a nice effect for an evening, not a change to the lips themselves.',
      bullets: [
        'Winner for an event: the 5-minute plumper',
        'Not established: any long-term change from the peptide version',
        'Note: strongest temporary effect also produced the most tingling',
      ],
    },
    video: {
      platform: 'Instagram Reel',
      handle: '@theuginvestigator',
      url: '',
      title: 'Do lip plumping products work? (tested for 2 weeks)',
      duration: '0:49',
    },
  },

  {
    number: '013',
    slug: 'sleep-skin-and-the-8-hour-claim',
    title: 'SLEEP, SKIN AND THE “8 HOURS” CLAIM',
    kicker: 'Not a skincare problem',
    question: 'Does an 8-hour sleep cream do what an 8-hour sleep does?',
    category: 'WELLNESS',
    status: CASE_STATUSES.OPEN,
    date: '30.05.2026',
    accent: 'lavender',
    tags: ['SLEEP', 'LIFESTYLE', 'CLAIM'],
    cover: { kind: 'jar', color: 'lavender' },
    placeholder: true,
    intro:
      'A night cream that names itself after sleep, and the actual thing that happens during sleep. This case is mostly about what a product can and cannot borrow from a habit.',
    products: [
      {
        name: '“8 HOUR” NIGHT CREAM',
        brand: 'Placeholder brand P',
        category: 'Night cream',
        size: '50 ML',
        price: '₹1,900',
        info: 'Named after the recommended amount of sleep. Claims to “replicate the benefits of a full night’s sleep”.',
        ingredients: ['ceramides', 'niacinamide', 'retinol', 'fragrance'],
        shot: { kind: 'jar', color: 'lavender' },
        note: 'The borrowed claim.',
      },
      {
        name: 'PLAIN NIGHT MOISTURISER',
        brand: 'Placeholder brand Q',
        category: 'Night moisturiser',
        size: '50 ML',
        price: '₹380',
        info: 'Barrier-focused, unscented, no sleep-related language anywhere.',
        ingredients: ['ceramides', 'glycerin'],
        shot: { kind: 'jar', color: 'cyan' },
        note: 'The control.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRANDS CLAIM',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: ['“Replicates a full night of restorative sleep.”', '“Wake up visibly rested.”', '“Sleep-in-a-jar technology.”'],
      found: [
        'Sleep affects how skin looks. A cream cannot replicate an actual night of sleep, and the front of the bottle borrows that association deliberately.',
        'The unscented control performed identically on hydration. The difference between the two products was the active list, not the name.',
        'Still open: how much of the reported morning glow is the product, the fragrance, and simply going to bed.',
      ],
    },
    ingredients: ['ceramides', 'niacinamide', 'retinol', 'glycerin', 'fragrance'],
    experienceIds: ['ev-03', 'ev-07'],
    verdict: {
      label: VERDICTS.NEEDS,
      headline: 'The product borrowed sleep’s reputation. That is the finding.',
      body: 'This case is still open because the honest answer needs more than two products. What is already clear is the structure of the claim: the name attaches the product to a habit that does most of the work for free. The product’s job is moisturising, and a ₹380 moisturiser does that job. Whether a retinol-containing version is worth more depends on whether you want an active, not on the sleep.',
      bullets: [
        'Established: the claim borrows from a free habit',
        'Established: hydration performance was comparable',
        'Open: separating product effect from fragrance from the actual nap',
      ],
    },
    video: {
      platform: 'YouTube Short',
      handle: '/theuginvestigator',
      url: '',
      title: 'Can a cream replace sleep? An honest investigation',
      duration: '0:55',
    },
  },

  {
    number: '014',
    slug: 'is-toxin-free-meaningless',
    title: 'IS “TOXIN-FREE” MEANINGLESS?',
    kicker: 'Free-from, but not free of thinking',
    question: 'Does “toxin-free” tell you anything useful?',
    category: 'LIFESTYLE',
    status: CASE_STATUSES.NEEDS,
    date: '11.06.2026',
    accent: 'butter',
    tags: ['CLAIM', 'CLEAN', 'LABELS'],
    cover: { kind: 'box', color: 'butter' },
    placeholder: true,
    intro:
      '“Toxin-free”, “chemical-free”, “clean” — a category of labels that describe the absence of something without naming what is present. This case investigates the language itself.',
    products: [
      {
        name: '“TOXIN-FREE” CLEANSER',
        brand: 'Placeholder brand R',
        category: 'Cream cleanser',
        size: '150 ML',
        price: '₹690',
        info: 'Front: “toxin-free”. Back: 22 ingredients, including fragrance and a preservative system.',
        ingredients: ['glycerin', 'fragrance', 'methylparaben'],
        shot: { kind: 'tube', color: 'butter' },
        note: 'The label that names nothing.',
      },
      {
        name: 'PLAIN CREAM CLEANSER',
        brand: 'Placeholder brand S',
        category: 'Cream cleanser',
        size: '150 ML',
        price: '₹240',
        info: 'Front: nothing. Back: seven ingredients, one of them fragrance.',
        ingredients: ['glycerin', 'fragrance'],
        shot: { kind: 'tube', color: 'cyan' },
        note: 'No claim, less to decode.',
      },
    ],
    claims: {
      brandTitle: 'WHAT THE BRANDS CLAIM',
      foundTitle: 'WHAT THE INVESTIGATION FOUND',
      brand: ['“Toxin-free.”', '“Only the good stuff.”', '“Clean beauty, no compromises.”'],
      found: [
        'Every product is made of chemicals. The word does not identify a substance you could check for — so it cannot be verified from the label.',
        'The “toxin-free” product had the longer ingredient list. Naming what is absent took the place of describing what is present.',
        'Still open: whether these labels change consumer behaviour in a measurable way. Being asked on the community.',
      ],
    },
    ingredients: ['fragrance', 'methylparaben', 'glycerin'],
    experienceIds: ['ev-09', 'ev-08'],
    verdict: {
      label: VERDICTS.NEEDS,
      headline: 'A claim you cannot check is a claim that cannot help you.',
      body: '“Toxin-free” does not name a substance, which means it cannot be verified against an ingredient list — you cannot compare it to anything. The most useful label information was on the product with no claim on the front at all. If a label worries you, turn it over and read the back in order.',
      bullets: [
        'Established: the claim names nothing verifiable',
        'Established: the longest list was on the “toxin-free” bottle',
        'Open: what consumers actually buy on the basis of these labels',
      ],
    },
    video: {
      platform: 'TikTok',
      handle: '@theuginvestigator',
      url: '',
      title: '“Toxin-free” — investigating the label',
      duration: '0:46',
    },
  },
];

/** ---------- Lookups and helpers ---------- */

export const caseBySlug = Object.fromEntries(cases.map((c) => [c.slug, c]));

export function getCase(slug) {
  return caseBySlug[slug];
}

export function getCaseByNumber(number) {
  return cases.find((c) => c.number === number);
}

/** Case files that reference a given ingredient slug. Used on ingredient pages. */
export function casesUsingIngredient(slug) {
  return cases.filter((c) => c.ingredients.includes(slug));
}

/** Newest first. */
export function sortByDate(list) {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All categories that actually have at least one case attached. */
export function activeCaseCategories() {
  return CASE_CATEGORIES.filter((cat) => cases.some((c) => c.category === cat));
}