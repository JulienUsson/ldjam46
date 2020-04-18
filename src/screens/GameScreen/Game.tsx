import React, { ReactNode, useContext, Dispatch } from 'react'
import { useImmerReducer } from 'use-immer'
import useInterval from '@use-it/interval'
import { Patient, createRandomPatient } from '../../types/Patient'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import isPatientDead from '../utils/isPatientDead'
import { Level } from '../../types/Level'

const TICK = 150

export interface GameState {
  level: Level
  startDate: Date
  elapsedTime: number
  patients: Patient[]
  deads: Patient[]
}

function createGameState(level: Level) {
  return (): GameState => {
    const currentDate = new Date()
    return {
      level,
      startDate: currentDate,
      elapsedTime: 0,
      patients: [],
      deads: [],
    }
  }
}

export type GameAction =
  | { type: 'NEW_PATIENT'; patient: Patient }
  | { type: 'NEW_PATIENT'; patient: Patient }
  | { type: 'TICK'; currentDate: Date }

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TICK':
      // Check if some patients are dead
      state.patients = state.patients.filter((p) => {
        if (isPatientDead(state.elapsedTime, p)) {
          state.deads.push(p)
          return false
        }
        return true
      })

      // add new patient if needed
      console.log(Math.floor(state.elapsedTime) % state.level.spawnRate)
      if (Math.floor(state.elapsedTime) % state.level.spawnRate === 0) {
        const newPatient = createRandomPatient(Math.floor(state.elapsedTime))
        if (state.patients.length <= state.level.hospitalBeds) {
          state.patients.push(newPatient)
        } else {
          state.deads.push(newPatient)
        }
      }

      // update elapsed time
      state.elapsedTime = differenceInMilliseconds(action.currentDate, state.startDate) / 1000

      return state
    default:
      return state
  }
}

export type GameDispatch = Dispatch<GameAction>

export const GameStateContext = React.createContext<GameState>({} as GameState)
export const GameDispatchContext = React.createContext<GameDispatch>(() => {})

type GameContextProps = {
  children: ReactNode
  level: Level
  onLose: (gameState: GameState) => void
}
export function GameContext({ children, level, onLose }: GameContextProps) {
  const [state, dispatch] = useImmerReducer(gameReducer, {} as GameState, createGameState(level))
  useInterval(() => {
    if (state.elapsedTime >= state.level.dayDuration) {
      onLose(state)
    }
    dispatch({ type: 'TICK', currentDate: new Date() })
  }, TICK)

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={state}>{children}</GameStateContext.Provider>
    </GameDispatchContext.Provider>
  )
}

export function useGameState(): GameState {
  return useContext(GameStateContext)
}

export function useGameDispatch(): GameDispatch {
  return useContext(GameDispatchContext)
}
