# FBG V4.3.10 — Verified QA

## What was fixed
- Mobile FERTIG restored to the original right-side composition.
- Final mobile frame hides story copy, scroll hint and progress UI completely so nothing overlaps FERTIG.
- Mobile DOKA / 700 labels are pinned inside the prop shaft instead of drifting beside the ladder.
- Switzerland map keeps outline and pins in one shared coordinate plane.
- Existing desktop worker no longer scales during scroll, preventing the back logo from visually jumping.

## Responsive homepage test
Checked widths: 320, 360, 375, 390, 393, 414, 430, 768, 1024, 1280, 1440, 1920 px.

Results:
- Horizontal overflow: 0 px at all tested widths.
- Mobile scroll story reaches step 05 on 320–430 px.
- FERTIG becomes visible on mobile final state.
- Final mobile story/progress UI is hidden so it does not overlap FERTIG.
- Desktop final state reaches step 05 and desktop FERTIG remains visible.
- Process icons remain within their cards at all tested widths.
- Switzerland map remains visible and correctly sized at all tested widths.
- No page errors in the browser test.

## Inner-page test
Pages checked at 320, 390, 768 and 1440 px:
- Offene Stellen
- Kontakt
- Über uns
- Leistungen
- Referenzen
- Aktuell

Results:
- Horizontal overflow: 0 px on every tested page/width.
- No page errors in the browser test.

## Human review
### Worker / applicant
- Job page immediately communicates that FBG is hiring.
- Job description is readable and the visual language matches the construction theme.
- Mobile navigation is clear and the page does not feel like a generic recruitment template.

### Potential client / site manager
- Desktop hero immediately communicates formwork/concrete specialization.
- References/map and current-project card provide useful credibility.
- Contact page makes the next action obvious and keeps company identity prominent.
- The mobile hero is more playful than the rest of the site, but remains understandable and functional.

## Known non-blocking design notes
- Project pins are geographically close because most listed projects are concentrated in a small region; this is data-driven, not coordinate drift.
- The large outlined postcode on the contact page is intentionally decorative and clips on small screens by design.
