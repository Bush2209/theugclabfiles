import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { Squiggle, ArrowCurve, PlusMark } from './Doodles';

/**
 * CTA — reusable call-to-action block.
 * Tones: 'lime' | 'ink' | 'lavender' | 'butter' | 'coral' | 'white'
 */
const TONES = {
  lime: { wrap: 'bg-lime', border: 'border-ink', text: 'text-ink' },
  ivory: { wrap: 'bg-ivory', border: 'border-ink/15', text: 'text-ink' },
  ink: { wrap: 'bg-ink', border: 'border-ink', text: 'text-ivory' },
  lavender: { wrap: 'bg-lavender', border: 'border-ink', text: 'text-ink' },
  butter: { wrap: 'bg-butter', border: 'border-ink', text: 'text-ink' },
  coral: { wrap: 'bg-coral', border: 'border-ink', text: 'text-ink' },
  white: { wrap: 'bg-white', border: 'border-ink/15', text: 'text-ink' },
};

export default function CTA({
  eyebrow = '',
  title,
  body = '',
  primary,
  secondary = null,
  tone = 'lime',
  align = 'center',
  doodle = 'squiggle',
  className = '',
}) {
  const t = TONES[tone] ?? TONES.lime;
  const centred = align === 'center';

  return (
    <section className={`rule border-t-2 ${t.border} ${t.wrap} ${className}`}>
      <Reveal className={`section relative py-20 sm:py-28`}>
        {/* scrapbook texture */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="absolute -left-10 top-8 text-ink/15">
            <PlusMark className="h-10 w-10" />
          </span>
          <span className="absolute right-4 top-16 text-ink/15">
            <PlusMark className="h-8 w-8" />
          </span>
          <span className="absolute bottom-10 left-1/4 h-2 w-32 rotate-3 bg-ink/10" />
          <span className="absolute right-1/4 top-6 h-2 w-24 -rotate-6 bg-ink/10" />
        </div>

        <div className={`relative ${centred ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
          {eyebrow ? (
            <p className={`label-mono ${centred ? '' : ''} text-ink/55`}>
              <span aria-hidden="true">● </span>
              {eyebrow}
            </p>
          ) : null}

          <h2
            className={`mt-4 font-display text-[clamp(2.1rem,7vw,4.4rem)] font-extrabold leading-[0.94] tracking-[-0.03em] ${t.text}`}
          >
            {title}
          </h2>

          {body ? (
            <p className={`mt-5 text-[17px] leading-relaxed sm:text-lg ${centred ? 'mx-auto max-w-2xl' : ''} ${t.text} opacity-75`}>
              {body}
            </p>
          ) : null}

          {doodle === 'squiggle' && centred ? (
            <span aria-hidden="true" className="mx-auto mt-6 block h-4 w-44 text-ink/45">
              <Squiggle />
            </span>
          ) : null}

          <div
            className={`mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center ${
              centred ? 'sm:justify-center' : 'sm:justify-start'
            }`}
          >
            {primary ? <CTAButton {...primary} tone={tone} /> : null}
            {secondary ? <CTAButton {...secondary} tone={tone} /> : null}
          </div>

          {doodle === 'arrow' ? (
            <span aria-hidden="true" className={`mt-8 block text-ink/40 ${centred ? 'mx-auto' : ''} w-fit`}>
              <ArrowCurve />
            </span>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}

function CTAButton({ to, href, label, onClick, tone }) {
  const cls =
    tone === 'ink'
      ? 'border-ink bg-lime text-ink'
      : tone === 'white' || tone === 'ivory'
        ? 'border-ink bg-ink text-ivory'
        : 'border-ink bg-white text-ink';

  const inner = (
    <>
      {label}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  const shared = `btn group border-2 ${cls}`;

  if (to) {
    return (
      <Link to={to} className={`${shared} hover:-translate-y-0.5 hover:shadow-lift`}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${shared} hover:-translate-y-0.5 hover:shadow-lift`}>
        {inner}
      </a>
  );
  }
  return (
    <button type="button" onClick={onClick} className={`${shared} hover:-translate-y-0.5 hover:shadow-lift`}>
      {inner}
    </button>
  );
}