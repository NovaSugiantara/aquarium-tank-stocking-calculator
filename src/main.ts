import { getRatio, getStockStatus, getTotalInches } from "./calculator.js"
import { SPECIES } from "./species.js"
import { addFish, getState, removeFish, resetTank, restoreFish, setGallons, subscribe } from "./store.js"
import { mountFishForm, updateFishForm, type FormRefs } from "./render/fishForm.js"
import { renderFishList } from "./render/fishList.js"
import { renderStatus } from "./render/statusPanel.js"
import { renderError } from "./render/states.js"
import { parseGallons } from "./validate.js"

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T
const loading = $("loading-state"), workspace = $("workspace"), error = $("error-state"), formRoot = $("fish-form"), statusRoot = $("status-panel"), listRoot = $("fish-list"), toast = $("toast")
let rawGallons = "", refs: FormRefs, toastTimer = 0
const showToast = (message: string, undo: () => void) => { window.clearTimeout(toastTimer); toast.hidden = false; toast.textContent = ""; const label = document.createElement("span"); label.textContent = message; const button = document.createElement("button"); button.textContent = "Undo"; button.addEventListener("click", () => { undo(); toast.hidden = true }); toast.append(label, button); toastTimer = window.setTimeout(() => { toast.hidden = true }, 5000) }
const render = () => { const state = getState(), ratio = getRatio(getTotalInches(state.fish), state.gallons), status = ratio === null ? null : getStockStatus(ratio); updateFishForm(refs, state, rawGallons); renderStatus(statusRoot, state); renderFishList(listRoot, state.fish, status, uid => { const removed = removeFish(uid); if (removed) showToast(`${removed.fish.name} removed`, () => restoreFish(removed.fish, removed.index)) }) }
const fail = (reason: unknown) => { workspace.hidden = true; loading.hidden = true; renderError(error, reason instanceof Error ? reason.message : "Calculator could not render. Reset and try again.", () => window.location.reload()) }
const redraw = () => { try { render() } catch (reason) { fail(reason) } }
const init = () => { try { refs = mountFishForm(formRoot, SPECIES, () => { const species = SPECIES.find(item => item.id === refs.species.value); if (getState().gallons && species) addFish(species) }, () => { rawGallons = ""; resetTank() }); refs.gallons.addEventListener("input", () => { rawGallons = refs.gallons.value; setGallons(parseGallons(rawGallons)) }); subscribe(redraw); workspace.hidden = false; loading.hidden = true; redraw() } catch (reason) { fail(reason) } }
window.setTimeout(init, 100)
