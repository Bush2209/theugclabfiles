import Reveal from './Reveal';
import { ArrowDown, StepDoodle, StepConnector } from './Doodles';
import { accent } from '../lib/theme';

/**
 * InvestigationStep — one stage of an investigation.
 *
 * layout:
 *   'grid'  — numbered card in a horizontal grid with drawn connectors (home)
 *   'line'  — vertical notebook timeline with a connector below (mobile / case)
 *   'row'   — horizontal step for the lab methodology timeline
 */
export default function InvestigationStep({
  step,
  index,
  layout = 'grid',
  accentKey = 'lime',
  last = false,
  className = '',
}) {
  const a = accent(accentKey);
  // Steps come from different data sets, so accept any of the copy fields.
  const text = step.note ?? step.body ?? step.line ?? '';

  if (layout === 'line') {
    return (
      <Reveal
        as="li"
        delay={index * 70}
        className={`group relative ${className}`}
      >
        <div className="flex gap-5">
          <div className="flex shrink-0 flex-col items-center">
            <span
              className={`grid h-12 w-12 place-items-center rounded-2xl border-2 border-ink ${a.bg} font-mono text-[11px] font-bold text-ink`}
            >
              {step.id}
            </span>
            {!last ? <StepConnector className="mt-2" active /> : null}
          </div>
          <div className="pb-8 pt-1">
            <h3 className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
              {step.title}
            </h3>
            <p className="mt-2 max-w-prose2 text-[15px] leading-relaxed text-ink/70">{text}</p>
          </div>
        </div>
      </Reveal>
    );
  }

  if (layout === 'row') {
    return (
      <Reveal as="li" delay={index * 60} className={`relative ${className}`}>
        <div className="group relative h-full rounded-3xl border-2 border-ink/12 bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-mono text-ink/45">STEP {step.id}</p>
              <h3 className="mt-2 font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                {step.title}
              </h3>
            </div>
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink text-ink transition-transform duration-500 group-hover:rotate-6 ${a.bg}`}
            >
              <StepDoodle name={step.doodle} className="h-6 w-6" />
            </span>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{text}</p>

          {step.outputs?.length ? (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {step.outputs.map((o) => (
                <li
                  key={o}
                  className="rounded-full border border-ink/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/55"
                >
                  {o}
                </li>
              ))}
            </ul>
          ) : null}

          <span aria-hidden="true" className={`absolute -bottom-3 left-6 h-1.5 w-10 rounded-full ${a.bg}`} />
        </div>
      </Reveal>
    );
  }

  // default: grid
  return (
    <Reveal as="li" delay={index * 90} className={`relative flex-1 ${className}`}>
      <div
        className={`group relative flex h-full flex-col items-center rounded-3xl border-2 border-ink/12 bg-white p-6 text-center
          shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift`}
      >
        <span
          className={`grid h-14 w-14 place-items-center rounded-2xl border-2 border-ink ${a.bg} font-mono text-[13px] font-bold text-ink transition-transform duration-500 group-hover:-rotate-6`}
        >
          {step.id}
        </span>

        <h3 className="mt-4 font-display text-lg font-bold leading-tight tracking-[0.01em] text-ink">
          {step.title}
        </h3>

        <span className="mt-3 text-ink/45">
          <StepDoodle name={step.doodle} className="h-8 w-8" />
        </span>

        <p className="mt-3 text-[13.5px] leading-relaxed text-ink/65">{text}</p>

        {/* Connector arrow between steps. Hidden on small screens, where the
            layout becomes a vertical timeline (see layout="line"). */}
        {!last ? (
          <span
            aria-hidden="true"
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-ink/40 lg:block"
          >
            <ArrowDown length={30} className="rotate-[-90deg]" />
          </span>
        ) : null}
      </div>
    </Reveal>
  );
}