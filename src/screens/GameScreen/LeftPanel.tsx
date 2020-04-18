import React from 'react'
import { useGameState } from './Game'
import { styled } from '../../theme'
import { Patient } from '../../types/Patient'

export default function LeftPanel() {
  const { patients } = useGameState()

  return (
    <>
      {patients.map((patient) => (
        <PatientCard key={patient.id} {...patient} />
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

function PatientCard({ firstName, lastName, age, sex }: Patient) {
  return (
    <PatientCardContainer>
      {firstName} {lastName} {age} years {sex}
    </PatientCardContainer>
  )
}
