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
      <Text style={{ maxWidth: 700, fontSize: 24, textAlign: 'justify' }}>
        Nisi deserunt dolor ex aliquip Lorem anim ut laboris. Amet aliquip quis nulla duis deserunt.
        Nostrud mollit enim quis ad ut cillum officia. Aliqua voluptate laboris mollit esse mollit
        tempor sunt exercitation ea consequat aute sunt consectetur anim. Enim esse proident
        occaecat aliqua consequat ea magna enim.
      </Text>
      <Button onClick={onBackClick}>back</Button>
    </Container>
  )
}
