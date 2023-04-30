import { Button as ThorinButton, mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

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
        color: ${theme.colors.accent};
        background-color: ${theme.colors.accentSecondaryHover};
      }
    `}
  `
)

interface CardProps {
  hasContainer: boolean
  shadowless: boolean
}

export const Card = styled.div<CardProps>(
  ({ theme, hasContainer, shadowless }) => css`
    width: 100%;

    ${mq.xs.max(css`
      gap: ${theme.space[3]};
      padding: ${theme.space[3]};
    `)}

    ${hasContainer &&
    css`
      border: ${theme.borderWidths['0.375']} solid
        ${theme.colors.borderSecondary};
      background-color: ${theme.colors.backgroundSecondary};
      box-shadow: ${theme.boxShadows.primary};
      border-radius: ${theme.radii.large};
      padding: 1.25rem;
    `}

    ${shadowless &&
    css`
      box-shadow: none;
    `}
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
