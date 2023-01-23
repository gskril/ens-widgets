import { createClient, WagmiConfig } from 'wagmi'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles } from '@ensdomains/thorin'
import React from 'react'

import { theme } from '../../../styles/theme'
import { WidgetContent } from './Widget'
import { WagmiClientConfig } from '../../../types'

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  connectAction: (() => void) | undefined
  debug?: true
  shadowless?: true
  trackingCode?: string
  wagmiClientConfig: WagmiClientConfig
}

/**
 * Widget that allows users to register ENS names inline.
 * @param connectAction Hook that gets called when the user clicks the connect button.
 * @param shadowless Whether or not to render a box shadow around the widget. Defaults to false (showing the shadow).
 * @param trackingCode Unique identifier (4-16 character string) to track the widget's usage on-chain.
 * @param wagmiClientConfig Config object that gets passed into wagmi's `createClient()`
 */
export const Widget = ({
  connectAction,
  shadowless,
  trackingCode,
  wagmiClientConfig,
  ...props
}: WidgetProps) => {
  if (!wagmiClientConfig) return null // TODO: handle this better

  const client = createClient(wagmiClientConfig)

  return (
    <WagmiConfig client={client}>
      <ThemeProvider theme={theme}>
        <ThorinGlobalStyles />
        <WidgetContent
          connectAction={connectAction}
          containerShadowless={shadowless}
          trackingCode={trackingCode}
          {...props}
        />
      </ThemeProvider>
    </WagmiConfig>
  )
}
