import React from 'react'
import { useGameState, useGameDispatch } from './Game'
import { PatientAvatar } from '../../types/Patient'
import Button from '../../ui/Button'
import { styled, useTheme } from '../../theme'
import MedicalManual from './MedicalManual'
import Text from '../../ui/Text'

const Container = styled('div')`
  background-color: white;
  border: solid 3px ${({ theme }) => theme.colors.blue};
  border-radius: 8px;
  height: 100%;

  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const MedicalRecord = styled('div')`
  grid-area: 1 / 1 / 2 / 2;
  padding: 16px;
  display: flex;
  flex-direction: column;
`
const Spacer = styled('div')`
  flex-grow: 1;
`

const Table = styled('table')`
  color: black;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fontFamily};
  width: 100%;
  border: none;
  border-collapse: collapse;
  border-spacing: 0;

  & td:first-child {
    font-weight: 700;
  }

  & > tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lighterBlue};
  }
`

const SmallButton = styled(Button)`
  min-width: auto;
  line-height: 1.2em;
`

export default function MainPanel() {
  const { patients, currentPatientId } = useGameState()
  const dispatch = useGameDispatch()
  const theme = useTheme()

  if (!currentPatientId) {
    return null
  }
  const patient = patients.find((p) => p?.id === currentPatientId)!

  return (
    <Container>
      <MedicalRecord>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <PatientAvatar patient={patient} size={80} />
        </div>
        <Table>
          <tr>
            <td>First name</td>
            <td>{patient.firstName}</td>
          </tr>
          <tr>
            <td>Last name</td>
            <td>{patient.lastName}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{patient.age} years</td>
          </tr>
          <tr>
            <td>Sex</td>
            <td>{patient.sex}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{patient.height} cm</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{patient.weight} kg</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>{patient.temperature} °C</td>
          </tr>
          <tr>
            <td>Heart rate</td>
            <td>{patient.heartRate} bpm</td>
          </tr>
          <tr>
            <td>Respiratory rate</td>
            <td>{patient.respiratoryRate} bpm</td>
          </tr>
          <tr>
            <td>Blood pressure</td>
            <td>{patient.bloodPressure} mmHg</td>
          </tr>
        </Table>
        <Text style={{ fontWeight: 700, marginTop: 16, color: 'black' }}>Symptoms :</Text>
        <ul>
          {patient.symptoms.map((symptom) => (
            <li>
              <Text style={{ color: 'black' }}>{symptom}</Text>
            </li>
          ))}
        </ul>
        <Text style={{ fontWeight: 700, marginTop: 16, color: 'black' }}>
          Others informations :
        </Text>
        <ul>
          {patient.othersInformations.map((info) => (
            <li>
              <Text style={{ color: 'black' }}>{info}</Text>
            </li>
          ))}
        </ul>
        <Spacer />
        <SmallButton
          style={{ backgroundColor: theme.colors.red }}
          onClick={() => dispatch({ type: 'KILL_PATIENT', patient })}
        >
          Let {patient.sex === 'male' ? 'him' : 'her'} die...
        </SmallButton>
      </MedicalRecord>

      <MedicalManual currentPatient={patient} />
    </Container>
  )
}
