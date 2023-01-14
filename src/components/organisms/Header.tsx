import { Typography } from '@ensdomains/thorin'
import React from 'react'
import styled from 'styled-components'

import { Logo } from '../atoms/Icons'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

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
      <Typography
        as="label"
        variant="large"
        weight="semiBold"
        style={{ lineHeight: 1 }}
      >
        Register an .eth name
      </Typography>
      <LogoWrapper as="a" href="http://ens.domains/" target="_blank">
        <Logo />
      </LogoWrapper>
    </Container>
  )
}
