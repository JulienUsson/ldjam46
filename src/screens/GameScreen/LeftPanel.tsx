import React from 'react'
import { useGameState, useGameDispatch } from './Game'
import { styled, Theme } from '../../theme'
import { Patient, PatientAvatar } from '../../types/Patient'
import formatTimeLeft from '../../utils/formatTimeLeft'
import range from 'lodash/range'
import Text from '../../ui/Text'
import Icon from '../../ui/Icon'

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
  background-color: #9e9e9e;
  border: solid 3px white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

function EmptyBed() {
  return (
    <EmptyBedContainer>
      <Text style={{ fontSize: 20 }}>
        <Icon name="bed-empty" /> Empty bed
      </Text>
    </EmptyBedContainer>
  )
}

type PatientCardContainerProps = { selected: boolean; theme: Theme }
const PatientCardContainer = styled('button')`
  background-color: ${(props: PatientCardContainerProps) =>
    props.selected ? props.theme.colors.green : props.theme.colors.blue};
  border: solid 3px white;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing(1)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PatientCardContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`

interface PatientCardProps {
  patient: Patient
  selected: boolean
  disabled: boolean
  elapsedTime: number
}
function PatientCard({ patient, selected, disabled, elapsedTime }: PatientCardProps) {
  const { firstName, lastName, admissionDate, lifeExpectancy } = patient
  const dispatch = useGameDispatch()

  return (
    <PatientCardContainer
      disabled={disabled}
      selected={selected}
      onClick={() => dispatch({ type: 'SELECT_PATIENT', patient })}
    >
      <PatientAvatar patient={patient} size={50} />
      <PatientCardContent>
        <Text>
          {firstName} {lastName}
        </Text>
        {!selected && (
          <Text>
            <Icon name="timer-sand" /> {formatTimeLeft(elapsedTime, admissionDate + lifeExpectancy)}
          </Text>
        )}
      </PatientCardContent>
    </PatientCardContainer>
  )
}
