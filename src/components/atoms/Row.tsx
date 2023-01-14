import React from 'react'
import { Card, Typography } from '@ensdomains/thorin'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.space[4]};
  padding: ${theme.space[3]} ${theme.space[4]};
  font-weight: ${theme.fontWeights.medium};
  border-radius: ${theme.radii.medium};
  box-shadow: ${theme.boxShadows['0.02']};
  border: ${theme.borderWidths['0.375']} solid ${theme.colors.borderSecondary};
`

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
          color: theme.colors.textTertiary,
        }}
      >
        {name}
      </Typography>
      <Typography as="span">{value}</Typography>
    </StyledCard>
  )
}

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
`

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
