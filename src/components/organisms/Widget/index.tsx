import { Card } from '@ensdomains/thorin'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, Typography } from '@ensdomains/thorin'
import React from 'react'

import { Header, LogoWrapper } from './styles'
import { Input } from '../../atoms/Input'
import { Logo } from '../../atoms/Icons'
import { theme } from '../../../styles/theme'

export const Widget = () => {
  const [name, setName] = React.useState<string>('')
  const [duration, setDuration] = React.useState<string>('1 year')

  return (
    <ThemeProvider theme={theme}>
      <ThorinGlobalStyles />
      <Card shadow>
        <Header>
          <Typography as="label" variant="large" weight="semiBold">
            Register an .eth name
          </Typography>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Header>

        <Input
          type="text"
          label="Name"
          placeholder="nick.eth"
          value={name}
          setValue={setName}
        />

        <Input
          type="number"
          label="Duration"
          placeholder="1 year"
          value={duration}
          setValue={setDuration}
        />
      </Card>
    </ThemeProvider>
  )
}
