# Persistence inventory

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
