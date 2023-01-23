import React from 'react'

import { Card } from './styles'
import { parseName } from '../../../utils'
import { Start, Steps, Success } from './screens'
import { useCreateSecret } from '../../../hooks/useCreateSecret'

interface WidgetProps {
  connectAction: (() => void) | undefined
  containerShadowless?: true
  trackingCode?: string
}

const Widget = ({
  connectAction,
  containerShadowless,
  trackingCode,
  ...props
}: WidgetProps) => {
  const secret = useCreateSecret(trackingCode)
  const [name, setName] = React.useState<string>('')
  const [duration, setDuration] = React.useState<string>('1 year')

  // prettier-ignore
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState<boolean>(false)
  const [commitHash, setCommitHash] = React.useState<`0x${string}` | null>(null)

  return (
    <Card {...props} shadowless={containerShadowless}>
      {isRegistrationSuccess ? (
        // Third screen - registration has completed
        <Success name={parseName(name)} />
      ) : commitHash ? (
        // Second screen - registration has began
        <Steps
          commitHash={commitHash}
          duration={duration}
          name={name}
          secret={secret}
          setIsRegistrationSuccess={setIsRegistrationSuccess}
        />
      ) : (
        // First screen - registration has not began
        <Start
          connectAction={connectAction}
          duration={duration}
          name={name}
          secret={secret}
          setCommitHash={setCommitHash}
          setDuration={setDuration}
          setName={setName}
        />
      )}
    </Card>
  )
}

export { Widget as WidgetContent }
