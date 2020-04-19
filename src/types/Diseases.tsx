import React from 'react'
import { FunctionComponent } from 'react'
import Text from '../ui/Text'
import { Patient } from './Patient'

export interface Disease {
  name: string
  generatePatientStats: (patient: Patient) => Partial<Patient>
}

type DiseaseCategory = {
  name: string
  symptoms: string[]
  diseases: Disease[]
  rules: FunctionComponent
}

export const diseasesTypes: DiseaseCategory[] = [
  {
    name: 'Respiratory disorders',
    symptoms: ['coucou', 'lol'],
    diseases: [
      {
        name: 'test1',
        generatePatientStats: () => ({}),
      },
      {
        name: 'test2',
        generatePatientStats: () => ({}),
      },
    ],
    rules: () => <Text>test</Text>,
  },
  {
    name: 'Neurological disorders',
    symptoms: ['coucou', 'lol'],
    diseases: [
      {
        name: 'test3',
        generatePatientStats: () => ({}),
      },
      {
        name: 'test4',
        generatePatientStats: () => ({}),
      },
    ],
    rules: () => <Text>test</Text>,
  },
  {
    name: 'Gastrointestinal disorders',
    symptoms: ['coucou', 'lol'],
    diseases: [
      {
        name: 'test5',
        generatePatientStats: () => ({}),
      },
      {
        name: 'test6',
        generatePatientStats: () => ({}),
      },
    ],
    rules: () => <Text>test</Text>,
  },
]
