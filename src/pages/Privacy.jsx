import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { site } from '../data/site';
import { CONSENT_EVENT, getConsent, openConsentSettings, signalsConfigured } from '../lib/signals';
import { PlusMark, DotMark } from '../components/Doodles';

const UPDATED = 'NOVEMBER 2026';

const SIGNALS = [
  {
    event: 'Ingredient search',
    what: 'The words you type into the ingredient database, and how many results came back.',
    why: 'An empty result is the clearest possible request: it names something the database should cover.',
  },
  {
    event: 'Category filter',
    what: 'Which case-file or ingredient shelf you tap — skincare, haircare, wellness, and so on.',
    why: 'Shows which verticals are worth investigating next, instead of guessing from comment counts.',
  },
  {
    event: 'Case submission',
    what: 'That a case was filed, its type, and whether you attached an image or contact details. Not the contents.',
    why: 'Tells me submission volume and shape. The actual case content is read by me, not counted here.',
  },
  {
    event: 'Verdict reaction',
    what: 'One of three taps after a verdict: answered, partly, or still open.',
    why: 'Flags investigations that need a follow-up rather than a sequel.',
  },
];

function useConsentState() {
  const [state, setState] = useState(() => getConsent());
  useEffect(() => {
    const sync = () => setState(getConsent());
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);
  return state;
}

export default function Privacy() {
  const consent = useConsentState();

  const consentLabel =
    consent === 'granted' ? 'Allowed' : consent === 'denied' ? 'Declined' : 'Not chosen yet';

  return (
    <>
      {/* ---------------- Header ---------------- */}
      <section className="relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab-soft opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_30%_0%,#000_20%,transparent_78%)]" />
          <span className="absolute right-10 top-16 text-ink/12">
            <PlusMark className="h-9 w-9" />
          </span>
        </div>

        <div className="section">
          <Reveal>
            <p className="label-mono flex items-center gap-2 text-ink/50">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-lavender ring-4 ring-lavender/25" />
              The fine print · updated {UPDATED}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,8vw,5.2rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink">
              What I record, and why
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 max-w-prose2 text-[17px] leading-relaxed text-ink/70 sm:text-[18px]">
              An investigator who is vague about their own methods has no business asking brands to
              be clear about theirs. So: here is exactly what this site collects, what it refuses to
              collect, and how to change your mind.
            </p>
          </Reveal>

          <Reveal delay={190} className="mt-9">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl border-2 border-ink bg-white px-5 py-4">
              <span className="label-mono text-ink/45">Your current choice</span>
              <span
                className={`rounded-full border-2 border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
                  consent === 'granted' ? 'bg-lime' : consent === 'denied' ? 'bg-coral text-ink' : 'bg-butter'
                }`}
              >
                {consentLabel}
              </span>
              <button
                type="button"
                onClick={openConsentSettings}
                className="font-mono text-[10px] uppercase tracking-[0.13em] text-ink/60 underline decoration-ink/25 underline-offset-4 hover:text-ink hover:decoration-ink"
              >
                {consent ? 'Change it' : 'Choose now'}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- The short version ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-16">
        <div className="section">
          <Reveal>
            <p className="label-mono text-ink/45">The short version</p>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['Opt in, not opt out', 'Nothing is recorded until you press Allow. Declining is remembered and costs you nothing.'],
              ['No third parties', 'No Google Analytics, no Meta pixel, no session recording, no ad network. The signals are mine.'],
              ['No personal data in signals', 'Names, emails, handles and photos never enter the event stream.'],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="h-full rounded-2xl border-2 border-ink/12 bg-white p-5">
                  <span aria-hidden="true" className="block h-1.5 w-9 rounded-full bg-lime" />
                  <p className="mt-4 font-display text-[16px] font-bold leading-tight text-ink">{title}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink/65">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Signals ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-20">
        <div className="section">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,4.4vw,2.6rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink">
              Signals, only if you allow them
            </h2>
            <p className="mt-3 max-w-prose2 text-[15.5px] leading-relaxed text-ink/65">
              Small, anonymous events. Each one exists to answer an editorial question — not to
              profile you.
            </p>
          </Reveal>

          <div className="mt-8 space-y-3">
            {SIGNALS.map((signal, i) => (
              <Reveal key={signal.event} delay={i * 60}>
                <div className="grid gap-3 rounded-2xl border-2 border-ink/12 bg-white p-5 sm:grid-cols-[0.8fr_1.4fr_1.6fr] sm:items-start sm:gap-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                    {signal.event}
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-ink/70">{signal.what}</p>
                  <p className="text-[13.5px] leading-relaxed text-ink/55">{signal.why}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-6">
            <div className="rounded-2xl border-2 border-ink bg-cyan/40 p-5">
              <p className="text-[14px] leading-relaxed text-ink/75">
                <span className="font-semibold text-ink">Current build:</span>{' '}
                {signalsConfigured
                  ? 'signals are being sent to the configured endpoint.'
                  : 'no endpoint is configured, so these events stay in memory and disappear when you close the tab. Nothing is transmitted.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- What is never collected ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-20">
        <div className="section">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <p className="label-mono flex items-center gap-2 text-ink/50">
                <span aria-hidden="true">
                  <DotMark className="h-3 w-8" />
                </span>
                Off the table
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4.4vw,2.6rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink">
                What I never record
              </h2>
              <p className="mt-3 max-w-prose2 text-[15.5px] leading-relaxed text-ink/65">
                If a list this short ever gets longer, the change will be dated at the top of this
                page before it takes effect.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {[
                  'Your name or email',
                  'Your Instagram or TikTok handle',
                  'Uploaded photos or files',
                  'Precise location',
                  'Device fingerprints',
                  'Cross-site browsing history',
                  'Anything sold or shared with a third party',
                  'Anything used to target an ad at you',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border-2 border-ink/10 bg-white px-4 py-3 text-[13.5px] leading-relaxed text-ink/70"
                  >
                    <span aria-hidden="true" className="mt-0.5 font-mono text-[11px] text-coral">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Submissions ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-20">
        <div className="section">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,4.4vw,2.6rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink">
              When you submit a case
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <Reveal delay={70}>
              <div className="h-full rounded-2xl border-2 border-ink/12 bg-white p-6">
                <p className="label-mono text-ink/45">What you send</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">
                  The form asks for a product, a question, and optionally your name, contact and a
                  photo. That is a message to the lab — it is handled as correspondence, not as
                  analytics. It is kept so the case can be investigated and, if you asked for a
                  reply, answered.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full rounded-2xl border-2 border-ink bg-butter/60 p-6">
                <p className="label-mono text-ink/55">Where it goes</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/75">
                  {site.privacy.storageLive ? (
                    <>
                      Submissions are stored in {site.privacy.storeName || 'a private database'} and
                      read only by me.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-ink">Nothing is transmitted yet.</span>{' '}
                      This build runs without an intake endpoint, so pressing send validates the form
                      and shows a confirmation but does not deliver your case anywhere. The direct
                      line in the footer is the way to reach the lab right now.
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Your choice ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-16">
        <div className="section">
          <Reveal>
            <div className="rounded-3xl border-2 border-ink bg-lavender/35 p-7 sm:p-10">
              <p className="label-mono text-ink/55">Your choice, any time</p>
              <h2 className="mt-3 max-w-xl font-display text-[clamp(1.6rem,4.2vw,2.4rem)] font-extrabold leading-[1] tracking-[-0.02em] text-ink">
                Change it, or take it back.
              </h2>
              <p className="mt-3 max-w-prose2 text-[15px] leading-relaxed text-ink/70">
                Withdrawing consent stops new signals immediately. Nothing already recorded needs
                deleting to honour that — there is nothing in a signal that identifies you.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={openConsentSettings} className="btn-ink">
                  Open consent settings
                </button>
                <Link to="/submit" className="btn border-2 border-ink bg-white text-ink hover:bg-ivory">
                  Submit a case instead
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14">
        <div className="section">
          <p className="label-mono text-ink/45">Questions about this page</p>
          <p className="mt-3 max-w-prose2 text-[15.5px] leading-relaxed text-ink/70">
            {site.email ? (
              <>
                Write to{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-[13px] text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                >
                  {site.email}
                </a>
                .
              </>
            ) : (
              <>
                Send a DM to{' '}
                <a
                  href={site.social[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[13px] text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                >
                  {site.social[0].handle} on Instagram
                </a>
                .
              </>
            )}{' '}
            If you have already submitted something and want it removed, say so and it goes.
          </p>
        </div>
      </section>
    </>
  );
}
