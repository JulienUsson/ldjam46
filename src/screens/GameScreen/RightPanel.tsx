import React from 'react'
import { styled } from '../../theme'
import { useGameState, useGameDispatch } from './Game'

const Button = styled('button')``

export default function RightPanel() {
  const { patients, currentPatientId } = useGameState()
  const dispatch = useGameDispatch()

  if (!currentPatientId) {
    return null
  }
  const patient = patients.find((p) => p?.id === currentPatientId)!

  return (
    <>
      <Button onClick={() => dispatch({ type: 'KILL_PATIENT', patient })}>
        Let {patient.sex === 'male' ? 'him' : 'her'} die...
      </Button>
      <Button onClick={() => dispatch({ type: 'DONE_PATIENT_HEALING', patient })}>Done</Button>
    </>
  )
}
