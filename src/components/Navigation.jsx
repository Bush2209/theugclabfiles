import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site, navLinks } from '../data/site';
import { useEscape, useScrollLock } from '../lib/hooks';

/**
 * Navigation — sticky, translucent on scroll, hamburger below `lg`.
 * Includes the live status indicator requested in the brief.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useScrollLock(open);
  useEscape(open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:border-2
          focus:border-ink focus:bg-lime focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-label"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? 'border-b-2 border-ink/12 bg-ivory/92 backdrop-blur-md'
            : 'border-b-2 border-transparent bg-ivory/70 backdrop-blur-sm'
        }`}
      >
        <nav className="section flex h-[68px] items-center justify-between gap-4 lg:h-[76px]" aria-label="Primary">
          {/* Brand */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label={site.name}>
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border-2 border-ink bg-lime transition-transform duration-400 group-hover:-rotate-6">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="6.4" stroke="#20231F" strokeWidth="2.2" />
                <path d="M15 15l5.5 5.5" stroke="#20231F" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-extrabold tracking-[-0.01em] text-ink sm:text-[17px]">
                THE UGC
              </span>
              <span className="block font-display text-[15px] font-extrabold tracking-[-0.01em] text-ink sm:text-[17px]">
                INVESTIGATOR
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <ul className="flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `group relative block py-1 font-mono text-[10px] font-medium uppercase tracking-label transition-colors xl:text-[11px] ${
                        isActive ? 'text-ink' : 'text-ink/55 hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          aria-hidden="true"
                          className={`absolute -bottom-0.5 left-0 h-[2px] bg-ink transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-lime px-3 py-1.5">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-ink" />
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink">
                {site.status.label}
              </span>
            </span>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-white transition-colors hover:bg-lime lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span
                className={`block h-[2.5px] w-full rounded-full bg-ink transition-transform duration-300 ${
                  open ? 'translate-y-[7.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2.5px] w-full rounded-full bg-ink transition-opacity duration-300 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[2.5px] w-full rounded-full bg-ink transition-transform duration-300 ${
                  open ? '-translate-y-[7.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-ink/12 bg-ivory transition-[max-height,opacity] duration-500 lg:hidden ${
            open ? 'max-h-[560px] border-t-2 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="section py-6">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-lime px-3 py-1.5">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-ink" />
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink">
                {site.status.label}
              </span>
            </span>

            <ul className="mt-5 divide-y divide-ink/10 border-y-2 border-ink/10">
              {navLinks.map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 transition-colors ${
                        isActive ? 'text-ink' : 'text-ink/70'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[10px] text-ink/35">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`font-display text-[17px] font-bold tracking-[0.02em] ${
                              isActive ? 'underline decoration-2 underline-offset-4' : ''
                            }`}
                          >
                            {link.label}
                          </span>
                        </span>
                        {isActive ? <span aria-hidden="true">●</span> : <span aria-hidden="true">→</span>}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border-2 border-ink/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.13em] text-ink/70 transition-colors hover:border-ink hover:bg-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}