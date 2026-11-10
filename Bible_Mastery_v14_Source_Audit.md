# Source audit

## Safeguarded baseline

Input: `original/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html`.
SHA-256: `d11a66a5c5980dbaff0a8279e7b6337895783e4d6189ee12c75dcdf8e913deff`.
All inline CSS, SVG symbols, four script blocks, data arrays, handlers and storage
paths were inspected before implementation. Baseline capture is machine-readable
in `qa/baseline-inventory.json`; extracted source blocks and data are retained.

| Inventory | Actual |
|---|---:|
| Character records including DATA.push expansion | 265 |
| Built-in KJV scriptures | 115 |
| Parables / miracles | 20 / 20 |
| FACT_ROWS / AB authored records | 42 / 36 |
| Original character template units (potential, not validated questions) | 795 |

The specification's estimate of 110 characters excluded a substantial expansion.
The original 795 character units were not 795 verified distinct knowledge points.

## Findings and changes

- A later `run()` called the original start, then replaced its selected quiz via
  `hardSet()` or `normalSet()`. This created discarded exposures and bypassed
  persistent rotation for much of the displayed bank. The final app has exactly
  one character quiz `start()` and no `hardSet`, `normalSet` or random family-chain
  generator. Scripture sessions retain their independent v2 shuffle bags.
- AB's `n` meant normal-bank membership, not New Testament. Its normal additions
  ignored Testament selection. Baseline NT play included Nathan, Adonijah and
  the valley of Elah. Actual scope is now derived from supporting books; cross-
  Testament questions are assigned CROSS and offered in Mixed/Hard.
- Baseline sessions measured 20 OT, 17 NT, 17 Mixed and 19 Hard questions in the
  sampled run. Filtering after selection caused shortages despite available data.
  Reviewed eligible pools now supply 20 in all four modes.
- Random story distractors permitted shared descriptions, including the ten sons
  of Haman. Children-list questions and overlapping book ranges were weak.
  All 795 template units are explicitly listed as withheld, not claimed as
  validated migrations. All 265 study records remain available. **Complete
  migration of valid legacy story questions is still outstanding.**
- Of 78 authored source records: 62 retained under original IDs,
  14 consolidated through explicit mappings, 2 withheld.
  This yields 75 legacy-origin quiz records because duplicates consolidate.
  See `qa/legacy-migration.json` for every individual disposition.
- Repairs include Jehu's commanding role versus the eunuchs' physical act,
  Saul's narrated death versus the Amalekite's claim, same-name Zechariahs and
  Ahaziahs, source-qualified chronology, precise family-chain links and the
  distinction between Josiah's wound site and death location in Chronicles.
- Study wording was corrected for Jehu/Jezebel, unsupported certainty about
  Athaliah's mother, Ahithophel's named son Eliam, Othniel's son Hathath and the
  conflation of Saul's sons Abinadab and Ishvi. Supporting passages are recorded
  in the source-review work. Other inherited study claims are not all re-certified.
- Study/browse interpolation now escapes strings; custom passages already use
  text nodes. The browser XSS fixture renders markup as literal text.
- Main quiz feedback uses text nodes, supplies correct/wrong text and references,
  and only inserts explanations after selection. Keyboard input ignores form
  controls and editable content. Reduced motion also disables confetti.

## Storage audit

`bibleMemo_v1`, `bibleCustomScriptures_v1` and `bibleQuizRotation_v2` remain intact.
Character history uses `bibleMasteryHistory_v14` with an explicit version.
Legacy bag entries import only known displayed IDs, excluding inflight IDs; no
correct/incorrect results or exact historical attempt totals are invented.
The old bag remains untouched by this import.

Pasted text previously used trim() on storage; it now retains boundary whitespace,
line breaks and Unicode. Editing keeps the original confirmation semantics.
Custom editing and deletion commit custom and memo keys together with rollback
on a write failure. Quota failures show a message and do not show successful save.

Backup v3 adds new quiz history while retaining memo, custom and rot fields.
Restore accepts v1/v2/v3-shaped fixtures and merges missing records. Existing
progress wins conflicts; a conflicting custom passage is kept under another ID.
Repeated import reuses that conflict copy. No localStorage.clear() is introduced.
This is best-effort rollback over localStorage, not an atomic database transaction:
abrupt browser termination between two writes is still a limitation.

Real user's browser content was never available to this environment. Compatibility
is demonstrated with fixtures, not a claim to have migrated the user's actual data.
Export from the old file and restore in the new one when changing file paths or
browsers, since file-origin storage availability differs by browser.

## Source verification limits

All shipped quiz items were compared with downloaded ASV supporting passages,
including their question wording and options; the ledger retains those passages.
Structural validators do not prove biblical truth. This is the implementing
assistant's editorial review; no independent human scholarly review was performed.
The full 20-type ontology, exhaustive individual distractor property evidence,
quantitative 100-point editorial rubric and 2,000-item milestone remain incomplete.
