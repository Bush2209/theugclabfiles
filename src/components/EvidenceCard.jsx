import { Link } from 'react-router-dom';
import { caseBySlug } from '../data/cases';
import { accent, TONE_ACCENT } from '../lib/theme';
import { Tape } from './Doodles';

/**
 * EvidenceCard — an audience report, presented as a collected note.
 * The full-page version (with add-your-experience CTA) lives on the
 * homepage and case files; the bare note is reused inside case detail.
 */
export default function EvidenceCard({ note, className = '', showCase = true, index = 0 }) {
  const a = accent(TONE_ACCENT[note.tone] ?? 'cyan');
  const tilts = ['-rotate-[1.4deg]', 'rotate-[1.1deg]', 'rotate-[-0.8deg]', 'rotate-[0.6deg]'];

  return (
    <figure
      className={`group relative flex h-full flex-col rounded-2xl border-2 border-ink/12 bg-white p-6
        shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift
        ${tilts[index % tilts.length]} ${className}`}
    >
      <Tape color={a.bg} />

      <span
        aria-hidden="true"
        className="absolute -left-1 top-6 font-display text-5xl font-bold leading-none text-ink/10"
      >
        “
      </span>

      <blockquote className="relative mt-5 font-sans text-[17px] font-medium leading-snug text-ink">
        {note.quote}
      </blockquote>

      <figcaption className="mt-auto pt-6">
        <div className="rule pt-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9.5px] uppercase tracking-[0.13em] text-ink/50">
            <span className={`rounded-full px-2 py-0.5 ${a.bg} text-ink`}>{note.id}</span>
            <span>{note.meta}</span>
            <span aria-hidden="true">·</span>
            <span>{note.source}</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-snug text-ink/60">
            <span className="font-semibold text-ink/75">Using:</span> {note.product}
          </p>
          {showCase ? <CaseRef slug={note.caseSlug} className="mt-2" /> : null}
        </div>
      </figcaption>
    </figure>
  );
}

function CaseRef({ slug, className = '' }) {
  if (!slug) return null;
  const data = caseBySlug[slug];
  if (!data) return null;

  return (
    <Link
      to={`/case-files/${slug}`}
      className={`relative z-10 mt-3 inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-ink/50 transition-colors hover:text-ink ${className}`}
    >
      Filed under CASE #{data.number}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}