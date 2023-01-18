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
import { parseEther } from 'ethers/lib/utils.js'
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
import { RegistrationSuccess } from './screens/RegistrationSuccess'
import { Rows } from '../../atoms/Row'
import { useCost } from '../../../hooks/useCost'
import { useCreateSecret } from '../../../hooks/useCreateSecret'
import useDebounce from '../../../hooks/useDebounce'

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
    isError: isCostError,
    isLoading: isCostLoading,
  } = useCost({
    name: debouncedName,
    duration: debouncedDuration,
    isConnected,
  })

  const secret = useCreateSecret()
  const resolver = getResolverAddress(chain?.id)

  const available = useContractRead({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'available',
    args: debouncedName ? [parseName(debouncedName)] : undefined,
    enabled: !!debouncedName && !!address,
  })

  const makeCommitment = useContractRead({
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
    enabled: !!debouncedName && !!address && !!available.data,
  })

  const prepareCommit = usePrepareContractWrite({
    address: REGISTRAR_ADDRESS,
    abi: REGISTRAR_ABI,
    functionName: 'commit',
    args: [makeCommitment.data!],
    enabled: !!makeCommitment.data,
  })

  const commit = useContractWrite(prepareCommit.config)
  const commitTx = useWaitForTransaction(commit.data)

  const [timer, setTimer] = React.useState<number>(60)

  // Once the commit is successful, start the countdown
  React.useEffect(() => {
    if (commitTx.isSuccess && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [commitTx.isSuccess])

  const prepareRegister = usePrepareContractWrite({
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

  const register = useContractWrite(prepareRegister.config)
  const registerTx = useWaitForTransaction(register.data)

  if (!mounted) return null

  // Third screen - registration has completed
  if (registerTx.isSuccess) {
    return (
      <Card {...props} shadowless={containerShadowless}>
        <RegistrationSuccess address={address!} name={parseName(name)} />
      </Card>
    )
  }

  // Second screen - registration has began
  if (commit.data) {
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

        {registerTx.isError ? (
          // Show registration error message
          <p>Registration failed</p>
        ) : registerTx.isLoading ? (
          // Show etherscan link for registration
          <Button
            loading
            shadowless
            variant="secondary"
            onClick={() => {
              window.open(getEtherscanLink(register.data, chain), '_blank')
            }}
          >
            Transaction processing...
          </Button>
        ) : commitTx.isSuccess && timer < 1 ? (
          // Show registerWithConfig button
          <Button
            variant="primary"
            loading={register.isLoading}
            tone={register.isError ? 'red' : 'accent'}
            onClick={() => register.write?.()}
            disabled={!register}
          >
            {register.isError
              ? 'Error Sending Transaction'
              : register.isLoading
              ? 'Confirm in Wallet'
              : 'Complete Registration'}
          </Button>
        ) : commitTx.isSuccess && timer > 0 ? (
          // Show countdown
          <Button variant="secondary" disabled shadowless>
            Waiting... {timer}
          </Button>
        ) : commitTx.isLoading ? (
          // Show etherscan link for commit
          <Button
            loading
            shadowless
            variant="secondary"
            onClick={() => {
              window.open(getEtherscanLink(commit.data, chain), '_blank')
            }}
          >
            Transaction processing...
          </Button>
        ) : null}
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

        commit.write?.()
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
          isValid={available.data}
        />

        <Input
          type="number"
          label="Duration"
          placeholder="1 year"
          value={duration}
          setValue={setDuration}
        />
      </Inputs>

      {available.isError || makeCommitment.isError || prepareCommit.isError ? (
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
            tone={commit.isError ? 'red' : 'accent'}
            disabled={!commit || !available.data}
            loading={
              (isCostLoading && !isCostError) ||
              prepareCommit.isLoading ||
              commit.isLoading
            }
            suffix={
              cost && !commit.isError ? (
                <span style={{ fontWeight: '300', opacity: '90%' }}>
                  ({cost})
                </span>
              ) : null
            }
            type="submit"
          >
            {commit.isError
              ? 'Error Sending Transaction'
              : commit.isLoading
              ? 'Confirm in Wallet'
              : 'Begin Registration'}
          </Button>
        </>
      )}
    </Card>
  )
}

export { Widget as WidgetContent }
