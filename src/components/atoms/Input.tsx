import React from 'react'
import styled, { css } from 'styled-components'

const InputWrapper = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    gap: ${theme.space[1]};
    padding: ${theme.space[3]} ${theme.space[4]};
    border: ${theme.borderWidths['0.375']} solid ${theme.colors.borderTertiary};
    background-color: ${theme.colors.white};
    border-radius: ${theme.radii.medium};
    box-shadow: 1px 1px 6px rgba(66, 124, 211, 0.1);
  `
)

const Label = styled.label(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.sans};
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.lightGrey};
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

    &:disabled {
      background-color: ${theme.colors.accentSecondary};
    }
  `
)

interface InputProps {
  type: 'number' | 'text'
  label: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input = ({
  type,
  label,
  placeholder,
  value,
  setValue,
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
        disabled={type === 'number'}
      />

      {type === 'number' && (
        <Counters>
          <Counter
            disabled={parseInt(value) < 2}
            onClick={() => handleDecrement()}
          >
            –
          </Counter>
          <Counter
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
