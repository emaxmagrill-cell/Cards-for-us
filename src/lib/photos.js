import { personal } from '../personal.js'

// Every image in src/photos is picked up at build time. Drop files in, they
// appear; take them out, they stop. No list to maintain and no naming rules
// beyond the sort order below.
//
// They live in src/photos rather than public/ so the build can see them, hash
// them for caching, and — the useful part — know how many there are. Nothing in
// public/ can be counted without asking the server, which a static site cannot do.

const found = import.meta.glob('../photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// A caption of only emoji is a deliberate choice, not a missing caption, so it
// gets to be bigger. Anything with a letter in it is treated as handwriting.
const emojiOnly = /^[\p{Extended_Pictographic}\p{Emoji_Component}\s]+$/u

// Sorted by filename, so prefixing 01-, 02- controls the order they appear in.
export const photos = Object.keys(found)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => {
    const file = path.split('/').pop()
    const caption = personal.photoCaptions?.[file] ?? ''
    return {
      src: found[path],
      file,
      caption,
      captionIsEmoji: caption !== '' && emojiOnly.test(caption),
    }
  })

export const HOLD_MS = 7000
