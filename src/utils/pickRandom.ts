import random from 'lodash/random'
import take from 'lodash/take'
import shuffle from 'lodash/shuffle'

export default function pickRandom<T>(array: T[]): T {
  return array[random(0, array.length - 1)]
}

export function takeRandom<T>(array: T[], n: number): T[] {
  return take(shuffle(array), n)
}
