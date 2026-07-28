import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { deckFor, shuffle, reshuffle } from '../lib/deck.js'
import { jitter, cutCorners } from '../lib/hand.js'
import { lookFor } from '../lib/categories.js'
import Tape from './Tape.jsx'
import Glyph from './Glyph.jsx'

// The card's permanent number in its pack, pulled off its id. Stays put across
// shuffles, so a card is always "no. 14" the way a print in a numbered set is.
const cardNumber = (id) => Number(id.split('-').pop())

export default function CardView({ category, onBack }) {
  const look = lookFor(category.id)
  // Half the category tones are the light variants, which are fine behind a
  // drawing but fail contrast as text. The stamp always takes the deep one.
  const stampTone = look.tone.endsWith('-deep') ? look.tone : `${look.tone}-deep`
  const pool = useMemo(() => deckFor(category), [category])
  const [order, setOrder] = useState(() => shuffle(pool))
  const [index, setIndex] = useState(0)
  const [passes, setPasses] = useState(0)
  const [showNotice, setShowNotice] = useState(false)
  const touch = useRef(null)

  const advance = useCallback(() => {
    if (order.length === 0) return
    if (index + 1 < order.length) {
      setIndex(index + 1)
      return
    }
    // End of the stack. Shuffle it and start again, so nothing repeats until
    // every card in the pool has been dealt.
    setOrder(reshuffle(pool, order[index]?.id))
    setIndex(0)
    setPasses((p) => p + 1)
  }, [index, order, pool])

  useEffect(() => {
    if (passes === 0) return undefined
    setShowNotice(true)
    const timer = setTimeout(() => setShowNotice(false), 3400)
    return () => clearTimeout(timer)
  }, [passes])

  // Arrow keys for the laptop; Escape backs out. Space and Enter are left alone
  // so they keep working on whichever control is actually focused.
  //
  // The handler reads through a ref so this subscribes once for the life of the
  // screen. Depending on `advance` directly would re-subscribe on every card,
  // which is a lot of listener churn for no reason and leaves room for a stale
  // one to survive a swap.
  const latest = useRef({ advance, onBack })
  useEffect(() => {
    latest.current = { advance, onBack }
  })

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        latest.current.advance()
      } else if (event.key === 'Escape') {
        latest.current.onBack()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onTouchStart = (event) => {
    const point = event.changedTouches[0]
    touch.current = { x: point.clientX, y: point.clientY }
  }

  const onTouchEnd = (event) => {
    const start = touch.current
    touch.current = null
    if (!start) return
    const point = event.changedTouches[0]
    const dx = point.clientX - start.x
    const dy = point.clientY - start.y
    if (dx < -52 && Math.abs(dx) > Math.abs(dy) * 1.4) advance()
  }

  if (pool.length === 0) {
    return (
      <div className="empty rises">
        <span className="empty__mark" style={{ '--tone': `var(--${look.tone})` }}>
          <Glyph name="sprout" size={38} seed={`${category.id}:empty`} />
        </span>
        <h1 className="display empty__title">This stack is still empty</h1>
        <p className="empty__text">
          There are no {category.name} cards yet. Try another stack.
        </p>
        <button type="button" className="pill" onClick={onBack}>
          Back to the stacks
        </button>
      </div>
    )
  }

  const current = order[index]
  const length = current.text.length
  const weight = length > 84 ? 'is-long' : length < 46 ? 'is-short' : ''

  return (
    <div className="cards">
      <div
        className="deck"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* The rest of the stack, showing under the top card. */}
        <span className="deck__under deck__under--b" aria-hidden="true" />
        <span className="deck__under deck__under--a" aria-hidden="true" />

        <article
          key={current.id}
          className="qcard"
          onClick={advance}
          style={{
            '--tilt': `${jitter(current.id, 1.6)}deg`,
            '--tone': `var(--${stampTone})`,
            borderRadius: cutCorners(current.id, 20),
          }}
        >
          <Tape seed={current.id} tone={look.tone} width={92} />
          <p className="hand qcard__pack">{category.name}</p>
          <p className={`qcard__text ${weight}`}>{current.text}</p>
          <span className="stamp qcard__stamp">no. {cardNumber(current.id)}</span>
          <Glyph
            name={look.glyph}
            seed={`${current.id}:mark`}
            size={40}
            className="qcard__watermark"
          />
        </article>
      </div>

      <div className="cards__controls">
        <button type="button" className="pill" onClick={advance}>
          Next card
          <svg
            className="pill__arrow"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
          </svg>
        </button>

        <p className="hand progress">
          <span>
            card {index + 1} of {order.length}
          </span>
          <span
            className="progress__rule"
            aria-hidden="true"
            style={{ '--p': (index + 1) / order.length }}
          />
        </p>

        <p className="hand cards__footnote" aria-hidden="true">
          <span className={`cards__hint${showNotice ? ' is-off' : ''}`}>
            <span className="touch-only">tap the card, or swipe</span>
            <span className="pointer-only">tap the card, or press the right arrow</span>
          </span>
          <span className={`cards__notice${showNotice ? ' is-on' : ''}`}>
            that was all of them, shuffling again
          </span>
        </p>
      </div>
    </div>
  )
}
