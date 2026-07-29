// Days until the next time you are in the same place.
//
// Everything is computed from local midnight rather than the current moment, so
// the number ticks over at midnight instead of at whatever time of day the date
// was set. It also means the count is correct for whoever is looking: if she is
// hours ahead, she sees her own day count, which is the one she cares about.

/**
 * Whole days from today until `date` ('YYYY-MM-DD').
 * 0 on the day itself, negative once it has passed, null if unset or unparseable.
 */
export function daysUntil(date) {
  if (!date) return null

  const parts = String(date).split('-').map(Number)
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null

  const [year, month, day] = parts
  const target = new Date(year, month - 1, day)
  // Guard against something like '2026-02-31' silently rolling into March.
  if (target.getMonth() !== month - 1 || target.getDate() !== day) return null

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((target - today) / 86400000)
}

/**
 * The line to show, or null when there is nothing to say — either no date is
 * set or the day has been and gone, at which point the countdown removes itself.
 */
export function countdownLabel(date) {
  const days = daysUntil(date)
  if (days === null || days < 0) return null
  if (days === 0) return { number: null, text: 'today' }
  if (days === 1) return { number: null, text: 'tomorrow' }
  return { number: days, text: 'days until I see you' }
}
