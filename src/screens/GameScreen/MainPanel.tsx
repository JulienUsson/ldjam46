import React from 'react'
import { useGameState, useGameDispatch } from './Game'
import { PatientAvatar } from '../../types/Patient'
import Button from '../../ui/Button'
import { styled, useTheme } from '../../theme'

const Container = styled('div')`
  background-color: white;
  border: solid 3px ${({ theme }) => theme.colors.blue};
  border-radius: 8px;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SmallButton = styled(Button)`
  min-width: auto;
  line-height: 1.2em;
`

export default function MainPanel() {
  const { patients, currentPatientId } = useGameState()
  const dispatch = useGameDispatch()
  const theme = useTheme()

  if (!currentPatientId) {
    return null
  }
  const patient = patients.find((p) => p?.id === currentPatientId)!

  return (
    <Container>
      <PatientAvatar patient={patient} />
      {patient.firstName} {patient.lastName} {patient.age} years {patient.sex}
      <SmallButton
        style={{ backgroundColor: theme.colors.red }}
        onClick={() => dispatch({ type: 'KILL_PATIENT', patient })}
      >
        Let {patient.sex === 'male' ? 'him' : 'her'} die...
      </SmallButton>
      <SmallButton onClick={() => dispatch({ type: 'DONE_PATIENT_HEALING', patient })}>
        Heal
      </SmallButton>
    </Container>
  )
}
