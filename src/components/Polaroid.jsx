import { useEffect, useRef, useState } from 'react'
import { photos, HOLD_MS } from '../lib/photos.js'
import Tape from './Tape.jsx'

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
  const [index, setIndex] = useState(0)
  // Only photos that have been reached get an <img>, plus the next one so it is
  // already cached when its turn comes. Mounting all of them up front would
  // download the whole album on first paint.
  const [mounted, setMounted] = useState(() => new Set([0, 1]))
  const [paused, setPaused] = useState(false)
  const dialog = useRef(null)

  const hasPhotos = photos.length > 0
  const rotates = photos.length > 1

  useEffect(() => {
    if (!rotates || paused) return undefined
    // An auto-advancing image is motion. If the reader has asked for less of it,
    // the photo simply stays put.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % photos.length
        setMounted((seen) => new Set(seen).add(next).add((next + 1) % photos.length))
        return next
      })
    }, HOLD_MS)
    return () => clearInterval(timer)
  }, [rotates, paused])

  const frame = (
    <>
      {!hasPhotos && <Waiting />}
      {photos.map((src, i) =>
        mounted.has(i) ? (
          <img
            key={src}
            className={`polaroid__photo${i === index ? ' is-ready' : ''}`}
            src={src}
            alt={rotates ? `Max and Alex, photo ${i + 1}` : 'Max and Alex'}
            aria-hidden={i !== index}
          />
        ) : null,
      )}
      <span className="polaroid__corner polaroid__corner--tl" aria-hidden="true" />
      <span className="polaroid__corner polaroid__corner--br" aria-hidden="true" />
    </>
  )

  return (
    <>
      <figure
        className="polaroid"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Tape seed="polaroid" tone="gold" width={92} angle={-7} y={-16} x="42%" />

        {hasPhotos ? (
          <button
            type="button"
            className="polaroid__frame polaroid__frame--open"
            onClick={() => {
              setPaused(true)
              dialog.current?.showModal()
            }}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            aria-label="See the photo bigger"
          >
            {frame}
          </button>
        ) : (
          <div className="polaroid__frame">{frame}</div>
        )}

        <figcaption className="hand polaroid__caption">{caption}</figcaption>

        {rotates && (
          <span className="polaroid__dots" aria-hidden="true">
            {photos.map((src, i) => (
              <span key={src} className={`polaroid__dot${i === index ? ' is-on' : ''}`} />
            ))}
          </span>
        )}
      </figure>

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setPaused(false)}
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
          <img className="lightbox__photo" src={photos[index]} alt="Max and Alex" />
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
