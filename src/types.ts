export interface Species { id: string; name: string; inchSize: number; emoji: string }
export interface TankFish extends Species { uid: string; speciesId: string }
export type StockStatus = "safe" | "getting-full" | "overcrowded"
export interface TankState { gallons: number | null; fish: TankFish[] }
