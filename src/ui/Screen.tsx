import { styled } from '../theme'
import backgroundImage from '../assets/background.jpg'

const Screen = styled('div')`
  width: 1200px;
  height: 800px;
  background-color: white;
  overflow: auto;
  background-image: url(${backgroundImage});
  background-position: center;
  background-size: cover;
`

export default Screen
