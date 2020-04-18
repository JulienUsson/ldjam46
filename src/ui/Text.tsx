import { styled } from '../theme'

export const Title = styled('h1')`
  text-shadow: 4px 2px 0 #fff;
  color: ${({ theme }) => theme.colors.blue};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 48px;
  margin: 0;
`

export const Subtitle = styled('h2')`
  color: white;
  font-family: ${({ theme }) => theme.fontFamily};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
`

const Text = styled('p')`
  color: white;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fontFamily};
`
export default Text
