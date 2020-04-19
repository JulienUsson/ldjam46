import { Patient } from './Patient'

export interface Disease {
  name: string
  rules: string
  generatePatientStats: (patient: Patient) => Partial<Patient>
}

export const BrokenHeart: Disease = {
  name: 'Broken heart',
  generatePatientStats: () => {
    return { symptoms: ['Chest pain'] }
  },
  rules: `
The patient must have Chest pain or Fever
test
`,
}

export const NightFever: Disease = {
  name: 'Night Fever',
  generatePatientStats: () => ({ symptoms: ['Chest pain'] }),
  rules: `
The patient must have Chest pain or Fever
test
`,
}

export const VerbalDiarrhea: Disease = {
  name: 'Verbal Diarrhea',
  generatePatientStats: () => ({ symptoms: ['Chest pain'] }),
  rules: `
The patient must have Chest pain or Fever
test
`,
}

export const Lycanthropy: Disease = {
  name: 'Lycanthropy',
  generatePatientStats: () => ({ symptoms: ['Chest pain'] }),
  rules: `
The patient must have Chest pain or Fever
test
`,
}
