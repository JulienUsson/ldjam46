import React from 'react'
import { useGameState } from './Game'

export default function TopPanel() {
  const { deads, timeLeft } = useGameState()

  return (
    <>
      deads: {deads.length} time left: {formatTimeLeft(timeLeft)}
    </>
  )
}

function formatTimeLeft(timeLeft: number): string {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
