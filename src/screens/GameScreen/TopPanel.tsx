import React from 'react'
import { useGameState } from './Game'
import formatTimeLeft from '../utils/formatTimeLeft'

export default function TopPanel() {
  const {
    deads,
    savedPatients,
    level: { dayDuration },
    elapsedTime,
  } = useGameState()

  return (
    <>
      saved lifes: {savedPatients.length}deads: {deads.length} time left:{' '}
      {formatTimeLeft(elapsedTime, dayDuration)}
    </>
  )
}
