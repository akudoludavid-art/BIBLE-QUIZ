# Bible Mastery migration recovery checkpoint

Branch: migration/react19-preservation. Original release:2b28404; preservation checkpoint:ef422a4.
Latest completed milestone: Phase1 typed pure engine/content extraction (this commit).
Read docs/specifications/REACT19_MIGRATION_MASTER_PROMPT.txt before changing scope.

## Completed and verified

- Gate0 PASS: recovered actual Git state (no prior React work), v14 upload matches repository;
  both originals read-only/checksummed;47-row feature matrix;44 screenshots; four-key storage inventory.
- Gate1 PASS: repeatable checked extraction, source-anchored ledger and idempotence; all data fields
  preserved. Main selectors/history, Scripture generators/rotation, session scoring/transitions,
  memo text/blanking/learning/review/library logic are strict typed domain modules.
-25 passing Vitest tests include1000 main sessions,400 Scripture rounds,425 generated units,
  all121 memo entries and grade/learning transitions against untouched-source implementations.
- npm ci/typecheck/lint/test/extract/archive verification pass. Lockfile committed. TS6.0.3 chosen
  for verified tooling compatibility; React/DOM19.3.1,Vite8.3.8,Node24.22.1.
- Source counts:289 main questions,265 characters,115 Scriptures,20 parables,20 miracles,
  6 compound passages,121 memo entries,425 generator units;33 main categories preserved.

## Remaining / known issues

Gate2 React UI is next; gates3–7 NOT RUN. React release NO-GO; domain-only checkpoint is not a
complete migrated application. See docs/LEGACY_DEFECTS.md: corrupt custom list, unknown backup
versions, incomplete validation and non-crash-atomic writes need Phase3 recovery/validation.
file:// test blocked by managed Chromium. Source HTTP tests are real; no PWA/cache claim.
No source personal backup supplied. No Bible content expansion, backend, extra modes or redesign.

## Exact next instruction

Verify the current Git commit is on origin/migration/react19-preservation and run
`npm ci && npm run verify:archive && npm run typecheck && npm test` (use a writable npm cache
if the cloud HOME is read-only). Then implement Phase2 real React19/Vite views: preserved theme
and SVG assets; home/main quiz/results/Character Study; all Scripture submodes; complete memo
hub/library/active/pause/editor/learning/review/backup. Use src/domain; map every matrix row to
implementation and tests. Test strict mode, lifecycle/keyboard, semantic scoring and rendered
screens. Gate2 requires all source journeys; do not label a scaffold or partial slice complete.
Commit/push each meaningful validated milestone; retain checkpoints before large edits.

## Git backup / recovery

Phase0 ef422a4 push succeeded and remote SHA was verified. Phase1 is ready for commit/push;
verify remote SHA before any major Phase2 changes. Never force-push/delete branches or overwrite
working changes. If push fails, retain local commits and mark BACKUP FAILED explicitly.
To resume: fetch origin; inspect branches/status; checkout migration/react19-preservation (track
origin if absent); read this file, docs/MIGRATION_STATUS.md and PHASE_1_REPORT.md.
Do not rerun scripts/write-phase0-report.py over current status: it is the recorded initial
report-generation utility, not the migration progress updater. Do not run CONTINUE_V14.md's
historical content-expansion workflow during migration.
