import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import { Helper } from '@ensdomains/thorin'
import React from 'react'

import {
  REGISTRAR_ABI,
  REGISTRAR_ADDRESS,
  getResolverAddress,
} from '../../../../contracts'
import { Button, Container, Inputs } from '../styles'
import { Header } from '../../Header'
import { Input } from '../../../atoms/Input'
import { parseName } from '../../../../utils'
import { useCost } from '../../../../hooks/useCost'
import useDebounce from '../../../../hooks/useDebounce'

interface StartProps {
  connectAction: (() => void) | undefined
  duration: string
  name: string
  presetName: string | undefined
  secret: `0x${string}`
  setCommitHash: React.Dispatch<React.SetStateAction<Address | null>>
  setDuration: React.Dispatch<React.SetStateAction<string>>
  setName: React.Dispatch<React.SetStateAction<string>>
}

export const Start = ({
  connectAction,
  duration,
  name,
  presetName,
  secret,
  setCommitHash,
  setDuration,
  setName,
}: StartProps) => {
  const debouncedName = useDebounce<string>(name, 500)
  const debouncedDuration = useDebounce<string>(duration, 500)

  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const resolver = getResolverAddress(chain?.id)

  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true), []

    if (presetName) {
      setName(presetName)
    }
  })

  const {
    cost,
    isError: isCostError,
    isLoading: isCostLoading,
  } = useCost({
    name: debouncedName,
    duration: debouncedDuration,
    isConnected,
  })

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

  React.useEffect(() => {
    if (commit.data) {
      setCommitHash(commit.data.hash)
    }
  }, [commit.data])

  return (
    <Container
      as="form"
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
          disabled={!!presetName}
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
      ) : !isConnected || !isMounted ? (
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
    </Container>
  )
}
