import { Card } from '@ensdomains/thorin'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme, Typography } from '@ensdomains/thorin'
import React from 'react'

const Widget = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <Card shadow>
        <Typography>Register an .eth name</Typography>
      </Card>
    </ThemeProvider>
  )
}

export default Widget
