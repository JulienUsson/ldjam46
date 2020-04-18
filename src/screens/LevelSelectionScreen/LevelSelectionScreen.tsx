import React from 'react'
import { styled } from '../../theme'
import { Level, levels } from '../../types/Level'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`

const Button = styled('button')``

interface Props {
  OnLevelClick: (level: Level) => void
}

export default function LevelSelectionScreen({ OnLevelClick }: Props) {
  return (
    <Container>
      {levels.map((level) => (
        <Button onClick={() => OnLevelClick(level)}>{level.name}</Button>
      ))}
    </Container>
  )
}
