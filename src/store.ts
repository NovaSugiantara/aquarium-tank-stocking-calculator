import type { Species, TankFish, TankState } from "./types.js"
import { parseGallons } from "./validate.js"

let state: TankState = { gallons: null, fish: [] }
const listeners = new Set<(state: TankState) => void>()
const publish = () => listeners.forEach(listener => listener({ gallons: state.gallons, fish: [...state.fish] }))
export const getState = () => ({ gallons: state.gallons, fish: [...state.fish] })
export const subscribe = (listener: (state: TankState) => void) => { listeners.add(listener); return () => listeners.delete(listener) }
export const setGallons = (raw: string | number | null) => {
  state.gallons = typeof raw === "string" ? parseGallons(raw) : typeof raw === "number" && Number.isFinite(raw) && raw > 0 ? raw : null
  publish()
}
export const addFish = (species: Species) => {
  const fish: TankFish = { ...species, uid: crypto.randomUUID(), speciesId: species.id }
  state.fish.push(fish); publish(); return fish
}
export const removeFish = (uid: string) => { const index = state.fish.findIndex(fish => fish.uid === uid); if (index < 0) return null; const [removed] = state.fish.splice(index, 1); publish(); return { fish: removed, index } }
export const restoreFish = (fish: TankFish, index: number) => { state.fish.splice(Math.max(0, Math.min(index, state.fish.length)), 0, fish); publish() }
export const resetTank = () => { state = { gallons: null, fish: [] }; publish() }
