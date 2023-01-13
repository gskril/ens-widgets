import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, Typography } from '@ensdomains/thorin'
import React from 'react'

import { Button, Card, Header, Inputs, LogoWrapper } from './styles'
import { Input } from '../../atoms/Input'
import { Logo } from '../../atoms/Icons'
import { theme } from '../../../styles/theme'

export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Widget = ({ ...props }) => {
  const [name, setName] = React.useState<string>('')
  const [duration, setDuration] = React.useState<string>('1 year')

  return (
    <ThemeProvider theme={theme}>
      <ThorinGlobalStyles />
      <Card {...props}>
        <Header>
          <Typography
            as="label"
            variant="large"
            weight="semiBold"
            style={{ lineHeight: 1 }}
          >
            Register an .eth name
          </Typography>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Header>

        <Inputs>
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
        </Inputs>

        <Button variant="secondary" shadowless>
          Connect Wallet
        </Button>
      </Card>
    </ThemeProvider>
  )
}
