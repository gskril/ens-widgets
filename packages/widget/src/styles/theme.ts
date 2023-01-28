import 'styled-components'
import {
  darkTheme as thorinDarkTheme,
  lightTheme as thorinLightTheme,
} from '@ensdomains/thorin'

export const lightTheme = {
  ...thorinLightTheme,
  colors: {
    ...thorinLightTheme.colors,
    lightGrey: '#9b9ba7',
    backgroundSecondary: '#fafcff',
    '0': '#fff',
    '100': '#000',
  },
  boxShadows: {
    ...thorinLightTheme.boxShadows,
    primary: '1px 4px 26px rgba(78, 162, 240, 0.25)',
  },
}

export const darkTheme = {
  ...thorinDarkTheme,
  colors: {
    ...thorinDarkTheme.colors,
    lightGrey: '#9b9ba7',
    backgroundSecondary: '#19191a',
    '0': '#000',
    '100': '#fff',
  },
  boxShadows: {
    ...thorinDarkTheme.boxShadows,
    primary: '1px 4px 26px rgba(78, 162, 240, 0.25)',
    '0.02': '0 2px 8px rgb(255 255 255 / 3%)',
  },
}

type ExtendedTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ExtendedTheme {}
}
