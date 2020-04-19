import React from 'react'
import { useGameState, useGameDispatch } from './Game'
import formatTimeLeft from '../../utils/formatTimeLeft'
import { styled } from '../../theme'
import Icon from '../../ui/Icon'
import Text from '../../ui/Text'

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  & * {
    font-size: 24px !important;
  }
  & > p {
    margin-right: 32px;
  }
  & button {
    margin-right: 16px;
  }
`

const Spacer = styled('div')`
  flex-grow: 1;
`

const Button = styled('button')`
  cursor: pointer;
  border: solid 2px white;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 24px;
  line-height: 1em;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme }) => theme.colors.blue};
  transition-duration: 0.4s;
  box-shadow: ${({ theme }) => theme.shadows[1]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkerBlue};
  }
`

export default function TopPanel() {
  const {
    state,
    deads,
    savedPatients,
    level: { dayDuration },
    elapsedTime,
  } = useGameState()
  const dispatch = useGameDispatch()
  const isPaused = state === 'PAUSE'

  return (
    <Container>
      <Spacer />
      <Text style={{ width: 80 }}>
        <Icon name="timer-sand" /> {formatTimeLeft(elapsedTime, dayDuration)}
      </Text>
      <Text>
        <Icon name="emoticon-outline" /> {savedPatients.length}
      </Text>
      <Text>
        <Icon name="emoticon-dead-outline" /> {deads.length}{' '}
      </Text>
      <Spacer />
      {isPaused ? (
        <div>
          <Button onClick={() => dispatch({ type: 'RESUME' })}>
            <Icon name="play" />
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => dispatch({ type: 'PAUSE' })}>
            <Icon name="pause" />
          </Button>
        </div>
      )}
      <div>
        <Button onClick={() => dispatch({ type: 'GIVE_UP' })}>
          <Icon name="exit-to-app" />
        </Button>
      </div>
    </Container>
  )
}
