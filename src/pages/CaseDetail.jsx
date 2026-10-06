import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import StatusBadge from '../components/StatusBadge';
import VerdictBadge from '../components/VerdictBadge';
import ProductCard from '../components/ProductCard';
import EvidenceCard from '../components/EvidenceCard';
import IngredientTag from '../components/IngredientTag';
import InvestigationStep from '../components/InvestigationStep';
import PlaceholderNotice, { SourceStatus } from '../components/PlaceholderNotice';
import { ArrowDown, StampSeal, SealSlash, Squiggle } from '../components/Doodles';
import { cases, getCase, sortByDate } from '../data/cases';
import { ingredientBySlug } from '../data/ingredients';
import { evidenceForCase } from '../data/evidence';
import { accent, CASE_CATEGORY_ACCENT } from '../lib/theme';

const EVIDENCE_SECTIONS = [
  { id: 'evidence-01', label: '01 · Products' },
  { id: 'evidence-02', label: '02 · Claims' },
  { id: 'evidence-03', label: '03 · Ingredients' },
  { id: 'evidence-04', label: '04 · Experiences' },
  { id: 'evidence-05', label: '05 · Investigation' },
];

export default function CaseDetail() {
  const { slug } = useParams();
  const data = getCase(slug);

  const siblings = useMemo(() => {
    const list = sortByDate(cases);
    const i = list.findIndex((c) => c.slug === slug);
    return { prev: list[i + 1] ?? null, next: list[i - 1] ?? null };
  }, [slug]);

  if (!data) return <Navigate to="/case-files" replace />;

  const a = accent(data.accent ?? CASE_CATEGORY_ACCENT[data.category]);
  const notes = evidenceForCase(data.slug);
  const usedIngredients = data.ingredients.map((s) => ingredientBySlug[s]).filter(Boolean);

  return (
    <article>
      {/* ---------------- Header ---------------- */}
      <header className="relative overflow-hidden border-b-2 border-ink pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab opacity-50 [mask-image:radial-gradient(ellipse_80%_80%_at_60%_0%,#000_20%,transparent_78%)]" />
          <span className={`absolute -right-20 -top-24 h-72 w-72 rounded-full ${a.bg} opacity-25 blur-3xl`} />
        </div>

        <div className="section">
          <Reveal>
            <nav aria-label="Breadcrumb" className="label-mono flex flex-wrap items-center gap-2 text-ink/45">
              <Link to="/" className="transition-colors hover:text-ink">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/case-files" className="transition-colors hover:text-ink">
                Case files
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">#{data.number}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <Reveal delay={60}>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border-2 border-ink ${a.bg} px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.14em] text-ink`}
                  >
                    CASE FILE #{data.number}
                  </span>
                  {data.kicker ? (
                    <span className="font-hand text-[22px] leading-none text-ink/60">{data.kicker}</span>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={110}>
                <h1 className="mt-6 font-display text-[clamp(2.3rem,7.4vw,4.6rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-ink">
                  {data.title}
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <blockquote className="relative mt-7 inline-block">
                  <p className="font-display text-[clamp(1.15rem,3vw,1.6rem)] font-semibold leading-snug text-ink/80">
                    &ldquo;{data.question}&rdquo;
                  </p>
                  <span aria-hidden="true" className="mt-3 block h-3 w-40 text-lime">
                    <Squiggle />
                  </span>
                </blockquote>
              </Reveal>
            </div>

            {/* Metadata card */}
            <Reveal delay={210} from="left">
              <div className={`relative rounded-3xl border-2 border-ink bg-white p-6 shadow-card ${a.border}`}>
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl ${a.bg}`} />
                <p className="label-mono text-ink/40">Case metadata</p>

                <dl className="mt-5 space-y-4">
                  {[
                    ['CATEGORY', data.category],
                    ['STATUS', null], // rendered below
                    ['DATE', data.date],
                    ['PLATFORM', data.video.platform],
                  ].map(([term, value]) => (
                    <div key={term} className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3 last:border-0">
                      <dt className="label-mono text-ink/40">{term}</dt>
                      <dd className="text-right font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-end gap-3 pt-1">
                    <StatusBadge status={data.status} meaning />
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t-2 border-ink/10 pt-5">
                  {data.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/55"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={260} className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <p className="max-w-prose2 text-[16px] leading-relaxed text-ink/70 sm:text-[17px]">{data.intro}</p>
            <PlaceholderNotice className="lg:mt-0" />
          </Reveal>
        </div>
      </header>

      {/* ---------------- Evidence jump nav ---------------- */}
      <nav
        aria-label="Case file sections"
        className="sticky top-[68px] z-40 border-b-2 border-ink/12 bg-ivory/92 backdrop-blur-md lg:top-[76px]"
      >
        <div className="section">
          <ul className="-mx-5 flex snap-x gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {EVIDENCE_SECTIONS.map((s) => (
              <li key={s.id} className="shrink-0 snap-start">
                <a
                  href={`#${s.id}`}
                  className="block whitespace-nowrap border-b-2 border-transparent py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.13em] text-ink/55 transition-colors hover:border-ink hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ---------------- EVIDENCE 01 · PRODUCTS ---------------- */}
      <EvidenceSection
        id="evidence-01"
        index="01"
        title="The products"
        kicker="Evidence A"
        intro="Everything that was on the desk while this case was open. Names, prices and photos are placeholders in this build."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.products.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </EvidenceSection>

      {/* ---------------- EVIDENCE 02 · CLAIMS ---------------- */}
      <EvidenceSection
        id="evidence-02"
        index="02"
        title="The claims"
        kicker="Evidence B"
        intro="Left side is what the packaging says. Right side is what the investigation found. Where they disagree, the disagreement is the interesting part."
        tone="butter"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Brand claims */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border-2 border-ink bg-white p-6 shadow-card sm:p-8">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-coral" />
              <div className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-coral">
                  <SealSlash />
                </span>
                <h3 className="label-mono text-ink">{data.claims.brandTitle}</h3>
              </div>

              <ul className="mt-6 space-y-4">
                {data.claims.brand.map((claim) => (
                  <li key={claim} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.55em] h-2 w-2 rounded-full bg-coral"
                    />
                    <p className="font-display text-[17px] font-semibold leading-snug text-ink sm:text-[19px]">
                      {claim}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="label-mono mt-7 border-t-2 border-ink/10 pt-4 text-ink/40">
                Source · product packaging
              </p>
            </div>
          </Reveal>

          {/* Investigation findings */}
          <Reveal delay={110}>
            <div className="relative h-full overflow-hidden rounded-3xl border-2 border-ink bg-white p-6 shadow-card sm:p-8">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-lime" />
              <div className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-lime">
                  <StampSeal />
                </span>
                <h3 className="label-mono text-ink">{data.claims.foundTitle}</h3>
              </div>

              <ul className="mt-6 space-y-4">
                {data.claims.found.map((finding) => (
                  <li key={finding} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.55em] h-2 w-2 rounded-full bg-lime"
                    />
                    <p className="text-[15px] leading-relaxed text-ink/75">{finding}</p>
                  </li>
                ))}
              </ul>

              <p className="label-mono mt-7 border-t-2 border-ink/10 pt-4 text-ink/40">
                Source · observation &amp; label reading
              </p>
            </div>
          </Reveal>
        </div>

        {/* The disagreement callout */}
        <Reveal delay={180} className="mt-6">
          <div className="relative rounded-3xl border-2 border-dashed border-ink/30 bg-butter/25 p-6 sm:p-7">
            <p className="label-mono text-ink/55">Lab note</p>
            <p className="mt-2 max-w-prose2 text-[15.5px] leading-relaxed text-ink/70">
              A brand claim is not a fact. It is a starting position. Until it is checked against
              the label and against what people report, it stays labelled as a claim.
            </p>
          </div>
        </Reveal>
      </EvidenceSection>

      {/* ---------------- EVIDENCE 03 · INGREDIENTS ---------------- */}
      <EvidenceSection
        id="evidence-03"
        index="03"
        title="Ingredients in this file"
        kicker="Evidence C"
        intro="Only the names that came up while investigating this case. Each one links to its full profile in the ingredient database."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {usedIngredients.map((ing, i) => {
            const foundIn = data.products.filter((p) => p.ingredients?.includes(ing.slug));
            return (
              <Reveal key={ing.slug} delay={i * 60}>
                <Link
                  to={`/ingredients/${ing.slug}`}
                  className="group flex h-full flex-col rounded-3xl border-2 border-ink/12 bg-white p-6
                    shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift"
                >
                  <header className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label-mono text-ink/45">{ing.id}</p>
                      <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-ink">
                        {ing.name}
                      </h3>
                      <p className="mt-0.5 font-sans text-[13px] font-semibold text-ink/55">{ing.aka}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 rounded-full border-2 border-ink px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink ${accent(ing.color).bg}`}
                    >
                      {ing.category}
                    </span>
                  </header>

                  <p className="mt-4 line-clamp-3 text-[14.5px] leading-relaxed text-ink/70">
                    {ing.whatIsIt}
                  </p>

                  <div className="mt-auto pt-5">
                    {foundIn.length ? (
                      <>
                        <p className="label-mono text-ink/40">
                          Found in {foundIn.length} product{foundIn.length > 1 ? 's' : ''} in this file
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {foundIn.map((p) => (
                            <span
                              key={p.name}
                              className="rounded-full bg-ivory px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink/60"
                            >
                              {p.name}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="label-mono text-ink/40">Referenced during research</p>
                    )}

                    <span className="mt-4 inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-ink">
                      Open ingredient file
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className="mt-6 flex flex-wrap items-center gap-3">
          <span className="label-mono text-ink/45">Full profiles</span>
          <div className="flex flex-wrap gap-2">
            {data.ingredients.map((s) => (
              <IngredientTag key={s} slug={s} />
            ))}
          </div>
        </Reveal>
      </EvidenceSection>

      {/* ---------------- EVIDENCE 04 · EXPERIENCES ---------------- */}
      <EvidenceSection
        id="evidence-04"
        index="04"
        title="Real experiences"
        kicker="Evidence D"
        intro="Reports submitted by the audience. None of them are proof — together they show what actually happens when real people use these products."
      >
        {notes.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, i) => (
              <Reveal key={note.id} delay={i * 70}>
                <EvidenceCard note={note} index={i} showCase={false} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-ink/25 bg-white/60 p-10 text-center">
            <p className="font-display text-lg font-bold text-ink">No reports attached yet</p>
            <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink/60">
              This case is waiting on audience evidence. If you have used any of these products,
              that is exactly what this file is missing.
            </p>
          </div>
        )}

        <Reveal delay={160} className="mt-6">
          <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-cyan p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 dot-lab opacity-40" aria-hidden="true" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label-mono text-ink/60">Used one of these?</p>
                <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-ink/75">
                  Add your experience to this case file. Dry, oily, broke out, no change at all —
                  all of it is evidence.
                </p>
              </div>
              <Link to="/submit" className="btn-ink shrink-0">
                Add your experience
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </EvidenceSection>

      {/* ---------------- EVIDENCE 05 · INVESTIGATION ---------------- */}
      <EvidenceSection
        id="evidence-05"
        index="05"
        title="The investigation"
        kicker="Evidence E"
        intro="The route from question to verdict, in the order it happened."
      >
        <ol className="max-w-3xl">
          {(data.process ?? []).map((step, i) => (
            <InvestigationStep
              key={step.title}
              step={{ ...step, id: String(i + 1).padStart(2, '0') }}
              index={i}
              layout="line"
              accentKey={data.accent ?? CASE_CATEGORY_ACCENT[data.category]}
              last={i === (data.process?.length ?? 0) - 1}
            />
          ))}
        </ol>
      </EvidenceSection>

      {/* ---------------- FINAL VERDICT ---------------- */}
      <section className="relative overflow-hidden border-y-2 border-ink bg-ink py-16 text-ivory sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,249,238,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,249,238,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
          <span className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-lime/20 blur-3xl" />
        </div>

        <div className="section relative">
          <Reveal className="flex flex-col items-center text-center">
            <p className="label-mono text-ivory/55">Final verdict</p>
            <div className="mt-5">
              <VerdictBadge label={data.verdict.label} size="lg" />
            </div>

            <h2 className="mt-8 max-w-4xl font-display text-[clamp(1.9rem,5.4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ivory">
              {data.verdict.headline}
            </h2>

            <p className="mt-7 max-w-prose2 text-[16.5px] leading-relaxed text-ivory/75 sm:text-[18px]">
              {data.verdict.body}
            </p>
          </Reveal>

          {/* Verdict breakdown */}
          <Reveal delay={120} className="mx-auto mt-12 max-w-3xl">
            <ul className="grid gap-3 sm:grid-cols-2">
              {data.verdict.bullets.map((b) => {
                const open = /open|not established|needs/i.test(b);
                return (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-2xl border-2 border-ivory/20 bg-ivory/5 p-4 backdrop-blur-[1px]"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ivory/50 font-mono text-[9px] ${
                        open ? 'text-coral' : 'text-lime'
                      }`}
                    >
                      {open ? '▲' : '●'}
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-ivory/80">{b}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Watch the investigation */}
          <Reveal delay={180} className="mx-auto mt-12 max-w-3xl">
            <div className="overflow-hidden rounded-3xl border-2 border-ivory/25 bg-ivory/5">
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="min-w-0">
                  <p className="label-mono text-ivory/50">
                    {data.video.platform} · {data.video.handle} · {data.video.duration}
                  </p>
                  <p className="mt-2 font-display text-xl font-bold leading-tight text-ivory">
                    {data.video.title}
                  </p>
                </div>
                {data.video.url ? (
                  <a
                    href={data.video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn border-2 border-ivory bg-lime text-ink hover:-translate-y-0.5 hover:shadow-lift shrink-0"
                  >
                    Watch the full investigation
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <div className="w-full max-w-xs shrink-0 rounded-2xl border-2 border-dashed border-ivory/25 p-4">
                    <p className="label-mono text-ivory/40">Video not linked</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory/60">
                      Paste the post URL into <code className="font-mono text-ivory/85">video.url</code> for case #
                      {data.number}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={220} className="mt-8 flex justify-center">
            <SourceStatus count={0} className="text-ivory/45" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Sibling cases ---------------- */}
      <section className="py-16 sm:py-20">
        <div className="section">
          <div className="grid gap-4 sm:grid-cols-2">
            {siblings.prev ? (
              <Link
                to={`/case-files/${siblings.prev.slug}`}
                className="group flex items-center gap-4 rounded-2xl border-2 border-ink/12 bg-white p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card"
              >
                <span aria-hidden="true" className="font-mono text-lg text-ink/30 transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                <span className="min-w-0">
                  <span className="label-mono block text-ink/40">Older case · #{siblings.prev.number}</span>
                  <span className="mt-0.5 block truncate font-display text-[15px] font-bold text-ink">
                    {siblings.prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}

            {siblings.next ? (
              <Link
                to={`/case-files/${siblings.next.slug}`}
                className="group flex items-center justify-end gap-4 rounded-2xl border-2 border-ink/12 bg-white p-5 text-right transition-all duration-400 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card"
              >
                <span className="min-w-0">
                  <span className="label-mono block text-ink/40">Newer case · #{siblings.next.number}</span>
                  <span className="mt-0.5 block truncate font-display text-[15px] font-bold text-ink">
                    {siblings.next.title}
                  </span>
                </span>
                <span aria-hidden="true" className="font-mono text-lg text-ink/30 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <span aria-hidden="true" className="text-ink/25">
              <ArrowDown length={34} />
            </span>
            <p className="label-mono text-ink/45">End of file #{data.number}</p>
          </div>
        </div>
      </section>
    </article>
  );
}

/** Shared wrapper for each numbered evidence block. */
function EvidenceSection({ id, index, title, kicker, intro, tone, children }) {
  const toneAccent = { butter: 'bg-butter', coral: 'bg-coral', lime: 'bg-lime', cyan: 'bg-cyan', lavender: 'bg-lavender' };
  const bg = tone ? toneAccent[tone] : 'bg-lime';

  return (
    <section id={id} className="rule scroll-mt-28 border-t-2 border-ink/12 py-16 sm:py-24">
      <div className="section">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="label-mono flex items-center gap-3 text-ink/45">
              <span className={`inline-block h-8 w-1.5 rounded-full ${bg}`} />
              {kicker}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
              <span className="label-mono mr-3 align-middle text-ink/30">EVIDENCE {index}</span>
              {title}
            </h2>
          </div>
          <p className="max-w-sm text-[14.5px] leading-relaxed text-ink/60">{intro}</p>
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}