# Bible Mastery migration recovery checkpoint

Current branch: migration/react19-preservation. Base: 2b28404 (existing offline v14 release).
Governing specification: docs/specifications/REACT19_MIGRATION_MASTER_PROMPT.txt (read all 933 lines).
No previous React migration or uncommitted work was recoverable. v14 upload and Git HTML match exactly.

## Completed

- Phase 0 / Gate 0 PASS, with direct file:// environment limitation explicitly recorded.
- Both v14 and historical v13 preserved read-only and SHA-256 indexed in legacy/ORIGINAL_SHA256.txt.
- Required audits, 47-row feature matrix, AST inventories, current test evidence and 44 screenshots.
- Counts preserved in source fixtures: 289 main questions, 265 characters, 115 Scriptures, 20 parables,
  20 miracles, 6 compound passages, 121-entry memo library and 425 generator units.
- Current tests: 60992 engine assertions/20200 selections;1506 content;16 storage;224 browser;
  10 extended memo;483 new phase0. React migration acceptance has NOT RUN.

## Known issues / remaining

See docs/LEGACY_DEFECTS.md. Corrupt custom [null] breaks memo; future backup versions accepted;
import lacks preview, replace and crash-safe recovery. No original personal backup available.
Gate 1 pure typed extraction is next. Gates 2–7 remain NOT RUN; React release is NO-GO.
No content expansion, backend, multiplayer, paid features, redesign or deployment is authorized here.

## Exact next step

Read docs/MIGRATION_STATUS.md and the full migration specification, verify archived hashes,
then implement Phase 1 only until Gate 1 passes: checked extraction, strict TypeScript models,
main selection/history, Scripture generators/rotation, scoring, memo text/ladder/scheduler and
adapter boundaries. Preserve seeded trace equivalence with source. Run tests, reconcile each
collection/category, update these docs, commit and push this branch before React UI conversion.

## Git backup discipline

Each meaningful completed milestone must be committed and pushed without force. Check local
HEAD against `git ls-remote origin refs/heads/migration/react19-preservation` after every push.
If push fails retain local commits, mark BACKUP FAILED here and report it; never claim success.
The Phase 0 preservation milestone is ready for commit/push; confirm remote before Phase 1 edits.

Recovery: `git fetch origin` then `git switch --track origin/migration/react19-preservation`
(if no local branch exists); inspect git status before changing files. Read this file before work.

## Phase 0 checkpoint

Gate 0 evidence completed; this commit is the preservation checkpoint. The next session must verify its remote branch before edits.
