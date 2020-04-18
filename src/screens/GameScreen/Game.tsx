import React, { ReactNode, useContext, Dispatch, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import useInterval from '@use-it/interval'
import { Patient, createRandomPatient } from '../../types/Patient'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import subMilliseconds from 'date-fns/subMilliseconds'
import isPatientDead from '../../utils/isPatientDead'
import { Level } from '../../types/Level'
import range from 'lodash/range'

const TICK = 150

export interface GameState {
  state: 'RUN' | 'PAUSE' | 'DONE' | 'GIVE_UP'
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
      state: 'RUN',
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
  | { type: 'NEW_PATIENT' }
  | { type: 'SELECT_PATIENT'; patient: Patient }
  | { type: 'KILL_PATIENT'; patient: Patient }
  | { type: 'DONE_PATIENT_HEALING'; patient: Patient }
  | { type: 'GIVE_UP' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TICK'; currentDate: Date }

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NEW_PATIENT':
      const newPatient = createRandomPatient(Math.floor(state.elapsedTime))
      if (state.patients.filter((p) => !p).length > 0) {
        const firstEmptyBedIndex = state.patients.findIndex((p) => p === undefined)
        state.patients[firstEmptyBedIndex] = newPatient
      } else {
        // no beds
        state.deads.push(newPatient)
      }
      return state
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
      //if game done
      if (state.elapsedTime >= state.level.dayDuration) {
        state.state = 'DONE'
        return state
      }

      // Check if some patients are dead
      state.patients = state.patients.map((p) => {
        if (p && state.currentPatientId !== p.id && isPatientDead(state.elapsedTime, p)) {
          // bed is occupied and patient not selected and is death
          state.deads.push(p)
          return undefined
        }
        return p
      })

      // update elapsed time
      state.elapsedTime = differenceInMilliseconds(action.currentDate, state.startDate) / 1000

      return state
    case 'GIVE_UP':
      state.state = 'GIVE_UP'
      return state
    case 'RESUME':
      state.startDate = subMilliseconds(new Date(), state.elapsedTime * 1000)
      state.state = 'RUN'
      return state
    case 'PAUSE':
      state.state = 'PAUSE'
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
  onGameEnd: (gameState: GameState) => void
}
export function GameContext({ children, level, onGameEnd }: GameContextProps) {
  const [state, dispatch] = useImmerReducer(gameReducer, {} as GameState, createGameState(level))

  useEffect(() => {
    if (state.state === 'GIVE_UP' || state.state === 'DONE') {
      onGameEnd(state)
    }
  }, [onGameEnd, state])

  useInterval(() => {
    if (state.state === 'RUN') {
      dispatch({ type: 'TICK', currentDate: new Date() })
    }
  }, TICK)

  const PatientGenerator = state.level.patientGenerator

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={state}>
        <PatientGenerator />
        {children}
      </GameStateContext.Provider>
    </GameDispatchContext.Provider>
  )
}

export function useGameState(): GameState {
  return useContext(GameStateContext)
}

export function useGameDispatch(): GameDispatch {
  return useContext(GameDispatchContext)
}
