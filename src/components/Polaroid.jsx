import { useRef, useState } from 'react'
import Tape from './Tape.jsx'

// Drop a photo at public/us.jpg and it appears here. No config, no code change.
// Until then the frame holds a drawing rather than a grey box.
const photoUrl = `${import.meta.env.BASE_URL}us.jpg`

function Waiting() {
  return (
    <svg
      className="polaroid__drawing"
      viewBox="0 0 200 200"
      role="img"
      aria-label="A dotted line arcing between two places"
    >
      <rect width="200" height="200" fill="var(--gold-wash)" />
      <g filter="url(#ink-wobble)">
        <path
          d="M12 156h176"
          stroke="var(--ink-ghost)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M30 140C58 62 142 62 170 140"
          stroke="var(--rose)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2.5 7"
          fill="none"
        />
        <path
          d="M90 74l19 8-19 8 4-8-4-8Z"
          fill="var(--rose-deep)"
          stroke="var(--rose-deep)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="140" r="5.5" fill="var(--rose-deep)" />
        <circle cx="170" cy="140" r="5.5" fill="var(--rose-deep)" />
        <circle cx="30" cy="140" r="1.8" fill="var(--gold-wash)" />
        <circle cx="170" cy="140" r="1.8" fill="var(--gold-wash)" />
      </g>
    </svg>
  )
}

export default function Polaroid({ caption }) {
  const [status, setStatus] = useState('looking')
  const dialog = useRef(null)

  const hasPhoto = status === 'ready'

  const frame = (
    <>
      <Waiting />
      <img
        className={`polaroid__photo${hasPhoto ? ' is-ready' : ''}`}
        src={photoUrl}
        alt="Max and Alex"
        aria-hidden={!hasPhoto}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('missing')}
      />
      <span className="polaroid__corner polaroid__corner--tl" aria-hidden="true" />
      <span className="polaroid__corner polaroid__corner--br" aria-hidden="true" />
    </>
  )

  return (
    <>
      <figure className="polaroid">
        <Tape seed="polaroid" tone="gold" width={92} angle={-7} y={-16} x="42%" />

        {/* Only interactive once there is a real photo behind it. Enlarging the
            placeholder drawing would be a promise the frame cannot keep. */}
        {hasPhoto ? (
          <button
            type="button"
            className="polaroid__frame polaroid__frame--open"
            onClick={() => dialog.current?.showModal()}
            aria-label="See the photo bigger"
          >
            {frame}
          </button>
        ) : (
          <div className="polaroid__frame">{frame}</div>
        )}

        <figcaption className="hand polaroid__caption">{caption}</figcaption>
      </figure>

      {/* Native dialog: Escape, focus trapping and the top layer all come free,
          which is a lot of fiddly behaviour not to have to hand-roll. */}
      <dialog
        ref={dialog}
        className="lightbox"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close()
        }}
        // A modal dialog is supposed to close on Escape by itself, but not every
        // engine actually fires `cancel`. Closing it here works everywhere, and
        // preventDefault stops a working browser from doing it twice.
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault()
            dialog.current?.close()
          }
        }}
      >
        <figure className="lightbox__paper">
          <Tape seed="lightbox" tone="gold" width={120} angle={-5} y={-18} x="46%" />
          <img className="lightbox__photo" src={photoUrl} alt="Max and Alex" />
          <figcaption className="hand lightbox__caption">{caption}</figcaption>
        </figure>
        <button
          type="button"
          className="hand lightbox__close"
          onClick={() => dialog.current?.close()}
        >
          close
        </button>
      </dialog>
    </>
  )
}
