import type { StockStatus, TankFish } from "../types.js"

export const renderFishList = (root: HTMLElement, fish: readonly TankFish[], status: StockStatus | null, onRemove: (uid: string) => void) => {
  root.className = `panel list-panel ${status ?? ""}`; root.innerHTML = `<div class="list-head"><h2 id="list-title">Fish in this tank</h2><span class="panel-note">${fish.length} ${fish.length === 1 ? "fish" : "fish"}</span></div><div class="fish-list"></div>`
  const list = root.querySelector(".fish-list") as HTMLElement
  if (!fish.length) { list.innerHTML = `<div class="empty"><span class="empty-icon">🫧</span><strong>Tank masih kosong.</strong><p>Choose a species above to add your first fish.</p></div>`; return }
  fish.forEach(item => { const row = document.createElement("article"); row.className = "fish"; const name = document.createElement("div"); name.className = "fish-name"; name.textContent = `${item.emoji} ${item.name}`; const meta = document.createElement("span"); meta.className = "fish-meta"; meta.textContent = `${item.inchSize.toFixed(1)} inch`; name.append(meta); const button = document.createElement("button"); button.className = "remove"; button.type = "button"; button.textContent = "×"; button.setAttribute("aria-label", `Remove ${item.name}`); button.addEventListener("click", () => { button.disabled = true; row.classList.add("leaving"); window.setTimeout(() => onRemove(item.uid), 180) }); row.append(name, button); list.append(row) })
}
