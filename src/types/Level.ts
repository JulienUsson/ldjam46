export interface Level {
  name: string
  hospitalBeds: number
  dayDuration: number
  spawnRate: number
}

export const levels: Level[] = [
  { name: 'Day 1', hospitalBeds: 4, dayDuration: 3 * 60, spawnRate: 10 },
]
