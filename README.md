# Aquarium Tank Stocking Calculator

Small, dependency-light TypeScript widget for checking freshwater stocking against the 1 inch of fish per gallon rule.

## Run

```sh
npm install
npm run build
```

Open `dist/index.html` in a static host. Tests run with:

```sh
npm test
```

No backend or cross-session storage. Fish presets stay fixed; tank state lives in memory and resets on reload.

Source stays split by concern: `src/calculator.ts` is pure logic, `src/store.ts` owns in-memory state, and `src/render/` owns DOM updates.
