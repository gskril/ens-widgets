import { Typography } from '@ensdomains/thorin'
import { useAccount } from 'wagmi'
import styled, { css } from 'styled-components'

import { Link } from '../../../atoms/Link'
import { Logo } from '../../../atoms/Icons'
import { truncateAddress } from '../../../../utils'

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.space[4]};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;

    p:not(:last-of-type) {
      margin-bottom: ${theme.space[3]};
    }

    .head {
      display: flex;
      align-items: center;
      gap: ${theme.space[2]};
      flex-direction: column;
    }
  `
)

const Heading = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.headingThree};
    font-weight: ${theme.fontWeights.semiBold};
  `
)

const LogoWrapper = styled.div`
  width: 2.25rem;

  svg {
    width: 100%;
    height: 100%;
  }
`

interface RegistrationSuccessProps {
  name: string
}

export const Success = ({ name }: RegistrationSuccessProps) => {
  const { address } = useAccount()

  return (
    <Container>
      <div className="head">
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <Heading>Registration Complete!</Heading>
      </div>

      <div>
        {address && (
          <Typography as="p">
            {name}.eth will now point to{' '}
            <span title={address}>{truncateAddress(address)}</span> across web3.
          </Typography>
        )}

        <Typography as="p">
          Configure your name further at{' '}
          <Link to={`https://app.ens.domains/name/${name}.eth`}>
            app.ens.domains
          </Link>
          .
        </Typography>
      </div>
    </Container>
  )
}
