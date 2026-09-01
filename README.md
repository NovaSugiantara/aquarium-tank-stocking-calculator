# Aquarium Tank Stocking Calculator

Plan a freshwater tank one fish at a time. The widget compares your fish list with the classic **1 inch of fish per gallon** rule.

## Run locally

```sh
npm install
npm run build
```

Serve `dist/` with any static web server, then open `dist/index.html`. Tests run with:

```sh
npm test
```

## How it works

- Enter a tank size in US gallons.
- Choose a preset species. Each option includes its emoji and fixed inch size.
- Add fish to see total inches, ratio, status, and remaining capacity update live.
- Remove individual fish. A 5-second Undo action restores the removed fish.
- Reset clears the current tank and fish list.

Status thresholds:

| Ratio | Status |
| --- | --- |
| `≤ 0.7` | Safe |
| `> 0.7` and `≤ 1.0` | Getting full |
| `> 1.0` | Overcrowded |

Invalid, empty, zero, negative, and non-finite gallon values block Add fish and show inline feedback. Existing fish stay in the list while the tank size is invalid.

## Project structure

- `src/species.ts` — immutable preset species data.
- `src/calculator.ts` — pure totals, ratio, status, headroom, and formatting functions.
- `src/validate.ts` — gallon input validation.
- `src/store.ts` — in-memory state and pub-sub updates.
- `src/render/` — form, status, fish list, and error-state rendering.
- `src/main.ts` — DOM wiring and error boundary.
- `tests/` — zero-dependency Node test suite.

No backend or cross-session storage. Reloading starts a fresh tank. The build uses TypeScript and Tailwind CDN; it adds no npm runtime dependency.

## Source-size check

README, docs, `dist/`, and `node_modules/` are excluded from the challenge cap. Measure app source with:

```sh
wc -c index.html style.css src/*.ts src/render/*.ts tests/*.ts package.json tsconfig.json
```
