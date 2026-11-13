# Inherited defect register

ID | Severity | Evidence / behavior | Migration disposition
---|---|---|---
LD-CUSTOM-CORRUPT | High | Set custom key to [null], reload: prepareCustom reads null.book; memo hub absent; browser-baseline.json | Runtime decoder/quarantine with recoverable raw data required before Gate 3; original untouched
LD-IMPORT-VERSION | High | mergeBackup accepts v999; reproduced in phase0 | Reject unsupported schema; source fixture and rollback tests before Gate 3
LD-IMPORT-VALIDATION | High | Source checks box but not dates/full field shape/size; no preview/replace checkpoint | Required Phase 3 additions, not claimed baseline functionality
LD-ROTATION-QUOTA | Medium | Rotation.save catch ignores error | Preserve algorithm, surface adapter failures; original remains intact
LD-COMMIT-CRASH | Medium | Multiple localStorage writes best-effort rollback only | Tested staging/recovery before Gate 3
LD-LCS-SIZE | Medium | diff allocates (targetWords+1)*(typedWords+1) matrix | Preserve semantics; measure/bound safe handling for huge inputs without truncating stored text
LD-MEMO-SCOPE | Low | My Memorised Verses filters only SCRIPTURES, not custom/PV | Preserve existing behavior and explain; no new mode expansion
LD-EMPTY-ROTATION | Low | Result Home calls Rotation.release('') twice due dead activeKey/factKey | Do not infer history from this empty bag; eliminate only with logged harmless-cleanup evidence
LD-KEY-REPEAT | Medium | Next can be called programmatically after completion, no state guard; normal UI hides it | React transition guard and rapid-input test required
LD-HISTORICAL-PIPELINE | Historical | v13 run overrides start, short sessions and wrong scope | Keep v13 archived; do not reactivate its superseded generator

No migration behavior fixes have been made in Phase 0. Normal baseline suites pass; these defects
are separate reproduced/inspected edge cases, not hidden by a green audit gate.
