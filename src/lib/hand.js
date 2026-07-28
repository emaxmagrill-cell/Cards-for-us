// Everything on this site that looks hand-placed is placed by these functions.
//
// The rule: a given card must land at the same angle every single render. Real
// Math.random() would make cards twitch on every re-render, which reads as a bug
// rather than as a human hand. So each id is hashed into a stable number and the
// "randomness" is derived from that.

function hash(seed) {
  let h = 2166136261
  const s = String(seed)
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Stable float in [0, 1) for a given seed. */
export function noise(seed) {
  return (hash(seed) % 100000) / 100000
}

/** Stable value in [-spread, spread]. Use for rotation and small offsets. */
export function jitter(seed, spread = 2) {
  return (noise(seed) * 2 - 1) * spread
}

/** Stable choice from a list. Use for tape variants, corner rounding, etc. */
export function pick(seed, options) {
  return options[hash(seed) % options.length]
}

/**
 * Hand-cut corners. Real scissors do not produce four identical radii.
 * Returns a border-radius shorthand that is close to `base` but never square.
 */
export function cutCorners(seed, base = 14) {
  const r = (n) => `${Math.round(base + jitter(`${seed}:r${n}`, base * 0.35))}px`
  return `${r(1)} ${r(2)} ${r(3)} ${r(4)}`
}
