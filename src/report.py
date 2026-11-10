import json,hashlib
from pathlib import Path
from collections import Counter
p=Path(__file__).resolve().parents[1]
read=lambda f:json.loads((p/f).read_text())
c=read('qa/counts.json');b=read('src/bank.json');l=read('qa/legacy-data.json');base=read('qa/baseline-inventory.json');mapping=read('src/legacy-equivalences.json');by={q['id']:q for q in b}
migration=[]
for r in l['FACT_ROWS']:
 id='F|'+r[6];target=id if id in by else mapping.get(id);migration.append({'id':id,'status':'repaired-retained' if id in by else 'consolidated' if target else 'withheld','target':target,'reason':'Source-qualified wording, reviewed alternatives and explicit references.' if target else 'The could-not-have-met claim requires chronological proof beyond an unqualified narrative inference.'})
for r in l['AB']:
 id='A|'+r[1];target=id if id in by else mapping.get(id);migration.append({'id':id,'status':'repaired-retained' if id in by else 'consolidated' if target else 'withheld','target':target,'reason':'Duplicate knowledge point consolidated or wording/identity repaired; original retained in backup.' if target else 'Agrippa I historical identification needs a separately documented historical source; James identity and imprisonment remain covered by source-qualified items.'})
(p/'qa/legacy-migration.json').write_text(json.dumps(migration,indent=2))
exclusions=[]
for r in l['DATA']:
 for kind in ['story','kids','book']:
  exclusions.append({'id':r['t']+'|'+r['n']+'|'+kind,'status':'withheld-generator','reason':{'story':'Random name alternatives, broad references and sometimes shared descriptions need per-item editorial repair; original study record retained.','kids':'Children-list and unknown-descendant alternatives are weak or ambiguous; no padding of quiz sessions.','book':'Broad overlapping book ranges do not establish one uniquely correct alternative.'}[kind]})
(p/'qa/legacy-generator-exclusions.json').write_text(json.dumps(exclusions,indent=2))
byorigin={o:dict(Counter(q['difficulty'] for q in b if q['origin']==o)) for o in ['new','legacy-repaired']}
coverage=['# Bible Mastery v14 coverage','',f"{c['total']} approved question records, {c['distinctKnowledgePoints']} distinct knowledge groups. Book totals overlap for cross-book items.",'','| Book | Total | Beginner | Intermediate | Advanced | Mastery |','|---|---:|---:|---:|---:|---:|']
for book,v in c['books'].items():coverage.append('| '+book+' | '+str(v['total'])+' | '+' | '.join(str(v['levels'].get(k,0)) for k in ['beginner','intermediate','advanced','mastery'])+' |')
coverage+=['','## Topics','','| Topic | Questions |','|---|---:|']+['| '+k+' | '+str(v)+' |' for k,v in c['categories'].items()]
coverage+=['','All 66 books are represented. This is breadth, not exhaustive coverage. Most smaller books have only one to three approved items; Mastery has only 15 items. Royal history, geography, prophecy and early-church material are the best populated domains. Detailed offerings, territorial lists and full genealogical coverage remain incomplete.']
(p/'Bible_Mastery_v14_Coverage_Report.md').write_text('\n'.join(coverage)+'\n')
status=Counter(x['status'] for x in migration)
audit=f'''# Source audit

## Safeguarded baseline

Input: `original/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html`.
SHA-256: `{hashlib.sha256((p/'original/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html').read_bytes()).hexdigest()}`.
All inline CSS, SVG symbols, four script blocks, data arrays, handlers and storage
paths were inspected before implementation. Baseline capture is machine-readable
in `qa/baseline-inventory.json`; extracted source blocks and data are retained.

| Inventory | Actual |
|---|---:|
| Character records including DATA.push expansion | 265 |
| Built-in KJV scriptures | 115 |
| Parables / miracles | 20 / 20 |
| FACT_ROWS / AB authored records | 42 / 36 |
| Original character template units (potential, not validated questions) | 795 |

The specification's estimate of 110 characters excluded a substantial expansion.
The original 795 character units were not 795 verified distinct knowledge points.

## Findings and changes

- A later `run()` called the original start, then replaced its selected quiz via
  `hardSet()` or `normalSet()`. This created discarded exposures and bypassed
  persistent rotation for much of the displayed bank. The final app has exactly
  one character quiz `start()` and no `hardSet`, `normalSet` or random family-chain
  generator. Scripture sessions retain their independent v2 shuffle bags.
- AB's `n` meant normal-bank membership, not New Testament. Its normal additions
  ignored Testament selection. Baseline NT play included Nathan, Adonijah and
  the valley of Elah. Actual scope is now derived from supporting books; cross-
  Testament questions are assigned CROSS and offered in Mixed/Hard.
- Baseline sessions measured 20 OT, 17 NT, 17 Mixed and 19 Hard questions in the
  sampled run. Filtering after selection caused shortages despite available data.
  Reviewed eligible pools now supply 20 in all four modes.
- Random story distractors permitted shared descriptions, including the ten sons
  of Haman. Children-list questions and overlapping book ranges were weak.
  All 795 template units are explicitly listed as withheld, not claimed as
  validated migrations. All 265 study records remain available. **Complete
  migration of valid legacy story questions is still outstanding.**
- Of 78 authored source records: {status['repaired-retained']} retained under original IDs,
  {status['consolidated']} consolidated through explicit mappings, {status['withheld']} withheld.
  This yields 75 legacy-origin quiz records because duplicates consolidate.
  See `qa/legacy-migration.json` for every individual disposition.
- Repairs include Jehu's commanding role versus the eunuchs' physical act,
  Saul's narrated death versus the Amalekite's claim, same-name Zechariahs and
  Ahaziahs, source-qualified chronology, precise family-chain links and the
  distinction between Josiah's wound site and death location in Chronicles.
- Study wording was corrected for Jehu/Jezebel, unsupported certainty about
  Athaliah's mother, Ahithophel's named son Eliam, Othniel's son Hathath and the
  conflation of Saul's sons Abinadab and Ishvi. Supporting passages are recorded
  in the source-review work. Other inherited study claims are not all re-certified.
- Study/browse interpolation now escapes strings; custom passages already use
  text nodes. The browser XSS fixture renders markup as literal text.
- Main quiz feedback uses text nodes, supplies correct/wrong text and references,
  and only inserts explanations after selection. Keyboard input ignores form
  controls and editable content. Reduced motion also disables confetti.

## Storage audit

`bibleMemo_v1`, `bibleCustomScriptures_v1` and `bibleQuizRotation_v2` remain intact.
Character history uses `bibleMasteryHistory_v14` with an explicit version.
Legacy bag entries import only known displayed IDs, excluding inflight IDs; no
correct/incorrect results or exact historical attempt totals are invented.
The old bag remains untouched by this import.

Pasted text previously used trim() on storage; it now retains boundary whitespace,
line breaks and Unicode. Editing keeps the original confirmation semantics.
Custom editing and deletion commit custom and memo keys together with rollback
on a write failure. Quota failures show a message and do not show successful save.

Backup v3 adds new quiz history while retaining memo, custom and rot fields.
Restore accepts v1/v2/v3-shaped fixtures and merges missing records. Existing
progress wins conflicts; a conflicting custom passage is kept under another ID.
Repeated import reuses that conflict copy. No localStorage.clear() is introduced.
This is best-effort rollback over localStorage, not an atomic database transaction:
abrupt browser termination between two writes is still a limitation.

Real user's browser content was never available to this environment. Compatibility
is demonstrated with fixtures, not a claim to have migrated the user's actual data.
Export from the old file and restore in the new one when changing file paths or
browsers, since file-origin storage availability differs by browser.

## Source verification limits

All shipped quiz items were compared with downloaded ASV supporting passages,
including their question wording and options; the ledger retains those passages.
Structural validators do not prove biblical truth. This is the implementing
assistant's editorial review; no independent human scholarly review was performed.
The full 20-type ontology, exhaustive individual distractor property evidence,
quantitative 100-point editorial rubric and 2,000-item milestone remain incomplete.
'''
(p/'Bible_Mastery_v14_Source_Audit.md').write_text(audit)
testfiles=['engine','storage','content','browser','memorisation'];results={k:read('qa/'+k+'-results.json') for k in testfiles}
lines=['# Bible Mastery v14 implementation report','','## Status','',
'A working, tested incremental implementation of the supplied v14 specification. The 2,000-item milestone and several full-release requirements are not complete. This report distinguishes the delivered application from those remaining targets.','',
'## Delivered application','',f"`Bible_Mastery_Quiz_v14_Ultra.html` — { (p/'Bible_Mastery_Quiz_v14_Ultra.html').stat().st_size:,} bytes, standalone HTML with no external scripts, fonts, styles or runtime service calls.",'',
'Original illustrated navy/gold layout, four modes, 20-question sessions, timer, scores, results, replay, study list, Scripture modes, 115 KJV scriptures, 20 parables, 20 miracles and the three-option memorisation hub are retained.','',
'## Actual content counts','',f"Approved in this implementation: **{c['total']} question records / {c['distinctKnowledgePoints']} distinct knowledge groups**, comprising **{c['origin']['new']} new** and **{c['origin']['legacy-repaired']} retained/repaired legacy** records. Two inverse formulations share knowledge groups and cannot occur together. Neither the original scripture-exercise variants nor raw generation possibilities inflate these numbers.",'',
'| Difficulty | New | Legacy | Total | Target |','|---|---:|---:|---:|---:|']
for lvl,t in [('beginner',200),('intermediate',400),('advanced',700),('mastery',700)]:lines.append(f"| {lvl.title()} | {byorigin['new'].get(lvl,0)} | {byorigin['legacy-repaired'].get(lvl,0)} | {c['levels'].get(lvl,0)} | {t} |")
lines+=['',f"OT: {c['testament']['OT']}; NT: {c['testament']['NT']}; CROSS: {c['testament']['CROSS']}. Hard Mode uses only the {c['levels']['advanced']+c['levels']['mastery']} Advanced/Mastery items. The requested overall 70% Advanced/Mastery mix has not been reached.",'',
'All 66 books have coverage. Larger narrative books and Acts are better populated; the wisdom books, minor prophets and short epistles remain thin. Detailed counts are in `Bible_Mastery_v14_Coverage_Report.md`.','',
'## Selection and persistence','',
'Eligible reviewed items are sampled using flexible least-filled topic groups, with book/era diversity penalties and weighted randomness. Unseen weight is 3; recently exposed questions have a cooldown; spaced missed questions get a 1.55 multiplier; frequency mildly reduces weight. Every item always retains a positive weight. Session selection excludes duplicate IDs, knowledge groups and explicitly grouped events. The selected order and answer choices use Fisher–Yates. RNG injection makes tests repeatable.','',
'Only a rendered question records exposure; only answering records an attempt and correctness. Statistics persist in the new namespaced history key. Old correct questions remain eligible; no permanent used-flag exists. The session counter counts started sessions, not only completed sessions.','',
'## Executed tests','',
'| Command | Result | Evidence |','|---|---|---|',
'| Rebuild and inline JavaScript syntax checks | PASS | Tested HTML, source ledger, bank and counts reproduced byte for byte; all five inline scripts parse |',
f"| `node tests/engine.cjs` | {results['engine']['status']} | {results['engine']['checks']:,} assertions; {results['engine']['selections']:,} selections: 10,000 real-pool sessions and 10,200 synthetic selections |",
f"| `python tests/content.py` | {results['content']['status']} | {results['content']['checks']:,} checks including 30 hazard fixtures, source references, graph endpoints, forward/reverse genealogy, source preservation and pipeline checks |",
f"| `node tests/storage.cjs` | {results['storage']['status']} | {results['storage']['checks']} assertions: rollback, conflict copies, repeated restore, v1/v2/v3 shapes, invalid records and prototype keys |",
f"| `node tests/browser.cjs` | {results['browser']['status']} | {results['browser']['checks']} browser assertions; all four complete quizzes, Scripture modes, custom CRUD, Unicode/XSS, drafts, pause/resume, restore, quota, mobile, keyboard and offline operation |",
f"| `node tests/memorisation.cjs` | {results['memorisation']['status']} | {results['memorisation']['checks']} extended assertions; complete learning ladder, four blank levels, typed recall/reference, due scheduling, review draft, cold offline document bootstrap and malformed quiz pack isolation |",'',
'Baseline tests reproduced scope leakage and short sessions; these failures were diagnosed and corrected. Initial v14 browser test failures were a subtitle-sensitive test locator and an expired local test-server output stream. Tests now own their local server lifecycle. No known failing check remains in the executed suites.','',
'No browser page errors or external app requests were observed in tested flows. Screenshots were actually captured at 320, 360, 390 and 1280px; the 320px screenshot was visually inspected. Stored fixtures cover v1/v2/v3 formats; original exported backups from every historical v11/v12 release were not provided and were not tested.','',
'**Direct `file://` test: BLOCKED, not passed.** Managed Chromium returned `ERR_BLOCKED_BY_ADMINISTRATOR`. The app has no server dependency; ordinary browser static execution and cold bootstrap with all document bytes supplied locally and the browser offline passed. This does not substitute for an unrestricted Chrome file-permission test.','',
'## Observed distribution','', '| Mode | Eligible | Seen across 2,500 sessions | Minimum topics/session | Max from one topic | Adjacent-session repeat rate |','|---|---:|---:|---:|---:|---:|']
for mode,r in results['engine']['report'].items():lines.append(f"| {mode} | {r['pool']} | {r['seen']} | {r['minimumCategories']} | {r['maxCategory']} | {r['adjacentRepeatRate']:.2%} |")
lines+=['','All four answer positions occurred in seeded repeated presentations. No item was starved in the runs, but this is measured evidence, not a mathematical guarantee for every possible random seed. Smaller/scoped pools necessarily recur more often.','',
'## Sources and editorial QA','',
'ASV (1901), public domain, downloaded during implementation from `scrollmapper/bible_databases` at the revision in `qa/sources/revision.txt`; the data snapshot and its SHA-256 are retained. The repository software license is MIT and is included in `qa/sources/LICENSE` and the unobtrusive app attribution section. The official WEB site was unavailable under the network policy; no WEB attribution or source-verification claim is made. Existing KJV text was preserved rather than silently replaced or expanded with a new full translation.','',
'All 289 shipped records have exact resolved passage references and explanation/contrast fields. The implementing assistant inspected the supporting excerpts for all shipped questions. Independent human editorial approval has not been obtained. Option-specific contrasts were written for the most intricate questions; many simpler contrasts are concise source-identification explanations, not a comprehensive property graph of every wrong answer.','',
'Of the 78 authored legacy records, 62 retain their original IDs, 14 map to consolidated replacements, and 2 remain withheld. This accounts for 75 legacy-origin output records. All 795 original character-template units are withheld pending safe per-item repair; their 265 underlying study records remain in the app and the complete original file is backed up. These are explicit limitations to full legacy quiz preservation, not 795 proven false biblical facts.','',
'## Remaining work / continuation','',f"1. Reach 2,000 substantively distinct items: the bank is **{2000-c['total']} records short and {2000-c['distinctKnowledgePoints']} distinct knowledge groups short**. Count distinct knowledge groups toward the target; expand Mastery substantially and increase the Advanced/Mastery proportion.",
'2. Repair and reintegrate valid legacy character-story knowledge points from `qa/legacy-generator-exclusions.json`, with exact passages and curated options. Resolve the two withheld authored records in `qa/legacy-migration.json`.',
'3. Expand the initial 18-entity/12-edge graph into the specified full ontology and richer identity/alias, legal, temporal, geography and genealogy models. The current quiz uses static reviewed records, not a fully graph-generated bank.',
'4. Add richer independently evidenced option properties and per-option reasons; complete the editorial grading rubric and external human review. Difficulty classifications are editorial judgments, not measured learner psychometrics.',
'5. Test direct file opening in unrestricted Chrome and real historical backups if available. Broaden touch/screen-reader testing; present automated desktop/mobile checks are not a full assistive-technology audit.',
'6. For very long typed passages, the inherited longest-common-subsequence comparison remains quadratic in word count. It was preserved and is not certified for arbitrarily large pasted books.',
'', 'The executable continuation workflow is in `README.md`. Author rows, inspect actual evidence, update grouping/identity metadata, run the builder and all listed tests, then regenerate this report. Do not re-enable the old random generators to reach a numeric goal.','',
'## User data and privacy','',
'All data stays in this browser. There are no accounts, telemetry or uploads. Existing keys remain, and backup v3 merges prior supported formats. Export a backup in the old file before transferring to a new file, browser or device; localStorage key compatibility does not guarantee shared access across file origins.','']
(p/'Bible_Mastery_v14_Implementation_Report.md').write_text('\n'.join(lines))
print('Wrote audit, implementation report, coverage and legacy ledgers.')
