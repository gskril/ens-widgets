import { Typography } from '@ensdomains/thorin'
import React from 'react'
import styled, { css } from 'styled-components'

const StyledCard = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.space[4]};
    padding: ${theme.space[3]} ${theme.space[4]};
    font-weight: ${theme.fontWeights.medium};
    border-radius: ${theme.radii.medium};
    color: ${theme.colors.textSecondary};
    box-shadow: ${theme.boxShadows['0.02']};
    border: ${theme.borderWidths['0.375']} solid ${theme.colors.borderSecondary};
  `
)

interface RowProps {
  name: string
  value: string
}

export const Row = ({ name, value }: RowProps) => {
  return (
    <StyledCard>
      <Typography
        as="span"
        style={{
          color: 'inherit',
        }}
      >
        {name}
      </Typography>
      <Typography as="span">{value}</Typography>
    </StyledCard>
  )
}

const RowsContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
  `
)

interface RowsProps {
  data: {
    name: string
    value: string
  }[]
}

export const Rows = ({ data }: RowsProps) => {
  return (
    <RowsContainer>
      {data.map((row, index) => (
        <Row key={index} name={row.name} value={row.value} />
      ))}
    </RowsContainer>
  )
}
