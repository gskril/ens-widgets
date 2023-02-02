import { css } from 'styled-components'
import { mq, Typography } from '@ensdomains/thorin'

import { Logo } from '../atoms/Icons'
import styled from '../../styles/styled/'

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${theme.fontSizes.large};

    ${mq.xs.max(css`
      font-size: ${theme.fontSizes.base};
    `)}
  `
)

const LogoWrapper = styled.div`
  width: 1.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const Header = () => {
  return (
    <Container>
      <Typography as="label" weight="semiBold" style={{ lineHeight: 1 }}>
        Register an .eth name
      </Typography>
      <LogoWrapper as="a" href="http://ens.domains/" target="_blank">
        <Logo />
      </LogoWrapper>
    </Container>
  )
}
