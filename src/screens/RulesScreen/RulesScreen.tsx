import React from 'react'
import { styled } from '../../theme'
import Button from '../../ui/Button'
import Text from '../../ui/Text'

const Container = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin: ${({ theme }) => theme.spacing(4)};
  }
`

interface Props {
  onBackClick: () => void
}

export default function RulesScreen({ onBackClick }: Props) {
  return (
    <Container>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>
        YOU DON'T HAVE TIME FOR THAT !<br />
        GO SAVES LIFES !
      </Text>
      <Button onClick={onBackClick}>back</Button>
    </Container>
  )
}
