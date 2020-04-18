import React from 'react'
import { useGameState, useGameDispatch } from './Game'
import formatTimeLeft from '../../utils/formatTimeLeft'
import { styled } from '../../theme'

const Button = styled('button')``

export default function TopPanel() {
  const {
    state,
    deads,
    savedPatients,
    level: { dayDuration },
    elapsedTime,
  } = useGameState()
  const dispatch = useGameDispatch()
  const isPaused = state === 'PAUSE'

  return (
    <>
      saved lifes: {savedPatients.length}deads: {deads.length} time left:{' '}
      {formatTimeLeft(elapsedTime, dayDuration)}
      {isPaused ? (
        <Button onClick={() => dispatch({ type: 'RESUME' })}>Resume</Button>
      ) : (
        <Button onClick={() => dispatch({ type: 'PAUSE' })}>Pause</Button>
      )}
      <Button onClick={() => dispatch({ type: 'GIVE_UP' })}>Give up</Button>
    </>
  )
}
