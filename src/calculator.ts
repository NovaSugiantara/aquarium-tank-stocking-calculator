import type { StockStatus, TankFish } from "./types.js"

export const getTotalInches = (fish: readonly TankFish[]) => fish.reduce((sum, item) => sum + item.inchSize, 0)
export const getRatio = (totalInches: number, gallons: number | null) => gallons && gallons > 0 ? totalInches / gallons : null
export const getStockStatus = (ratio: number): StockStatus => ratio <= .7 ? "safe" : ratio <= 1 ? "getting-full" : "overcrowded"
export const getHeadroom = (totalInches: number, gallons: number | null) => gallons && gallons > 0 ? gallons - totalInches : null
export const formatNumber = (value: number) => value.toFixed(1)
