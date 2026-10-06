import { Link } from 'react-router-dom';
import { site, footerLinks, footerTicker } from '../data/site';

/**
 * Footer — brand block, navigation, socials, and the closing ticker.
 */
const YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer className="relative mt-24 border-t-2 border-ink bg-white">
      {/* ticker strip */}
      <div className="overflow-hidden border-b-2 border-ink bg-lime py-2.5" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {footerTicker.map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={`px-5 font-display text-[13px] font-extrabold uppercase tracking-[0.2em] ${
                    item === '•' ? 'text-ink/45' : 'text-ink'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="section py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-lime">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="6.4" stroke="#20231F" strokeWidth="2.2" />
                  <path d="M15 15l5.5 5.5" stroke="#20231F" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-display text-lg font-extrabold leading-none text-ink">{site.name}</span>
            </Link>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">{site.description}</p>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-label text-ink/40">{site.role}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2
                    font-mono text-[10px] uppercase tracking-[0.13em] text-ink/70 transition-all duration-300
                    hover:-translate-y-0.5 hover:border-ink hover:bg-butter hover:text-ink"
                >
                  {s.label}
                  <span aria-hidden="true" className="text-ink/40 transition-transform duration-300 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="label-mono mb-5 text-ink/40">LAB DIRECTORY</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/65 transition-colors hover:text-ink"
                  >
                    <span aria-hidden="true" className="text-ink/25 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + submit */}
          <div>
            <p className="label-mono mb-5 text-ink/40">SUBMIT A CASE</p>
            <p className="text-[14.5px] leading-relaxed text-ink/65">
              Send a product, an ingredient, a claim or a lifestyle question to the lab.
            </p>
            <Link to="/submit" className="btn-primary mt-5 w-full sm:w-auto">
              Submit a case
              <span aria-hidden="true">→</span>
            </Link>

            <div className="mt-8">
              <p className="label-mono mb-3 text-ink/40">DIRECT LINE</p>
              <a
                href={`mailto:${site.email}`}
                className="break-all font-mono text-[12px] text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t-2 border-ink/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-ink/40">
            © {YEAR} {site.name}
          </p>
          <p className="label-mono flex flex-wrap items-center gap-2 text-ink/45">
            <span>CASE FILES</span>
            <span aria-hidden="true">•</span>
            <span>INGREDIENTS</span>
            <span aria-hidden="true">•</span>
            <span>INVESTIGATIONS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}