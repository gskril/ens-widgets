import { useAccount } from 'wagmi'
import React from 'react'

import { Button, Card, Inputs } from './styles'
import { Header } from '../Header'
import { Input } from '../../atoms/Input'
import { useCost } from '../../../hooks/useCost'
import useDebounce from '../../../hooks/useDebounce'

interface WidgetProps {
  connectAction: (() => void) | undefined
}

const Widget = ({ connectAction, ...props }: WidgetProps) => {
  const [name, setName] = React.useState<string>('')
  const [duration, setDuration] = React.useState<string>('1 year')

  const debouncedName = useDebounce<string>(name, 500)
  const debouncedDuration = useDebounce<string>(duration, 500)

  const [mounted, setMounted] = React.useState<boolean>(false)
  React.useEffect(() => setMounted(true), [])

  const { isConnected } = useAccount()
  const { cost, isLoading: costIsLoading } = useCost({
    name: debouncedName,
    duration: debouncedDuration,
    isConnected,
  })

  if (!mounted) return null

  return (
    <Card {...props}>
      <Header />

      <Inputs>
        <Input
          type="text"
          label="Name"
          placeholder="nick.eth"
          value={name}
          setValue={setName}
        />

        <Input
          type="number"
          label="Duration"
          placeholder="1 year"
          value={duration}
          setValue={setDuration}
        />
      </Inputs>

      {!isConnected && (
        <Button
          shadowless
          variant="secondary"
          onClick={() => {
            // TODO: add toast error if connectAction is undefined
            connectAction?.()
          }}
        >
          Connect Wallet
        </Button>
      )}

      {isConnected && (
        <Button
          variant="primary"
          loading={costIsLoading}
          suffix={
            cost ? (
              <span style={{ fontWeight: '300', opacity: '90%' }}>
                ({cost})
              </span>
            ) : null
          }
        >
          Begin Registration
        </Button>
      )}
    </Card>
  )
}

export { Widget as WidgetContent }
