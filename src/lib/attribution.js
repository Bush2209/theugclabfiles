/**
 * Lightweight attribution — where a visit came from.
 *
 * Links in the Instagram and YouTube bios point at /links?src=ig and
 * /links?src=yt. The value is kept in sessionStorage for the whole visit, so
 * a submission three pages later still knows which platform sent the person.
 *
 * Nothing here identifies a person; it is a single two-letter label.
 */

const KEY = 'ugc-lab:src';
const SOURCES = new Set(['ig', 'yt']);

export function getSource() {
  try {
    const value = window.sessionStorage.getItem(KEY);
    return SOURCES.has(value) ? value : 'direct';
  } catch {
    return 'direct';
  }
}

/** Captures `?src=` from the current URL, falling back to the stored value. */
export function captureSource(search) {
  const value = new URLSearchParams(search ?? '').get('src');
  if (SOURCES.has(value)) {
    try {
      window.sessionStorage.setItem(KEY, value);
    } catch {
      /* storage disabled — attribution simply falls back to direct */
    }
    return value;
  }
  return getSource();
}
