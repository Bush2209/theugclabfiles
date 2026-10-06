import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Fires once when an element scrolls into view.
 * Returns [ref, visible] — pair with the `.reveal` utility class.
 */
export function useReveal(options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -6% 0px', once = true } = options;
  const ref = useRef(null);
  // Browsers without IntersectionObserver simply show everything.
  const supported = typeof IntersectionObserver !== 'undefined';
  const [visible, setVisible] = useState(!supported);

  useEffect(() => {
    const el = ref.current;
    if (!el || !supported) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, supported]);

  return [ref, visible];
}

/** True when the user prefers reduced motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

/**
 * Normalised pointer position (-1 → 1) relative to the viewport.
 * Returns [x, y] and stays null on touch devices / reduced motion.
 */
export function usePointerField() {
  const [point, setPoint] = useState(null);
  const reduced = useReducedMotion();
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const onMove = (e) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setPoint({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [reduced]);

  return point;
}

/** Locks body scroll while `locked` is true (modals, mobile menu). */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}

/** Escape key handler. */
export function useEscape(active, onEscape) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onEscape]);
}

/** Small helper: value with a non-zero value only when the pointer is present. */
export function parallax(point, factor = 10) {
  if (!point) return { transform: 'none' };
  return {
    transform: `translate3d(${point.x * factor}px, ${point.y * factor}px, 0)`,
  };
}

/** Debounced value, used by the ingredient search field. */
export function useDebounced(value, delay = 180) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/** Focus trap-lite: cycles focus inside a container while active. */
export function useFocusCycle(active, containerRef) {
  return useCallback(() => {
    if (!active || !containerRef.current) return;
    const focusable = containerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
  }, [active, containerRef]);
}