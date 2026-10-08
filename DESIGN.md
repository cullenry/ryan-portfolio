# The Cullen Ledger: design notes

## Concept

**A Dublin broadsheet's business pages, edited by a programmer.**

Ryan sits between software and markets, and he is building in public from Dublin.
The site is laid out like the front page of a financial newspaper. A live ticker
runs above a masthead. Projects are filed as stories, with TheoryPrep as the lead.
Work history is kept as a ledger, and the GitHub calendar is the paper's market data.
The code side shows up in the details: the data is set in a monospace, there is a
command index you open with `/`, and the footer colophon credits the build like a print run.

Three concepts were considered:

1. **Rules of the Road.** Irish road-sign system, Transport lettering, L-plates.
   Very on-brand for TheoryPrep, but it would turn the whole person into one project,
   and pastiche road signs date quickly.
2. **Order book.** A Bloomberg-style terminal. Distinctive, but it is the dark,
   dense look the old site already leaned on, and it reads cold.
3. **Broadsheet × ledger** (chosen). It is warm and typographic, and it suits both
   halves of a CS & Business degree. It gives every section a natural form
   (front page, feature, ledger, market data, classifieds, letters), and it can carry
   TheoryPrep as a full-colour "pull-out supplement" without the brands clashing.

## Palette

Paper and ink first. Colour is rare and always means something.

| Token | Day edition | Night edition | Meaning |
|---|---|---|---|
| `--paper` | `#f4efe4` newsprint | `#12110e` | page |
| `--paper-2` | `#ebe4d4` | `#1c1a16` | inset boxes, the supplement edge |
| `--ink` | `#1a1712` | `#ece5d4` | text, rules (15.6 / 15.0 : 1) |
| `--ink-2` | `#4a443a` | `#c2b9a5` | secondary text (8.4 / 9.7 : 1) |
| `--ink-3` | `#655e50` | `#9a917e` | captions, metadata (5.6 / 6.0 : 1) |
| `--rule` | `#a89e88` | `#5a5345` | hairline rules (decorative only) |
| `--press` | `#b3261e` | `#f07a66` | **now / attention**: the pulsing "Now building" dot, focus ring, the lead-story flag |
| `--market` | `#1d6b47` | `#62c793` | **growth / up**: ticker gains, the contribution ramp, TheoryPrep links |
| `--highlight` | `#f2d64b` | `#6b5a12` | text selection, like a reporter's highlighter |
| `--band` | `#1a1712` | `#24211b` | solid bands (ticker, footer); soft charcoal at night so they don't glare |
| `--tint-green` / `-red` / `-yellow` | `#dcebdf` / `#f6dcd3` / `#f4e08a` | `#16271d` / `#2e1a16` / `#2f2810` | back-page colour: the current job and the Leaving Cert score (green), the classifieds categories, and the yellow letters band. Every ink step stays AA on them. |

Every text pairing passes WCAG AA, and most pass AAA. Rules never carry meaning, and
control borders use `--ink-3`, which clears 3:1. The focus ring is two-tone, a `--press`
outline over a `--paper` halo, so it stays visible on ink bands and coloured panels. The TheoryPrep supplement borrows that
product's own tokens (`#16704c` green, `#c8102e` red, cream `#f1ebe0`) inside a scoped
container, so it reads as a different publication folded into this one.

## Type

- **Newsreader** is the display *and* reading serif. It is self-hosted and subset with
  fontTools: the roman keeps `opsz` 12–72 and `wght` 300–600, and the italic is a display cut
  pinned at `opsz` 48. Optical size is pinned to two values (16 for text, 60 for headings)
  rather than set automatically, because every distinct variation is a separate font
  instance to build and shape, and auto sizing made the first layout slow. The masthead name is
  set at weight 400 with tight tracking. "Cullen" is set in italic, the way a
  paper sets its nameplate. Body copy uses `opsz` 14–18 at weight 400.
- **Instrument Sans** (variable `wdth` 75–100) is used for kickers, navigation, buttons and
  figures. It is condensed (`wdth 75–85`) for small caps-style kickers and stat values.
  Following the dataviz rule, numbers are set in sans, not serif.
- **JetBrains Mono** is for the ticker, dates, ledger figures, the command index and
  code. Tabular figures appear only in columns.

The scale is fluid, clamp-based, from the 16px body up to `clamp(4.5rem, 17vw, 15.5rem)`
for the nameplate.

## Layout

A 12-column editorial grid with hairline column rules. It is deliberately asymmetric:
the lead story spans 8 columns and the editor's column takes 4. Stacked double rules
(thick over thin) separate the major sections, as in print. Nothing is a uniform card
grid. Each project has its own composition, chosen to suit what it is.

## Motion

Motion explains something or it doesn't ship.

- **Press run (load).** The rules draw left to right and the nameplate rolls onto the
  page with a `clip-path` reveal. That is paint-only, so it never re-runs layout on
  15rem type. All of it finishes in about a second, using CSS only.
- **Scroll.** Sections rise 12px and fade in with CSS scroll-driven animations
  (`animation-timeline: view()`) behind `@supports`, so browsers without support show
  everything immediately.
- **Ticker.** It runs on a CSS marquee, pauses on hover and focus, and has a real pause
  button (WCAG 2.2.2).
- **Signature interactions:** the TheoryPrep "Try a question" quiz, the `/` command
  index, and the Konami code, which sends the TheoryPrep car across the page.
- `prefers-reduced-motion: reduce` turns all of it off: no marquee, no reveals and no
  car. The content is identical.

No animation library is used. The only client JS is the theme toggle, the ticker pause,
the quiz, the command index, the mobile section menu, the chart tooltip and the easter egg.

## Details

- The theme toggle is labelled **Day edition / Night edition**. It stores
  `portfolio-theme`, and an inline head script sets it before paint so there is no flash.
- Selected text uses the highlighter colour. The cursor is the system default
  (custom cursors hurt accessibility).
- The 404 page is a printed **Correction** notice.
- The footer is a colophon: typefaces, build date and commit, "Printed in Dublin".
- The `/cv` page uses the same tokens. Its print stylesheet produces a clean A4 export
  with all chrome removed.
