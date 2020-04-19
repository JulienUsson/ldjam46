/* eslint-disable react-hooks/rules-of-hooks */
import { useGameState, useGameDispatch } from '../GameScreen/Game'
import { useEffect, useState } from 'react'
import { diseasesTypes } from '../../types/Diseases'

type BasicPatientGeneratorOptions = { patientLifeLeft: number; interval: number }
function BasicPatientGenerator({ patientLifeLeft, interval }: BasicPatientGeneratorOptions) {
  return () => {
    const [lastSpawn, setLastSpawn] = useState<number>()
    const { elapsedTime } = useGameState()
    const dispatch = useGameDispatch()

    useEffect(() => {
      const time = Math.floor(elapsedTime)
      if ((time === 0 || time % interval === 0) && time !== lastSpawn) {
        dispatch({ type: 'NEW_PATIENT', patientLifeLeft, disease: diseasesTypes[0].diseases[0] })
        setLastSpawn(time)
      }
    }, [dispatch, elapsedTime, lastSpawn])

    return null
  }
}

export default BasicPatientGenerator
