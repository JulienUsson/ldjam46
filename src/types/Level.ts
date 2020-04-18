// @ts-ignore
import yaml from 'yaml.macro'

const level1 = yaml('../levels/level-1.yaml') as Level

export interface Level {
  name: string
}

export const levels = [level1]
