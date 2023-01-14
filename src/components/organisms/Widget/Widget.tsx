import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi'
import React from 'react'

import { Button, Card, Inputs } from './styles'
import { Header } from '../Header'
import { Input } from '../../atoms/Input'
import { useCost } from '../../../hooks/useCost'
import useDebounce from '../../../hooks/useDebounce'
import {
  getResolverAddress,
  REGISTRAR_ABI,
  REGISTRAR_ADDRESS,
} from '../../../contracts'
import { useCreateSecret } from '../../../hooks/useCreateSecret'

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

  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { cost, isLoading: costIsLoading } = useCost({
    name: debouncedName,
    duration: debouncedDuration,
    isConnected,
  })

  const secret = useCreateSecret()
  const resolver = getResolverAddress(chain?.id)

  const { data: commitment } = useContractRead({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'makeCommitmentWithConfig',
    args: [debouncedName, address || '0x', secret, resolver, address || '0x'],
    enabled: !!name && !!address,
  })

  const { config } = usePrepareContractWrite({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'commit',
    args: [commitment!],
    enabled: !!commitment,
  })

  const { data: commitTx, write: commit } = useContractWrite(config)
  const {
    isSuccess: commitIsSuccess,
    isError: commitIsError,
    isLoading: commitIsLoading,
  } = useWaitForTransaction(commitTx)

  if (!mounted) return null

  // Second screen
  if (commitIsSuccess || commitIsError) {
    return (
      <Card {...props}>
        <p>Made it to step 2!</p>
        {commitIsSuccess && <p>Success!</p>}
        {commitIsError && <p>Error :/</p>}
        {commitment}
      </Card>
    )
  }

  // First screen
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

      {!isConnected ? (
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
      ) : commitIsLoading ? (
        <>
          <Button
            loading
            variant="secondary"
            onClick={() => {
              // open link to etherscan in new tab
              window.open(
                `https://${chain?.id === 5 ? 'goerli.' : ''}etherscan.io/tx/${
                  commitTx?.hash
                }`,
                '_blank'
              )
            }}
          >
            Transaction processing...
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          disabled={!commit}
          loading={costIsLoading}
          suffix={
            cost ? (
              <span style={{ fontWeight: '300', opacity: '90%' }}>
                ({cost})
              </span>
            ) : null
          }
          onClick={() => commit?.()}
        >
          Begin Registration
        </Button>
      )}
      {commitment}
    </Card>
  )
}

export { Widget as WidgetContent }
