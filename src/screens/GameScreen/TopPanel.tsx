import React from 'react'
import { useGameState } from './Game'

export default function TopPanel() {
  const { deads, timeLeft } = useGameState()

  return (
    <>
      deads: {deads.length} time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
    </>
  )
}
