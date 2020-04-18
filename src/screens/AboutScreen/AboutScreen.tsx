import React from 'react'
import { styled } from '../../theme'
import Text from '../../ui/Text'
import Button from '../../ui/Button'

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

export default function AboutScreen({ onBackClick }: Props) {
  return (
    <Container>
      <Text style={{ maxWidth: 700, fontSize: 24, textAlign: 'justify' }}>
        Id et anim ea aliqua sint officia quis nulla sit cillum. Veniam occaecat quis excepteur
        nostrud sit nulla culpa reprehenderit labore exercitation duis magna ex. Ex non esse
        deserunt et eu reprehenderit laborum tempor. Ad dolore aliqua consectetur eiusmod. Id
        pariatur eu qui reprehenderit ipsum laboris est. Eu cupidatat minim nostrud fugiat excepteur
        proident cillum proident est dolor exercitation tempor tempor. Lorem laboris id amet sint
        sunt quis velit laborum amet pariatur qui.
      </Text>
      <Button onClick={onBackClick}>back</Button>
    </Container>
  )
}
