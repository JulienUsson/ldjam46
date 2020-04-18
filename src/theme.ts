import { useTheme as useThemeFromEmotion } from 'emotion-theming'
import styledFromEmotion, { CreateStyled } from '@emotion/styled/macro'

const theme = {
  spacing: (n: number) => `${n * 4}px`,
}

export type Theme = typeof theme
export default theme

export const styled = styledFromEmotion as CreateStyled<Theme>

export function useTheme(): Theme {
  return useThemeFromEmotion<Theme>()
}
