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
  },
}

type ExtendedTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ExtendedTheme {}
}
