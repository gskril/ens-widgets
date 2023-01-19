import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import React from 'react'

import { Button, Container, RegistrationSteps } from '../styles'
import { getEtherscanLink, parseDuration, parseName } from '../../../../utils'
import { Header } from '../../Header'
import { Progress } from '../../../atoms/Progress'
import {
  REGISTRAR_ABI,
  REGISTRAR_ADDRESS,
  getResolverAddress,
} from '../../../../contracts'
import { Rows } from '../../../atoms/Row'
import { Stage } from '../../../atoms/Stage'
import { useCost } from '../../../../hooks/useCost'

interface StepsProps {
  commitHash: `0x${string}`
  duration: string
  name: string
  secret: `0x${string}`
  setIsRegistrationSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export const Steps = ({
  commitHash,
  duration,
  name,
  secret,
  setIsRegistrationSuccess,
}: StepsProps) => {
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const commitTx = useWaitForTransaction({
    hash: commitHash,
  })

  const timerStart = 60
  const [timer, setTimer] = React.useState<number>(timerStart)

  const { cost, rentEth } = useCost({
    name,
    duration,
    isConnected,
  })

  // Once the commit is successful, start the countdown
  React.useEffect(() => {
    if (commitTx.isSuccess && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [commitTx.isSuccess])

  const resolver = getResolverAddress(chain?.id)

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

  // Once the register transaction is successful, show success message
  React.useEffect(() => {
    if (registerTx.isSuccess) {
      setIsRegistrationSuccess(true)
    }
  }, [registerTx.isSuccess])

  const rowData = [
    { name: 'Name', value: parseName(name) + '.eth' },
    { name: 'Duration', value: duration },
    { name: 'Estimated Cost', value: cost || '' },
  ]

  return (
    <Container>
      <Header />

      <Rows data={rowData} />

      <RegistrationSteps>
        <Stage label="Commit" status={commitTx.status} />
        <Progress percentage={100 - (timer / timerStart) * 100} />
        <Stage label="Register" status={registerTx.status} />
      </RegistrationSteps>

      {registerTx.isError ? (
        // Show registration error message
        <p>Registration failed</p>
      ) : registerTx.isLoading ? (
        // Show etherscan link for registration
        <Button
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
          Waiting...
        </Button>
      ) : (
        // Show etherscan link for commit
        <Button
          shadowless
          variant="secondary"
          onClick={() => {
            window.open(getEtherscanLink(commitHash, chain), '_blank')
          }}
        >
          Transaction processing...
        </Button>
      )}
    </Container>
  )
}
