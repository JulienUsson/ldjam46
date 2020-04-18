import React, { useState, useCallback } from 'react'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import GameScreen from './screens/GameScreen/GameScreen'
import Screen from './ui/Screen'
import AboutScreen from './screens/AboutScreen/AboutScreen'
import GameOverScreen from './screens/GameOverScreen/GameOverScreen'
import { GameState } from './screens/GameScreen/Game'
import { Level } from './types/Level'
import LevelSelectionScreen from './screens/LevelSelectionScreen/LevelSelectionScreen'
import RulesScreen from './screens/RulesScreen/RulesScreen'

type ScreenType = 'home' | 'level-selection' | 'game' | 'about' | 'rules' | 'game-over'

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home')
  const [lastGame, setLastGame] = useState<GameState>()
  const [level, setLevel] = useState<Level>()

  const handleGameEnd = useCallback((game) => {
    setLastGame(game)
    setCurrentScreen('game-over')
  }, [])

  switch (currentScreen) {
    case 'home':
      return (
        <Screen>
          <HomeScreen
            onPlayClick={() => setCurrentScreen('level-selection')}
            onRulesClick={() => setCurrentScreen('rules')}
            onAboutClick={() => setCurrentScreen('about')}
          />
        </Screen>
      )
    case 'level-selection':
      return (
        <Screen>
          <LevelSelectionScreen
            OnLevelClick={(level) => {
              setLevel(level)
              setCurrentScreen('game')
            }}
          />
        </Screen>
      )
    case 'about':
      return (
        <Screen>
          <AboutScreen onBackClick={() => setCurrentScreen('home')} />
        </Screen>
      )
    case 'rules':
      return (
        <Screen>
          <RulesScreen onBackClick={() => setCurrentScreen('home')} />
        </Screen>
      )
    case 'game':
      return (
        <Screen>
          <GameScreen level={level!} onGameEnd={handleGameEnd} />
        </Screen>
      )
    case 'game-over':
      return (
        <Screen>
          <GameOverScreen gameState={lastGame!} onDoneClick={() => setCurrentScreen('home')} />
        </Screen>
      )
    default:
      return null
  }
}

export default App
