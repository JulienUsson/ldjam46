import React from 'react'
import { styled } from '../../theme'
import Button from '../../ui/Button'
import Text from '../../ui/Text'

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
  onBackClick: () => void
}

export default function RulesScreen({ onBackClick }: Props) {
  return (
    <Container>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>
        You need to save the more lives you can.
        <br />
        Click on a patient to start examining him/her.
        <br />
        Use the right informations and the patient medical record to determine the disease.
        <br />
        Once the disease is found, click on the cure button.
        <br />
        If it's the good diagnostic, you saved him/her,
        <br />
        if not, you kill him/her...
        <br />
        Have fun !
      </Text>
      <Button onClick={onBackClick}>back</Button>
    </Container>
  )
}
