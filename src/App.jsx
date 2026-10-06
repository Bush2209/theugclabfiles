import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';

/*
 * The homepage ships in the main bundle; every other route is split out and
 * fetched on demand. Keeps the first paint light on a content site where most
 * visitors land on one page and read.
 */
const CaseFiles = lazy(() => import('./pages/CaseFiles'));
const CaseDetail = lazy(() => import('./pages/CaseDetail'));
const Ingredients = lazy(() => import('./pages/Ingredients'));
const IngredientDetail = lazy(() => import('./pages/IngredientDetail'));
const Lab = lazy(() => import('./pages/Lab'));
const SubmitCase = lazy(() => import('./pages/SubmitCase'));
const WorkWithMe = lazy(() => import('./pages/WorkWithMe'));

/** Scrolls to top on navigation, but honours in-page hash links. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

/**
 * Deliberately plain — a route chunk is local and usually arrives in one
 * frame. Anything animated here would read as a loading stall.
 */
function RouteFallback() {
  return (
    <div className="section flex min-h-[60vh] items-center justify-center py-24">
      <p className="label-mono flex items-center gap-3 text-ink/40">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lime" />
        Opening file
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <section className="section flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
      <p className="label-mono text-ink/45">File not found</p>
      <h1 className="mt-5 font-display text-[clamp(2.4rem,8vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink">
        This drawer is empty.
      </h1>
      <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/60">
        Whatever was filed here is either closed, moved, or never existed. The archive is a better
        place to keep looking.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link to="/case-files" className="btn-primary">
          Go to case files
          <span aria-hidden="true">→</span>
        </Link>
        <Link to="/" className="btn-secondary">
          Back to the desk
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  // Keyed on pathname so the page-transition animation replays on navigation.
  const { pathname } = useLocation();

  return (
    <>
      <ScrollManager />
      <Navigation />

      <main id="main" key={pathname} className="page-enter min-h-screen">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-files" element={<CaseFiles />} />
            <Route path="/case-files/:slug" element={<CaseDetail />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredients/:slug" element={<IngredientDetail />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/submit" element={<SubmitCase />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}