import { Patient } from './Patient'

export interface Disease {
  name: string
  symptoms: string[]
  rules: string
  generatePatientStats: (patient: Patient) => Partial<Patient>
}

export const BrokenHeart: Disease = {
  name: 'Broken heart',
  symptoms: ['Chest pain', 'Fever'],
  generatePatientStats: () => ({ symptoms: ['Chest pain'] }),
  rules: `test
  test`,
}
