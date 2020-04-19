import React from 'react'
import { styled } from '../../theme'
import Button from '../../ui/Button'
import { Title, Subtitle } from '../../ui/Text'

const Container = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin: ${({ theme }) => theme.spacing(2)};
  }
`

interface Props {
  onPlayClick: () => void
  onRulesClick: () => void
  onAboutClick: () => void
}

export default function HomeScreen({ onPlayClick, onRulesClick, onAboutClick }: Props) {
  return (
    <Container>
      <Title>Examine, Heal, Miraculous !</Title>
      <Subtitle style={{ marginBottom: 48 }}>Keep them alive !</Subtitle>
      <div>
        <Button onClick={onPlayClick}>Play</Button>
      </div>
      <div>
        <Button onClick={onRulesClick}>Rules</Button>
      </div>
      <div>
        <Button onClick={onAboutClick}>About</Button>
      </div>
    </Container>
  )
}
