import { FunctionComponent } from 'react'
import BasicPatientGenerator from '../screens/PatientGenerators/BasicPatientGenerator'
import { Disease, BrokenHeart, NightFever, VerbalDiarrhea, Lycanthropy } from './Diseases'

export type PatientGenerator = FunctionComponent

export interface Level {
  name: string
  hospitalBeds: number
  dayDuration: number
  patientGenerator: PatientGenerator
  diseases: Disease[]
}

export const levels: Level[] = [
  {
    name: 'Day 1',
    hospitalBeds: 8,
    dayDuration: 3 * 60,
    patientGenerator: BasicPatientGenerator({
      interval: 5,
      patientLifeLeft: 10,
      diseases: [BrokenHeart, NightFever, VerbalDiarrhea],
    }),
    diseases: [BrokenHeart, NightFever, VerbalDiarrhea],
  },
  {
    name: 'Day 2',
    hospitalBeds: 6,
    dayDuration: 4 * 60,
    patientGenerator: BasicPatientGenerator({
      interval: 15,
      patientLifeLeft: 45,
      diseases: [BrokenHeart, NightFever, VerbalDiarrhea],
    }),
    diseases: [BrokenHeart, NightFever, VerbalDiarrhea],
  },
  {
    name: 'Day 3',
    hospitalBeds: 6,
    dayDuration: 4 * 60,
    patientGenerator: BasicPatientGenerator({
      interval: 15,
      patientLifeLeft: 45,
      diseases: [BrokenHeart, NightFever, VerbalDiarrhea, Lycanthropy],
    }),
    diseases: [BrokenHeart, NightFever, VerbalDiarrhea, Lycanthropy],
  },
  {
    name: 'Day 4',
    hospitalBeds: 6,
    dayDuration: 4 * 60,
    patientGenerator: BasicPatientGenerator({
      interval: 15,
      patientLifeLeft: 45,
      diseases: [BrokenHeart, NightFever, VerbalDiarrhea, Lycanthropy],
    }),
    diseases: [BrokenHeart, NightFever, VerbalDiarrhea, Lycanthropy],
  },
]
