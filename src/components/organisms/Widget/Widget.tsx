import { useAccount } from 'wagmi'
import React from 'react'

import { Button, Card, Inputs } from './styles'
import { Header } from '../Header'
import { Input } from '../../atoms/Input'

interface WidgetProps {
  connectAction: (() => void) | undefined
}

const Widget = ({ connectAction, ...props }: WidgetProps) => {
  const [name, setName] = React.useState<string>('')
  const [duration, setDuration] = React.useState<string>('1 year')

  const [mounted, setMounted] = React.useState<boolean>(false)
  React.useEffect(() => setMounted(true), [])

  const { isConnected } = useAccount()

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

      {isConnected && <Button variant="primary">Begin Registration</Button>}
    </Card>
  )
}

export { Widget as WidgetContent }
