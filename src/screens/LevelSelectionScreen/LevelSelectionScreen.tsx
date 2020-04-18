import React from 'react'
import { styled } from '../../theme'
import { Level, levels } from '../../types/Level'
import { Title } from '../../ui/Text'
import Button from '../../ui/Button'

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
  onBackClick: () => void
  OnLevelClick: (level: Level) => void
}

export default function LevelSelectionScreen({ onBackClick, OnLevelClick }: Props) {
  return (
    <Container>
      <Title style={{ marginBottom: 8 }}>Level selection</Title>
      {levels.map((level) => (
        <div>
          <Button onClick={() => OnLevelClick(level)}>{level.name}</Button>
        </div>
      ))}
      <Button onClick={onBackClick}>Back</Button>
    </Container>
  )
}
