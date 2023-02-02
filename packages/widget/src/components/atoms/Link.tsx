import { css } from 'styled-components'

import styled from '../../styles/styled/'

interface LinkProps {
  to: string
  children: string | React.ReactNode
}

const A = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.accent};
  `
)

export const Link = ({ to, children }: LinkProps) => {
  const isExternal = to.startsWith('http')

  return (
    <A
      href={to}
      target={isExternal ? '_blank' : ''}
      rel={isExternal ? 'noopener' : ''}
    >
      {children}
    </A>
  )
}
