import test from "node:test"
import assert from "node:assert/strict"
import { addFish, getState, removeFish, resetTank, restoreFish, setGallons } from "../src/store.js"
import { SPECIES } from "../src/species.js"

test("store CRUD and reset", () => { resetTank(); setGallons("10"); const fish = addFish(SPECIES[0]); assert.equal(getState().fish.length, 1); const removed = removeFish(fish.uid); assert.equal(removed?.fish.name, "Neon Tetra"); restoreFish(fish, removed?.index ?? 0); assert.equal(getState().fish.length, 1); assert.equal(removeFish("missing"), null); resetTank(); assert.deepEqual(getState(), { gallons: null, fish: [] }) })
test("store rejects invalid gallon input", () => { setGallons("0"); assert.equal(getState().gallons, null); setGallons("nope"); assert.equal(getState().gallons, null) })
