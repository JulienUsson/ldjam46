import React from 'react'
import { useGameState, useGameDispatch } from './Game'
import { styled } from '../../theme'
import { Patient, PatientAvatar } from '../../types/Patient'
import formatTimeLeft from '../utils/formatTimeLeft'
import range from 'lodash/range'

export default function LeftPanel() {
  const {
    patients,
    currentPatientId,
    level: { hospitalBeds },
    elapsedTime,
  } = useGameState()

  return (
    <>
      {range(0, hospitalBeds).map((bedIndex) => {
        const patient = patients[bedIndex]
        if (patient) {
          return (
            <PatientCard
              key={patient.id}
              selected={patient.id === currentPatientId}
              disabled={!!currentPatientId}
              patient={patient}
              elapsedTime={elapsedTime}
            />
          )
        } else {
          return <EmptyBed />
        }
      })}
    </>
  )
}

const EmptyBedContainer = styled('div')`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing(1)}px;
`

function EmptyBed() {
  return <EmptyBedContainer />
}

type PatientCardContainerProps = { selected: boolean }
const PatientCardContainer = styled('button')`
  background-color: ${(props: PatientCardContainerProps) => (props.selected ? 'grey' : 'white')};
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing(1)}px;
`

interface PatientCardProps {
  patient: Patient
  selected: boolean
  disabled: boolean
  elapsedTime: number
}
function PatientCard({ patient, selected, disabled, elapsedTime }: PatientCardProps) {
  const { firstName, lastName, age, sex, admissionDate, lifeExpectancy } = patient
  const dispatch = useGameDispatch()

  return (
    <PatientCardContainer
      disabled={disabled}
      selected={selected}
      onClick={() => dispatch({ type: 'SELECT_PATIENT', patient })}
    >
      <PatientAvatar patient={patient} />
      {firstName} {lastName} {age} years {sex}
      <br />
      {!selected && <>time left: {formatTimeLeft(elapsedTime, admissionDate + lifeExpectancy)}</>}
    </PatientCardContainer>
  )
}
