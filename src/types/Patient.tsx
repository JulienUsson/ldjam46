import React from 'react'
import faker from 'faker'
import random from 'lodash/random'
import uuid from 'uuid/v4'
import Avatar from 'avataaars'

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
    lifeExpectancy: random(30, 50),
    admissionDate,
  }
}

type PatientAvatarProps = { patient: Patient }
export function PatientAvatar({ patient }: PatientAvatarProps) {
  return (
    <Avatar
      style={{ height: '30px', width: '30px' }}
      avatarStyle="Transparent"
      topType="Turban"
      accessoriesType="Blank"
      facialHairType="BeardMagestic"
      facialHairColor="BrownDark"
      clotheType="ShirtScoopNeck"
      clotheColor="Pink"
      eyeType="Cry"
      eyebrowType="Default"
      mouthType="Eating"
      skinColor="Pale"
    />
  )
}
