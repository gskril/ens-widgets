import 'styled-components'
import { lightTheme } from '@ensdomains/thorin'

export const theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    lightGrey: '#9b9ba7',
  },
}

type ExtendedTheme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ExtendedTheme {}
}
