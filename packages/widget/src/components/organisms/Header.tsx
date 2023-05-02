import { mq, Typography } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

import { Logo } from '../atoms/Icons'

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${theme.fontSizes.large};

    ${mq.xs.max(css`
      font-size: ${theme.fontSizes.body};
    `)}
  `
)

const Title = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.large};

    ${mq.xs.max(css`
      font-size: ${theme.fontSizes.body};
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
      <Title asProp="label" weight="bold" style={{ lineHeight: 1 }}>
        Register an .eth name
      </Title>
      <LogoWrapper as="a" href="http://ens.domains/" target="_blank">
        <Logo />
      </LogoWrapper>
    </Container>
  )
}
