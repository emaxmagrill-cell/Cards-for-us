// Per-category art direction. Keyed by the `id` in questions.json.
//
// `wide` cards take the full width of the collage. With eight categories and two
// wide ones the grid packs perfectly on a phone; `grid-auto-flow: dense` covers
// you if you ever add or reorder categories.

const looks = {
  'getting-to-know': { tone: 'sage', glyph: 'venn' },
  fun: { tone: 'gold', glyph: 'spark' },
  late: { tone: 'sage-deep', glyph: 'moon', wide: true },
  'long-distance': { tone: 'rose', glyph: 'route' },
  us: { tone: 'rose-deep', glyph: 'rings' },
  future: { tone: 'sage', glyph: 'sprout', wide: true },
  flirty: { tone: 'rose', glyph: 'heart' },
  spicy: { tone: 'gold-deep', glyph: 'flame' },
}

const fallbackTones = ['rose', 'sage', 'gold', 'rose-deep', 'sage-deep']

/** Never returns undefined, so a newly added category still renders sensibly. */
export function lookFor(id, index = 0) {
  return (
    looks[id] ?? {
      tone: fallbackTones[index % fallbackTones.length],
      glyph: 'venn',
    }
  )
}
