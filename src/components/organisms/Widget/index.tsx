import { createClient, WagmiConfig } from 'wagmi'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles } from '@ensdomains/thorin'
import React from 'react'

import { theme } from '../../../styles/theme'
import { WidgetContent } from './Widget'
import {
  Chain,
  Connector,
  Provider,
  ProviderWithFallbackConfig,
  Storage,
  WebSocketProvider,
} from '@wagmi/core'
import { providers } from 'ethers'

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  connectAction: (() => void) | undefined
  debug?: true
  shadowless?: true
  wagmiClientConfig: {
    autoConnect?: boolean
    connectors?: () => Connector<any, any, any>[]
    logger?: any
    provider: ({ chainId }: { chainId?: number | undefined }) => (
      | ProviderWithFallbackConfig<Provider>
      | providers.FallbackProvider
    ) & {
      chains: Chain[]
      pollingInterval: number
    }
    storage?: Storage
    webSocketProvider?: WebSocketProvider
  }
}

/**
 * Widget that allows users to register ENS names inline.
 * @param connectAction Hook that gets called when the user clicks the connect button.
 * @param shadowless Whether or not to render a box shadow around the widget. Defaults to false (showing the shadow).
 * @param wagmiClientConfig Config object that gets passed into wagmi's `createClient()`
 */
export const Widget = ({
  connectAction,
  shadowless: containerShadowless,
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
          containerShadowless={containerShadowless}
          {...props}
        />
      </ThemeProvider>
    </WagmiConfig>
  )
}
