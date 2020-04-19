import { FunctionComponent } from 'react'
import BasicPatientGenerator from '../screens/PatientGenerators/BasicPatientGenerator'

export type PatientGenerator = FunctionComponent

export interface Level {
  name: string
  hospitalBeds: number
  dayDuration: number
  patientGenerator: PatientGenerator
  difficulty: string
}

export const levels: Level[] = [
  {
    name: 'Day 1',
    hospitalBeds: 5,
    dayDuration: 3 * 60,
    patientGenerator: BasicPatientGenerator({ interval: 30, patientLifeLeft: 60 }),
    difficulty: 'Very easy',
  },
  {
    name: 'Day 2',
    hospitalBeds: 5,
    dayDuration: 5 * 60,
    patientGenerator: BasicPatientGenerator({ interval: 15, patientLifeLeft: 45 }),
    difficulty: 'Easy',
  },
]
