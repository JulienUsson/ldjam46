import { FunctionComponent } from 'react'
import BasicPatientGenerator from '../screens/PatientGenerators/BasicPatientGenerator'
import { Disease, BrokenHeart } from './Diseases'

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
      diseases: [BrokenHeart],
    }),
    diseases: [BrokenHeart],
  },
  {
    name: 'Day 2',
    hospitalBeds: 6,
    dayDuration: 4 * 60,
    patientGenerator: BasicPatientGenerator({
      interval: 15,
      patientLifeLeft: 45,
      diseases: [BrokenHeart],
    }),
    diseases: [BrokenHeart],
  },
]
