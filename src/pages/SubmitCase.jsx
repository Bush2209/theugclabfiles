import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SubmissionForm from '../components/SubmissionForm';
import { submissionExamples } from '../data/site';
import { PlusMark, DotMark } from '../components/Doodles';

export default function SubmitCase() {
  return (
    <>
      {/* ---------------- Header ---------------- */}
      <section className="relative overflow-hidden pb-12 pt-12 sm:pb-14 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab opacity-50 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_0%,#000_20%,transparent_78%)]" />
          <span className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-lime/25 blur-3xl" />
          <span className="absolute right-8 top-20 text-ink/12">
            <PlusMark className="h-9 w-9" />
          </span>
        </div>

        <div className="section">
          <Reveal>
            <p className="label-mono flex items-center gap-2 text-ink/50">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-lime" />
              </span>
              Case intake · open
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,8.6vw,5.6rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink">
              Got a question?
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 font-display text-[clamp(1.4rem,4vw,2.1rem)] font-semibold leading-tight text-ink/75">
              Send it to the lab.
            </p>
          </Reveal>

          <Reveal delay={190} className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <p className="max-w-prose2 text-[16px] leading-relaxed text-ink/65 sm:text-[17px]">
              The best investigations start with someone noticing something small and finding it
              annoying. A word on a label. A claim that sounds too good. Two products that swear they
              do opposite things.
            </p>
            <p className="max-w-prose2 text-[16px] leading-relaxed text-ink/65 sm:text-[17px]">
              You can send any of the following. The more specific the question, the better the
              investigation — &ldquo;is this good&rdquo; is not a question, &ldquo;does this do
              anything the cheap one does not&rdquo; is.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Examples ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-16">
        <div className="section">
          <Reveal>
            <p className="label-mono text-ink/45">You can send</p>
          </Reveal>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {submissionExamples.map((ex, i) => (
              <Reveal key={ex.label} delay={i * 60}>
                <div className="group h-full rounded-2xl border-2 border-ink/12 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-card">
                  <span
                    aria-hidden="true"
                    className="block h-1.5 w-9 rounded-full bg-lavender transition-all duration-500 group-hover:w-16 group-hover:bg-lime"
                  />
                  <p className="mt-4 font-display text-[15px] font-bold leading-tight text-ink">
                    {ex.label}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{ex.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Form ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-24">
        <div className="section">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-mono text-ink/45">Intake form</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
                File it
              </h2>
            </div>
            <p className="label-mono flex items-center gap-2 text-ink/45">
              <span aria-hidden="true">
                <DotMark className="h-3 w-8" />
              </span>
              Takes about a minute
            </p>
          </Reveal>

          <div className="mt-10">
            <SubmissionForm />
          </div>

          <Reveal delay={160} className="mt-8 text-center">
            <p className="text-[14px] leading-relaxed text-ink/50">
              Already know which product it is? You can also just{' '}
              <Link to="/case-files" className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                browse the open case files
              </Link>{' '}
              and check whether it is already being investigated.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}