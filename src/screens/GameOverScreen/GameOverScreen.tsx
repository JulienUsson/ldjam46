import React, { useMemo } from 'react'
import { styled } from '../../theme'
import { GameState } from '../GameScreen/Game'
import { Patient, PatientAvatar } from '../../types/Patient'
import Button from '../../ui/Button'
import Text, { Subtitle } from '../../ui/Text'
import pickRandom from '../../utils/pickRandom'

const Container = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin: ${({ theme }) => theme.spacing(4)};
  }
`

interface Props {
  gameState: GameState
  onRestartClick: () => void
  onHomeClick: () => void
}

export default function GameOverScreen({ onRestartClick, onHomeClick, gameState }: Props) {
  const randomSavedPatient = useMemo(() => {
    if (gameState.savedPatients.length === 0) {
      return undefined
    }
    return pickRandom(gameState.savedPatients)
  }, [gameState.savedPatients])

  const randomDeadPatient = useMemo(() => {
    if (gameState.deads.length === 0) {
      return undefined
    }
    return pickRandom(gameState.deads)
  }, [gameState.deads])

  const hasGiveUp = gameState.state === 'GIVE_UP'

  return (
    <Container>
      {hasGiveUp && <Subtitle>You give up :(</Subtitle>}
      <div>
        <Button onClick={onRestartClick} style={{ marginRight: 8 }}>
          Restart
        </Button>
        <Button onClick={onHomeClick}>Home</Button>
      </div>

      {gameState.savedPatients.length > 0 && (
        <>
          <Subtitle>
            You saved {gameState.savedPatients.length} people
            {gameState.savedPatients.length > 1 && 's, including '}:
          </Subtitle>
          <PatientDetail patient={randomSavedPatient!} />
        </>
      )}
      {gameState.deads.length > 0 ? (
        <>
          <Subtitle>
            You killed {gameState.deads.length} people
            {gameState.deads.length > 1 && 's, including'}
          </Subtitle>
          <PatientDetail patient={randomDeadPatient!} isDead />
        </>
      ) : (
        !hasGiveUp && <Subtitle>Congratulation, you saved all patients !</Subtitle>
      )}
    </Container>
  )
}

type PatientDetailProps = { patient: Patient; isDead?: boolean }
function PatientDetail({ patient, isDead }: PatientDetailProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PatientAvatar patient={patient} isDead={isDead} size={80} />
      <Text style={{ textAlign: 'center' }}>
        <b>
          {patient.firstName} {patient.lastName}
        </b>
        <br />
        {patient.bio}
      </Text>
    </div>
  )
}
