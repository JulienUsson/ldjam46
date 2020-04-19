import React, { useState } from 'react'
import { useGameDispatch, useGameState } from './Game'
import Button from '../../ui/Button'
import { styled, useTheme } from '../../theme'
import { Patient } from '../../types/Patient'
import Text, { Subtitle } from '../../ui/Text'
import Icon from '../../ui/Icon'
import { Disease } from '../../types/Diseases'
import ReactMarkdown from 'react-markdown'

const Container = styled('div')`
  border-left: solid 3px ${({ theme }) => theme.colors.blue};
  grid-area: 1 / 2 / 2 / 3;
  padding: 16px;
  display: flex;
  flex-direction: column;
`

const SmallButton = styled(Button)`
  min-width: auto;
  line-height: 1.2em;
`

const Spacer = styled('div')`
  flex-grow: 1;
`

interface Props {
  currentPatient: Patient
}

export default function MedicalManual({ currentPatient }: Props) {
  const {
    level: { diseases },
  } = useGameState()
  const dispatch = useGameDispatch()

  const [currentDiseaseIndex, setCurrentDiseaseIndex] = useState(0)
  const currentDisease = diseases[currentDiseaseIndex]

  return (
    <Container>
      <DiseaseChooser
        diseases={diseases}
        currentDiseaseIndex={currentDiseaseIndex}
        setCurrentDiseaseIndex={setCurrentDiseaseIndex}
      />

      <Subtitle style={{ color: 'black', marginTop: 16 }}>How to know:</Subtitle>
      <Text style={{ color: 'black', lineHeight: '1.4em' }}>
        <ReactMarkdown source={currentDisease.rules} />
      </Text>

      <Spacer />

      <SmallButton
        style={{ marginRight: 8, marginTop: 8 }}
        onClick={() =>
          dispatch({ type: 'HEAL_PATIENT', patient: currentPatient, disease: currentDisease })
        }
      >
        Cure for this disease
      </SmallButton>
    </Container>
  )
}

type DiseaseCategoryChooserProps = {
  diseases: Disease[]
  currentDiseaseIndex: number
  setCurrentDiseaseIndex: (n: number) => void
}
function DiseaseChooser({
  diseases,
  currentDiseaseIndex,
  setCurrentDiseaseIndex,
}: DiseaseCategoryChooserProps) {
  const theme = useTheme()
  const currentDisease = diseases[currentDiseaseIndex]
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
          setCurrentDiseaseIndex(
            currentDiseaseIndex - 1 < 0 ? diseases.length - 1 : currentDiseaseIndex - 1,
          )
        }
      >
        <Icon
          style={{ fontSize: 32, color: theme.colors.blue, cursor: 'pointer' }}
          name="arrow-left"
        />
      </div>
      <Subtitle style={{ fontSize: 32, color: theme.colors.blue }}>{currentDisease.name}</Subtitle>
      <div onClick={() => setCurrentDiseaseIndex((currentDiseaseIndex + 1) % diseases.length)}>
        <Icon
          style={{ fontSize: 32, color: theme.colors.blue, cursor: 'pointer' }}
          name="arrow-right"
        />
      </div>
    </div>
  )
}
