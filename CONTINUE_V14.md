# Continuation prompt for the next implementation increment

Continue implementing `qa/specification-v14.txt` against the current v14 source.
Read the full specification, `README.md`, the source audit and implementation
report first. Preserve the working offline HTML, memo keys and supported backups.

Current measured bank: 289 approved records, 287 distinct knowledge groups;
214 new and 75 legacy-origin records. Levels: 28 Beginner, 110 Intermediate,
136 Advanced and 15 Mastery. The 2,000-distinct-item target needs 1,713 additional
knowledge groups, not duplicate paraphrases. All 66 books are represented, but
many smaller books have only one to three records.

Work in tested, source-verified increments. Prioritise valid legacy story recovery
and difficult content; do not reinstate the original random distractor generator.
Inspect each disposition in `qa/legacy-generator-exclusions.json` and
`qa/legacy-migration.json` against `qa/legacy-data.json` and the untouched original.
Add verified questions to `src/questions.tsv` or `src/legacy-reviewed.tsv`, with
exact references and three individually checked, believable wrong alternatives.
Use `src/content.py:passage()` to read the actual supporting ASV text. Record
identity, duplicate/event grouping and explicit contrast notes in
`src/option-identities.json`, `src/legacy-equivalences.json` and
`src/review-overrides.json`. Keep stable IDs through wording changes. Resolve
aliases and multi-account nuance before approving a question. Structural checks
alone are not editorial approval.

Expand `src/graph.json` beyond its initial 18 entities and 12 edges, covering the
specified ontology with sourced forward/reverse relationships. `src/engine.js`
exports `validate`, `eligible`, `select`, `history`, `weight`, `seen`, `answered`,
`shuffle` and `rankDistractors`; the last is currently only a helper, not a full
graph generator. Do not enable generated questions without editorial gates.
`src/quiz.js:start/render/answer` is the sole character-quiz pipeline.
`src/storage.js:Storage14.commit/mergeBackup` protects current browser data;
retain its rollback and idempotent conflict-merge behavior.

Build from the original using `src/build.py`; never hand-edit the generated HTML
as the sole source of a change. Execute:

```sh
python src/content.py
python src/build.py
python tests/content.py
node tests/engine.cjs
node tests/storage.cjs
node tests/browser.cjs
node tests/memorisation.cjs
python src/report.py
```

Review and update report.py's explanatory text as the implementation evolves; some
current limitations and counts are deliberately explicit prose, not computed.
Inspect the rendered UI and actual questions. Test direct file opening when the
browser permits it: managed Chromium blocked file:// in this run, so that gate
remains BLOCKED. Do not bypass administrator browser policy. Independent human
biblical/editorial review and comprehensive distractor-property verification
remain outstanding. Rebuild the delivery ZIP and its hash manifest after changes.
Deliver actual tested HTML and exact updated counts, preserving an honest record
of unfinished requirements. No filler or placeholder packs.
