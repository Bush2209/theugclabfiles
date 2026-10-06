/** @type {import('tailwindcss').Config} */

// Opacity steps used across the design system. Extended so tints like
// border-ink/12 and bg-lavender/35 resolve everywhere, including inside
// @apply blocks.
const OPACITY_STEPS = [3, 8, 12, 15, 18, 35, 55, 65, 85, 92, 95];

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      opacity: Object.fromEntries(OPACITY_STEPS.map((n) => [String(n), String(n / 100)])),
      colors: {
        // Base
        ivory: '#FFF9EE',
        paper: '#FFFDF7',
        ink: '#20231F',
        white: '#FFFFFF',

        // Investigation accents
        lime: '#B8F34A',
        lavender: '#B99CFF',
        coral: '#FF6B6B',
        butter: '#FFD85A',
        cyan: '#7DE3E3',

        // Ink tints (used for borders + soft text)
        ink10: 'rgba(32,35,31,0.10)',
        ink20: 'rgba(32,35,31,0.20)',
        ink40: 'rgba(32,35,31,0.40)',
        ink60: 'rgba(32,35,31,0.60)',
        ink70: 'rgba(32,35,31,0.70)',
        lime40: 'rgba(184,243,74,0.40)',
        lavender40: 'rgba(185,156,255,0.40)',
        butter40: 'rgba(255,216,90,0.40)',
        cyan40: 'rgba(125,227,227,0.40)',
        coral40: 'rgba(255,107,107,0.40)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Archivo', 'sans-serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        hand: ['Caveat', '"Bradley Hand"', 'cursive'],
      },
      letterSpacing: {
        label: '0.18em',
        wide2: '0.28em',
      },
      maxWidth: {
        site: '1240px',
        prose2: '68ch',
      },
      boxShadow: {
        card: '0 1px 0 rgba(32,35,31,0.06), 0 10px 30px -18px rgba(32,35,31,0.35)',
        lift: '0 2px 0 rgba(32,35,31,0.08), 0 22px 48px -24px rgba(32,35,31,0.45)',
        folder: '0 18px 40px -22px rgba(32,35,31,0.55)',
        note: '0 14px 28px -18px rgba(32,35,31,0.5)',
        modal: '0 40px 90px -30px rgba(32,35,31,0.5)',
      },
      backgroundImage: {
        'grid-lab':
          'linear-gradient(rgba(32,35,31,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(32,35,31,0.07) 1px, transparent 1px)',
        'grid-lab-soft':
          'linear-gradient(rgba(32,35,31,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(32,35,31,0.045) 1px, transparent 1px)',
        'dot-lab': 'radial-gradient(rgba(32,35,31,0.22) 1.1px, transparent 1.1px)',
        'hatch-ink':
          'repeating-linear-gradient(45deg, rgba(32,35,31,0.10) 0 2px, transparent 2px 7px)',
      },
      backgroundSize: {
        grid: '28px 28px',
        dot: '18px 18px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        'line-grow-x': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '240' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(1.55)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translate3d(0,-9px,0) rotate(var(--tilt, 0deg))' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-16px,0)' },
        },
        stamp: {
          '0%': { opacity: '0', transform: 'scale(1.5) rotate(-14deg)' },
          '60%': { opacity: '1', transform: 'scale(0.94) rotate(-8deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-7deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'folder-open': {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-158deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.85s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'line-grow': 'line-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'line-grow-x': 'line-grow-x 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'draw-line': 'draw-line 1.6s cubic-bezier(0.65, 0, 0.35, 1) both',
        'pulse-dot': 'pulse-dot 2.2s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        stamp: 'stamp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        wiggle: 'wiggle 4s ease-in-out infinite',
        'folder-open': 'folder-open 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
      },
    },
  },
  plugins: [],
}