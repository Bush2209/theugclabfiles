import { useMemo, useState } from 'react';
import Reveal from '../components/Reveal';
import CategoryFilter from '../components/CategoryFilter';
import CaseCard from '../components/CaseCard';
import CTA from '../components/CTA';
import PlaceholderNotice from '../components/PlaceholderNotice';
import { CASE_CATEGORIES, CASE_STATUSES, cases, sortByDate } from '../data/cases';
import { CASE_CATEGORY_ACCENT } from '../lib/theme';
import { PlusMark } from '../components/Doodles';

export default function CaseFiles() {
  const [filter, setFilter] = useState('ALL');

  const counts = useMemo(() => {
    const map = { ALL: cases.length };
    CASE_CATEGORIES.forEach((cat) => {
      const n = cases.filter((c) => c.category === cat).length;
      if (n) map[cat] = n;
    });
    return map;
  }, []);

  const visible = useMemo(() => {
    const list = filter === 'ALL' ? cases : cases.filter((c) => c.category === filter);
    return sortByDate(list);
  }, [filter]);

  const open = cases.filter((c) => c.status === CASE_STATUSES.OPEN).length;
  const closed = cases.filter((c) => c.status === CASE_STATUSES.CLOSED).length;
  const needs = cases.filter((c) => c.status === CASE_STATUSES.NEEDS).length;

  return (
    <>
      {/* ---------------- Header ---------------- */}
      <section className="relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab opacity-50 [mask-image:radial-gradient(ellipse_70%_70%_at_40%_0%,#000_20%,transparent_75%)]" />
          <span className="absolute right-8 top-10 text-ink/15">
            <PlusMark className="h-10 w-10" />
          </span>
        </div>

        <div className="section">
          <Reveal>
            <p className="label-mono flex items-center gap-2 text-ink/50">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-lime ring-4 ring-lime/25" />
              The archive
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,9vw,5.8rem)] font-extrabold leading-[0.88] tracking-[-0.035em] text-ink">
              Case files
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 max-w-prose2 text-[17px] leading-relaxed text-ink/70 sm:text-[19px]">
              Products. Claims. Questions. Investigations.
            </p>
          </Reveal>

          {/* Status summary */}
          <Reveal delay={190}>
            <dl className="mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
              {[
                ['UNDER INVESTIGATION', open, 'bg-butter'],
                ['CASE CLOSED', closed, 'bg-lime'],
                ['MORE EVIDENCE NEEDED', needs, 'bg-coral'],
              ].map(([label, value, bg]) => (
                <div
                  key={label}
                  className="rounded-2xl border-2 border-ink/12 bg-white p-4 shadow-card sm:p-5"
                >
                  <dt className="label-mono leading-tight text-ink/45">{label}</dt>
                  <dd className="mt-2 flex items-baseline gap-2">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-lg border-2 border-ink ${bg} font-mono text-sm font-bold`}
                    >
                      {String(value).padStart(2, '0')}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={240} className="mt-8">
            <PlaceholderNotice />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Filters + grid ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-20">
        <div className="section">
          <CategoryFilter
            options={CASE_CATEGORIES}
            value={filter}
            onChange={setFilter}
            counts={counts}
            accentMap={CASE_CATEGORY_ACCENT}
            label="Filter case files"
          />

          <p className="label-mono mt-6 text-ink/40">
            Showing {String(visible.length).padStart(2, '0')} of {String(cases.length).padStart(2, '0')} case files
          </p>

          {visible.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((data, i) => (
                <Reveal key={data.slug} delay={Math.min(i, 5) * 70}>
                  <CaseCard case={data} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border-2 border-dashed border-ink/25 bg-white/60 p-12 text-center">
              <p className="font-display text-xl font-bold text-ink">No case files in this category yet</p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink/60">
                That drawer is empty. Send a question to the lab and it might get opened next.
              </p>
              <button type="button" onClick={() => setFilter('ALL')} className="btn-secondary mt-6">
                Show all cases
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <CTA
        eyebrow="Missing something?"
        title="Add to the archive"
        body="Every case here started as a message from someone with a question. Yours would too."
        primary={{ to: '/submit', label: 'Submit a case' }}
        secondary={{ to: '/ingredients', label: 'Browse ingredients' }}
        tone="butter"
      />
    </>
  );
}