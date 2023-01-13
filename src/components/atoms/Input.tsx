import React from 'react'
import styled, { css } from 'styled-components'

const InputWrapper = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
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
  return (
    <InputWrapper {...props}>
      <Label htmlFor={label}>{label}</Label>
      <StyledInput
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputWrapper>
  )
}
