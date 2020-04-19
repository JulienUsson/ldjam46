import { Patient } from './Patient'
import { takeRandom } from '../utils/pickRandom'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'

export interface Disease {
  name: string
  rules: string
  generatePatientStats: (patient: Patient) => Partial<Patient>
}

const uselessSymptoms = [
  'Sweaty hands',
  'Dry mouth',
  'Nauseated',
  'Tachycardia',
  'Nasal discharge',
  'Flatulence',
  'insomnia',
]

export const BrokenHeart: Disease = {
  name: 'Broken heart',
  generatePatientStats: (patient) => {
    const symptoms = ['Chest pain', 'Fever', 'Palpitations']
    return {
      symptoms: shuffle([
        ...takeRandom(symptoms, random(1, 3)),
        ...takeRandom(uselessSymptoms, random(2, 4)),
      ]),
      height: patient.sex === 'male' ? random(165, 180) : random(165, 180),
    }
  },
  rules: `
The patient must have Chest pain, Fever or Palpitations

If the patient is male, he must be taller than 185cm

Otherwise, the patient must be shorter than 165cm
`,
}

export const NightFever: Disease = {
  name: 'Night Fever',
  generatePatientStats: (patient) => {
    const symptoms = ['Chest pain', 'Fever', 'Palpitations']
    return {
      symptoms: shuffle([
        ...takeRandom(symptoms, random(1, 3)),
        ...takeRandom(uselessSymptoms, random(2, 4)),
      ]),
      heartRate: patient.age > 30 ? random(100, 130) : random(120, 140),
    }
  },
  rules: `
The patient must have Palpitations, Fever or Chest pain

If the patient age is older than 30, he must have an heart rate bigger than 100

Otherwise, the patient must have an heart rate bigger than 120
`,
}

export const VerbalDiarrhea: Disease = {
  name: 'Verbal Diarrhea',
  generatePatientStats: (patient) => {
    const symptoms = ['Vomiting', 'Fever', 'Palpitations']
    return {
      symptoms: shuffle([
        ...takeRandom(symptoms, random(1, 3)),
        ...takeRandom(uselessSymptoms, random(2, 4)),
      ]),
      heartRate: random(40, 60),
    }
  },
  rules: `
The patient must have Palpitations, Fever or Vomiting

The patient must have an heart rate lower than 60
`,
}

export const Lycanthropy: Disease = {
  name: 'Lycanthropy',
  generatePatientStats: (patient) => {
    const symptoms = ['Chest pain', 'Fever', 'Palpitations']
    return {
      symptoms: shuffle([
        ...takeRandom(symptoms, random(1, 3)),
        ...takeRandom(uselessSymptoms, random(2, 4)),
      ]),
      height: patient.sex === 'male' ? random(165, 180) : random(165, 180),
    }
  },
  rules: `
The patient must have Fever, Chest pain or Palpitations

If the patient is male, he must be taller than 185cm

Otherwise, the patient must be shorter than 165cm
`,
}
