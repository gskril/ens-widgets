import styled, { css, DefaultTheme } from 'styled-components'
import { Button as ThorinButton, mq } from '@ensdomains/thorin'

export const Button = styled(ThorinButton)(
  ({ theme, variant }) => css`
    border: none;
    color: ${theme.colors.white};

    svg {
      stroke: ${theme.colors.white};
    }

    &:disabled {
      ${variant === 'primary' &&
      css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.accent};
      `}
    }

    ${variant === 'secondary' &&
    css`
      color: ${theme.colors.accent};

      svg {
        stroke: ${theme.colors.accent};
      }

      &:disabled {
        color: inherit;
        background-color: ${theme.colors.accentSecondaryHover};
      }
    `}
  `
)

interface CardProps {
  theme: DefaultTheme
  shadowless?: true
}

export const Card = styled.div(
  ({ theme, shadowless }: CardProps) => css`
    width: 100%;
    border: ${theme.borderWidths['0.375']} solid ${theme.colors.borderSecondary};
    background-color: ${theme.colors.backgroundSecondary};
    box-shadow: ${theme.boxShadows.primary};
    border-radius: ${theme.radii.large};
    padding: 1.25rem;

    ${shadowless &&
    css`
      box-shadow: none;
    `}

    ${mq.xs.max(css`
      gap: ${theme.space[3]};
      padding: ${theme.space[3]};
    `)}
  `
)

export const Container = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
  `
)

export const Inputs = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};

    ${mq.xs.max(css`
      gap: ${theme.space[3]};
    `)}
  `
)

export const RegistrationSteps = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.space[7]};
    padding: 0 ${theme.space[4]};

    ${mq.xs.max(css`
      gap: ${theme.space[4]};
      padding: 0;
    `)}
  `
)
