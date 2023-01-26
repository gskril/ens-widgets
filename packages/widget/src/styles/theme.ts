import 'styled-components'
import { lightTheme } from '@ensdomains/thorin'

export const theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    lightGrey: '#9b9ba7',
  },
  boxShadows: {
    ...lightTheme.boxShadows,
    primary: '1px 4px 26px rgba(78, 162, 240, 0.25)',
  },
}

type ExtendedTheme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ExtendedTheme {}
}
