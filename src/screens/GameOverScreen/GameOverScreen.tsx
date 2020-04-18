import React from 'react'
import { styled } from '../../theme'
import { GameState } from '../GameScreen/Game'

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
  console.log(gameState)
  return (
    <Container>
      {JSON.stringify(gameState)}
      <Button onClick={onDoneClick}>Done</Button>
    </Container>
  )
}
