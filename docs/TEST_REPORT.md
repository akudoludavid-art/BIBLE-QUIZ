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
