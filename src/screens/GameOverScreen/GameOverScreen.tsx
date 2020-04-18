import React from 'react'
import { styled } from '../../theme'
import { GameState } from '../GameScreen/Game'
import { Patient, PatientAvatar } from '../../types/Patient'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`

const Button = styled('button')``

interface Props {
  gameState: GameState
  onDoneClick: () => void
}

export default function GameOverScreen({ onDoneClick, gameState }: Props) {
  return (
    <Container>
      You saved :
      {gameState.savedPatients.map((p) => (
        <SavedPatient {...p} />
      ))}
      You killed :
      {gameState.deads.map((p) => (
        <DeadPatient {...p} />
      ))}
      <Button onClick={onDoneClick}>Return to home</Button>
    </Container>
  )
}

function SavedPatient(patient: Patient) {
  return (
    <div>
      <PatientAvatar patient={patient} />
      {patient.firstName} {patient.lastName} {patient.bio}
    </div>
  )
}

function DeadPatient(patient: Patient) {
  return (
    <div>
      <PatientAvatar patient={patient} isDead />
      {patient.firstName} {patient.lastName} {patient.bio}
    </div>
  )
}
