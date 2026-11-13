# Question and content inventory

No biblical content authored, corrected or removed by this migration audit.
Current v14 scope is preserved; historical v13 exclusions are not reactivated.

Collection | Source count | Audit fixture count | Meaning
---|---:|---:|---
QUESTION_BANK | 289 | 289 | Authored reviewed question records, 287 knowledge groups
DATA | 265 | 265 | Character study rows; no active random character generator in v14
SCRIPTURES | 115 | 115 | Exact KJV passage objects
PARABLES | 20 | 20 | Name/ref/theme records
MIRACLES | 20 | 20 | Name/ref records
PV | 6 | 6 | Exact verse arrays for compound memorisation passages
LIB built-ins | 121 | 121 | SCRIPTURES + PV, not additional quiz questions
Knowledge graph | 18 entities / 12 edges | 18 / 12 | Existing small graph; not a generator
Legacy aliases | 14 | 14 | Explicit legacy-question mapping, no fuzzy identity merge

Seven live Scripture branches: S.book, S.ref, S.fill, P.name, P.ref, M.name, M.ref.
425 source-anchored template units = 115*3 + 20*2 + 20*2. This is not 425 independently
authored records nor all possible option permutations. The seed447 fixture records an actual
renderable result for each unit. All had four distinct options and exactly one matching answer.
Current question IDs and options are exact-preserved; duplicates are logged, not merged.
No duplicate IDs in authored bank or scripture/parable/miracle source keys. Characters with same
names remain separate source-index records; never use name-only identity. Two known inverse
question pairs share knowledge groups intentionally, retaining all 289 records.

Main scopes: OT186, NT91, CROSS12; Hard151. Beginner28, Intermediate110, Advanced136, Mastery15.
214 new-to-v14 and 75 legacy-origin entries are historical provenance, not new migration content.
All 66 books represented; coverage is thin in smaller books. Existing source ledger preserves
ASV evidence/interpretation notes; built-in KJV text stays unchanged. This audit verifies parity,
not independent biblical truth. Historical 795 character-template units and 2 authored withheld
records remain in the v13 archive and old disposition ledgers; do not silently count them as
active v14 questions or reinstate them during migration.

## Categories (exact legacy labels)

Category | Count
---|---:
Chronology | 4
Conquest | 3
Early church | 23
Early monarchy | 2
Exile and restoration | 9
Exodus and wilderness | 4
Family and customs | 4
Festivals | 2
Genealogy | 21
Geography | 30
Gospels | 5
Judges | 3
Kings and succession | 15
Law and ethics | 7
Law and inheritance | 3
Law and kingship | 1
Law and offerings | 4
Literary imagery | 3
Obscure people | 17
Offices and roles | 8
Patriarchs | 2
Place names | 5
Priesthood | 11
Primeval history | 2
Prophets | 23
Royal deaths | 12
Same-name identities | 10
Scriptural connections | 22
Tabernacle and temple | 6
Textual nuance | 10
Tribal territories | 1
Wars and battles | 6
Wisdom and poetry | 11

Per-record source provenance will be emitted by the checked Phase 1 extractor. Audit fixtures
are in tests/fixtures/legacy/source-data-v14.json and scripture-generated-seed447.json.
React target counts are NOT RUN until Gate 1 extraction; audit fixtures are not claimed as migration.
