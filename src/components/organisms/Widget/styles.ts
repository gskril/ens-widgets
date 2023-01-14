import styled, { css } from 'styled-components'
import { Button as ThorinButton } from '@ensdomains/thorin'

export const Button = styled(ThorinButton)(
  ({ theme, variant }) => css`
    border: none;

    &:disabled {
      ${variant === 'primary' && `background-color: ${theme.colors.accent};`}
    }

    ${variant === 'secondary' &&
    css`
      svg {
        stroke: ${theme.colors.accent};
      }

      &:disabled {
        color: ${theme.colors.accent};
        background-color: ${theme.colors.accentSecondaryHover};
      }
    `}
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

export const Inputs = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
  `
)
