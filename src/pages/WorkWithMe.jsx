import { useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import CTA from '../components/CTA';
import { MediaFrame } from '../components/MediaPlaceholder';
import { CheckMark, Squiggle, PlusMark } from '../components/Doodles';
import { services, portfolio, collaborationNotes, workStats } from '../data/services';
import { site } from '../data/site';
import { accent } from '../lib/theme';

export default function WorkWithMe() {
  const [active, setActive] = useState(null);

  return (
    <>
      {/* ---------------- Header ---------------- */}
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab opacity-50 [mask-image:radial-gradient(ellipse_75%_70%_at_45%_0%,#000_20%,transparent_78%)]" />
          <span className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/25 blur-3xl" />
          <span className="absolute right-12 top-24 text-ink/12">
            <PlusMark className="h-9 w-9" />
          </span>
        </div>

        <div className="section">
          <Reveal>
            <p className="label-mono flex items-center gap-2 text-ink/50">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-lime ring-4 ring-lime/25" />
              Available for briefs · {site.platforms.join(' · ')}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,7.2vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink">
              Have a product that needs investigating?
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-7 max-w-prose2 text-[17px] leading-relaxed text-ink/70 sm:text-[19px]">
              Research-led, lifestyle-focused content designed to make people stop scrolling.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={190}>
            <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {workStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border-2 border-ink/12 bg-white p-5 shadow-card"
                >
                  <dd className="font-display text-3xl font-extrabold leading-none text-ink">{s.value}</dd>
                  <dt className="label-mono mt-2 text-ink/45">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-24">
        <div className="section">
          <SectionHeading
            label="What I make"
            title="Services"
            body="Four ways to work together. All of them end up short-form, vertical, and cut for the feed."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {services.map((svc, i) => {
              const a = accent(svc.color);
              return (
                <Reveal key={svc.id} delay={i * 80}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border-2 border-ink/12 bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-lift sm:p-8">
                    <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-2 ${a.bg}`} />

                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <p className="label-mono text-ink/45">{svc.ref}</p>
                        <h3 className="mt-2.5 font-display text-[clamp(1.5rem,3.4vw,2rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink">
                          {svc.title}
                        </h3>
                        <p className="mt-1.5 font-sans text-[14px] font-semibold text-ink/55">
                          {svc.subtitle}
                        </p>
                      </div>

                      <MediaFrame
                        kind={svc.shot.kind}
                        color={svc.shot.color}
                        title={svc.title}
                        ratio="aspect-square"
                        className="w-20 shrink-0 rounded-2xl sm:w-24"
                      />
                    </div>

                    <p className="mt-5 text-[15px] leading-relaxed text-ink/70">{svc.body}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {svc.bullets.map((b) => (
                        <li
                          key={b}
                          className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink/12 bg-ivory px-3 py-1
                            font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/65"
                        >
                          <CheckMark className="h-3 w-3 text-ink/50" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Portfolio ---------------- */}
      <section className="relative overflow-hidden rule border-t-2 border-ink/12 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-lavender/10" />
        </div>

        <div className="section">
          <SectionHeading
            label="Selected work"
            title="The evidence reel"
            body="Investigation videos, product tests, lifestyle content and product photography. Open any tile to see the details."
            aside={
              <a href={`mailto:${site.email}`} className="btn-secondary">
                Request full reel
                <span aria-hidden="true">→</span>
              </a>
            }
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {portfolio.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i, 7) * 60}>
                <VideoCard item={item} onOpen={setActive} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} className="mt-10 flex justify-center">
            <span aria-hidden="true" className="h-4 w-56 text-ink/25">
              <Squiggle />
            </span>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Collaboration notes ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-16 sm:py-20">
        <div className="section">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <Reveal>
              <h2 className="font-display text-[clamp(1.7rem,4.4vw,2.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
                How collaborations work
              </h2>
              <p className="mt-4 max-w-prose2 text-[15.5px] leading-relaxed text-ink/65">
                Three things worth knowing before a brief starts. These are the same rules the
                investigations run on, because a paid video should not be a different standard.
              </p>
            </Reveal>

            <div className="space-y-3">
              {collaborationNotes.map((n, i) => (
                <Reveal key={n.id} delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-2xl border-2 border-ink/12 bg-white p-5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-ink bg-lime"
                    >
                      <CheckMark className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="label-mono text-ink">{n.label}</p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink/65">{n.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <CTA
        eyebrow="Open for briefs"
        title="Think your product can survive an investigation?"
        body="Send the product and the claim. If the claim holds up, that is a great video. If it does not, that is a better one."
        primary={{ label: "Let's work together", href: `mailto:${site.email}` }}
        secondary={{ to: '/lab', label: 'Read the method' }}
        tone="lime"
        align="center"
      />

      <VideoModal item={active} onClose={() => setActive(null)} />
    </>
  );
}