import random from 'lodash/random'

export default function pickRandom<T>(array: T[]): T {
  return array[random(0, array.length - 1)]
}
