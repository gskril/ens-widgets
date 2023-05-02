import styled, { css } from 'styled-components'
import { Label } from './Input'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputGroup = styled.div(
  ({ theme }) => css`
    position: relative;

    label {
      --offset: 0.5rem;

      height: ${theme.space[8]};
      width: ${theme.space[12]};
      background-color: ${theme.colors.grey};
      transition: background-color 0.1s ease-in-out 0s;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: ${theme.radii.full};

      &::after {
        content: '';
        width: ${theme.space[6]};
        height: ${theme.space[6]};
        border-radius: ${theme.radii.full};
        background-color: #fff;
        position: absolute;
        transform: translateX(calc(-1 * var(--offset)));
        transition: transform 0.2s ease-in-out 0s,
          background-color 0.1s ease-in-out 0s;
      }
    }

    input {
      opacity: 0;
      width: 0;
      height: 0;
      visibility: hidden;
      position: absolute;

      &:checked {
        & + label {
          background-color: ${theme.colors.accent};

          &::after {
            transform: translateX(var(--offset));
          }
        }
      }
    }
  `
)

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Toggle({ label, checked, onChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <Wrapper>
      <Label size="lg">{label}</Label>
      <InputGroup>
        <input
          id={encodeURI(label)}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={encodeURI(label)} />
      </InputGroup>
    </Wrapper>
  )
}
