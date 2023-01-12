import React from 'react'
import styled, { css } from 'styled-components'

const InputWrapper = styled.div(({ theme }) => css``)

const Label = styled.label(
  ({ theme }) => css`
    font-family: ${theme.fonts.sans};
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.lightGrey};
  `
)
const StyledInput = styled.input(({ theme }) => css``)

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
