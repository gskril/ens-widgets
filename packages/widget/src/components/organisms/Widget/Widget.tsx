import { useState } from 'react'

import { Card } from './styles'
import { ConnectAction } from '../../../types'
import { parseName } from '../../../utils'
import { PrimaryName, Start, Steps, Success } from './screens'
import { useCreateSecret } from '../../../hooks'

interface WidgetProps {
  connectAction: ConnectAction
  containerShadowless?: true
  presetName?: string
  trackingCode?: string
}

const Widget = ({
  connectAction,
  containerShadowless,
  presetName,
  trackingCode,
  ...props
}: WidgetProps) => {
  const secret = useCreateSecret(trackingCode)
  const [name, setName] = useState<string>('')
  const [duration, setDuration] = useState<string>('1 year')

  // prettier-ignore
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState<boolean>(false)
  const [isPrimaryNameSet, setIsPrimaryNameSet] = useState<boolean>(false)
  const [commitHash, setCommitHash] = useState<`0x${string}` | null>(null)

  return (
    <Card {...props} shadowless={containerShadowless}>
      {isPrimaryNameSet ? (
        // Final screen
        <Success name={parseName(name)} />
      ) : isRegistrationSuccess ? (
        // Third screen - registration has completed
        <PrimaryName
          name={parseName(name)}
          setIsPrimaryNameSet={setIsPrimaryNameSet}
        />
      ) : commitHash ? (
        // Second screen - registration has started
        <Steps
          commitHash={commitHash}
          duration={duration}
          name={name}
          secret={secret}
          setIsRegistrationSuccess={setIsRegistrationSuccess}
        />
      ) : (
        // First screen - prepare registration
        <Start
          connectAction={connectAction}
          duration={duration}
          name={name}
          presetName={presetName}
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
