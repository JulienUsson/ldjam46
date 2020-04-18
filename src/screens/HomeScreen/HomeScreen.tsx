import React from 'react'
import { styled } from '../../theme'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`

const Title = styled('h1')``

const Subtitle = styled('h2')``

const Button = styled('button')``

interface Props {
  onPlayClick: () => void
  onRulesClick: () => void
  onAboutClick: () => void
}

export default function HomeScreen({ onPlayClick, onRulesClick, onAboutClick }: Props) {
  return (
    <Container>
      <Title>Examine, Heal, Miraculous !</Title>
      <Subtitle>Keep them alive !</Subtitle>
      <Button onClick={onPlayClick}>Play</Button>
      <Button onClick={onRulesClick}>Rules</Button>
      <Button onClick={onAboutClick}>About</Button>
    </Container>
  )
}
