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
      <Text style={{ fontSize: 24, textAlign: 'center' }}>
        Made with{' '}
        <span role="img" aria-label="love" style={{ color: 'red' }}>
          ❤️
        </span>{' '}
        by <a href="https://julien.usson.me/">Julien Usson</a> during the Ludum Dare 46.
        <br />
        The source code is available <a href="https://github.com/JulienUsson/ldjam46">here</a>.
        <br />
        It's inspired by Cook, Serve, Delicious!, Theme Hospital and Keep Talking and Nobody
        Explodes.
        <br />
        Obviously, all diseases, symptoms and medical stuffs in this game are fake and imaginary.
        <br />
        Have fun !
      </Text>
      <Button onClick={onBackClick}>back</Button>
    </Container>
  )
}
