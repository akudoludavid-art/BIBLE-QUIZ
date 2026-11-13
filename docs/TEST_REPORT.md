# Executed migration evidence

Phase 0, 2026-11-13. Node24.22.1 / npm11.9.0 / Python3.12; Chromium 156.0.8078.79 via Playwright.
Original application test commands ran in `/tmp/bm-baseline`, an isolated copy, to avoid overwriting
historical qa artifacts. Current results are copied to docs/evidence/phase0. New audit ran in repository.

Command | Exit | Result / evidence
---|---:|---
git fetch origin '+refs/heads/*:refs/remotes/origin/*' --tags | 0 | main only, 2b28404; no recovered React work
git ls-remote --heads --tags origin; git fsck --no-reflogs --unreachable | 0 | only main; unreachable empty tree
sha256sum repository HTML + uploaded HTML + historical HTML | 0 | matching v14; v13 separately archived
npm install --prefix /tmp/bm-audit-tools acorn acorn-walk | 1 | Default home cache unwritable; no application defect
npm install --prefix /tmp/bm-audit-tools --cache /tmp/bm-npm-cache --no-audit --no-fund acorn acorn-walk | 0 | Parser tooling available
BM_ACORN=… BM_ACORN_WALK=… node scripts/forensic-inventory.cjs | 0 | Both sources AST-parsed; source-inventory.json
node tests/engine.cjs | 0 | 60992 assertions / 20200 selections; engine.log and engine-results.json
python tests/content.py (first harness attempt) | 1 | Test copy omitted source ledger; content-harness-first-attempt.log; fixed copy only
python tests/content.py (corrected harness) | 0 | 1506 assertions /30 hazards; original upload path absent so optional historical upload-equality check skipped; archive checksum independently checked
node tests/storage.cjs | 0 | 16 assertions; storage-results.json
node tests/browser.cjs | 0 | 224 assertions; browser-results.json
node tests/memorisation.cjs | 0 | 10 checks; memorisation-results.json
node scripts/phase0-browser.cjs | 0 | 483 assertions, 44 screenshots, source/UI-export fixtures; browser-baseline.json
file:// navigation in audit | blocked | ERR_BLOCKED_BY_ADMINISTRATOR, not a PASS

Baseline functions and views were audited. T01 is PARTIAL (HTTP unchanged legacy works; direct file blocked).
T02–T28 and X01–X15 for migrated React are NOT RUN. Legacy test results are not React acceptance.
No package.json existed at Phase 0: npm ci/typecheck/lint/test/build/preview NOT RUN, legitimately awaiting Phase 1/2.
Independent biblical editorial verification and assistive-technology device testing NOT RUN.

## Phase 1 executed checks

In /workspace/BIBLE-QUIZ,2026-11-13: npm ci(exit0); npm run extract(exit0), repeated with
byte-identical content/ledger/count outputs; npm run typecheck(exit0); npm run lint(exit0);
npm run test(exit0:25 Vitest cases,0 failures); npm run verify:archive(exit0).
Artifacts: docs/evidence/phase1/{npm-ci,typecheck,lint,unit,extraction}.log,
unit-results.json,reconciliation.json,extraction-ledger.json,idempotence.json.
Nested parity checks:1000 seeded main sessions,400 rotation rounds,425 generated units,
484 text-comparison inputs,484 blank selections,121 cumulative plans,105 grade states and
source-oracle learning transitions. These are deterministic program comparisons, not new
independent biblical review. Global React tests T02–T28 still NOT RUN.
Initial TS7 dependency-tree conflict was resolved with TS6.0.3 compatible with ESLint tooling;
initial lint errored on an intentionally ignored generated-only directory; lint command fixed.
Extraction attempted before dependencies were available and then passed after installation.
No force install or suppressing of type errors. Original active question/data bytes unchanged.
