import React, { useState } from 'react'
import { useGameDispatch } from './Game'
import Button from '../../ui/Button'
import { styled, useTheme } from '../../theme'
import { Patient } from '../../types/Patient'
import { diseasesTypes } from '../../types/Diseases'
import Text, { Subtitle } from '../../ui/Text'
import Icon from '../../ui/Icon'

const Container = styled('div')`
  border-left: solid 3px ${({ theme }) => theme.colors.blue};
  grid-area: 1 / 2 / 2 / 3;
  padding: 16px;
`

const SmallButton = styled(Button)`
  min-width: auto;
  line-height: 1.2em;
`

interface Props {
  currentPatient: Patient
}

export default function MedicalManual({ currentPatient }: Props) {
  const [currentDiseaseTypeIndex, setCurrentDiseaseTypeIndex] = useState(0)
  const currentDiseaseType = diseasesTypes[currentDiseaseTypeIndex]
  const Rules = currentDiseaseType.rules
  const dispatch = useGameDispatch()

  return (
    <Container>
      <DiseaseCategoryChooser
        currentDiseaseTypeIndex={currentDiseaseTypeIndex}
        setCurrentDiseaseTypeIndex={setCurrentDiseaseTypeIndex}
      />
      <Subtitle style={{ color: 'black', marginTop: 16 }}>Common symptoms :</Subtitle>
      <Text style={{ color: 'black' }}>{currentDiseaseType.symptoms.join(', ')}</Text>
      <Subtitle style={{ color: 'black', marginTop: 16 }}>Diseases :</Subtitle>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {currentDiseaseType.diseases.map((disease) => (
          <SmallButton
            style={{ marginRight: 8, marginTop: 8 }}
            onClick={() => dispatch({ type: 'HEAL_PATIENT', patient: currentPatient, disease })}
          >
            {disease.name}
          </SmallButton>
        ))}
      </div>
      <Subtitle style={{ color: 'black', marginTop: 16 }}>How to know:</Subtitle>
      <Rules />
    </Container>
  )
}

type DiseaseCategoryChooserProps = {
  currentDiseaseTypeIndex: number
  setCurrentDiseaseTypeIndex: (n: number) => void
}
function DiseaseCategoryChooser({
  currentDiseaseTypeIndex,
  setCurrentDiseaseTypeIndex,
}: DiseaseCategoryChooserProps) {
  const theme = useTheme()
  const currentDiseaseType = diseasesTypes[currentDiseaseTypeIndex]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 32,
      }}
    >
      <div
        onClick={() =>
          setCurrentDiseaseTypeIndex(
            currentDiseaseTypeIndex - 1 < 0
              ? diseasesTypes.length - 1
              : currentDiseaseTypeIndex - 1,
          )
        }
      >
        <Icon
          style={{ fontSize: 32, color: theme.colors.blue, cursor: 'pointer' }}
          name="arrow-left"
        />
      </div>
      <Subtitle style={{ fontSize: 32, color: theme.colors.blue }}>
        {currentDiseaseType.name}
      </Subtitle>
      <div
        onClick={() =>
          setCurrentDiseaseTypeIndex((currentDiseaseTypeIndex + 1) % diseasesTypes.length)
        }
      >
        <Icon
          style={{ fontSize: 32, color: theme.colors.blue, cursor: 'pointer' }}
          name="arrow-right"
        />
      </div>
    </div>
  )
}
