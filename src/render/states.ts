export const renderError = (root: HTMLElement, message: string, onReset: () => void) => {
  root.hidden = false; root.textContent = ""; const text = document.createElement("div"); text.textContent = message; const button = document.createElement("button"); button.textContent = "Reset calculator"; button.addEventListener("click", onReset); root.append(text, button)
}
