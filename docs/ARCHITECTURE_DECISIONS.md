# Architecture decisions

1. Baseline: tested v14 HTML and matching upload. v13 is historical evidence, not a generator
   to reactivate. Original root source/build files are retained alongside archived originals.
2. Phase 1 extracts exact source data through a pinned-checksum script, reconciles it against
   the independent browser capture, and emits an auditable per-record ledger. TypeScript
   source data is generated, not hand-transcribed or independently authored.
3. Pure domain code imports only domain types and static data. Clock, RNG, state and storage
   dependencies are injected or supplied. Main selector arithmetic and Scripture rotation
   are source-equivalent; regression tests execute the original implementations as oracles.
4. Semantic choice IDs drive a pure session transition. Stale/duplicate submissions and
   invalid transitions do not score. This explicitly guards a legacy edge case while
   preserving normal click/key behavior. A quiz timer is elapsed time, not a countdown.
5. localStorage remains the source-compatible adapter. Atomic import staging/validation and
   full-field recovery are Phase 3 work; MemoryStore supports deterministic failure tests.
6. Strict TypeScript is enabled. noUncheckedIndexedAccess is deferred during this incremental
   extraction; bounded array access is exercised by source-equivalence tests. No explicit any
   or ts-ignore is used in domain code. Runtime input validation remains required at boundaries.
7. Current registry metadata: React/DOM19.3.1, Vite8.3.8, Vitest5.1.0; Node24.22.1 is compatible.
   TypeScript7.0.2 could not satisfy typescript-eslint8.72.2's <6.1 peer requirement; choose
   compatible stable TS6.0.3 with committed lockfile, no force/legacy-peer-deps override.
   Official sites were denied by network policy; official documentation source mirrors were
   fetched from reactjs/react.dev, vitejs/vite, microsoft/TypeScript and vitest-dev/vitest on
   GitHub. Copies are in evidence/toolchain; Vite requires20.19+/22.12+, Vitest22.12+.
8. No React shell is presented as completed migration. Gate 1 is extraction; Gate 2 owns actual
   visual components. Legacy HTML remains usable throughout; production deployment is not authorized.
