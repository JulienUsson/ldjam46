import React from 'react'
import { GameContext, GameState } from './Game'
import LeftPanel from './LeftPanel'
import { styled } from '../../theme'
import TopPanel from './TopPanel'
import MainPanel from './MainPanel'
import { Level } from '../../types/Level'

const Container = styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 40px 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`

const MainPanelContainer = styled('div')`
  grid-area: 2 / 2 / 3 / 3;
`

const TopPanelContainer = styled('div')`
  grid-area: 1 / 2 / 2 / 4;
`

const LeftPanelContainer = styled('div')`
  grid-area: 1 / 1 / 4 / 2;
  padding: ${({ theme }) => theme.spacing(1)};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, 1fr);
  grid-row-gap: ${({ theme }) => theme.spacing(1)};
`
interface Props {
  level: Level
  onGameEnd: (gameState: GameState) => void
}

export default function GameScreen({ level, onGameEnd }: Props) {
  return (
    <GameContext level={level} onGameEnd={onGameEnd}>
      <Container>
        <MainPanelContainer>
          <MainPanel />
        </MainPanelContainer>
        <TopPanelContainer>
          <TopPanel />
        </TopPanelContainer>
        <LeftPanelContainer>
          <LeftPanel />
        </LeftPanelContainer>
      </Container>
    </GameContext>
  )
}
