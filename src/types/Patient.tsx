import React from 'react'
import random from 'lodash/random'
import uuid from 'uuid/v4'
import Avatar from 'avataaars'
import pickRandom from '../utils/pickRandom'
import randomFirstName from '../utils/randomFirstName'
import randomLastName from '../utils/randomLastName'
import randomBio from '../utils/randomBio'

export interface Patient {
  id: string
  firstName: string
  lastName: string
  age: number
  sex: 'male' | 'female'
  lifeExpectancy: number
  // Elapsed time
  admissionDate: number
  avatar: PatientAvatar
  bio: string
}

export function createRandomPatient(admissionDate: number): Patient {
  const sex = random(1, 2) === 1 ? 'male' : 'female'
  const age = random(8, 80)
  return {
    id: uuid(),
    firstName: randomFirstName(sex),
    lastName: randomLastName(),
    sex: random(1, 2) === 1 ? 'male' : 'female',
    age: random(8, 80),
    lifeExpectancy: random(30, 50),
    admissionDate,
    avatar: generateRandomAvatar(sex, age),
    bio: randomBio(sex),
  }
}

const MaleHair = ['NoHair', 'ShortHairFrizzle', 'ShortHairCurly', 'ShortHairTheCaesar']
const FemaleHair = ['LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly']

const HairColor = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'brown', 'brownDark', 'red']
const OldHairColor = ['Platinum', 'Blonde', 'BlondeGolden', 'brown']

const MaleFacialHairType = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMagestic',
  'MoustacheFancy',
  'MoustacheMagnum',
]
const FemaleFacialHairType = ['Blank']

const clotheColor = [
  'Black',
  'Blue01',
  'Blue02',
  'Blue03',
  'Gray01',
  'Gray02',
  'Heather',
  'PastelBlue',
  'PastelGreen',
  'PastelOrange',
  'PastelRed',
  'PastelYellow',
  'Pink',
  'Red',
  'White',
]

const skinColor = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black']

interface PatientAvatar {
  topType: string
  hairColor: string
  facialHairType: string
  skin: string
  clotheColor: string
}

function generateRandomAvatar(sex: Patient['sex'], age: number): PatientAvatar {
  const isOld = age > 50
  const topType = sex === 'male' ? pickRandom(MaleHair) : pickRandom(FemaleHair)
  const hairColor = isOld ? pickRandom(OldHairColor) : pickRandom(HairColor)
  const facialHairType =
    sex === 'male' ? pickRandom(MaleFacialHairType) : pickRandom(FemaleFacialHairType)
  return {
    topType,
    hairColor,
    facialHairType,
    skin: pickRandom(skinColor),
    clotheColor: pickRandom(clotheColor),
  }
}

type PatientAvatarProps = { patient: Patient; size?: number; isDead?: boolean }
export function PatientAvatar({ patient, size, isDead }: PatientAvatarProps) {
  return (
    <Avatar
      style={{ height: size || 30, width: size || 30 }}
      avatarStyle="Transparent"
      accessoriesType="Blank"
      clotheType="ShirtCrewNeck"
      eyeType={isDead ? 'Dizzy' : 'Default'}
      eyebrowType="Default"
      mouthType="Serious"
      {...patient.avatar}
      hairColor={patient.avatar.topType !== 'noHair' ? patient.avatar.hairColor : undefined}
      facialHairColor={
        patient.avatar.facialHairType !== 'blank' ? patient.avatar.hairColor : undefined
      }
    />
  )
}
