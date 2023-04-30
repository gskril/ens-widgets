import { useEffect, useState } from 'react'

import { Card } from './styles'
import { ConnectAction, WidgetStatus } from '../../../types'
import { parseName } from '../../../utils'
import { PrimaryName, Start, Steps, Success } from './screens'
import { useCreateSecret } from '../../../hooks'

interface WidgetProps {
  connectAction: ConnectAction
  containerShadowless: boolean
  hasContainer: boolean
  hasHeader: boolean
  presetName?: string
  setStatus: (newStatus: WidgetStatus) => void
  trackingCode?: string
}

const Widget = ({
  connectAction,
  containerShadowless,
  hasContainer,
  hasHeader,
  presetName,
  trackingCode,
  setStatus,
  ...props
}: WidgetProps) => {
  const secret = useCreateSecret(trackingCode)
  const [name, setName] = useState<string>('')
  const [duration, setDuration] = useState<string>('1 year')

  // prettier-ignore
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState<boolean>(false)
  const [isPrimaryNameSet, setIsPrimaryNameSet] = useState<boolean>(false)
  const [commitHash, setCommitHash] = useState<`0x${string}` | null>(null)

  useEffect(() => {
    if (isRegistrationSuccess) {
      setStatus('success')
    } else if (commitHash) {
      setStatus('active')
    }
  }, [commitHash, isRegistrationSuccess])

  return (
    <Card
      {...props}
      hasContainer={hasContainer}
      shadowless={containerShadowless}
    >
      {isPrimaryNameSet ? (
        // Final screen
        <Success name={parseName(name)} />
      ) : isRegistrationSuccess ? (
        // Third screen - registration has completed
        <PrimaryName
          name={parseName(name)}
          setIsPrimaryNameSet={setIsPrimaryNameSet}
          hasHeader={hasHeader}
        />
      ) : commitHash ? (
        // Second screen - registration has started
        <Steps
          commitHash={commitHash}
          duration={duration}
          name={name}
          secret={secret}
          setIsRegistrationSuccess={setIsRegistrationSuccess}
          hasHeader={hasHeader}
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
          hasHeader={hasHeader}
        />
      )}
    </Card>
  )
}

export { Widget as WidgetContent }
