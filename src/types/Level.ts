export interface Level {
  name: string
  hospitalBeds: number
  dayDuration: number
  spawnRate: number
}

export const levels: Level[] = [
  { name: 'Day 1', hospitalBeds: 5, dayDuration: 5 * 60, spawnRate: 10 },
]
