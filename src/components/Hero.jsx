import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { CircleMark, Magnifier, Squiggle, DotMark, Pin } from './Doodles';
import { MediaFrame } from './MediaPlaceholder';
import { usePointerField, useReducedMotion } from '../lib/hooks';
import { site } from '../data/site';
import { getCase } from '../data/cases';


/**
 * EvidenceChip — the hover-to-reveal interaction from the brief.
 * Shows a plain term; hovering reveals the "clue" underneath.
 */
function EvidenceChip({
  term,
  reveal,
  color = 'butter',
  tilt = 0,
  depth = 0,
  point,
  className = '',
  size = 'md',
}) {
  const shades = {
    butter: 'bg-butter',
    lavender: 'bg-lavender',
    cyan: 'bg-cyan',
    coral: 'bg-coral',
    lime: 'bg-lime',
    white: 'bg-white',
  };

  const transform = point
    ? `translate3d(${point.x * (6 + depth * 4)}px, ${point.y * (6 + depth * 4)}px, 0) rotate(${
        tilt + point.x * 1.6
      }deg)`
    : `rotate(${tilt}deg)`;

  return (
    <div
      className={`group/chip pointer-events-auto relative ${className}`}
      style={{
        transform,
        transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
        '--tilt': `${tilt}deg`,
      }}
    >
      <div
        className={`relative flex cursor-default items-center border-2 border-ink px-4 py-2.5 shadow-card
          ${shades[color]} ${size === 'lg' ? 'text-[13px]' : 'text-[11px]'} font-mono font-semibold uppercase tracking-[0.13em] text-ink
          transition-transform duration-400 group-hover/chip:-translate-y-0.5 group-hover/chip:shadow-lift`}
      >
        {term}

        {/* revealed clue on hover */}
        <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 whitespace-nowrap
          rounded-full border-2 border-ink bg-ink px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ivory
          opacity-0 shadow-lift transition-all duration-300 group-hover/chip:opacity-100 group-hover/chip:translate-y-0.5">
          {reveal}
        </span>
      </div>
    </div>
  );
}

/** The interactive case folder in the hero. Opens on hover/focus. */
function CaseFolder({ point }) {
  const [open, setOpen] = useState(false);
  const file = getCase('the-facewash-file');
  const tilt = point ? point.x * 1.2 : 0;

  // The flap folds back around this edge, so the card needs a perspective for
  // the rotation to read as depth rather than a flat squash.
  const FLAP = open ? 'rotateX(-152deg)' : 'rotateX(0deg)';

  return (
    <div className="relative mx-auto w-full max-w-[380px] [perspective:1100px]">
      {/* magnifier follows the pointer, very subtly */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 hidden text-ink/25 md:block"
        style={{
          transform: point ? `translate3d(${point.x * 26}px, ${point.y * 26}px, 0)` : 'none',
          transition: 'transform 700ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Magnifier className="h-10 w-10 animate-wiggle" />
      </span>

      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group relative block w-full text-left"
        style={{ transform: `rotate(${tilt - 1.5}deg)`, transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* back cover peeking out */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-3 bottom-0 top-3 origin-bottom rounded-2xl border-2 border-ink bg-butter
            transition-all duration-500 group-hover:top-0 ${open ? 'bg-butter' : ''}`}
        />

        {/* folder flap — two layers: a lavender printed lid, then its lining */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-2xl border-2 border-b-0 border-ink bg-lavender/85
            transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: FLAP }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-2xl border-2 border-b-0 border-ink
            transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: FLAP }}
        >
          <span className="absolute inset-x-0 top-3 flex items-center justify-between px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/70 [backface-visibility:hidden]">
            <span>CASE FILE</span>
            <span>#{file?.number ?? '001'}</span>
          </span>
        </span>

        {/* the paper inside */}
        <span className="relative block rounded-b-2xl border-2 border-ink bg-white px-5 pb-6 pt-16 shadow-folder">
          <span className="absolute right-4 top-4 text-ink/35">
            <Pin className="h-6 w-6" />
          </span>

          <span className="label-mono block text-ink/45">
            {open ? 'OPENED' : 'CLICK TO OPEN'}
          </span>
          <span className="mt-2 block font-display text-[22px] font-extrabold leading-[1.05] text-ink">
            {file?.title ?? 'THE FACEWASH FILE'}
          </span>

          <span className="mt-3 block h-2 w-24 rounded-full bg-ink/10" />
          <span className="mt-2 block h-2 w-40 rounded-full bg-ink/10" />

          <span
            className="mt-5 grid grid-cols-2 gap-3 transition-all duration-500"
            style={{ opacity: open ? 1 : 0.55 }}
          >
            <MediaFrame
              kind="tube"
              color="lavender"
              title={file?.title}
              ratio="aspect-[4/5]"
              frame="plain"
              className="rounded-xl border-2 border-ink/12"
            />
            <span className="flex flex-col gap-2 pt-1">
              <span className="rounded-lg border-2 border-ink/12 bg-ivory px-3 py-2">
                <span className="label-mono block text-ink/45">STATUS</span>
                <span className="mt-0.5 block font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink">
                  CASE CLOSED
                </span>
              </span>
              <span className="rounded-lg border-2 border-ink/12 bg-ivory px-3 py-2">
                <span className="label-mono block text-ink/45">EVIDENCE</span>
                <span className="mt-0.5 block font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink">
                  03 PRODUCTS
                </span>
              </span>
            </span>
          </span>

          <span
            className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-ink"
          >
            {open ? 'Read the file' : 'Hover or tap'}
            <span aria-hidden="true">→</span>
          </span>
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-ink/0 transition-all duration-500 group-hover:ring-ink/10"
        />
      </button>

      {/* link overlay so the folder is fully clickable through */}
      <Link
        to={`/case-files/${file?.slug ?? 'the-facewash-file'}`}
        className="absolute inset-0 rounded-2xl"
        aria-label={`Open case file ${file?.number ?? '001'}`}
      />
    </div>
  );
}

/** Sticky note used as a scrapbook detail. */
function DeskNote({ children, color = 'note', rotate = -3, className = '' }) {
  return (
    <div
      className={`note ${color} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

/**
 * Hero — the investigation desk.
 * Floating evidence reacts to pointer position; everything is static on
 * touch devices and with reduced motion.
 */
export default function Hero() {
  const point = usePointerField();
  const reduced = useReducedMotion();
  const p = reduced ? null : point;

  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-14">
      {/* lab grid backdrop, faded toward the edges */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-lab opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_35%,transparent_78%)]" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/25 blur-3xl" />
        <div className="absolute -left-28 top-1/3 h-72 w-72 rounded-full bg-lavender/20 blur-3xl" />
      </div>

      <div className="section">
        <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
          {/* ---------------- Left: the headline ---------------- */}
          <div className="relative">
            <Reveal className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 shadow-card">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-coral" />
                </span>
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink">
                  Currently investigating
                </span>
              </span>
              <span className="inline-flex items-center rounded-full border-2 border-ink bg-cyan px-3.5 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink">
                {site.status.currently}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 font-display text-[clamp(2.6rem,8.4vw,5.6rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink">
                <span className="block">The internet</span>
                <span className="block">
                  has{' '}
                  <span className="relative inline-block">
                    questions.
                    <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-3">
                      <Squiggle className="h-3 w-full text-coral" />
                    </span>
                  </span>
                </span>
                <span className="mt-2 block text-ink/35">I have a case file.</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 max-w-xl border-l-2 border-ink pl-5">
                <p className="font-sans text-[17px] font-medium leading-relaxed text-ink sm:text-[19px]">
                  Products. Claims. Ingredients. Real experiences.
                </p>
                <p className="mt-1 font-sans text-[17px] leading-relaxed text-ink/65 sm:text-[19px]">
                  Let&rsquo;s investigate.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/case-files" className="btn-primary">
                  Open case files
                  <span aria-hidden="true">→</span>
                </Link>
                <Link to="/submit" className="btn-secondary">
                  Submit a case
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <dl className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-ink/12 pt-6">
                {[
                  ['08', 'CASE FILES'],
                  ['14', 'INGREDIENTS LOGGED'],
                  ['03', 'PLATFORMS'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="label-mono text-ink/40">{l}</dt>
                    <dd className="mt-1 font-display text-2xl font-extrabold leading-none text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <span aria-hidden="true" className="mt-10 hidden w-32 text-ink/45 sm:block">
              <ArrowCurveNote />
            </span>
          </div>

          {/* ---------------- Right: the desk ---------------- */}
          <div className="relative">
            <Reveal delay={140} from="left">
              <div className="relative rounded-[28px] border-2 border-ink/12 bg-white/55 p-5 shadow-card backdrop-blur-[2px] sm:p-8">
                {/* grid paper */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] grid-lab-soft opacity-80" aria-hidden="true" />

                <div className="relative grid gap-6">
                  {/* top row: chips */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <EvidenceChip
                      term="NIACINAMIDE"
                      reveal="VITAMIN B3"
                      color="lime"
                      tilt={-4}
                      depth={2}
                      point={p}
                      size="lg"
                    />
                    <EvidenceChip
                      term="“BRIGHTENING”"
                      reveal="CLAIM DETECTED"
                      color="coral"
                      tilt={3}
                      depth={1}
                      point={p}
                    />
                  </div>

                  {/* the folder */}
                  <CaseFolder point={p} />

                  {/* bottom row: chips + note */}
                  <div className="relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div className="flex flex-wrap gap-3">
                      <EvidenceChip
                        term="FRAGRANCE"
                        reveal="WHY IS IT HERE?"
                        color="cyan"
                        tilt={-2}
                        depth={3}
                        point={p}
                      />
                      <EvidenceChip
                        term="GLYCERIN"
                        reveal="IN 84% OF THEM"
                        color="white"
                        tilt={4}
                        depth={2}
                        point={p}
                      />
                      <EvidenceChip
                        term="SPF 50"
                        reveal="HANDLE THE RING"
                        color="lavender"
                        tilt={-3}
                        depth={1}
                        point={p}
                      />
                    </div>

                    <DeskNote color="note" rotate={-4} className="w-full max-w-[168px]">
                      <span className="block text-[19px] font-semibold leading-tight">
                        &ldquo;one person&rsquo;s review isn&rsquo;t a verdict&rdquo;
                      </span>
                      <span className="mt-2 block font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-ink/60">
                        lab rule 01
                      </span>
                    </DeskNote>
                  </div>

                  {/* circled detail + annotation */}
                  <div className="relative flex items-center justify-between gap-4 rounded-2xl border-2 border-ink/12 bg-ivory px-4 py-3">
                    <div className="relative">
                      <p className="label-mono text-ink/45">Ingredient label · INCI</p>
                      <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink">
                        AQUA · GLYCERIN · NIACINAMIDE · PARFUM
                      </p>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-x-4 -inset-y-2 text-coral opacity-80"
                      >
                        <CircleMark className="h-full w-full" />
                      </span>
                    </div>
                    <span className="shrink-0 font-hand text-[19px] leading-none text-ink/70">
                      read the back!
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* floating desk doodles outside the panel */}
            <span
              aria-hidden="true"
              className="absolute -left-3 top-6 hidden text-ink/25 lg:block"
              style={{
                transform: p ? `translate3d(${p.x * -14}px, ${p.y * -14}px, 0)` : 'none',
                transition: 'transform 800ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Magnifier className="h-9 w-9 animate-float-slow" />
            </span>
            <span
              aria-hidden="true"
              className="absolute -right-2 bottom-10 hidden text-ink/25 lg:block"
              style={{
                transform: p ? `translate3d(${p.x * 18}px, ${p.y * 18}px, 0)` : 'none',
                transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <DotMark className="h-4 w-12" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hand-drawn arrow used under the hero stats. */
function ArrowCurveNote() {
  return (
    <svg viewBox="0 0 120 60" className="h-auto w-32" fill="none" aria-hidden="true">
      <path
        d="M6 6c34 4 66 14 96 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="240"
        strokeDashoffset="240"
        className="animate-draw-line"
      />
      <path
        d="M100 46c-5 1-10 2-14 4l7-13c1 3 3 6 7 9z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

