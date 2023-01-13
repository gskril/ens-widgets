import styled, { css } from 'styled-components'
import { Button as ThorinButton } from '@ensdomains/thorin'

export const Button = styled(ThorinButton)(
  ({ theme }) => css`
    border: none;
  `
)

export const Card = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    border: ${theme.borderWidths['0.375']} solid ${theme.colors.borderSecondary};
    background-color: #fafcff;
    box-shadow: ${theme.boxShadows.primary};
    border-radius: ${theme.radii.large};
    padding: 1.25rem;
  `
)

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LogoWrapper = styled.div`
  width: 1.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const Inputs = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
  `
)
