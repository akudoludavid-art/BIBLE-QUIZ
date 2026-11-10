# Bible Mastery v14 — tested incremental release

Open `Bible_Mastery_Quiz_v14_Ultra.html` in a browser. It contains its own styles,
illustrations, questions and JavaScript; the application requires no server,
account, package install or runtime internet connection.

**Transfer progress first:** export Progress & Backup from your previous HTML,
then restore it in this version. Browser storage can differ between local file
paths, origins, profiles and devices. Keeping the same key names does not make
browser storage portable. Keep the original HTML and exported backup.

This release is an implementation increment toward the supplied specification,
not completion of its 2,000-question target or complete knowledge graph. See the
implementation report for the exact content counts and remaining work.

## Development

The safeguarded input is in `original/`. Source data and build modules are in
`src/`. The ASV source snapshot, license and Git revision are in `qa/sources/`.
The Python builder uses only the standard library and does not fetch anything.

```sh
python src/build.py
python tests/content.py
node tests/engine.cjs
node tests/storage.cjs
node tests/browser.cjs
node tests/memorisation.cjs
python src/report.py
```

Browser tests require Playwright and Chromium. The managed environment already
provides Playwright and `/usr/bin/chromium`. Elsewhere, install Playwright as a
development dependency and adjust the executable path in the test scripts to
your local Chromium. The app itself needs neither dependency. Browser suites
start and close their own local HTTP test servers on ports 8766 and 8767.

`tests/baseline.cjs` captures the original app and requires a local server on
port 8765; it is not needed for ordinary rebuilds. Its original results are kept
in `qa/baseline-inventory.json`.

## Continue content work

`CONTINUE_V14.md` provides a precise continuation prompt with module/function
names, remaining distinct-item count and executable checks.

1. Read `qa/specification-v14.txt`, `Bible_Mastery_v14_Source_Audit.md` and
   `qa/legacy-migration.json`. Prioritise pending legacy story questions and
   the thin Mastery bank before expanding to 1,000 and 2,000 items.
2. Author reviewed rows in `src/questions.tsv`; each row has a permanent semantic
   ID, exact references, category, level, stem, four choices and explanation.
   Existing IDs must be retained when wording changes. Never inflate counts by
   creating paraphrases or reversing a question's subject and object.
3. Check the actual passages in `qa/sources/ASV.json` through
   `src/content.py:passage`. Add contextual references when the immediate verse
   does not identify the person or place. Review every alternative separately.
4. Record event/equivalence groups and option-specific contrasts in
   `src/review-overrides.json`. `src/option-identities.json` retains option IDs
   through wording edits; deliberately update this registry when replacing an
   option with a genuinely different entity.
5. Expand `src/graph.json` with explicitly sourced identities, roles and edges.
   It currently covers a small set of high-risk examples, not the complete
   ontology. Do not enable a new generator until its facts and distractors pass
   editorial review and meaningful tests.
6. Rebuild and run all checks above. Review actual rendered questions at every
   level. Update the source ledger, exclusions, coverage and report. Independent
   human biblical/editorial review remains a release recommendation.

`src/contrasts.py` is a one-off authoring helper used for the initial contrast
notes; edit the JSON directly for subsequent work rather than rerunning that
helper over newer notes.
