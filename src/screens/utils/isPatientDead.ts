import { Patient } from '../../types/Patient'

export default function isPatientDead(elapsedTime: number, patient: Patient): boolean {
  const timeLeft = patient.admissionDate + patient.lifeExpectancy - elapsedTime
  return timeLeft <= 0
}
