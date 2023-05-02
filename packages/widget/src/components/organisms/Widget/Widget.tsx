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
  const [isPrimaryNameChecked, setIsPrimaryNameChecked] = useState(false)

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
      {isPrimaryNameSet || (isRegistrationSuccess && isPrimaryNameChecked) ? (
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
          hasHeader={hasHeader}
          isPrimaryNameChecked={isPrimaryNameChecked}
          name={name}
          secret={secret}
          setIsRegistrationSuccess={setIsRegistrationSuccess}
        />
      ) : (
        // First screen - prepare registration
        <Start
          connectAction={connectAction}
          duration={duration}
          hasHeader={hasHeader}
          isPrimaryNameChecked={isPrimaryNameChecked}
          name={name}
          presetName={presetName}
          secret={secret}
          setCommitHash={setCommitHash}
          setDuration={setDuration}
          setIsPrimaryNameChecked={setIsPrimaryNameChecked}
          setName={setName}
        />
      )}
    </Card>
  )
}

export { Widget as WidgetContent }
