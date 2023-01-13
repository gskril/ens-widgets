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

export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
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
 * Widget that allows users to register ENS names inline
 * @param wagmiClientConfig Config object that gets passed into wagmi's `createClient()`
 */
export const Widget = ({ wagmiClientConfig, ...props }: WidgetProps) => {
  if (!wagmiClientConfig) return null // TODO: handle this better

  const client = createClient(wagmiClientConfig)

  return (
    <WagmiConfig client={client}>
      <ThemeProvider theme={theme}>
        <ThorinGlobalStyles {...props} />
        <WidgetContent />
      </ThemeProvider>
    </WagmiConfig>
  )
}
