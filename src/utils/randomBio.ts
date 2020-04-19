import pickRandom from './pickRandom'

const deadQuotes: Array<(isMale: boolean) => string> = [
  (isMale) => `single ${isMale ? 'dad' : 'mother'} of two chihuahuas`,
  (isMale) => `will become the next Hitler`,
  (isMale) => `chew with ${isMale ? 'his' : 'her'} mouth open`,
  (isMale) => `don't turn off his phone in a movie`,
  (isMale) => `not pick up dog poop when walking ${isMale ? 'his' : 'her'} dog`,
  (isMale) => `drive slow in the fast lane on the freeway`,
  (isMale) => `is not racist because ${isMale ? 'he' : 'she'} has a black friend`,
  (isMale) => `use always the wrong meme`,
  (isMale) => `seen all Twilight films and loved it`,
  (isMale) => `thinks unicorns are real`,
  (isMale) => `believe in cat shaped aliens`,
  (isMale) => `knows 4 decimal digits of Pi`,
  (isMale) => `is born with 3 niples`,
]

export default function randomBio(sex: 'male' | 'female') {
  return pickRandom(deadQuotes)(sex === 'male')
}
