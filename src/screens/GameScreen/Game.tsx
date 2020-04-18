import React, { ReactNode, useContext, Dispatch } from 'react'
import { useImmerReducer } from 'use-immer'
import useInterval from '@use-it/interval'
import { Patient, createRandomPatient } from '../../types/Patient'
import { TICK, DAY_DURATION } from '../../constantes'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import addSeconds from 'date-fns/addSeconds'

interface GameState {
  startDate: Date
  endDate: Date
  timeLeft: number
  hospitalBeds: number
  patients: Patient[]
  deads: Patient[]
}

const initialGameState: GameState = {
  startDate: new Date(),
  endDate: new Date(),
  timeLeft: 0,
  hospitalBeds: 0,
  patients: [],
  deads: [],
}

function createGameState(): GameState {
  const currentDate = new Date()
  return {
    startDate: currentDate,
    endDate: addSeconds(currentDate, DAY_DURATION),
    hospitalBeds: 6,
    patients: [],
    deads: [],
    timeLeft: DAY_DURATION,
  }
}

type GameAction =
  | { type: 'NEW_PATIENT'; patient: Patient }
  | { type: 'UPDATE_TIME_LEFT'; timeLeft: number }

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NEW_PATIENT':
      if (state.patients.length >= state.hospitalBeds) {
        state.deads.push(action.patient)
      } else {
        state.patients.push(action.patient)
      }
      return state
    case 'UPDATE_TIME_LEFT':
      state.timeLeft = action.timeLeft
      return state
    default:
      return state
  }
}

type GameDispatch = Dispatch<GameAction>

const GameStateContext = React.createContext<GameState>(initialGameState)
const GameDispatchContext = React.createContext<GameDispatch>(() => {})

type GameContextProps = { children: ReactNode }
export function GameContext({ children }: GameContextProps) {
  const [state, dispatch] = useImmerReducer(gameReducer, initialGameState, createGameState)

  useInterval(() => {
    dispatch({ type: 'UPDATE_TIME_LEFT', timeLeft: differenceInSeconds(state.endDate, new Date()) })
    dispatch({ type: 'NEW_PATIENT', patient: createRandomPatient() })
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
