import type {
  Chain,
  Connector,
  Provider,
  ProviderWithFallbackConfig,
  Storage,
  WebSocketProvider,
} from '@wagmi/core'
import type { providers } from 'ethers'

export interface WagmiClientConfig {
  autoConnect?: boolean
  connectors?: (() => Connector<any, any, any>[]) | Connector<any, any, any>[]
  logger?: any
  provider: ({ chainId }: { chainId?: number | undefined }) =>
    | ((ProviderWithFallbackConfig<Provider> | providers.FallbackProvider) & {
        chains: Chain[]
        pollingInterval: number
      })
    | Provider
  storage?: Storage
  webSocketProvider?: WebSocketProvider
}

export type Theme = 'light' | 'dark'

export type ConnectAction = (() => void) | ((show: boolean) => void) | undefined
