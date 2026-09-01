export function parseGallons(raw: string): number | null {
  const value = Number(raw)
  return raw.trim() !== "" && Number.isFinite(value) && value > 0 ? value : null
}
