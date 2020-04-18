import faker from 'faker'
import random from 'lodash/random'
import uuid from 'uuid/v4'

export interface Patient {
  id: string
  firstName: string
  lastName: string
  age: number
  sex: 'male' | 'female'
  lifeExpectancy: number
  // Elapsed time
  admissionDate: number
}

export function createRandomPatient(admissionDate: number): Patient {
  return {
    id: uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sex: random(1, 2) === 1 ? 'male' : 'female',
    age: random(8, 80),
    lifeExpectancy: random(10, 30),
    admissionDate,
  }
}
