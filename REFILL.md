# Adding more questions

The whole card bank is one file: `src/data/questions.json`. To add more, open
Claude Code **in this folder** and paste the prompt below.

Before your first refill, spend ten minutes filling in the `[FILL IN]` lines at
the top of `question-style-guide.md`. That section is what stops new questions
sounding like they came off a shelf. Every blank you fill is a question that can
land somewhere real instead of somewhere generic.

---

## The prompt

Copy everything inside the block. Change the category on the first line, and
the number if you want a different batch size.

```text
Write 12 new questions for the "Long Distance" category.

Before you write anything:

1. Read question-style-guide.md in full. It is the source of truth for how these
   have to sound, including the details about Max and Alex at the top, the job of
   each category, the voice rules, and the banned list. Follow it exactly.
2. Read src/data/questions.json and read every existing question in the category
   I asked for, plus skim the rest.

Then write the batch:

- Follow the style guide's voice rules and stay inside that category's lane.
- Roughly two thirds universal, one third drawing on the real details in the
  guide. Go heavier on real details for Us, Long Distance, and The Future.
- No near-duplicates of anything already in the bank. If a new question could get
  the same answer as an existing one, cut it and write a different one.
- Nothing from the banned list: no clichés, no therapy-speak, no greeting-card
  mush, no double-barrelled questions, no vague abstractions.
- Every question is answered by both of them, so use no names and write nothing
  that only works if one particular person is answering.

Then append them to the questions array of that category in
src/data/questions.json:

- Keep the existing file structure and formatting exactly as it is.
- Use the category's id prefix and carry on from the highest number already
  there, zero padded to three digits. Prefixes: getting-to-know = gtk, fun = fun,
  late = late, long-distance = ld, us = us, future = future, flirty = flirty,
  spicy = spicy.
- Each entry is exactly: { "id": ..., "text": ... }. No extra fields, and no
  audience field.

When you are done, confirm the file is still valid JSON and tell me how many
questions that category now has.
```

---

## Notes

- The eight category names are: Getting to Know, Fun and Silly, Late Night Talks,
  Long Distance, Us, The Future, Flirty, Spicy.
- The site picks up new questions the moment you save. In dev the page reloads on
  its own; once deployed, commit and push and the host rebuilds.
- Nothing else needs changing. The counts on the home screen and the shuffle both
  read straight from the file.
- Adding a whole new category also works. Give it an `id`, `name`, `description`
  and `questions`, and it will show up on the home screen with a fallback colour
  and drawing. To give it its own look, add it to `src/lib/categories.js`.
