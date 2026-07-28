import { jitter, cutCorners } from '../lib/hand.js'
import { lookFor } from '../lib/categories.js'
import { personal } from '../personal.js'
import Tape from './Tape.jsx'
import Glyph from './Glyph.jsx'
import Polaroid from './Polaroid.jsx'

export default function Home({ categories, onPick }) {
  const total = categories.reduce((n, c) => n + (c.questions?.length ?? 0), 0)

  return (
    <>
      <header className="masthead">
        <div>
          <p className="hand kicker rises" style={{ '--i': 0 }}>
            {personal.kicker}
          </p>
          <h1 className="display masthead__title rises" style={{ '--i': 1 }}>
            Things I Still Want to <span className="swash">Ask You</span>
          </h1>
          <p className="masthead__intro rises" style={{ '--i': 2 }}>
            {personal.intro}
          </p>
        </div>
        <div className="masthead__photo arrives" style={{ '--i': 3 }}>
          <Polaroid caption={personal.photoCaption} />
        </div>
      </header>

      <section className="stacks" aria-labelledby="stacks-heading">
        <div className="stacks__label">
          <h2 id="stacks-heading" className="hand">
            {categories.length} stacks, {total} cards
          </h2>
          <span className="stacks__rule" aria-hidden="true" />
        </div>

        <ul className="collage">
          {categories.map((category, i) => {
            const look = lookFor(category.id, i)
            const count = category.questions?.length ?? 0

            return (
              <li
                key={category.id}
                className={`collage__cell${look.wide ? ' is-wide' : ''}`}
                style={{ marginTop: `${jitter(`${category.id}:drop`, 8)}px` }}
              >
                <button
                  type="button"
                  className="pack arrives"
                  style={{
                    '--i': i + 4,
                    '--tilt': `${jitter(category.id, 2.2)}deg`,
                    '--tone': `var(--${look.tone})`,
                    borderRadius: cutCorners(category.id, 16),
                  }}
                  onClick={() => onPick(category.id)}
                >
                  <Tape
                    seed={category.id}
                    tone={look.tone}
                    width={look.wide ? 108 : 74}
                  />
                  <Glyph
                    name={look.glyph}
                    seed={category.id}
                    size={look.wide ? 32 : 27}
                    className="pack__glyph"
                  />
                  <h3 className="display pack__name">{category.name}</h3>
                  <p className="pack__desc">{category.description}</p>
                  <span className="hand pack__count">{count} cards</span>
                </button>
              </li>
            )
          })}

          <li className="collage__cell is-wide">
            <p className="hand scrap arrives" style={{ '--i': 12, '--tilt': '-1.1deg' }}>
              <Tape seed="scrap" tone="sage" width={80} angle={5} x="76%" y={-12} />
              {personal.signoff}
            </p>
          </li>
        </ul>
      </section>
    </>
  )
}
