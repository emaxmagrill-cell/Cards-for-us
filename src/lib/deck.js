// Deck handling. No state, no React, so it is easy to reason about.

/** The cards in a pack. Everyone answers everything, so there is no filtering. */
export function deckFor(category) {
  return category?.questions ?? []
}

/** Fisher-Yates. Returns a new array; never mutates the source. */
export function shuffle(items) {
  const out = items.slice()
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Reshuffle for the next pass through the stack.
 *
 * Guards the one thing a shuffle can get embarrassingly wrong: dealing the card
 * you just looked at as the very first card of the new pass.
 */
export function reshuffle(pool, lastSeenId) {
  const next = shuffle(pool)
  if (next.length > 1 && next[0].id === lastSeenId) {
    const swap = 1 + Math.floor(Math.random() * (next.length - 1))
    ;[next[0], next[swap]] = [next[swap], next[0]]
  }
  return next
}
