import React from 'react'
import { useGameState } from './Game'
import formatTimeLeft from '../utils/formatTimeLeft'

export default function TopPanel() {
  const { deads, dayDuration, elapsedTime } = useGameState()

  return (
    <>
      deads: {deads.length} time left: {formatTimeLeft(elapsedTime, dayDuration)}
    </>
  )
}
