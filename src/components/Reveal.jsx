import { useReveal } from '../lib/hooks';

/**
 * Scroll-reveal wrapper. Children fade + rise once when they enter the viewport.
 * `delay` staggers items inside a grid.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  from = 'up', // up | left | none
  as: Tag = 'div',
}) {
  const [ref, visible] = useReveal();
  const offset = from === 'left' ? ' reveal-x' : '';

  return (
    <Tag
      ref={ref}
      className={`reveal${offset} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}