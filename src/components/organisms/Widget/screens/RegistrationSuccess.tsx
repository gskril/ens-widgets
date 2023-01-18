import { Typography } from '@ensdomains/thorin'
import React from 'react'
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
  address: string
  name: string
}

export const RegistrationSuccess = ({
  address,
  name,
}: RegistrationSuccessProps) => {
  return (
    <Container>
      <div className="head">
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <Heading>Registartion Complete!</Heading>
      </div>

      <div>
        <Typography as="p">
          {name}.eth will now resolve to {truncateAddress(address)} across web3.
        </Typography>

        <Typography as="p">
          Configure your name further at{' '}
          <Link to="https://app.ens.domains">app.ens.domains</Link>.
        </Typography>
      </div>
    </Container>
  )
}
