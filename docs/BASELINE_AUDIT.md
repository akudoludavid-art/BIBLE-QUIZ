# Phase 0 forensic baseline audit

Recovery date: 2026-11-13 (Africa/Lagos). Repository: akudoludavid-art/BIBLE-QUIZ.
Fetched all advertised heads/tags: only origin/main at 2b28404fcb361e73e03882d172f9435fb2a53fc4.
Local work was clean; no package.json, lockfile, React source, migration docs or branches existed.
Reflog contained initial checkout; fsck found only an empty unreachable tree, no recoverable migration commit.
The preceding session never got a ready environment; no migration gate was completed there.

## Selected functioning baseline

`Bible_Mastery_Quiz_v14_Ultra.html`, 696719 bytes, SHA-256
`61903e3bdcdd89bca784fe9fcb327d16fc5068811d63fbce0bb11e41ab60e05a`.
The uploaded `(1).html` is byte-identical. Selection is based on browser checks, complete current features,
correct scoped 20-question sessions and release provenance, not filename ordering.
Historical v13 is executable but reproduces short sessions (16, 17, 17, 19
for OT/NT/Mixed/Hard in this seeded run) and NT leakage of A|nathan/A|amos/A|adonijah.
v14 has 20 in all modes and passes 224 existing UI assertions plus 10 extended memo checks.
The old snapshot within the tracked delivery ZIP is the same release, not a newer migration.

Both inputs are byte-for-byte archived read-only under `legacy/original/`.
`legacy/ORIGINAL_SHA256.txt` records bytes, source, Git provenance, timestamp and checksums.
Git objects and checksum tests provide recovery/tamper detection; read-only file permissions are not WORM security.
Never edit or rebuild over these archive paths. Original release/build sources are unchanged.

## Comprehensive inventory

Machine evidence `evidence/phase0/source-inventory.json` records every AST declaration,
function/call site/mutation, registered/assigned handler, timer, storage call, HTML write,
DOM ID, section, SVG symbol/use, style block/media query and external asset reference for both files.
v14: 9 sections, 79 IDs, 5 inline scripts,
21 SVG symbols, 82 named function declarations,
39 event registration/assignment sites.
Memo subviews share memoBody; absence of a separate DOM section does not mean absence of a screen.
Styles: system Georgia/Times and Segoe/Arial hierarchy, navy/gold variables, 620px responsive breakpoint,
reduced-motion rule, floaty animation, canvas confetti/RAF and resize handler. No critical linked fonts/assets.

Main call path: mode -> start -> eligible/select -> render -> seen/persist -> answer -> answered/persist
-> Next -> render/finish. Timer is elapsed time, no countdown or speed bonus. No active session persisted.
Scripture: sPlan -> Rotation.draw -> buildS -> renderS/markShown -> answerS -> Next/result;
stop releases unshown IDs. Seven generator branches across the three source collections.
Memo: load/reloadCustom -> home/library/active -> add/resume -> ladder/EX or review/revEx/grade
-> save. Each passage owns its stage/draft/schedule. progress exports all four key classes.
Editor and restore use Storage14.commit. Input text uses text nodes; authored study interpolation is escaped.
Two independent mode click handlers update selection and label intentionally. No later override of v14 start.
Dead remnants hardNames, pausedScriptures and empty activeKey/factKey are documented rather than activated.

## Evidence and limits

44 screenshots at 320,360,768,1280: home, quiz, characters, Scripture menu/quiz/browse,
memo hub/active/library/editor/backup. The 320px editor was visually inspected.
New harness: 483 assertions, all 425 generator units validated, real UI v3 backup/draft refresh.
Existing suites provide full four-quiz results and the complete learning ladder. No application error in normal paths.
Direct file:// was attempted and blocked by managed Chromium policy; HTTP serves unchanged HTML bytes.
Cold document bootstrap interception is not PWA cache proof. React/PWA gates remain NOT RUN.

Unavailable: v10/v11/v12 HTMLs; BIBLE_MASTERY_REACT19_MIGRATION_ONLY_MASTER_PROMPT.txt;
CODEX_MIGRATION_PHASE_COMMANDS.txt; MIGRATION_ONLY_ACCEPTANCE_CHECKLIST.md; older Supabase prompts;
300-screen prototype. The old content spec is present as qa/specification-v14.txt and is superseded for scope.
No real personal browser backup was supplied; saved fixture data is source UI-created test state only.

Gate 0: PASS with explicit file-protocol/historical-source limitations; next permitted gate is typed extraction.
