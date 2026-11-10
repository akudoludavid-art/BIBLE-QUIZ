# Bible Mastery v14 implementation report

## Status

A working, tested incremental implementation of the supplied v14 specification. The 2,000-item milestone and several full-release requirements are not complete. This report distinguishes the delivered application from those remaining targets.

## Delivered application

`Bible_Mastery_Quiz_v14_Ultra.html` — 696,719 bytes, standalone HTML with no external scripts, fonts, styles or runtime service calls.

Original illustrated navy/gold layout, four modes, 20-question sessions, timer, scores, results, replay, study list, Scripture modes, 115 KJV scriptures, 20 parables, 20 miracles and the three-option memorisation hub are retained.

## Actual content counts

Approved in this implementation: **289 question records / 287 distinct knowledge groups**, comprising **214 new** and **75 retained/repaired legacy** records. Two inverse formulations share knowledge groups and cannot occur together. Neither the original scripture-exercise variants nor raw generation possibilities inflate these numbers.

| Difficulty | New | Legacy | Total | Target |
|---|---:|---:|---:|---:|
| Beginner | 25 | 3 | 28 | 200 |
| Intermediate | 87 | 23 | 110 | 400 |
| Advanced | 100 | 36 | 136 | 700 |
| Mastery | 2 | 13 | 15 | 700 |

OT: 186; NT: 91; CROSS: 12. Hard Mode uses only the 151 Advanced/Mastery items. The requested overall 70% Advanced/Mastery mix has not been reached.

All 66 books have coverage. Larger narrative books and Acts are better populated; the wisdom books, minor prophets and short epistles remain thin. Detailed counts are in `Bible_Mastery_v14_Coverage_Report.md`.

## Selection and persistence

Eligible reviewed items are sampled using flexible least-filled topic groups, with book/era diversity penalties and weighted randomness. Unseen weight is 3; recently exposed questions have a cooldown; spaced missed questions get a 1.55 multiplier; frequency mildly reduces weight. Every item always retains a positive weight. Session selection excludes duplicate IDs, knowledge groups and explicitly grouped events. The selected order and answer choices use Fisher–Yates. RNG injection makes tests repeatable.

Only a rendered question records exposure; only answering records an attempt and correctness. Statistics persist in the new namespaced history key. Old correct questions remain eligible; no permanent used-flag exists. The session counter counts started sessions, not only completed sessions.

## Executed tests

| Command | Result | Evidence |
|---|---|---|
| Rebuild and inline JavaScript syntax checks | PASS | Tested HTML, source ledger, bank and counts reproduced byte for byte; all five inline scripts parse |
| `node tests/engine.cjs` | PASS | 60,992 assertions; 20,200 selections: 10,000 real-pool sessions and 10,200 synthetic selections |
| `python tests/content.py` | PASS | 1,507 checks including 30 hazard fixtures, source references, graph endpoints, forward/reverse genealogy, source preservation and pipeline checks |
| `node tests/storage.cjs` | PASS | 16 assertions: rollback, conflict copies, repeated restore, v1/v2/v3 shapes, invalid records and prototype keys |
| `node tests/browser.cjs` | PASS | 224 browser assertions; all four complete quizzes, Scripture modes, custom CRUD, Unicode/XSS, drafts, pause/resume, restore, quota, mobile, keyboard and offline operation |
| `node tests/memorisation.cjs` | PASS | 10 extended assertions; complete learning ladder, four blank levels, typed recall/reference, due scheduling, review draft, cold offline document bootstrap and malformed quiz pack isolation |

Baseline tests reproduced scope leakage and short sessions; these failures were diagnosed and corrected. Initial v14 browser test failures were a subtitle-sensitive test locator and an expired local test-server output stream. Tests now own their local server lifecycle. No known failing check remains in the executed suites.

No browser page errors or external app requests were observed in tested flows. Screenshots were actually captured at 320, 360, 390 and 1280px; the 320px screenshot was visually inspected. Stored fixtures cover v1/v2/v3 formats; original exported backups from every historical v11/v12 release were not provided and were not tested.

**Direct `file://` test: BLOCKED, not passed.** Managed Chromium returned `ERR_BLOCKED_BY_ADMINISTRATOR`. The app has no server dependency; ordinary browser static execution and cold bootstrap with all document bytes supplied locally and the browser offline passed. This does not substitute for an unrestricted Chrome file-permission test.

## Observed distribution

| Mode | Eligible | Seen across 2,500 sessions | Minimum topics/session | Max from one topic | Adjacent-session repeat rate |
|---|---:|---:|---:|---:|---:|
| ot | 186 | 186 | 20 | 1 | 0.85% |
| nt | 91 | 91 | 15 | 2 | 14.43% |
| mixed | 289 | 289 | 20 | 1 | 0.41% |
| hard | 151 | 151 | 20 | 1 | 2.01% |

All four answer positions occurred in seeded repeated presentations. No item was starved in the runs, but this is measured evidence, not a mathematical guarantee for every possible random seed. Smaller/scoped pools necessarily recur more often.

## Sources and editorial QA

ASV (1901), public domain, downloaded during implementation from `scrollmapper/bible_databases` at the revision in `qa/sources/revision.txt`; the data snapshot and its SHA-256 are retained. The repository software license is MIT and is included in `qa/sources/LICENSE` and the unobtrusive app attribution section. The official WEB site was unavailable under the network policy; no WEB attribution or source-verification claim is made. Existing KJV text was preserved rather than silently replaced or expanded with a new full translation.

All 289 shipped records have exact resolved passage references and explanation/contrast fields. The implementing assistant inspected the supporting excerpts for all shipped questions. Independent human editorial approval has not been obtained. Option-specific contrasts were written for the most intricate questions; many simpler contrasts are concise source-identification explanations, not a comprehensive property graph of every wrong answer.

Of the 78 authored legacy records, 62 retain their original IDs, 14 map to consolidated replacements, and 2 remain withheld. This accounts for 75 legacy-origin output records. All 795 original character-template units are withheld pending safe per-item repair; their 265 underlying study records remain in the app and the complete original file is backed up. These are explicit limitations to full legacy quiz preservation, not 795 proven false biblical facts.

## Remaining work / continuation

1. Reach 2,000 substantively distinct items: the bank is **1711 records short and 1713 distinct knowledge groups short**. Count distinct knowledge groups toward the target; expand Mastery substantially and increase the Advanced/Mastery proportion.
2. Repair and reintegrate valid legacy character-story knowledge points from `qa/legacy-generator-exclusions.json`, with exact passages and curated options. Resolve the two withheld authored records in `qa/legacy-migration.json`.
3. Expand the initial 18-entity/12-edge graph into the specified full ontology and richer identity/alias, legal, temporal, geography and genealogy models. The current quiz uses static reviewed records, not a fully graph-generated bank.
4. Add richer independently evidenced option properties and per-option reasons; complete the editorial grading rubric and external human review. Difficulty classifications are editorial judgments, not measured learner psychometrics.
5. Test direct file opening in unrestricted Chrome and real historical backups if available. Broaden touch/screen-reader testing; present automated desktop/mobile checks are not a full assistive-technology audit.
6. For very long typed passages, the inherited longest-common-subsequence comparison remains quadratic in word count. It was preserved and is not certified for arbitrarily large pasted books.

The executable continuation workflow is in `README.md`. Author rows, inspect actual evidence, update grouping/identity metadata, run the builder and all listed tests, then regenerate this report. Do not re-enable the old random generators to reach a numeric goal.

## User data and privacy

All data stays in this browser. There are no accounts, telemetry or uploads. Existing keys remain, and backup v3 merges prior supported formats. Export a backup in the old file before transferring to a new file, browser or device; localStorage key compatibility does not guarantee shared access across file origins.
