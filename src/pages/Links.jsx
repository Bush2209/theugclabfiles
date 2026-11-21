import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import StatusBadge from '../components/StatusBadge';
import { site } from '../data/site';
import { cases, sortByDate } from '../data/cases';
import { CASE_CATEGORY_ACCENT } from '../lib/theme';
import { track } from '../lib/signals';
import { getSource } from '../lib/attribution';
import { PlusMark } from '../components/Doodles';

const latest = sortByDate(cases)[0];

const shortcuts = [
  { label: 'Case files', to: '/case-files', note: 'Every investigation', color: 'bg-lime' },
  { label: 'Ingredients', to: '/ingredients', note: 'The database', color: 'bg-cyan' },
  { label: 'The lab', to: '/lab', note: 'How it works', color: 'bg-lavender' },
  { label: 'Submit a case', to: '/submit', note: 'Ask a question', color: 'bg-butter' },
  { label: 'Work with me', to: '/work-with-me', note: 'Collaborations', color: 'bg-white' },
  { label: 'Privacy', to: '/privacy', note: 'Your data', color: 'bg-white' },
];

function InstagramIcon({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.6" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="17.6" cy="6.5" r="1.35" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="1.8" y="4.6" width="20.4" height="14.8" rx="5" stroke="currentColor" strokeWidth="2.1" />
      <path d="M10 8.7l6 3.3-6 3.3V8.7z" fill="currentColor" />
    </svg>
  );
}

function FollowCard({ label, handle, href, className, icon, onClick }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={`group flex min-h-[118px] items-center gap-4 rounded-3xl border-2 border-ink p-5 shadow-card
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lift active:translate-y-0 ${className}`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">
          Follow on
        </span>
        <span className="mt-1 block font-display text-[22px] font-extrabold leading-none text-ink">
          {label}
        </span>
        <span className="mt-1.5 block truncate font-mono text-[11px] text-ink/60">{handle}</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-ink/40 transition-transform duration-300 group-hover:translate-x-1">
        ↗
      </span>
    </a>
  );
}

/**
 * The bio-link hub. One thumb, one screen: follow, read the newest case, then
 * fan out into the rest of the lab. Every tap is an attribution signal so the
 * next content decision is based on what people actually did.
 */
export default function Links() {
  const source = getSource();

  useEffect(() => {
    track('bio_visit', { source });
  }, [source]);

  const followed = (platform) => () =>
    track('bio_link_click', { platform, destination: platform === 'ig' ? 'instagram' : 'youtube' });

  const sourceLabel = source === 'ig' ? 'from Instagram' : source === 'yt' ? 'from YouTube' : 'from the site';

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_20%,transparent_78%)]" />
          <span className="absolute -right-4 top-12 text-ink/10">
            <PlusMark className="h-16 w-16" />
          </span>
        </div>

        <div className="section max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-lime">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="6.4" stroke="#20231F" strokeWidth="2.2" />
                  <path d="M15 15l5.5 5.5" stroke="#20231F" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-display text-[15px] font-extrabold leading-none text-ink">
                {site.name}
              </span>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="label-mono mt-8 flex items-center gap-2 text-ink/50">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-coral" />
              Case intake · open · {sourceLabel}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,10vw,4.2rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-ink">
              Products. Claims.
              <br />
              <span className="text-ink/35">Answers.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-5 max-w-prose2 text-[16px] leading-relaxed text-ink/65">
              I investigate what brands say and what actually happens. Follow the case files, or
              send me the question nobody has answered yet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Follow ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-10">
        <div className="section max-w-2xl">
          <Reveal>
            <p className="label-mono text-ink/45">Keep up with the investigations</p>
          </Reveal>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Reveal delay={70}>
              <FollowCard
                label="Instagram"
                handle={site.social[0].handle}
                href={site.social[0].href}
                className="bg-lime"
                icon={<InstagramIcon />}
                onClick={followed('ig')}
              />
            </Reveal>
            <Reveal delay={130}>
              <FollowCard
                label="YouTube"
                handle={site.social[1].handle}
                href={site.social[1].href}
                className="bg-lavender"
                icon={<YouTubeIcon />}
                onClick={followed('yt')}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Latest case ---------------- */}
      {latest ? (
        <section className="rule border-t-2 border-ink/12 py-10">
          <div className="section max-w-2xl">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <p className="label-mono text-ink/45">Newest case file</p>
                <p className="label-mono text-ink/35">#{latest.number}</p>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <Link
                to={`/case-files/${latest.slug}`}
                onClick={() => track('bio_link_click', { platform: 'site', destination: 'latest-case' })}
                className="group mt-5 block overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-card
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 w-full ${{
                    lime: 'bg-lime',
                    lavender: 'bg-lavender',
                    coral: 'bg-coral',
                    butter: 'bg-butter',
                    cyan: 'bg-cyan',
                  }[CASE_CATEGORY_ACCENT[latest.category]] ?? 'bg-lime'}`}
                />
                <span className="block p-6">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="label-mono text-ink/45">{latest.category}</span>
                    <StatusBadge status={latest.status} size="sm" />
                  </span>
                  <span className="mt-4 block font-display text-[clamp(1.6rem,6vw,2.4rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
                    {latest.title}
                  </span>
                  <span className="mt-3 block max-w-prose2 text-[14.5px] leading-relaxed text-ink/65">
                    {latest.question}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                    Open the case
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ---------------- Shortcuts ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-10">
        <div className="section max-w-2xl">
          <Reveal>
            <p className="label-mono text-ink/45">Around the lab</p>
          </Reveal>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {shortcuts.map((item, i) => (
              <Reveal key={item.to} delay={i * 45}>
                <Link
                  to={item.to}
                  onClick={() => track('bio_link_click', { platform: 'site', destination: item.to })}
                  className="group flex h-full min-h-[92px] flex-col justify-between rounded-2xl border-2 border-ink/15 bg-white p-4
                    transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-card"
                >
                  <span className={`block h-1.5 w-8 rounded-full ${item.color}`} aria-hidden="true" />
                  <span>
                    <span className="block font-display text-[15px] font-bold leading-tight text-ink">
                      {item.label}
                    </span>
                    <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.11em] text-ink/45">
                      {item.note}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Ask ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-12">
        <div className="section max-w-2xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-butter p-7 sm:p-9">
              <div className="pointer-events-none absolute inset-0 dot-lab opacity-30" aria-hidden="true" />
              <div className="relative">
                <p className="label-mono text-ink/55">Got a question?</p>
                <p className="mt-3 max-w-md font-display text-[clamp(1.7rem,6vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
                  Send it to the lab.
                </p>
                <p className="mt-3 max-w-prose2 text-[14.5px] leading-relaxed text-ink/70">
                  A product, a claim, an ingredient, a hunch. Every case starts with someone asking.
                </p>
                <Link
                  to="/submit"
                  onClick={() => track('bio_link_click', { platform: 'site', destination: '/submit' })}
                  className="btn-ink mt-6"
                >
                  Submit a case
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
