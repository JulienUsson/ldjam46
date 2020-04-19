import React from 'react'
import { useGameDispatch } from './Game'
import Button from '../../ui/Button'
import { styled } from '../../theme'
import { Patient } from '../../types/Patient'

const Container = styled('div')`
  border-left: solid 3px ${({ theme }) => theme.colors.blue};
  grid-area: 1 / 2 / 2 / 3;
`

const SmallButton = styled(Button)`
  min-width: auto;
  line-height: 1.2em;
`

interface Props {
  currentPatient: Patient
}

export default function MedicalManual({ currentPatient }: Props) {
  const dispatch = useGameDispatch()

  return (
    <Container>
      <SmallButton
        onClick={() => dispatch({ type: 'DONE_PATIENT_HEALING', patient: currentPatient })}
      >
        Heal
      </SmallButton>
    </Container>
  )
}
