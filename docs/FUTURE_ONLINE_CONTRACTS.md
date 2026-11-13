# Future contracts, not implemented product features

The current offline main and generated Scripture questions both render through a semantic
single-choice adapter (`domain/quiz/session.ts`). Knowledge/category/difficulty stay on original
records; the response form is separate. Existing memo exercise types are learning exercises,
not newly activated quiz modes. Source question IDs survive shuffling and ordering unchanged.
The existing graph is retained as data with explicit identities and scriptural evidence; no
large graph population or inferred name merge is performed during migration.

QuestionExposureEvent is a future versioned contract. Current history is a legacy aggregate,
not a reconstructed event log. An absent entry maps to UNKNOWN; aggregate entries retain their
recorded evidence but exact events remain UNKNOWN. No new event collection is activated.
SelectionStrategy is an injection boundary; the existing measurable selector remains in use.

Keep journey RP (long-term participation), competitive skill rating (comparative performance),
per-session game score and category mastery medals (repeated cross-form evidence) distinct.
No RP, Conformer timeline, medal, league or rating service exists in this migration. Future
Conformer draft is >=18 months of sustained participation, subject to versioned policy.
Future taxonomy labels such as Royalty, Son of a Prophet and Discipled Scribe are planning
vocabulary, not active screen labels. Existing 33 category labels remain exactly preserved.

Standard competition would share questions and conditions. A separately agreed optional
Balanced Competition must not secretly adapt to rank: provisional exposure-based adjustment
requires actual records of >=2 encounters with that question/version, with both players'
evidence considered. Unknown exposure cannot justify an adjustment. No such algorithm runs now.

Offline answer bundles are visible to clients. Future competitive matches require a protected
bank and server-authoritative evaluation, authorization, synchronized sessions and anti-abuse
rules behind adapters; browser correctness is not trusted scoring. No Supabase/Firebase,
accounts, rooms, chat, payments, cloud sync, analytics or room capacity is configured. Future
room limits and final online policy must come from a separate approved specification.
