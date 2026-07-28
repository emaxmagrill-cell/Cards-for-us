# Question Style Guide

This is the single source of truth for how every question on the site should sound. The website reads from the question bank, and every new batch you generate in Claude Code must follow this guide. The whole point is that a stranger should never be able to tell a machine wrote these. They should feel like they came from someone who knows the two of you.

Read this before generating any questions. When you refill the bank, paste this guide in first.

---

## The two people

Fill these in. The more real detail lives here, the less generic the questions get. Leave a line blank if it does not apply, but try to give something for each.

- Names: Max and Alex
- How you met: [FILL IN]
- Together since: [FILL IN]
- The distance right now: [cities, time zones, how often you actually see each other, and when you are next together — FILL IN]
- What Alex is into: [her hobbies, what she geeks out about, comfort things, quirks, pet peeves — FILL IN]
- What Max is into: [same for you, plus anything you want her asking you about — FILL IN]
- Inside jokes and nicknames: [the phrases and dumb recurring bits only you two get — FILL IN]
- Shared memories and milestones: [first date, trips, big moments, remember-whens — FILL IN]
- Pet names: [FILL IN]
- Songs, shows, movies, and foods you share: [FILL IN]
- Where this is headed: [plans, closing the distance, dreams together — FILL IN]

---

## The categories

Eight packs. Each has a clear job. Keep questions inside their lane so the packs feel distinct.

1. Getting to Know. Deeper get-to-know-you questions. The kind that reveal how someone thinks, not just what they like.
2. Fun and Silly. Playful hypotheticals and would-you-rathers. Light, quick, made to make each other laugh.
3. Late Night Talks. Dreams, fears, and the vulnerable stuff. Slower and more open.
4. Long Distance. The missing-you and staying-close questions. This one leans hard on your actual distance situation.
5. Us. Memories, inside jokes, and your story. The most personal pack.
6. The Future. Plans, closing the distance, and the life you are building.
7. Flirty. Romantic and a little bold. Stays tasteful and PG-13. Warm, not crude.
8. Spicy. Turn up the heat with bold, flirty questions about attraction and chemistry. Kept tasteful, playful not explicit, and always consent-forward.

---

## Who answers

Everyone. Every card is answered by both of you, so questions are written to
include you both: second person, no names, nothing that only works if one
particular person is holding the phone.

That is the main thing to get right. A question like "Alex, what's a habit of
mine you find endearing?" only works one way round. Written as "What's a habit of
mine you found weird at first but now find endearing?" it works for whoever is
answering, and the other one answers it next.

Examples of the pattern:
- "What is a tradition we should start that is just ours?"
- "What do you know now about loving me that you did not at the start?"
- "When do you feel the most like yourself with me?"

## Voice and tone

- Talk directly to the person. Second person, warm, like a close friend who is rooting for you.
- One question per card. Never stack two questions into one.
- Be concrete, not abstract. "What is a small thing I do that you hope I never stop doing?" beats "What do you appreciate about me?"
- A little bold is good. The best questions ask something people want to answer but rarely get asked.
- Keep it short and readable. If it needs a comma just to breathe, it is probably too long.
- Vary the rhythm. Mix short punchy ones with slower reflective ones.
- Match the pack. Silly questions stay silly. Late night questions stay tender. Do not blur them.

---

## The banned list

This is how you never sound like AI. If a draft question does any of these, cut it or rewrite it.

- No filler clichés. Skip "What is your favorite color" unless there is a real playful twist.
- No therapy-speak or corporate warmth. No "share your feelings," no "on your journey," no "meaningful connection."
- No greeting-card mush. If it sounds like it belongs on a mug, kill it.
- No double-barreled questions. One idea per card.
- No vague abstractions. Ground every question in something specific and answerable.
- No questions that assume things that are not true for Max and Alex. If you are unsure whether a detail fits them, leave it universal.
- No questions that only one of them can answer. Every card has to work whichever of them is holding it.
- No near-duplicates. If two questions could get the same answer, keep the better one.
- No overexplaining. The question should not need a setup sentence.
- Never break character. No meta, no "as requested," no instructions leaking into a card.

---

## Personalization

The magic is the mix. Aim for roughly two-thirds universal questions that any close couple could answer, and one-third that reference the real details above. Too many inside references and it feels like a quiz. Too few and it feels like a template.

Use the real details most heavily in the Us, Long Distance, and Future packs. Keep Fun and Silly and Getting to Know lighter on specifics so they stay evergreen.

When you do reference their life, be light-handed. Name a real trip or a real inside joke, then let the question open outward. "What is a moment from [that trip] you would relive on a loop?" is better than a question that only works if you already know the whole story.

---

## Good and bad examples

Getting to Know
- Good: "What do you know now about loving me that you did not at the start?" Specific, opens a real answer.
- Bad: "What are three things you like about me?" Flat, list-like, forgettable.

Fun and Silly
- Good: "We are stuck on a deserted island. Who cracks first and what does that look like?" Playful, specific, invites a story.
- Bad: "What would you do if we were stranded somewhere?" Vague, no spark.

Late Night Talks
- Good: "What is something you are afraid to want because you are scared to lose it?" Tender and brave.
- Bad: "What are your deepest fears?" Too broad, sounds like a form.

Long Distance
- Good: "What does missing me actually feel like for you, in your body?" Concrete, unexpected, honest.
- Bad: "Do you miss me when we are apart?" Yes or no, dead end.

Us
- Good: "What is the exact moment you knew this was something real?" Pinpoints a memory.
- Bad: "When did you fall in love?" Fine but generic, everyone has heard it.

The Future
- Good: "Where do you picture us waking up on an ordinary morning ten years from now?" Small and vivid.
- Bad: "What are your goals for our relationship?" Sounds like a performance review.

Flirty
- Good: "What is the most attractive thing about me that has nothing to do with how I look?" Bold but sweet.
- Bad: Anything crude or explicit. Keep it PG-13 and charming.

Spicy
- Good: "What's something I do without realizing it that you find impossibly attractive?" Bold and playful, invites a real answer.
- Bad: Anything graphic or explicit. Keep it flirty, tasteful, and consent-forward.

---

## Output format for new questions

When you generate a new batch in Claude Code, append it to the bank file in this exact shape so the site can read it. Do not change the structure.

```json
{
  "id": "us-014",
  "text": "What is a small habit we have built that you low-key treasure?"
}
```

Rules:
- id is the category prefix plus a number, always unique. Prefixes: getting-to-know = gtk, fun = fun, late = late, long-distance = ld, us = us, future = future, flirty = flirty, spicy = spicy.
- text is the question only. No quotes inside unless needed, no extra fields.
- There is no audience field. If you find yourself wanting one, the question is
  aimed at one person and needs rewriting so it works either way round.
