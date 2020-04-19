import { styled } from '../theme'

const Button = styled('button')`
  cursor: pointer;
  border: solid 3px white;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.8em;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme }) => theme.colors.blue};
  transition-duration: 0.4s;
  box-shadow: ${({ theme }) => theme.shadows[8]};
  min-width: 300px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkerBlue};
  }
`

export default Button
