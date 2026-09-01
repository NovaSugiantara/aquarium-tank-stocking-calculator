import test from "node:test"
import assert from "node:assert/strict"
import { formatNumber, getHeadroom, getRatio, getStockStatus, getTotalInches } from "../src/calculator.js"

const fish = [{ inchSize: 1.5 }, { inchSize: 2 }] as never[]
test("calculator handles totals, ratio, headroom", () => { assert.equal(getTotalInches(fish), 3.5); assert.equal(getRatio(3.5, 10), .35); assert.equal(getHeadroom(3.5, 10), 6.5); assert.equal(formatNumber(3.55), "3.5") })
test("status thresholds are exact", () => { assert.equal(getStockStatus(.7), "safe"); assert.equal(getStockStatus(.7001), "getting-full"); assert.equal(getStockStatus(1), "getting-full"); assert.equal(getStockStatus(1.001), "overcrowded") })
test("invalid tank never creates ratio", () => { assert.equal(getRatio(3, 0), null); assert.equal(getRatio(0, null), null); assert.equal(getHeadroom(3, -1), null) })
