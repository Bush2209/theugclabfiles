import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseFiles from './pages/CaseFiles';
import CaseDetail from './pages/CaseDetail';
import Ingredients from './pages/Ingredients';
import IngredientDetail from './pages/IngredientDetail';
import Lab from './pages/Lab';
import SubmitCase from './pages/SubmitCase';
import WorkWithMe from './pages/WorkWithMe';

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
  return (
    <>
      <ScrollManager />
      <Navigation />

      <main id="main" className="page-enter min-h-screen">
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
      </main>

      <Footer />
    </>
  );
}