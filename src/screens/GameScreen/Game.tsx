import React, { ReactNode, useContext, Dispatch } from 'react'
import { useImmerReducer } from 'use-immer'
import useInterval from '@use-it/interval'
import { Patient, createRandomPatient } from '../../types/Patient'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import isPatientDead from '../utils/isPatientDead'
import { Level } from '../../types/Level'
import range from 'lodash/range'

const TICK = 150

export interface GameState {
  level: Level
  startDate: Date
  elapsedTime: number
  patients: (Patient | undefined)[]
  savedPatients: Patient[]
  deads: Patient[]
  currentPatientId?: string
}

function createGameState(level: Level) {
  return (): GameState => {
    const currentDate = new Date()
    return {
      level,
      startDate: currentDate,
      elapsedTime: 0,
      patients: range(0, level.hospitalBeds).map((_) => undefined),
      savedPatients: [],
      deads: [],
    }
  }
}

export type GameAction =
  | { type: 'SELECT_PATIENT'; patient: Patient }
  | { type: 'KILL_PATIENT'; patient: Patient }
  | { type: 'DONE_PATIENT_HEALING'; patient: Patient }
  | { type: 'TICK'; currentDate: Date }

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_PATIENT':
      state.currentPatientId = action.patient.id
      return state
    case 'KILL_PATIENT': {
      const patientIndex = state.patients.findIndex((p) => p?.id === action.patient.id)
      state.deads.push(state.patients[patientIndex]!)
      state.patients[patientIndex] = undefined
      state.currentPatientId = undefined
      return state
    }
    case 'DONE_PATIENT_HEALING': {
      const patientIndex = state.patients.findIndex((p) => p?.id === action.patient.id)
      state.savedPatients.push(state.patients[patientIndex]!)
      state.patients[patientIndex] = undefined
      state.currentPatientId = undefined
      return state
    }
    case 'TICK':
      // Check if some patients are dead
      state.patients = state.patients.map((p) => {
        if (p && state.currentPatientId !== p.id && isPatientDead(state.elapsedTime, p)) {
          // bed is occupied and patient not selected and is death
          state.deads.push(p)
          return undefined
        }
        return p
      })

      // add new patient if needed
      if (Math.floor(state.elapsedTime) % state.level.spawnRate === 0) {
        const newPatient = createRandomPatient(Math.floor(state.elapsedTime))
        if (state.patients.filter((p) => !p).length > 0) {
          const firstEmptyBedIndex = state.patients.findIndex((p) => p === undefined)
          state.patients[firstEmptyBedIndex] = newPatient
        } else {
          // no beds
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
