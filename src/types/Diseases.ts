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
      respiratoryRate: patient.age > 42 ? random(21, 30) : random(8, 11),
    }
  },
  rules: `
The patient must have Chest pain, Fever or Palpitations

If the patient is male, he must be taller than 185cm

Otherwise, the patient must be shorter than 165cm

If the patient age is older than 42, he must have a respiratory rate bigger than 20

Otherwise, the patient must have a respiratory rate lower than 12
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
      respiratoryRate: patient.sex === 'male' ? random(21, 30) : random(8, 11),
    }
  },
  rules: `
The patient must have Palpitations, Fever or Chest pain

If the patient age is older than 30, he must have an heart rate bigger than 100

Otherwise, the patient must have an heart rate bigger than 120

If the patient is male, he must have a respiratory rate bigger than 20

Otherwise, the patient must have a respiratory rate lower than 12
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
      bloodPressure: random(70, 80),
    }
  },
  rules: `
The patient must have Palpitations, Fever or Vomiting

The patient must not have an heart rate bigger than 60

The patient must have a blood pressure between 70 and 80
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
      bloodPressure: random(120, 150),
    }
  },
  rules: `
The patient must have Fever, Chest pain or Palpitations

If the patient is male, he must be taller than 185cm

Otherwise, the patient must be shorter than 165cm

The patient must have a blood pressure bigger than 120
`,
}
