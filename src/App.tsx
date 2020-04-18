import React, { useState, useCallback } from 'react'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import GameScreen from './screens/GameScreen/GameScreen'
import Screen from './ui/Screen'
import AboutScreen from './screens/AboutScreen/AboutScreen'
import GameOverScreen from './screens/GameOverScreen/GameOverScreen'
import { GameState } from './screens/GameScreen/Game'

type ScreenType = 'home' | 'game' | 'about' | 'game-over'

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home')
  const [lastGame, setLastGame] = useState<GameState>()

  const handleLoose = useCallback((game) => {
    setLastGame(game)
    setCurrentScreen('game-over')
  }, [])

  switch (currentScreen) {
    case 'home':
      return (
        <Screen>
          <HomeScreen
            onPlayClick={() => setCurrentScreen('game')}
            onAboutClick={() => setCurrentScreen('about')}
          />
        </Screen>
      )
    case 'about':
      return (
        <Screen>
          <AboutScreen onBackClick={() => setCurrentScreen('home')} />
        </Screen>
      )
    case 'game':
      return (
        <Screen>
          <GameScreen onLose={handleLoose} />
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
