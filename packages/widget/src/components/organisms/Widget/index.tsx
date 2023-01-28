import { createClient, WagmiConfig } from 'wagmi'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles } from '@ensdomains/thorin'
import React from 'react'
import useMeasure from 'react-use-measure'

import { ConnectAction, Theme, WagmiClientConfig } from '../../../types'
import { darkTheme, lightTheme } from '../../../styles/theme'
import { WidgetContent } from './Widget'

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  connectAction: ConnectAction
  name?: string
  shadowless?: true
  theme?: Theme
  trackingCode?: string
  wagmiClientConfig: WagmiClientConfig
}

/**
 * Widget that allows users to register ENS names inline.
 * @param connectAction Function that gets called when the user clicks the connect button.
 * @param name Optional preset name to register.
 * @param shadowless Whether or not to render a box shadow around the widget. Defaults to false (showing the shadow).
 * @param theme Colors to render the widget in. Options are "light" (default) and "dark".
 * @param trackingCode Optional unique identifier (4-16 character string) to track the widget's usage on-chain.
 * @param wagmiClientConfig Config object that gets passed into wagmi's `createClient()`.
 */
export const Widget = ({
  connectAction,
  name,
  shadowless,
  theme: widgetTheme,
  trackingCode,
  wagmiClientConfig,
  ...props
}: WidgetProps) => {
  if (!wagmiClientConfig) return null // TODO: handle this better

  const client = createClient(wagmiClientConfig)
  const [sizeRef, { height }] = useMeasure()

  return (
    <WagmiConfig client={client}>
      <ThemeProvider theme={widgetTheme === 'dark' ? darkTheme : lightTheme}>
        <ThorinGlobalStyles />
        <div
          style={{
            width: '100%',
            height: height > 0 ? `${height}px` : 'auto',
            transition: 'height 0.3s ease-in-out',
          }}
        >
          <div ref={sizeRef}>
            <WidgetContent
              connectAction={connectAction}
              containerShadowless={shadowless}
              presetName={name}
              trackingCode={trackingCode}
              {...props}
            />
          </div>
        </div>
      </ThemeProvider>
    </WagmiConfig>
  )
}
