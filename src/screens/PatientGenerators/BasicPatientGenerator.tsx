/* eslint-disable react-hooks/rules-of-hooks */
import { useGameState, useGameDispatch } from '../GameScreen/Game'
import { useEffect, useState } from 'react'

function BasicPatientGenerator(each: number) {
  return () => {
    const [lastSpawn, setLastSpawn] = useState<number>()
    const { elapsedTime } = useGameState()
    const dispatch = useGameDispatch()

    useEffect(() => {
      const time = Math.floor(elapsedTime)
      if ((time === 0 || time % 5 === 0) && time !== lastSpawn) {
        dispatch({ type: 'NEW_PATIENT' })
        setLastSpawn(time)
      }
    }, [dispatch, elapsedTime, lastSpawn])

    return null
  }
}

export default BasicPatientGenerator
