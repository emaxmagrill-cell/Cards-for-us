import { jitter } from '../lib/hand.js'

// Eight little drawings, one per pack. Deliberately simple: these are meant to
// look like something biro'd onto the corner of a card, not like an icon set.
// The wobble filter (defined once in App) does the rest.

const drawings = {
  venn: (
    <>
      <circle cx="9.4" cy="12" r="5.6" />
      <circle cx="14.6" cy="12" r="5.6" />
    </>
  ),
  spark: (
    <>
      <path d="M11.4 3.2c.6 4.7 2.5 6.6 7.2 7.3-4.7.7-6.6 2.6-7.2 7.3-.6-4.7-2.5-6.6-7.2-7.3 4.7-.7 6.6-2.6 7.2-7.3Z" />
      <path d="M18.3 15.4c.2 1.7.9 2.4 2.6 2.7-1.7.3-2.4 1-2.6 2.7-.2-1.7-.9-2.4-2.6-2.7 1.7-.3 2.4-1 2.6-2.7Z" />
    </>
  ),
  moon: (
    <>
      <path d="M17.9 14.9A7.6 7.6 0 0 1 9.1 6.1a7.7 7.7 0 1 0 8.8 8.8Z" />
      <path d="M17.2 4.1v2.6M15.9 5.4h2.6" />
      <path d="M20.4 9.2v1.8M19.5 10.1h1.8" />
    </>
  ),
  route: (
    <>
      <path d="M4.7 16.6C7.6 8.9 16.4 8.9 19.3 16.6" strokeDasharray="2.3 2.7" />
      <circle cx="4.7" cy="16.6" r="2" />
      <circle cx="19.3" cy="16.6" r="2" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14.4" r="5.1" />
      <circle cx="15" cy="9.6" r="5.1" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20.4V10.6" />
      <path d="M12 13.6c-3.4 0-5.5-2.1-5.5-5.2 3.4 0 5.5 2.1 5.5 5.2Z" />
      <path d="M12 11.8c3.4 0 5.5-2.1 5.5-5.2-3.4 0-5.5 2.1-5.5 5.2Z" />
    </>
  ),
  heart: (
    <path d="M12 20.1S3.7 15 3.7 9.3c0-2.9 2.2-4.9 4.7-4.9 1.7 0 3 1 3.6 2.2.6-1.2 1.9-2.2 3.6-2.2 2.5 0 4.7 2 4.7 4.9 0 5.7-8.3 10.8-8.3 10.8Z" />
  ),
  flame: (
    <>
      <path d="M12 20.8c-3.5 0-6-2.4-6-5.6 0-4.1 4.2-5.7 4.2-9.7 0-.9-.2-1.7-.6-2.3 3.7 1.2 5.9 4.3 5.9 7 0 1.4-.6 2.4-.6 2.4s1-.6 1.4-2c1.2 1.4 1.7 2.9 1.7 4.6 0 3.2-2.5 5.6-6 5.6Z" />
      <path d="M12 20.4c-1.5 0-2.6-1.1-2.6-2.5 0-1.9 2.6-2.6 2.6-4.6 1.6 1.3 2.6 2.9 2.6 4.6 0 1.4-1.1 2.5-2.6 2.5Z" />
    </>
  ),
}

export default function Glyph({ name = 'venn', size = 26, seed = name, className = '' }) {
  return (
    <svg
      className={`glyph ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ rotate: `${jitter(`${seed}:glyph`, 6)}deg` }}
    >
      <g filter="url(#ink-wobble)">{drawings[name] ?? drawings.venn}</g>
    </svg>
  )
}
