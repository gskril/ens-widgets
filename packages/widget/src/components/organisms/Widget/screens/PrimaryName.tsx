import { Helper, mq, Typography } from '@ensdomains/thorin'
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useEffect } from 'react'
import styled, { css } from 'styled-components'

import { Container, Button } from '../styles'
import { getEtherscanLink } from '../../../../utils'
import {
  getReverseRegistrarAddress,
  REVERSE_REGISTRAR_ABI,
} from '../../../../contracts'
import { Header } from '../../Header'

const ButtonsColumn = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 2fr;
    flex-direction: row;
    gap: ${theme.space['3']};

    .small {
      display: none;
    }

    ${mq.sm.max(css`
      grid-template-columns: 1fr;

      .normal {
        display: none;
      }

      .small {
        display: block;
      }
    `)}
  `
)

interface PrimaryNameProps {
  hasHeader: boolean
  name: string
  setIsPrimaryNameSet: React.Dispatch<React.SetStateAction<boolean>>
}

export const PrimaryName = ({
  hasHeader,
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

  useEffect(() => {
    if (receipt.isSuccess) {
      setIsPrimaryNameSet(true)
    }
  }, [receipt.isSuccess])

  return (
    <Container>
      {hasHeader && <Header />}

      <Typography asProp="p">
        To improve your web3 experience, set your Primary ENS Name.
      </Typography>
      <Typography asProp="p">
        This will allow dapps to identify you as {name}.eth
      </Typography>

      {prepare.isError ? (
        <Helper type="error">
          <div>Unable to read from ENS Registrar</div>
        </Helper>
      ) : receipt.isLoading ? (
        <Button
          loading
          shadow={false}
          colorStyle={transaction.isError ? 'redSecondary' : 'accentSecondary'}
          onClick={() => {
            window.open(getEtherscanLink(transaction.data, chain), '_blank')
          }}
        >
          Transaction processing
        </Button>
      ) : (
        <ButtonsColumn>
          <Button
            shadow={false}
            size="small"
            className="small"
            colorStyle="accentSecondary"
            onClick={() => setIsPrimaryNameSet(true)}
          >
            Skip
          </Button>

          <Button
            shadow={false}
            className="normal"
            colorStyle="accentSecondary"
            onClick={() => setIsPrimaryNameSet(true)}
          >
            Skip
          </Button>

          <Button
            disabled={!transaction.write}
            colorStyle={transaction.isError ? 'redPrimary' : 'accentPrimary'}
            loading={prepare.isLoading || transaction.isLoading}
            onClick={() => transaction.write?.()}
          >
            {transaction.isError
              ? 'Error Sending Transaction'
              : transaction.isLoading
              ? 'Confirm in Wallet'
              : 'Set Primary Name'}
          </Button>
        </ButtonsColumn>
      )}
    </Container>
  )
}
