import { CrossIcon, CheckIcon } from './Icons'
import { mq } from '@ensdomains/thorin'
import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

const InputWrapper = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    gap: ${theme.space[1]};
    padding: ${theme.space[3]} ${theme.space[4]};
    border: ${theme.borderWidths['0.375']} solid ${theme.colors.borderTertiary};
    background-color: ${theme.colors['0']};
    border-radius: ${theme.radii.medium};
    box-shadow: 1px 1px 6px rgba(66, 124, 211, 0.1);

    ${mq.xs.max(css`
      gap: ${theme.space[2]};
    `)}
  `
)

const Label = styled.label(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.sans};
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.lightGrey};
    text-align: left;
  `
)
const StyledInput = styled.input(
  ({ theme }) => css`
    font-family: ${theme.fonts.sans};
    font-weight: ${theme.fontWeights.medium};
    font-size: 1.75rem;
    line-height: 1;
    width: 100%;
    border: none;
    border-bottom: ${theme.borderWidths['0.375']} solid transparent;
    transition: border-bottom 0.1s ease-in-out;
    background-color: inherit;

    &::placeholder {
      color: ${theme.colors.lightGrey};
    }

    &:focus {
      outline: none;
      border-bottom: ${theme.borderWidths['0.375']} solid ${theme.colors.accent};
    }

    &:disabled {
      color: inherit;
      background-color: inherit;
    }

    ${mq.xs.max(css`
      font-size: 1.5rem;
    `)}
  `
)

const Counters = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.space[2]};
    position: absolute;
    right: ${theme.space[4]};
    bottom: ${theme.space[4]};
  `
)

const Counter = styled.button(
  ({ theme }) => css`
    display: flex;
    padding-bottom: 2px;
    justify-content: center;
    align-items: center;
    width: ${theme.space[6]};
    height: ${theme.space[6]};
    border-radius: ${theme.radii.full};
    background-color: ${theme.colors.accent};
    border: 1px solid ${theme.colors.borderTertiary};
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.white};
    line-height: 1;
    transition: all 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      background-color: ${theme.colors.accentSecondary};
    }
  `
)

interface ValidationIconProps {
  theme: DefaultTheme
  isValid?: boolean | undefined
}

const ValidationIconWrapper = styled.div(
  ({ theme, isValid }: ValidationIconProps) => css`
    display: flex;
    padding: 0.1875rem;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: ${theme.space[4]};
    bottom: ${theme.space[5]};
    width: ${theme.space[4]};
    height: ${theme.space[4]};
    border-radius: ${theme.radii.full};
    background-color: ${isValid ? theme.colors.green : theme.colors.red};
    color: ${theme.colors.white};
    transition: background-color 0.1s ease-in-out;
  `
)

interface InputProps {
  disabled?: boolean
  isValid?: boolean | undefined
  label: string
  placeholder: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  type: 'number' | 'text'
  value: string
}

export const Input = ({
  disabled,
  isValid,
  label,
  placeholder,
  setValue,
  type,
  value,
  ...props
}: InputProps) => {
  const handleIncrement = () => {
    const currentValue = parseInt(value)
    if (currentValue > 9) return
    setValue((currentValue + 1).toString() + ' years')
  }

  const handleDecrement = () => {
    const currentValue = parseInt(value)
    if (currentValue < 2) return
    setValue(
      (currentValue - 1).toString() +
        ` ${currentValue === 2 ? 'year' : 'years'}`
    )
  }

  return (
    <InputWrapper {...props}>
      <Label htmlFor={label}>{label}</Label>

      <StyledInput
        id={label}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        disabled={type === 'number' || disabled}
      />

      {type === 'text' && isValid !== undefined && (
        <ValidationIconWrapper isValid={isValid}>
          {isValid ? <CheckIcon /> : <CrossIcon />}
        </ValidationIconWrapper>
      )}

      {type === 'number' && (
        <Counters>
          <Counter
            type="button"
            disabled={parseInt(value) < 2}
            onClick={() => handleDecrement()}
          >
            –
          </Counter>
          <Counter
            type="button"
            disabled={parseInt(value) > 9}
            onClick={() => handleIncrement()}
          >
            +
          </Counter>
        </Counters>
      )}
    </InputWrapper>
  )
}
