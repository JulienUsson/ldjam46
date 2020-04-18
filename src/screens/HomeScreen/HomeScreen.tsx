import React from 'react'
import { styled } from '../../theme'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`

const Button = styled('button')``

interface Props {
  onPlayClick: () => void
  onAboutClick: () => void
}

export default function HomeScreen({ onPlayClick, onAboutClick }: Props) {
  return (
    <Container>
      <Button onClick={onPlayClick}>Play</Button>
      <Button onClick={onAboutClick}>About</Button>
    </Container>
  )
}
