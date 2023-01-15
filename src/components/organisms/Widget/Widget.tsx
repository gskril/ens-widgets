import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi'
import { BigNumber } from 'ethers'
import { Helper } from '@ensdomains/thorin'
import React from 'react'

import { Button, Card, Inputs } from './styles'
import { getEtherscanLink, parseDuration, parseName } from '../../../utils'
import {
  getResolverAddress,
  REGISTRAR_ABI,
  REGISTRAR_ADDRESS,
} from '../../../contracts'
import { Header } from '../Header'
import { Input } from '../../atoms/Input'
import { Rows } from '../../atoms/Row'
import { useCost } from '../../../hooks/useCost'
import { useCreateSecret } from '../../../hooks/useCreateSecret'
import useDebounce from '../../../hooks/useDebounce'
import { parseEther } from 'ethers/lib/utils.js'

interface WidgetProps {
  connectAction: (() => void) | undefined
  containerShadowless?: true
}

const Widget = ({
  connectAction,
  containerShadowless,
  ...props
}: WidgetProps) => {
  const [name, setName] = React.useState<string>('')
  const [duration, setDuration] = React.useState<string>('1 year')

  const debouncedName = useDebounce<string>(name, 500)
  const debouncedDuration = useDebounce<string>(duration, 500)

  const [mounted, setMounted] = React.useState<boolean>(false)
  React.useEffect(() => setMounted(true), [])

  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const {
    cost,
    rentEth,
    isError: costIsError,
    isLoading: costIsLoading,
  } = useCost({
    name: debouncedName,
    duration: debouncedDuration,
    isConnected,
  })

  const secret = useCreateSecret()
  const resolver = getResolverAddress(chain?.id)

  const { data: isAvailable, isError: isAvailableError } = useContractRead({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'available',
    args: debouncedName ? [parseName(debouncedName)] : undefined,
    enabled: !!debouncedName && !!address,
  })

  const { data: commitment, isError: isCommitmentError } = useContractRead({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'makeCommitmentWithConfig',
    args: [
      parseName(debouncedName),
      address || '0x',
      secret,
      resolver,
      address || '0x',
    ],
    enabled: !!debouncedName && !!address,
  })

  const {
    config: commitConfig,
    isLoading: commitConfigIsLoading,
    isError: commitConfigIsError,
  } = usePrepareContractWrite({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'commit',
    args: [commitment!],
    enabled: !!commitment,
  })

  const {
    data: commitTx,
    write: commit,
    isLoading: commitTxIsLoading,
    isError: commitTxIsError,
  } = useContractWrite(commitConfig)
  const {
    isSuccess: commitIsSuccess,
    isError: commitIsError,
    isLoading: commitIsLoading,
  } = useWaitForTransaction(commitTx)

  const [timer, setTimer] = React.useState<number>(60)

  // Once commitIsSuccess is true for the first time, countdown to 0
  React.useEffect(() => {
    if (commitIsSuccess && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [commitIsSuccess])

  const { config: registerConfig } = usePrepareContractWrite({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'registerWithConfig',
    args: [
      parseName(name),
      address || '0x',
      parseDuration(duration) as unknown as BigNumber,
      secret,
      resolver,
      address || '0x',
    ],
    overrides: {
      value: parseEther((Number(rentEth)! * 1.05).toFixed(12).toString()),
      gasLimit: BigNumber.from('300000'),
    },
    enabled: timer < 5,
  })

  const {
    data: registerTx,
    write: register,
    isError: registerIsError,
    isLoading: registerIsLoading,
  } = useContractWrite(registerConfig)

  const {
    isSuccess: registerTxIsSuccess,
    isError: registerTxIsError,
    isLoading: registerTxIsLoading,
  } = useWaitForTransaction(registerTx)

  if (!mounted) return null

  // Third screen - registration has completed
  if (registerTxIsSuccess) {
    return (
      <Card {...props} shadowless={containerShadowless}>
        <p>Registration success!</p>
      </Card>
    )
  }

  // Second screen - registration has began
  if (commitTx) {
    const rowData = [
      { name: 'Name', value: parseName(debouncedName) + '.eth' },
      { name: 'Duration', value: debouncedDuration },
    ]

    if (cost) {
      rowData.push({ name: 'Estimated Cost', value: cost })
    }

    return (
      <Card {...props} shadowless={containerShadowless}>
        <Header />

        <Rows data={rowData} />

        {registerTxIsError ? (
          // Show registration error message
          <p>Registration failed</p>
        ) : registerTxIsLoading ? (
          // Show etherscan link for registration
          <Button
            loading
            shadowless
            variant="secondary"
            onClick={() => {
              window.open(getEtherscanLink(registerTx, chain), '_blank')
            }}
          >
            Transaction processing...
          </Button>
        ) : commitIsSuccess && timer < 1 ? (
          // Show registerWithConfig button
          <Button
            variant="primary"
            loading={registerIsLoading}
            tone={registerIsError ? 'red' : 'accent'}
            onClick={() => register?.()}
            disabled={!register}
          >
            {registerIsError
              ? 'Error Sending Transaction'
              : registerIsLoading
              ? 'Confirm in Wallet'
              : 'Complete Registration'}
          </Button>
        ) : commitIsSuccess && timer > 0 ? (
          // Show countdown
          <Button variant="secondary" disabled shadowless>
            Waiting... {timer}
          </Button>
        ) : commitIsLoading ? (
          // Show etherscan link for commit
          <Button
            loading
            shadowless
            variant="secondary"
            onClick={() => {
              window.open(getEtherscanLink(commitTx, chain), '_blank')
            }}
          >
            Transaction processing...
          </Button>
        ) : (
          <p>Error :/</p>
        )}
      </Card>
    )
  }

  // First screen
  return (
    <Card
      {...props}
      as="form"
      shadowless={containerShadowless}
      onSubmit={(e) => {
        e.preventDefault()

        if (!isConnected) {
          connectAction?.()
          return
        }

        commit?.()
      }}
    >
      <Header />

      <Inputs>
        <Input
          type="text"
          label="Name"
          placeholder="nick.eth"
          value={name}
          setValue={setName}
          isValid={isAvailable}
        />

        <Input
          type="number"
          label="Duration"
          placeholder="1 year"
          value={duration}
          setValue={setDuration}
        />
      </Inputs>

      {isAvailableError || isCommitmentError || commitConfigIsError ? (
        <Helper type="error">
          <div>Unable to read from ENS Registrar</div>
        </Helper>
      ) : !isConnected ? (
        <Button shadowless variant="secondary" type="submit">
          Connect Wallet
        </Button>
      ) : (
        <>
          <Button
            variant="primary"
            tone={commitTxIsError ? 'red' : 'accent'}
            disabled={!commit || !isAvailable}
            loading={
              (costIsLoading && !costIsError) ||
              commitConfigIsLoading ||
              commitTxIsLoading
            }
            suffix={
              cost && !commitTxIsError ? (
                <span style={{ fontWeight: '300', opacity: '90%' }}>
                  ({cost})
                </span>
              ) : null
            }
            type="submit"
          >
            {commitTxIsError
              ? 'Error Sending Transaction'
              : commitTxIsLoading
              ? 'Confirm in Wallet'
              : 'Begin Registration'}
          </Button>
        </>
      )}
    </Card>
  )
}

export { Widget as WidgetContent }
