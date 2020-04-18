import React from 'react'
import { useGameState } from './Game'
import { PatientAvatar } from '../../types/Patient'

export default function MainPanel() {
  const { patients, currentPatientId } = useGameState()

  if (!currentPatientId) {
    return null
  }
  const patient = patients.find((p) => p?.id === currentPatientId)!

  return (
    <>
      <PatientAvatar patient={patient} />
      {patient.firstName} {patient.lastName} {patient.age} years {patient.sex}
    </>
  )
}
