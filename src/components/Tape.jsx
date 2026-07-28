import { pick, jitter } from '../lib/hand.js'

// Nobody tears tape straight. Three uneven ends, picked deterministically per
// seed, so a given card always has the same piece of tape on it.
const tears = [
  'polygon(1.5% 0%, 100% 4%, 98.5% 100%, 0% 95%)',
  'polygon(0% 5%, 99% 0%, 100% 96%, 1.5% 100%)',
  'polygon(2% 2%, 98% 0%, 100% 97%, 0% 100%)',
  'polygon(0% 0%, 98.5% 3%, 100% 100%, 2% 96%)',
]

export default function Tape({
  seed = 'tape',
  tone = 'rose',
  width = 86,
  height = 26,
  angle,
  x = '50%',
  y = -13,
  className = '',
}) {
  return (
    <span
      aria-hidden="true"
      className={`tape ${className}`}
      style={{
        '--tape-tone': `var(--${tone})`,
        '--tape-w': `${width}px`,
        '--tape-h': `${height}px`,
        '--tape-x': x,
        '--tape-y': `${y}px`,
        '--tape-tilt': `${angle ?? jitter(`${seed}:tape`, 4.5)}deg`,
        clipPath: pick(`${seed}:tear`, tears),
      }}
    />
  )
}
