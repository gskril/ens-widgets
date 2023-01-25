import { Helper, Typography } from '@ensdomains/thorin'
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import React from 'react'

import { Container, Button } from '../styles'
import { getEtherscanLink } from '../../../../utils'
import {
  getReverseRegistrarAddress,
  REVERSE_REGISTRAR_ABI,
} from '../../../../contracts'
import { Header } from '../../Header'

interface PrimaryNameProps {
  name: string
  setIsPrimaryNameSet: React.Dispatch<React.SetStateAction<boolean>>
}

export const PrimaryName = ({
  name,
  setIsPrimaryNameSet,
}: PrimaryNameProps) => {
  const { chain } = useNetwork()

  const prepare = usePrepareContractWrite({
    address: getReverseRegistrarAddress(chain?.id),
    abi: REVERSE_REGISTRAR_ABI,
    functionName: 'setName',
    args: [`${name}.eth`],
  })

  const transaction = useContractWrite(prepare.config)
  const receipt = useWaitForTransaction(transaction.data)

  React.useEffect(() => {
    if (receipt.isSuccess) {
      setIsPrimaryNameSet(true)
    }
  }, [receipt.isSuccess])

  return (
    <Container>
      <Header />

      <Typography as="p">
        {name}.eth has been registered and set up successfully, but there's one
        more recommended step.
      </Typography>
      <Typography as="p">
        To get the full benefits of ENS, it's important to set your Primary
        name. This is what allows dapps to recognize you by your new .eth name.
      </Typography>

      {prepare.isError ? (
        <Helper type="error">
          <div>Unable to read from ENS Registrar</div>
        </Helper>
      ) : receipt.isLoading ? (
        <Button
          loading
          variant="secondary"
          tone={transaction.isError ? 'red' : 'accent'}
          onClick={() => {
            window.open(getEtherscanLink(transaction.data, chain), '_blank')
          }}
        >
          Transaction processing
        </Button>
      ) : (
        <Button
          disabled={!transaction.write}
          variant="primary"
          tone={transaction.isError ? 'red' : 'accent'}
          loading={prepare.isLoading || transaction.isLoading}
          onClick={() => transaction.write?.()}
        >
          {transaction.isError
            ? 'Error Sending Transaction'
            : transaction.isLoading
            ? 'Confirm in Wallet'
            : 'Set Primary Name'}
        </Button>
      )}
    </Container>
  )
}
