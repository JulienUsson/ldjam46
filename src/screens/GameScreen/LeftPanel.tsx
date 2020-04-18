import React from 'react'
import { useGameState } from './Game'
import { styled } from '../../theme'
import { Patient, PatientAvatar } from '../../types/Patient'
import formatTimeLeft from '../utils/formatTimeLeft'

export default function LeftPanel() {
  const { patients, elapsedTime } = useGameState()

  return (
    <>
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} elapsedTime={elapsedTime} />
      ))}
    </>
  )
}

const PatientCardContainer = styled('div')`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing(1)}px;
`

interface PatientCardProps {
  patient: Patient
  elapsedTime: number
}
function PatientCard({ patient, elapsedTime }: PatientCardProps) {
  const { firstName, lastName, age, sex, admissionDate, lifeExpectancy } = patient
  return (
    <PatientCardContainer>
      <PatientAvatar patient={patient} />
      {firstName} {lastName} {age} years {sex}
      <br />
      time left: {formatTimeLeft(elapsedTime, admissionDate + lifeExpectancy)}
    </PatientCardContainer>
  )
}
