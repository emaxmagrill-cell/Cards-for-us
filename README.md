# Cards for Us

A small private question deck for Max and Alex. Pick a stack and get one question
at a time to talk through. Every card is answered by both of you.

It is a plain static site. No backend, no database, no accounts, no analytics, no
cookies, no tracking, and it never calls an AI or any other service while someone
is using it. Every question is read from a file that ships with the site. Once the
page has loaded it makes no network requests at all, including for fonts, which
are bundled rather than pulled from Google.

---

## Running it on your machine

You need [Node.js](https://nodejs.org) 20 or newer. Once, to install:

```bash
npm install
```

Then, any time you want to work on it:

```bash
npm run dev
```

That prints a `http://localhost:5173` style address. Open it in a browser. Edits
show up straight away without a refresh.

To check the real built version before you ship it:

```bash
npm run build && npm run preview
```

`npm run build` writes the finished site into a `dist` folder. That folder is the
entire website, and it is what you deploy.

---

## Putting it online, for free

The site is static files, so any free host will serve it. Pick one.

### Vercel or Netlify (recommended, updates itself)

1. Put this folder on GitHub as a repository. In this folder, run:

   ```bash
   git init && git add -A && git commit -m "Cards for us"
   ```

   Then make an empty repo on GitHub and follow the two commands it shows you for
   pushing an existing repository. Mark it **private** unless you want the whole
   internet reading it.

2. Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com)
   and sign in with GitHub.

3. Choose **Add new project** / **Import from Git** and pick the repository.

4. Both will detect Vite on their own. If they ask, the settings are:

   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

   There are no environment variables and no secrets. Leave that section empty.

5. Deploy. You get a URL like `cards-for-us.vercel.app`. Send it to Alex, or add
   a custom domain in the host's dashboard if you want a nicer one.

From then on, every `git push` redeploys automatically. Adding questions is:

```bash
git add -A && git commit -m "More questions" && git push
```

### GitHub Pages

In the repository, go to Settings, Pages, and set the source to GitHub Actions.
Choose the Vite workflow it offers. The site builds from `dist` on every push.
The build already uses relative paths, so it works from a project subpath such as
`yourname.github.io/cards-for-us` with no configuration.

### Dragging a folder

Run `npm run build`, then drag the `dist` folder onto
[app.netlify.com/drop](https://app.netlify.com/drop). Online in a few seconds, no
account needed. You have to repeat it by hand each time you change something,
which is why the GitHub route above is better in the long run.

---

## Making it yours

**Add photos.** Drop image files into `src/photos/`. Any number, any filenames,
jpg/png/webp. The build finds them on its own, so there is no list to keep in
sync. With one photo the polaroid just shows it; with more than one it fades
between them every 7 seconds and shows a dot per photo underneath. Tapping the
polaroid opens the current one full size.

They are sorted by filename, so name them `01-sunset.jpg`, `02-snow.jpg` and so
on if you care about the order. Each is cropped to a square from the centre, so
whatever matters should be near the middle of the frame. With no files in there
at all, the frame falls back to a drawing and nothing breaks.

To change how long each photo holds, edit `HOLD_MS` in `src/lib/photos.js`.

**Change the words.** `src/personal.js` holds the title, the line above it, the
intro, the polaroid caption, and the note at the bottom of the home screen. It is
five lines, all plain text.

**Change the names.** They live in `"meta"` at the top of `src/data/questions.json`,
and inside the question text itself.

**Add more questions.** See [REFILL.md](REFILL.md).

**Late night.** The lamp button in the top right dims the whole site to warm
lamplight for reading in the dark. It follows the phone's own light or dark
setting to begin with, and remembers a manual choice after that. That preference
is the only thing the site ever stores, it stays on the device, and it is not a
cookie and not sent anywhere.

---

## What is where

```
src/
  personal.js            the words on the home screen
  data/questions.json    the entire question bank
  lib/deck.js            shuffling, and dealing without repeats
  lib/hand.js            the stable "placed by hand" angles and rough edges
  lib/categories.js      each category's colour and drawing
  lib/photos.js          finds everything in src/photos, sets the 7s timing
  photos/                your photos; drop files in, they appear
  components/            the two screens and the small scrapbook pieces
  styles/tokens.css      colours, type scale, spacing, paper texture
question-style-guide.md  how every question has to sound
REFILL.md                the prompt for adding more
public/                  favicon
```

Questions never repeat until the whole stack has been dealt, then it reshuffles
and tells you it has. On a phone you can swipe or tap the card; on a laptop the
right arrow key deals the next one and Escape backs out. The browser back button
and the phone's back gesture work the way you would expect.
