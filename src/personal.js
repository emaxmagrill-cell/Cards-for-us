// The only file you need to touch to re-word the site.
// Names for the questions themselves live in src/data/questions.json.

export const personal = {
  // Small handwritten line above the title.
  kicker: 'for Alex, from Max',

  title: 'Things I Still Want to Ask You',

  intro:
    'Pick a stack, and we both answer. Then we talk until one of us falls asleep.',

  // A handwritten caption per photo, keyed by its filename in src/photos.
  // A photo with no entry here simply shows no caption; nothing breaks.
  photoCaptions: {
    '01.jpg': 'Carters Mountain 2026',
    '02.jpg': 'Tequila & Lime',
    '03.jpg': 'Semi!',
    '04.jpg': '\u{1F609}',
    '05.jpg': 'The Dance',
    '06.jpg': 'Luke Combs',
    '07.jpg': 'My Favorite \u{1F60A}',
  },

  // The next day you are in the same place, as 'YYYY-MM-DD'. The countdown on
  // the home screen takes itself down the day after this passes, so it is never
  // stale. Set the next one here, or null to hide it entirely.
  nextVisit: '2026-08-06',

  // Sign-off at the bottom of the home screen.
  signoff: 'no wrong answers, no skipping the hard ones',
}
