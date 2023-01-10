import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Typography } from '@ensdomains/thorin'
import React from 'react'

const Widget = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <Typography>hi</Typography>
    </ThemeProvider>
  )
}

export default Widget
