/* eslint-disable react-hooks/rules-of-hooks */
import { useGameState, useGameDispatch } from '../GameScreen/Game'
import { useEffect, useState } from 'react'
import { Disease } from '../../types/Diseases'
import pickRandom from '../../utils/pickRandom'

type BasicPatientGeneratorOptions = {
  patientLifeLeft: number
  interval: number
  diseases: Disease[]
}
function BasicPatientGenerator({
  patientLifeLeft,
  interval,
  diseases,
}: BasicPatientGeneratorOptions) {
  return () => {
    const [lastSpawn, setLastSpawn] = useState<number>()
    const { elapsedTime } = useGameState()
    const dispatch = useGameDispatch()

    useEffect(() => {
      const time = Math.floor(elapsedTime)
      if ((time === 0 || time % interval === 0) && time !== lastSpawn) {
        dispatch({ type: 'NEW_PATIENT', patientLifeLeft, disease: pickRandom(diseases) })
        setLastSpawn(time)
      }
    }, [dispatch, elapsedTime, lastSpawn])

    return null
  }
}

export default BasicPatientGenerator
