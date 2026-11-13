import json,hashlib,shutil,subprocess
from pathlib import Path
from collections import Counter
p=Path('.')
read=lambda x:json.loads(Path(x).read_text())
a=read('docs/evidence/phase0/source-inventory.json')[0]; b=read('docs/evidence/phase0/browser-baseline.json');d=read('tests/fixtures/legacy/source-data-v14.json')
for k in ['content','storage']:shutil.copyfile('/tmp/bm-baseline/qa/'+k+'-results.json','docs/evidence/phase0/'+k+'-results.json')
functions={f['name']:f['line'] for s in a['scripts'] for f in s['functions']}
# Explicit source-derived journeys, including subviews inside the single memo section.
rows=[
('HOME','home','mode click/start','Four original modes, selected OT initially; start label tracks selection','none','features/home','T02','browser'),
('QUIZ','start','start/replay','20 reviewed records; eligibility OT/NT/Mixed/Advanced+Mastery; fresh session on replay','bibleMasteryHistory_v14','features/quiz','T03–T06','browser'),
('SELECT','select','new session','Weighted topic/book/era balance with positive recurrence weights; no algorithm change','bibleMasteryHistory_v14','domain/questions','T08/X02','engine'),
('ANSWER','answer','choice/key','One score point for correct semantic ID; lock prevents double-answer; feedback and references','bibleMasteryHistory_v14','domain/quiz','T03–T06/X05','browser'),
('OPTIONS','shuffle','question display','Fisher–Yates options; stable correctOptionId; no answer position key','none','domain/questions','X02','engine'),
('TIMER','updateTimer','start/finish/stop','Elapsed seconds, no countdown or time bonus; clear interval on stop/finish','none','features/quiz','T25/T27','source'),
('NEXT','render','Next/Enter','Progress advances after response; actual exposure at display','bibleMasteryHistory_v14','features/quiz','T03–T06','browser'),
('RESULT','finish','last Next','Score fraction, threshold result copy, final elapsed time, replay/home','none','features/quiz','T03–T06','browser'),
('STOP','twoTap','stop twice within 3s','First tap arms text; second exits; timer clears; Scripture inflight released','bibleQuizRotation_v2','components','T27','browser'),
('KEYS','start','1–4/a–d/Enter','Keys ignored in input/textarea/select/contenteditable and modifier combinations','none','app','T21','browser'),
('CHARACTERS','show','Study List','265 character rows grouped OT/NT with children/book/story; no search/detail route exists','none','features/characters','T09','browser'),
('SCRIPTURE-MENU','scripturePool','Scripture Session','All, OT, NT, Parables, Miracles, My Memorised Verses, One Book','bibleMemo_v1','features/scripture-session','T10','browser'),
('SCRIPTURE-PLAN','sPlan','Start Scripture','20 except book min(10,max(5,2*passages)), bounded by available template IDs','bibleQuizRotation_v2','domain/questions','T10/X01','baseline'),
('SCRIPTURE-FORMS','buildS','generate selected ID','Book/reference/completion; parable name/reference; miracle name/reference','none','domain/questions','T07/X02','baseline'),
('SCRIPTURE-ROTATE','draw','draw/markShown/release','Remaining/seen/recent/inflight shuffle bag; release unshown and recirculate','bibleQuizRotation_v2','domain/questions','T08','source'),
('SCRIPTURE-ANSWER','answerS','choice/key','Lock, score +1, reveal KJV explanation; no timer','none','features/scripture-session','T10','browser'),
('SCRIPTURE-RESULT','startS','last Next/Again/menu','Score and threshold text; Again builds new session in selected focus','none','features/scripture-session','T10','source'),
('SCRIPTURE-MEMO','scripturePool','My Memorised Verses','Only built-in SCRIPTURES whose IDs are active; custom and PV do not enter pool','bibleMemo_v1','domain/questions','T10','source'),
('BROWSE','browse','Browse/search','115 passages; case-insensitive book/ref/text search; escaped content','none','features/scripture-session','T10','browser'),
('MEMO-HUB','home','Memorisation','Three destinations, overview, due/continue/open-library contextual action','bibleMemo_v1','features/memorisation','T11','browser'),
('ACTIVE','activeScriptures','My Memorisation','Active/Paused tabs, All/Learning/Reviewing/Mastered filter, counters','bibleMemo_v1','features/memorisation','T11','baseline'),
('ADD','add','+ Memorise','Initialize learning fields; existing record reactivated without reset','bibleMemo_v1','domain/memorisation','T11','browser'),
('PAUSE','pause','Remove from active/Resume','Active false preserves progress and custom passage; missing flag means active','bibleMemo_v1','features/memorisation','T11','browser'),
('SWITCH','learningNav','select/previous/next','Independent progress and drafts; circular active passage navigation','bibleMemo_v1','features/memorisation','T13/X07','browser'),
('LONG','passageText','summary toggle','Collapse >220 chars, >3 lines or >45 words; full exact text retained','bibleCustomScriptures_v1','components','T12/X04','browser'),
('LIBRARY','lib','library/filters/search/more','121 built-in entries; topic/testament/book/status/source filters; 30-row increments','none','features/memorisation','T11','baseline'),
('EDITOR','scriptureEditor','Paste/Edit/Save','Exact text; trim book/ref only; duplicate built-in reference confirmation','bibleCustomScriptures_v1','features/memorisation','T11/X04','browser'),
('EDIT-RESET','scriptureEditor','confirm changed text','Restart only that passage learning; retain active/paused and added timestamp','bibleMemo_v1','features/memorisation','T11','browser'),
('DELETE','removeCustom','Delete/confirm','Only selected custom passage and its history removed; rollback on failed storage','bibleMemo_v1 + bibleCustomScriptures_v1','features/memorisation','T11/T26','browser'),
('PLAN','ladder','Continue learning','Each verse then cumulative ranges; final read/blank/first/ref/type/precision stages','bibleMemo_v1','domain/memorisation','T12/T14','memorisation'),
('BLANK','pickBlanks','guided recall','Stopword/length weighted random blanks at 20/40/60/85%; saved indices and values','bibleMemo_v1','domain/memorisation','T13','memorisation'),
('READ','ladder','read confirmation','Explicit I have read it advances; no inferred success','bibleMemo_v1','features/memorisation','T14','memorisation'),
('TYPED','typed','first/full/precision Check','LCS diff, missing/extra/moved/similar words, reference precision cap; typing stats','bibleMemo_v1','domain/memorisation','T14','memorisation'),
('REFERENCE','ladder','reference choice','Same-book distractors preferred; four unique references from library','bibleMemo_v1','domain/memorisation','T14','memorisation'),
('RECITE','revEx','Reveal/Got/Almost/Missed','Self-assessed recitation review at later alternating daily stages','bibleMemo_v1','features/memorisation','T14','source'),
('CONTEXT','learned','complete ladder','Book context choice for single/custom verses; compound PV skips; Finish','bibleMemo_v1','features/memorisation','T14','memorisation'),
('GRADE','grade','review result','Got >=.95, Almost >=.75, Missed below; boxes0–6; 10m,1,3,7,14,30,60d','bibleMemo_v1','domain/memorisation','T14','memorisation'),
('DUE','review','Review Due/Practise','Rank overdue/difficult/early; first10; one additional attempt per missed passage','bibleMemo_v1','domain/memorisation','T14','memorisation'),
('DRAFT','typed','input/refresh','Blank indices/values or typed text/ref keyed cs:ls:mode; restored on switch/refresh','bibleMemo_v1','features/memorisation','T13/T27','baseline'),
('PROGRESS','progress','Progress & Backup','Learning/due/mastered, current PV stage, difficult and recent improvements','bibleMemo_v1','features/memorisation','T14','baseline'),
('EXPORT','progress','copy backup textarea','v3 includes entire memo, custom records, raw rotation string and quiz history','all four keys','lib/backup','T15','baseline'),
('RESTORE','mergeBackup','paste Restore','Merge only, existing progress wins; separate conflict passage; repeat import reuses it','all four keys','lib/backup','T15–T18','storage'),
('ROLLBACK','commit','write failure','Snapshot keys and best-effort rollback; alerts; not crash-atomic','all four keys','lib/persistence','T26/X08','storage'),
('ART','burst','initial/results/correct','21 SVG symbols, gradients, system fonts, confetti canvas; reduced motion suppresses burst','none','styles/components','T24','baseline'),
('MOBILE','passageText','320–desktop','Original one-column <=620px, wrapping and native text entry','none','styles','T22','baseline'),
('PRIVACY','showAny','load/use offline','No runtime external request observed; file-origin data never silently transferable','all four keys','lib/offline','T19/X09','browser'),
('HISTORY','history','startup/exposure/answer','v14 aggregates and v2 ID mapping; unknown exact prior timestamps/counts not invented','bibleMasteryHistory_v14','domain/questions','X10','engine')]
lines=['# Feature parity matrix','','Baseline = `legacy/original/Bible_Mastery_Quiz_v14_Ultra.html`. React parity is NOT RUN until implemented; baseline evidence is scoped below. `source` indicates inspected code, not executed feature proof. All exact handlers, call sites and mutations are enumerated in `evidence/phase0/source-inventory.json`.','','Feature ID | Legacy file + source location | Screen | Trigger | Baseline behavior | Data/storage key | React target | Test ID | Evidence | Status','---|---|---|---|---|---|---|---|---|---']
for id,fn,trig,behavior,storage,target,test,ev in rows:
 loc={'HOME':164,'CHARACTERS':780,'KEYS':1208,'SCRIPTURE-RESULT':874}.get(id,functions.get(fn,164));lines.append(f'{id} | v14:{loc} ({fn}) | {target.split("/")[-1]} | {trig} | {behavior} | {storage} | src/{target} | {test} | phase0/{ev}; see TEST_REPORT | Baseline audited; React NOT RUN')
Path('docs/FEATURE_PARITY_MATRIX.md').write_text('\n'.join(lines)+'\n')
Path('docs/BASELINE_AUDIT.md').write_text(f'''# Phase 0 forensic baseline audit

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
Historical v13 is executable but reproduces short sessions ({', '.join(str(r['length']) for r in b['candidates'][0]['runs'])}
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
v14: {len(a['sections'])} sections, {len(a['domIds'])} IDs, {len(a['scripts'])} inline scripts,
{len(a['symbols'])} SVG symbols, {sum(len(s['functions']) for s in a['scripts'])} named function declarations,
{sum(len(s['events']) for s in a['scripts'])} event registration/assignment sites.
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
New harness: {len(b['checks'])} assertions, all 425 generator units validated, real UI v3 backup/draft refresh.
Existing suites provide full four-quiz results and the complete learning ladder. No application error in normal paths.
Direct file:// was attempted and blocked by managed Chromium policy; HTTP serves unchanged HTML bytes.
Cold document bootstrap interception is not PWA cache proof. React/PWA gates remain NOT RUN.

Unavailable: v10/v11/v12 HTMLs; BIBLE_MASTERY_REACT19_MIGRATION_ONLY_MASTER_PROMPT.txt;
CODEX_MIGRATION_PHASE_COMMANDS.txt; MIGRATION_ONLY_ACCEPTANCE_CHECKLIST.md; older Supabase prompts;
300-screen prototype. The old content spec is present as qa/specification-v14.txt and is superseded for scope.
No real personal browser backup was supplied; saved fixture data is source UI-created test state only.

Gate 0: PASS with explicit file-protocol/historical-source limitations; next permitted gate is typed extraction.
''')
counts={k:len(d[k]) for k in ['questions','characters','scriptures','parables','miracles']}
Path('docs/QUESTION_CONTENT_AUDIT.md').write_text('''# Question and content inventory

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
'''+''.join(f'{k} | {v}\n' for k,v in sorted(Counter(q['primaryCategory'] for q in d['questions']).items()))+'''
Per-record source provenance will be emitted by the checked Phase 1 extractor. Audit fixtures
are in tests/fixtures/legacy/source-data-v14.json and scripture-generated-seed447.json.
React target counts are NOT RUN until Gate 1 extraction; audit fixtures are not claimed as migration.
''')
Path('docs/STORAGE_INVENTORY.md').write_text('''# Persistence inventory

Four actual localStorage keys. No sessionStorage, IndexedDB, cookie, network sync or saved settings store found.
No user browser data was accessed; all observed writes occurred in isolated test contexts.

Key | Schema and writers | Readers / backup representation
---|---|---
bibleMasteryHistory_v14 | {version:14,session,items:{[questionId]:{attempts,correct,incorrect,exposures,streak,lastSeenSession,lastSeenAt,lastAnsweredCorrectly}}}; start/render/answer | Engine.history; v3 quizHistory object
bibleQuizRotation_v2 | {bags:{[poolKey]:{remaining:string[],seen:string[],recent:string[],inflight:string[]}}}; draw/markShown/release | Rotation.load; v3 rot is a raw JSON string or null, NOT an object
bibleMemo_v1 | {items:{[passageId]:MemoRecord}, plus retained unknown root fields}; add/pause/resume/drafts/ladder/grade/edit/delete/restore | load; v1/v2/v3 memo object
bibleCustomScriptures_v1 | array of {id,book,verse,text}; edit/delete/restore | reloadCustom; v2/v3 custom array

MemoRecord: cs (cumulative chunk index), ls (learning stage), bl (blank level1–4), fl (failed
learning attempts), box (-1 learning,0–6 review), due (epoch ms), diff (difficulty count), lapses,
tn (typed attempts), ts (summed accuracy), tb (best accuracy), up (last promotion time),
added (creation time), active (false pauses; absent means active), optional draft.
Draft: key cs:ls:exercise; blankIndices/values for gaps OR text/ref for typed recall.
Unknown fields must remain available for recovery. Missing optional fields are not implicit deletion.
IDs: built-in Book|reference; compound P|Book reference; user U|timestamp|random; conflict
copies append |restored-time-size. Do not derive identities from mutable passage text.
Runtime-only: current screen, chosen mode/book, session quiz/index/score/start time/locked,
review queue/retry set/tally, library filters/pagination, active tab/filter, confirmation timer.
Reload returns home; saved learning/drafts remain. No source browser-back route implementation.

v1 support: memo only fixture, missing active/custom fields. v2 adds rot/custom where present.
v3 adds quizHistory. Existing exports use textarea copy/paste; no file download/upload UI.
Source source/export -> import merge keeps existing progress, adds missing items and conflict
copies; repeat conflict import is idempotent. There is no preview, replace mode, durable staging,
size/date/version validator or recoverable pre-import snapshot. These are Phase 3 requirements.
Storage14.commit snapshots affected key strings and rolls back after thrown writes; abrupt process
termination or a rollback write failure can still leave partial data. Rotation.save swallows quota errors.
Corrupt history resets in memory; corrupt custom [null] reproduces an exception; memo load has weak schema validation.

File://, localhost and HTTPS storage origins differ. A React app cannot read the user's old file
storage automatically. Existing v3 export will be the source bridge; preserve raw inputs and exact text.
Do not clear legacy keys or auto-import personal data into another origin. No live online adapter is authorized.
''')
Path('docs/LEGACY_DEFECTS.md').write_text('''# Inherited defect register

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
''')
Path('docs/REQUIREMENT_CONFLICTS.md').write_text('''# Scope and baseline decisions

1. Latest user request and migration specification supersede historical no-React and 2,000-question expansion instructions. CONTINUE_V14.md is historical content-work guidance, not today's continuation.
2. v14 is the functioning current application. v13 contains withdrawn generators and more potential template combinations; preservation does not mean silently reactivating superseded questions. Both files and all legacy dispositions are retained.
3. Migration targets a built React application served over HTTP(S), with cached PWA offline support later. The self-contained HTML remains an independent fallback; React dist is not a file:// single-file deliverable.
4. Git commits/pushes are explicitly authorized after meaningful milestones. Production hosting, service activation, payments and backend credentials remain unauthorized.
5. User said continue autonomously: pass each gate with evidence before dependent work; do not seek routine reconfirmation. Environment limitations must be recorded, never converted to fabricated PASS results.
''')
Path('docs/TEST_REPORT.md').write_text(f'''# Executed migration evidence

Phase 0, 2026-11-13. Node24.22.1 / npm11.9.0 / Python3.12; Chromium {b['browser']} via Playwright.
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
''')
Path('docs/MIGRATION_STATUS.md').write_text('''# Migration status

2026-11-13, migration/react19-preservation. Baseline commit 2b28404.
Gate 0 PASS: read entire governing spec; recovered actual Git state; both HTMLs preserved with hashes;
comprehensive AST/content/storage/feature maps; executed tests, screenshots and source-derived fixtures.
Direct file:// limited by browser policy; current HTTP evidence and limitations documented.
Gate 1 NOT RUN. Gates 2–7 NOT RUN. Release NO-GO for React; existing v14 remains available.
Next: strict typed pure extraction from the archived v14 with source reconciliation and deterministic tests.
Do not regenerate old qa reports or run historical content expansion. Never edit legacy/original.
See MIGRATION_PROGRESS.md for the next exact command and Git backup checkpoints.
''')
Path('MIGRATION_PROGRESS.md').write_text('''# Bible Mastery migration recovery checkpoint

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
''')
print('Wrote Phase 0 reports; matrix rows',len(rows))
