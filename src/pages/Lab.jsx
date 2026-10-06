import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import InvestigationStep from '../components/InvestigationStep';
import CTA from '../components/CTA';
import { CrossMark, CheckMark, PlusMark, DotMark, Squiggle } from '../components/Doodles';
import { labSteps, transparencyRules } from '../data/site';
import { processSteps } from '../data/site';

const STEP_ACCENTS = ['lime', 'butter', 'cyan', 'lavender', 'coral', 'butter'];

export default function Lab() {
  return (
    <>
      {/* ---------------- Header ---------------- */}
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab opacity-60 [mask-image:radial-gradient(ellipse_75%_70%_at_45%_0%,#000_20%,transparent_78%)]" />
          <span className="absolute right-12 top-16 text-ink/12">
            <PlusMark className="h-10 w-10" />
          </span>
        </div>

        <div className="section">
          <Reveal>
            <p className="label-mono flex items-center gap-2 text-ink/50">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-lavender ring-4 ring-lavender/25" />
              Methodology
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,9vw,5.8rem)] font-extrabold leading-[0.88] tracking-[-0.035em] text-ink">
              The lab
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 max-w-prose2 text-[17px] leading-relaxed text-ink/70 sm:text-[19px]">
              Where questions become investigations.
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-8">
            <p className="max-w-prose2 border-l-2 border-ink pl-5 text-[16px] leading-relaxed text-ink/65 sm:text-[17px]">
              Every video starts with a question someone actually asked. This page is the part of
              the site that explains what happens to it after that — the order, the rules, and the
              things we deliberately refuse to do.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Methodology ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-24">
        <div className="section">
          <SectionHeading
            label="The notebook"
            title="Six steps, every time"
            body="The order is the method. Changing it would be the easiest way to end up making content instead of investigations."
          />

          {/* Desktop: two-column notebook grid with connectors */}
          <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {labSteps.map((step, i) => (
              <InvestigationStep
                key={step.id}
                step={step}
                index={i}
                layout="row"
                accentKey={STEP_ACCENTS[i]}
              />
            ))}
          </ol>

          {/* Mobile: single column timeline */}
          <ol className="mt-10 md:hidden">
            {labSteps.map((step, i) => (
              <InvestigationStep
                key={step.id}
                step={{ ...step, note: step.body }}
                index={i}
                layout="line"
                accentKey={STEP_ACCENTS[i]}
                last={i === labSteps.length - 1}
              />
            ))}
          </ol>

          <Reveal delay={140} className="mt-12 flex justify-center">
            <span aria-hidden="true" className="h-4 w-56 text-ink/25">
              <Squiggle />
            </span>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Shorthand version ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-20">
        <div className="section">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <h2 className="font-display text-[clamp(1.7rem,4.4vw,2.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
                The five-word version
              </h2>
              <p className="mt-4 max-w-prose2 text-[15.5px] leading-relaxed text-ink/65">
                If you only remember one thing about how this works, remember this line. It is the
                whole method compressed into five words — and it is what every short-form video is
                built from.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/case-files" className="btn-secondary">
                  See it applied
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ol className="grid gap-2.5 sm:grid-cols-2">
                {processSteps.map((step, i) => (
                  <li
                    key={step.id}
                    className="flex items-center gap-4 rounded-2xl border-2 border-ink/12 bg-white px-4 py-4"
                  >
                    <span className="label-mono shrink-0 text-ink/35">{step.id}</span>
                    <span className="font-display text-[15px] font-bold uppercase tracking-[0.02em] text-ink">
                      {step.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-2 w-2 rounded-full ${['bg-lime', 'bg-butter', 'bg-cyan', 'bg-lavender', 'bg-coral'][i]}`}
                    />
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT WE DON'T DO ---------------- */}
      <section className="relative overflow-hidden rule border-t-2 border-ink py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-coral/10" />
          <span className="absolute left-8 top-12 text-ink/12">
            <DotMark className="h-4 w-12" />
          </span>
        </div>

        <div className="section">
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-mono flex items-center gap-2 text-ink/55">
                <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-coral ring-4 ring-coral/25" />
                Transparency
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-ink">
                What we don&rsquo;t do
              </h2>
              <p className="mt-5 max-w-prose2 text-[16px] leading-relaxed text-ink/65">
                A site about investigating products should be inspectable. These are the rules the
                lab holds itself to — edit them freely in{' '}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[13px]">src/data/site.js</code>.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {transparencyRules.map((rule, i) => (
              <Reveal key={rule.id} delay={i * 60}>
                <div className="group relative h-full overflow-hidden rounded-3xl border-2 border-ink bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 text-ink/15 transition-colors duration-500 group-hover:text-coral"
                  >
                    <CrossMark className="h-6 w-6" />
                  </span>

                  <p className="label-mono pr-10 text-ink/50">{rule.label}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{rule.text}</p>

                  <span
                    aria-hidden="true"
                    className="absolute -bottom-3 -left-3 h-12 w-12 rounded-full bg-coral/15"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* And what we do */}
          <Reveal delay={180} className="mt-10">
            <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-lime p-7 sm:p-10">
              <div className="pointer-events-none absolute inset-0 dot-lab opacity-35" aria-hidden="true" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="label-mono flex items-center gap-2 text-ink/60">
                    <CheckMark className="h-4 w-4" />
                    The short version
                  </p>
                  <p className="mt-4 max-w-prose2 font-display text-[clamp(1.25rem,3.4vw,2rem)] font-bold leading-snug text-ink">
                    Mysterious presentation, transparent information. The case files, the evidence
                    labels and the magnifying glass are the styling. The actual findings are always
                    readable without hunting for them.
                  </p>
                </div>
                <Link to="/case-files" className="btn-ink shrink-0">
                  Read a case file
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow="Ready?"
        title="Put a question on the desk"
        body="If something on your shelf does not make sense, that is a case file waiting to happen."
        primary={{ to: '/submit', label: 'Submit a case' }}
        secondary={{ to: '/work-with-me', label: 'Work with me' }}
        tone="butter"
      />
    </>
  );
}