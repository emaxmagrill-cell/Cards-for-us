import { useState } from 'react'
import Tape from './Tape.jsx'

// Drop a photo at public/us.jpg and it appears here. No config, no code change.
// Until then the frame holds a drawing rather than a grey box.
const photoUrl = `${import.meta.env.BASE_URL}us.jpg`

function Waiting() {
  return (
    <svg
      className="polaroid__drawing"
      viewBox="0 0 200 150"
      role="img"
      aria-label="A dotted line arcing between two places"
    >
      <rect width="200" height="150" fill="var(--gold-wash)" />
      <g filter="url(#ink-wobble)">
        <path
          d="M12 129h176"
          stroke="var(--ink-ghost)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M30 113C58 47 142 47 170 113"
          stroke="var(--rose)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2.5 7"
          fill="none"
        />
        <path
          d="M92 58l19 8-19 8 4-8-4-8Z"
          fill="var(--rose-deep)"
          stroke="var(--rose-deep)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="113" r="5.5" fill="var(--rose-deep)" />
        <circle cx="170" cy="113" r="5.5" fill="var(--rose-deep)" />
        <circle cx="30" cy="113" r="1.8" fill="var(--gold-wash)" />
        <circle cx="170" cy="113" r="1.8" fill="var(--gold-wash)" />
      </g>
    </svg>
  )
}

export default function Polaroid({ caption }) {
  const [status, setStatus] = useState('looking')

  return (
    <figure className="polaroid">
      <Tape seed="polaroid" tone="gold" width={92} angle={-7} y={-16} x="42%" />
      <div className="polaroid__frame">
        <Waiting />
        <img
          className={`polaroid__photo${status === 'ready' ? ' is-ready' : ''}`}
          src={photoUrl}
          alt="Max and Alex"
          aria-hidden={status !== 'ready'}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('missing')}
        />
        <span className="polaroid__corner polaroid__corner--tl" aria-hidden="true" />
        <span className="polaroid__corner polaroid__corner--br" aria-hidden="true" />
      </div>
      <figcaption className="hand polaroid__caption">{caption}</figcaption>
    </figure>
  )
}
