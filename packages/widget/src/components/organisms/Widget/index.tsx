import { ThemeProvider } from 'styled-components'
import useMeasure from 'react-use-measure'

import { ConnectAction, Theme } from '../../../types'
import { darkTheme, lightTheme } from '../../../styles/theme'
import { WidgetContent } from './Widget'

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  connectAction: ConnectAction
  hasContainer?: boolean
  hasHeader?: boolean
  name?: string
  shadowless?: boolean
  theme?: Theme
  trackingCode?: string
}

/**
 * Widget that allows users to register ENS names inline.
 * @param connectAction Function that gets called when the user clicks the connect button.
 * @param hasContainer Whether or not to render the widget in a container. Defaults to true.
 * @param hasHeader Whether or not to show the widget header. Defaults to true.
 * @param name Optional preset name to register.
 * @param shadowless Whether or not to render a box shadow around the widget. Will be ignored if hasContainer is false. Defaults to false.
 * @param theme Colors to render the widget in. Options are "light" (default) and "dark".
 * @param trackingCode Optional unique identifier (4-16 character string) to track the widget's usage on-chain.
 */
export const RegistrationWidget = ({
  connectAction,
  hasContainer = true,
  hasHeader = true,
  name,
  shadowless = false,
  theme: widgetTheme,
  trackingCode,
  ...props
}: WidgetProps) => {
  const [sizeRef, { height }] = useMeasure()

  return (
    <ThemeProvider theme={widgetTheme === 'dark' ? darkTheme : lightTheme}>
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
            containerShadowless={hasContainer ? shadowless : true}
            hasContainer={hasContainer}
            hasHeader={hasHeader}
            presetName={name}
            trackingCode={trackingCode}
            {...props}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}
