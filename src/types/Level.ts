import { FunctionComponent } from 'react'
import BasicPatientGenerator from '../screens/PatientGenerators/BasicPatientGenerator'

export type PatientGenerator = FunctionComponent

export interface Level {
  name: string
  hospitalBeds: number
  dayDuration: number
  patientGenerator: PatientGenerator
}

export const levels: Level[] = [
  {
    name: 'Day 1',
    hospitalBeds: 5,
    dayDuration: 3 * 60,
    patientGenerator: BasicPatientGenerator(7),
  },
]
