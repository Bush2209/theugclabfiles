import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import InvestigationStep from '../components/InvestigationStep';
import CaseCard from '../components/CaseCard';
import EvidenceCard from '../components/EvidenceCard';
import CTA from '../components/CTA';
import { ArrowCurve, ArrowDown, PlusMark } from '../components/Doodles';
import { processSteps } from '../data/site';
import { cases, sortByDate } from '../data/cases';
import { featuredEvidence } from '../data/evidence';

const STEP_ACCENTS = ['lime', 'butter', 'cyan', 'lavender', 'coral'];

export default function Home() {
  const currentCases = sortByDate(cases).slice(0, 3);

  return (
    <>
      <Hero />

      {/* ---------------- HOW AN INVESTIGATION HAPPENS ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-20 sm:py-28">
        <div className="section">
          <SectionHeading
            label="The method"
            title="How an investigation happens"
            body="Five stages, in the same order, every time. The order is what keeps a case honest — evidence before opinion, verdict before content."
          />

          {/* Desktop: horizontal steps with drawn connectors */}
          <ol className="mt-14 hidden gap-6 lg:flex">
            {processSteps.map((step, i) => (
              <InvestigationStep
                key={step.id}
                step={step}
                index={i}
                accentKey={STEP_ACCENTS[i]}
                last={i === processSteps.length - 1}
              />
            ))}
          </ol>

          {/* Mobile + tablet: vertical notebook timeline */}
          <ol className="mt-10 sm:mt-12 lg:hidden">
            {processSteps.map((step, i) => (
              <InvestigationStep
                key={step.id}
                step={step}
                index={i}
                layout="line"
                accentKey={STEP_ACCENTS[i]}
                last={i === processSteps.length - 1}
              />
            ))}
          </ol>

          <Reveal delay={120} className="mt-12 flex flex-col items-center gap-3 text-center">
            <span aria-hidden="true" className="text-ink/30">
              <ArrowDown length={40} />
            </span>
            <p className="label-mono text-ink/45">Same order. Every case.</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CURRENT CASES ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-20 sm:py-28">
        <div className="section">
          <SectionHeading
            label="On the desk right now"
            title="Currently under investigation"
            body="Three open case files. Each one starts as a question someone actually asked."
            aside={
              <Link to="/case-files" className="btn-secondary">
                All case files
                <span aria-hidden="true">→</span>
              </Link>
            }
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentCases.map((data, i) => (
              <Reveal key={data.slug} delay={i * 90}>
                <CaseCard case={data} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span aria-hidden="true" className="hidden text-ink/25 sm:block">
              <ArrowCurve />
            </span>
            <p className="label-mono text-ink/40">More evidence welcome on all three</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PEOPLE'S EVIDENCE ---------------- */}
      <section className="relative overflow-hidden rule border-t-2 border-ink/12 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-butter/10" />
          <div className="absolute right-10 top-16 text-ink/10">
            <PlusMark className="h-12 w-12" />
          </div>
        </div>

        <div className="section">
          <SectionHeading
            label="Submitted evidence"
            title="The people&rsquo;s evidence"
            body="One experience isn&rsquo;t the whole story. But it&rsquo;s always evidence, and it always goes into the file."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredEvidence.map((note, i) => (
              <Reveal key={note.id} delay={i * 90}>
                <EvidenceCard note={note} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={260} className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-white p-7 shadow-card sm:p-10">
              <div className="pointer-events-none absolute inset-0 grid-lab-soft opacity-60" aria-hidden="true" />
              <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="label-mono text-ink/45">Add your experience</p>
                  <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-ink/70">
                    Used a product? Kept a note? Send it in. Your report sits next to everyone
                    else&rsquo;s &mdash; same formatting, same weight, no paid placements.
                  </p>
                </div>
                <Link to="/submit" className="btn-primary shrink-0">
                  Add your experience
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <CTA
        eyebrow="Case intake open"
        title="Got a question?"
        body="Send it to the lab. Products, ingredients, brand claims, comparisons, or a lifestyle question nobody has properly explained yet."
        primary={{ to: '/submit', label: 'Submit a case' }}
        secondary={{ to: '/lab', label: 'See how the lab works' }}
        tone="lavender"
        align="center"
      />
    </>
  );
}