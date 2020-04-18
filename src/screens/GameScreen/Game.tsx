import React, { ReactNode, useContext, Dispatch } from 'react'
import { useImmerReducer } from 'use-immer'
import useInterval from '@use-it/interval'
import { Patient, createRandomPatient } from '../../types/Patient'
import { TICK, DAY_DURATION } from '../../constantes'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import isPatientDead from '../utils/isPatientDead'

export interface GameState {
  startDate: Date
  elapsedTime: number
  dayDuration: number
  hospitalBeds: number
  patients: Patient[]
  deads: Patient[]
}

const initialGameState: GameState = {
  startDate: new Date(),
  elapsedTime: 0,
  dayDuration: 0,
  hospitalBeds: 0,
  patients: [],
  deads: [],
}

function createGameState(): GameState {
  const currentDate = new Date()
  return {
    startDate: currentDate,
    elapsedTime: 0,
    dayDuration: DAY_DURATION,
    hospitalBeds: 6,
    patients: [],
    deads: [],
  }
}

export type GameAction =
  | { type: 'NEW_PATIENT'; patient: Patient }
  | { type: 'NEW_PATIENT'; patient: Patient }
  | { type: 'TICK'; currentDate: Date }

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NEW_PATIENT':
      if (state.patients.length >= state.hospitalBeds) {
        state.deads.push(action.patient)
      } else {
        state.patients.push(action.patient)
      }
      return state
    case 'TICK':
      state.elapsedTime = differenceInMilliseconds(action.currentDate, state.startDate) / 1000
      state.patients = state.patients.filter((p) => {
        if (isPatientDead(state.elapsedTime, p)) {
          state.deads.push(p)
          return false
        }
        return true
      })
      return state
    default:
      return state
  }
}

export type GameDispatch = Dispatch<GameAction>

export const GameStateContext = React.createContext<GameState>(initialGameState)
export const GameDispatchContext = React.createContext<GameDispatch>(() => {})

type GameContextProps = {
  children: ReactNode
  onLose: (gameState: GameState) => void
}
export function GameContext({ children, onLose }: GameContextProps) {
  const [state, dispatch] = useImmerReducer(gameReducer, initialGameState, createGameState)
  useInterval(() => {
    const currentDate = new Date()
    dispatch({ type: 'TICK', currentDate })

    if (state.elapsedTime >= state.dayDuration) {
      onLose(state)
    }

    dispatch({ type: 'NEW_PATIENT', patient: createRandomPatient(state.elapsedTime) })
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
