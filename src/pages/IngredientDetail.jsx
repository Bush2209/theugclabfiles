import { Link, Navigate, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import VerdictBadge from '../components/VerdictBadge';
import CaseCard from '../components/CaseCard';
import CTA from '../components/CTA';
import IngredientTag from '../components/IngredientTag';
import PlaceholderNotice, { SourceStatus } from '../components/PlaceholderNotice';
import { Squiggle, CheckMark, PlusMark, DotMark } from '../components/Doodles';
import { ingredientBySlug, ingredients } from '../data/ingredients';
import { casesUsingIngredient } from '../data/cases';
import { accent, INGREDIENT_CATEGORY_ACCENT } from '../lib/theme';

/** Positions around the relationship map, in percent. */
/**
 * Node positions around the map, in percent. Only the first N are used, and
 * N adapts to how many partners there are, so a 2-node ingredient does not
 * end up with two lonely nodes on a wide empty canvas.
 */
const NODE_POS = {
  1: [{ x: 50, y: 8 }],
  2: [
    { x: 50, y: 10 },
    { x: 50, y: 88 },
  ],
  3: [
    { x: 50, y: 8 },
    { x: 84, y: 74 },
    { x: 16, y: 74 },
  ],
  4: [
    { x: 50, y: 6 },
    { x: 86, y: 34 },
    { x: 86, y: 72 },
    { x: 50, y: 92 },
  ],
  5: [
    { x: 50, y: 5 },
    { x: 88, y: 26 },
    { x: 88, y: 68 },
    { x: 50, y: 92 },
    { x: 12, y: 68 },
  ],
  6: [
    { x: 50, y: 4 },
    { x: 89, y: 27 },
    { x: 86, y: 70 },
    { x: 50, y: 93 },
    { x: 14, y: 70 },
    { x: 11, y: 27 },
  ],
};

/** Keeps a node fully inside the canvas at any size. */
function nodePos(i, total) {
  const set = NODE_POS[Math.min(total, 6)];
  return set[i] ?? set[set.length - 1];
}

export default function IngredientDetail() {
  const { slug } = useParams();
  const ing = ingredientBySlug[slug];

  if (!ing) return <Navigate to="/ingredients" replace />;

  const a = accent(ing.color ?? INGREDIENT_CATEGORY_ACCENT[ing.category]);
  const partners = ing.pairsWith.map((s) => ingredientBySlug[s]).filter(Boolean);
  const related = casesUsingIngredient(slug);
  const siblings = [...ingredients];
  const i = siblings.findIndex((x) => x.slug === slug);
  const prev = siblings[(i - 1 + siblings.length) % siblings.length];
  const next = siblings[(i + 1) % siblings.length];

  const INVESTIGATION = [
    {
      label: 'What brands say',
      tone: 'coral',
      items: ing.brandsSay,
      note: 'Copy taken from product packaging and product pages.',
    },
    {
      label: 'What the evidence suggests',
      tone: 'lime',
      items: ing.evidence,
      note: 'Placeholder summary. Add real, cited sources before publishing.',
    },
    {
      label: 'What people report',
      tone: 'cyan',
      items: ing.peopleReport,
      note: 'Audience reports submitted through SUBMIT A CASE.',
    },
  ];

  return (
    <article>
      {/* ---------------- Header ---------------- */}
      <header className="relative overflow-hidden border-b-2 border-ink pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab opacity-50 [mask-image:radial-gradient(ellipse_80%_80%_at_60%_0%,#000_20%,transparent_78%)]" />
          <span className={`absolute -right-16 -top-24 h-72 w-72 rounded-full ${a.bg} opacity-25 blur-3xl`} />
        </div>

        <div className="section">
          <Reveal>
            <nav aria-label="Breadcrumb" className="label-mono flex flex-wrap items-center gap-2 text-ink/45">
              <Link to="/" className="transition-colors hover:text-ink">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/ingredients" className="transition-colors hover:text-ink">Ingredients</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">{ing.id}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <Reveal delay={60}>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border-2 border-ink ${a.bg} px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.14em] text-ink`}
                >
                  {ing.id}
                </span>
              </Reveal>

              <Reveal delay={110}>
                <h1 className="mt-6 font-display text-[clamp(2.3rem,7.6vw,4.8rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink">
                  {ing.name}
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-5 font-display text-[clamp(1.15rem,3vw,1.7rem)] font-semibold leading-snug text-ink/70">
                  {ing.aka}
                </p>
                <p className="mt-3 max-w-prose2 text-[15.5px] leading-relaxed text-ink/65">
                  {ing.akaSub}
                </p>
              </Reveal>

              <Reveal delay={210}>
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  {ing.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border-2 border-ink/15 bg-white px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em] text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Verdict card */}
            <Reveal delay={240} from="left">
              <div className={`relative overflow-hidden rounded-3xl border-2 border-ink bg-white p-6 shadow-card ${a.border}`}>
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${a.bg}`} />
                <p className="label-mono text-ink/40">Lab verdict</p>
                <div className="mt-4">
                  <VerdictBadge label={ing.verdict.label} size="lg" />
                </div>
                <p className="mt-5 text-[14.5px] leading-relaxed text-ink/70">{ing.verdict.note}</p>
                <div className="mt-6 border-t-2 border-ink/10 pt-5">
                  <p className="label-mono text-ink/40">Category</p>
                  <p className="mt-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-ink">
                    {ing.category}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---------------- WHAT IS IT / USED FOR / FOUND IN ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-20">
        <div className="section">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <InfoCard index="01" title="What is it?">
                <p>{ing.whatIsIt}</p>
              </InfoCard>
            </Reveal>
            <Reveal delay={90}>
              <InfoCard index="02" title="What is it commonly used for?">
                <p>{ing.usedFor}</p>
              </InfoCard>
            </Reveal>
          </div>

          {/* Where you'll find it */}
          <Reveal delay={120} className="mt-6">
            <div className="relative overflow-hidden rounded-3xl border-2 border-ink/12 bg-white p-6 shadow-card sm:p-8">
              <div className="pointer-events-none absolute inset-0 dot-lab opacity-30" aria-hidden="true" />
              <div className="relative">
                <p className="label-mono text-ink/45">
                  <span className="label-mono mr-2 text-ink/30">03</span>
                  Where will you find it?
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {ing.foundIn.map((f) => (
                    <span
                      key={f}
                      className="rounded-xl border-2 border-ink/15 bg-ivory px-4 py-2.5 font-sans text-[14px] font-medium text-ink"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <span aria-hidden="true" className="mt-6 block h-4 w-44 text-ink/25">
                  <DotMark />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Fun fact sticky note */}
          {ing.funFact ? (
            <Reveal delay={180} className="mt-6">
              <div className={`note ${a.bg} rotate-[-0.8deg] sm:max-w-lg`}>
                <p className="label-mono text-ink/55">Lab scrapbook</p>
                <p className="mt-1.5 text-[22px] leading-tight">{ing.funFact}</p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ---------------- COMMONLY PAIRED WITH ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-24">
        <div className="section">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-mono text-ink/45">
                <span className="mr-2 text-ink/30">04</span>
                Commonly paired with
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,4.6vw,2.8rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink">
                Where you&rsquo;ll meet it on a label
              </h2>
            </div>
            <p className="max-w-sm text-[14.5px] leading-relaxed text-ink/60">
              Formulas are teams. These are the names most often sitting next to{' '}
              {ing.name.toLowerCase()} in the same product.
            </p>
          </Reveal>

          {partners.length ? (
            <>
              {/* Desktop map */}
              <Reveal delay={100} className="mt-12 hidden lg:block">
                <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl">
                  {/* connectors */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    {partners.slice(0, 6).map((p, i) => {
                      const pos = nodePos(i, partners.length);
                      return (
                        <line
                          key={p.slug}
                          x1="50"
                          y1="50"
                          x2={pos.x}
                          y2={pos.y}
                          stroke="rgba(32,35,31,0.28)"
                          strokeWidth="2"
                          strokeDasharray="5 5"
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}
                    <circle cx="50" cy="50" r="3" fill="rgba(32,35,31,0.18)" />
                  </svg>

                  {/* centre node */}
                  <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`rounded-2xl border-2 border-ink ${a.bg} px-6 py-4 text-center shadow-lift`}
                    >
                      <p className="label-mono text-ink/55">You are here</p>
                      <p className="mt-1 font-display text-lg font-extrabold text-ink">{ing.name}</p>
                    </div>
                  </div>

                  {/* partner nodes */}
                  {partners.slice(0, 6).map((p, i) => {
                    const pos = nodePos(i, partners.length);
                    return (
                      <Link
                        key={p.slug}
                        to={`/ingredients/${p.slug}`}
                        className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      >
                        <span className="block whitespace-nowrap rounded-xl border-2 border-ink bg-white px-4 py-3 text-center shadow-card transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-lime group-hover:shadow-lift">
                          <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.11em] text-ink">
                            {p.name}
                          </span>
                          <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.1em] text-ink/45">
                            {p.category}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </Reveal>

              {/* Mobile list */}
              <Reveal delay={100} className="mt-10 lg:hidden">
                <div className="rounded-3xl border-2 border-ink/12 bg-white p-6">
                  <div className={`rounded-2xl border-2 border-ink ${a.bg} px-5 py-4 text-center`}>
                    <p className="label-mono text-ink/55">You are here</p>
                    <p className="mt-1 font-display text-lg font-extrabold text-ink">{ing.name}</p>
                  </div>

                  <span aria-hidden="true" className="mx-auto my-4 block h-8 w-px bg-ink/25" />

                  <ul className="space-y-2.5">
                    {partners.map((p) => (
                      <li key={p.slug}>
                        <IngredientTag slug={p.slug} size="lg" className="w-full justify-center" />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal delay={100} className="mt-10 rounded-3xl border-2 border-dashed border-ink/25 p-10 text-center">
              <p className="font-display text-lg font-bold text-ink">No pairings logged yet</p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink/60">
                Nothing has been logged alongside {ing.name} in the database so far.
              </p>
            </Reveal>
          )}

          {/* Mentioned but not documented */}
          {ing.alsoMentioned?.length ? (
            <Reveal delay={160} className="mt-8">
              <div className="rounded-2xl border-2 border-dashed border-ink/25 bg-white/70 p-5">
                <p className="label-mono text-ink/45">Often nearby · not yet profiled</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ing.alsoMentioned.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/50"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ---------------- THE INVESTIGATION ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-24">
        <div className="section">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-mono text-ink/45">
                <span className="mr-2 text-ink/30">05</span>
                The investigation
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,4.6vw,2.8rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink">
                Three versions of the same ingredient
              </h2>
            </div>
            <SourceStatus count={ing.sources.length} />
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {INVESTIGATION.map((block, i) => {
              const tone = {
                coral: 'bg-coral',
                lime: 'bg-lime',
                cyan: 'bg-cyan',
              }[block.tone];
              return (
                <Reveal key={block.label} delay={i * 90}>
                  <div className="flex h-full flex-col rounded-3xl border-2 border-ink/12 bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                    <span aria-hidden="true" className={`h-2 w-14 rounded-full ${tone}`} />
                    <h3 className="label-mono mt-5 text-ink">{block.label}</h3>
                    <ul className="mt-5 flex-1 space-y-4">
                      {block.items.map((item) => (
                        <li key={item} className="relative pl-5">
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-ink/35"
                          />
                          <p className="text-[14.5px] leading-relaxed text-ink/75">{item}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="label-mono mt-6 border-t-2 border-ink/10 pt-4 text-ink/40">{block.note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Neutral verdict */}
          <Reveal delay={200} className="mt-8">
            <div className={`relative overflow-hidden rounded-3xl border-2 border-ink ${a.bg} p-7 sm:p-10`}>
              <div className="pointer-events-none absolute inset-0 grid-lab opacity-25" aria-hidden="true" />
              <div className="relative">
                <p className="label-mono text-ink/55">Verdict</p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,3.8vw,2.3rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink">
                  {ing.verdict.label}
                </h3>
                <p className="mt-4 max-w-prose2 text-[16px] leading-relaxed text-ink/75">{ing.verdict.note}</p>

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t-2 border-ink/15 pt-6">
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em] text-ink">
                    <CheckMark className="h-3.5 w-3.5" />
                    No medical claims made
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em] text-ink">
                    <PlusMark className="h-3.5 w-3.5" />
                    {ing.sources.length ? `${ing.sources.length} sources cited` : 'Sources still to be added'}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240} className="mt-6">
            <PlaceholderNotice />
          </Reveal>
        </div>
      </section>

      {/* ---------------- RELATED CASES ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-24">
        <div className="section">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-mono text-ink/45">
                <span className="mr-2 text-ink/30">06</span>
                Connected investigations
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,4.6vw,2.8rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink">
                Cases involving {ing.name.toLowerCase()}
              </h2>
            </div>
            <Link to="/case-files" className="btn-secondary shrink-0">
              All case files
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          {related.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={i * 80}>
                  <CaseCard case={c} as="h3" />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={100} className="mt-10 rounded-3xl border-2 border-dashed border-ink/25 p-10 text-center">
              <p className="font-display text-lg font-bold text-ink">
                No case files reference this yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink/60">
                {ing.name} is in the database but has not come up in a published investigation.
                That is usually where the next case starts.
              </p>
              <Link to="/submit" className="btn-primary mt-6">
                Suggest a case
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          )}

          {/* Ingredient paging */}
          <Reveal delay={160} className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              to={`/ingredients/${prev.slug}`}
              className="group flex items-center gap-4 rounded-2xl border-2 border-ink/12 bg-white p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card"
            >
              <span aria-hidden="true" className="font-mono text-lg text-ink/30 transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              <span className="min-w-0">
                <span className="label-mono block text-ink/40">Previous entry</span>
                <span className="mt-0.5 block truncate font-display text-[15px] font-bold text-ink">
                  {prev.name}
                </span>
              </span>
            </Link>

            <Link
              to={`/ingredients/${next.slug}`}
              className="group flex items-center justify-end gap-4 rounded-2xl border-2 border-ink/12 bg-white p-5 text-right transition-all duration-400 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card"
            >
              <span className="min-w-0">
                <span className="label-mono block text-ink/40">Next entry</span>
                <span className="mt-0.5 block truncate font-display text-[15px] font-bold text-ink">
                  {next.name}
                </span>
              </span>
              <span aria-hidden="true" className="font-mono text-lg text-ink/30 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>

          <span aria-hidden="true" className="mx-auto mt-12 block h-4 w-52 text-ink/25">
            <Squiggle />
          </span>
        </div>
      </section>

      <CTA
        eyebrow="Something missing?"
        title="Ask about this ingredient"
        body="If a claim on a label does not add up, send it in. Ingredient questions make the best case files."
        primary={{ to: '/submit', label: 'Submit a case' }}
        secondary={{ to: '/ingredients', label: 'Back to the database' }}
        tone="lavender"
      />
    </article>
  );
}

function InfoCard({ index, title, children }) {
  return (
    <div className="h-full rounded-3xl border-2 border-ink/12 bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-8">
      <p className="label-mono text-ink/45">
        <span className="mr-2 text-ink/30">{index}</span>
        {title}
      </p>
      <div className="mt-4 text-[16px] leading-relaxed text-ink/75">{children}</div>
    </div>
  );
}