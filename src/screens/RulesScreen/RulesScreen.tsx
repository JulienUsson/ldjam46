import React from 'react'
import { styled } from '../../theme'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`

const Button = styled('button')``

interface Props {
  onBackClick: () => void
}

export default function RulesScreen({ onBackClick }: Props) {
  return (
    <Container>
      <Button onClick={onBackClick}>back</Button>
    </Container>
  )
}
