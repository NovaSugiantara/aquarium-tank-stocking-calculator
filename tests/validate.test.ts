import test from "node:test"
import assert from "node:assert/strict"
import { parseGallons } from "../src/validate.js"

test("gallon validation", () => { assert.equal(parseGallons("10"), 10); assert.equal(parseGallons(" 2.5 "), 2.5); assert.equal(parseGallons(""), null); assert.equal(parseGallons("-1"), null); assert.equal(parseGallons("Infinity"), null) })
