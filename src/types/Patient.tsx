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

const sexs: Patient['sex'][] = ['male', 'female']
export function createRandomPatient(admissionDate: number): Patient {
  const sex = pickRandom(sexs)
  const age = random(8, 80)
  return {
    id: uuid(),
    firstName: randomFirstName(sex),
    lastName: randomLastName(),
    sex,
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
const OldHairColor = ['Platinum']

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
  const isMale = sex === 'male'
  const isOld = age >= 60
  const hairColor = isOld ? pickRandom(OldHairColor) : pickRandom(HairColor)
  const topType = isMale ? pickRandom(MaleHair) : pickRandom(FemaleHair)
  const facialHairType = isMale ? pickRandom(MaleFacialHairType) : pickRandom(FemaleFacialHairType)
  return {
    topType,
    hairColor,
    facialHairType,
    skin: pickRandom(skinColor),
    clotheColor: pickRandom(clotheColor),
  }
}

type PatientAvatarProps = {
  patient: Patient
  size?: number
  isDead?: boolean
  style?: React.CSSProperties
}
export function PatientAvatar({ patient, size, isDead, style }: PatientAvatarProps) {
  return (
    <Avatar
      style={{ height: size || 30, width: size || 30, ...style }}
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
