import { css } from 'styled-components'
import { Spinner, Typography } from '@ensdomains/thorin'

import { CheckIcon, CrossIcon } from './Icons'
import styled from '../../styles/styled/'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[1]};
`

const IconWrapper = styled.div(
  ({ status, theme }) => css`
    width: ${theme.space[6]};
    height: ${theme.space[6]};
    color: ${theme.colors.white};
    padding: ${status === 'loading' ? 0 : theme.space[1]};
    border-radius: ${theme.radii.full};
    background-color: ${status === 'success'
      ? theme.colors.green
      : status === 'loading'
      ? theme.colors.transparent
      : status === 'error'
      ? theme.colors.red
      : theme.colors.accentSecondary};

    & > * {
      width: 100%;
      height: 100%;
    }
  `
)

type Status = 'error' | 'idle' | 'loading' | 'success'

interface StageProps {
  label: string
  status: Status
}

export const Stage = ({ label, status }: StageProps) => {
  return (
    <Container>
      <IconWrapper status={status}>
        {status === 'success' ? (
          <CheckIcon />
        ) : status === 'loading' ? (
          <Spinner color="blue" />
        ) : status === 'error' ? (
          <CrossIcon />
        ) : null}
      </IconWrapper>
      <Typography as="span">{label}</Typography>
    </Container>
  )
}
