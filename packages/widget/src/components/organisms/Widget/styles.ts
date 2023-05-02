import { Button as ThorinButton, mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

export const Button = styled(ThorinButton)(
  ({ colorStyle, theme }) => css`
    border: none;
    color: #fff;
    line-height: 1.5;
    letter-spacing: -0.015em;
    font-family: ${theme.fonts.sans};
    font-size: ${theme.fontSizes.large};

    svg {
      stroke: #fff;
    }

    &:disabled {
      color: #fff;
      background-color: ${theme.colors.accent};
    }

    ${colorStyle === 'accentSecondary' &&
    css`
      color: ${theme.colors.accent};

      svg {
        stroke: ${theme.colors.accent};
      }

      &:disabled {
        color: ${theme.colors.accent};
        background-color: ${theme.colors.accentSurface};
      }
    `}

    ${colorStyle === 'redPrimary' &&
    css`
      color: #fff;

      &:disabled {
        color: #fff;
        background-color: ${theme.colors.red};
      }
    `}

    ${colorStyle === 'redSecondary' &&
    css`
      color: ${theme.colors.red};

      &:disabled {
        color: ${theme.colors.red};
        background-color: ${theme.colors.redSurface};
      }
    `}

    ${colorStyle === 'greenPrimary' &&
    css`
      color: #fff;

      &:disabled {
        color: #fff;
        background-color: ${theme.colors.green};
      }
    `}

    ${colorStyle === 'greenSecondary' &&
    css`
      color: ${theme.colors.green};

      &:disabled {
        color: ${theme.colors.green};
        background-color: ${theme.colors.greenSurface};
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
    `)}

    ${hasContainer &&
    css`
      border: ${theme.borderWidths['0.375']} solid ${theme.colors.border};
      background-color: ${theme.colors.backgroundSecondary};
      box-shadow: 1px 4px 26px rgba(78, 162, 240, 0.25);
      border-radius: ${theme.radii.large};
      padding: 1.25rem;

      ${mq.xs.max(css`
        padding: ${theme.space[3]};
      `)}
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
