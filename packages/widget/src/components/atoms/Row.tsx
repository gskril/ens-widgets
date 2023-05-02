import { Typography } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

const StyledCard = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.space[4]};
    padding: ${theme.space[3]} ${theme.space[4]};
    font-weight: ${theme.fontWeights.normal};
    border-radius: ${theme.radii.medium};
    color: ${theme.colors.textSecondary};
    box-shadow: ${theme.boxShadows['0.02']};
    border: ${theme.borderWidths['0.375']} solid ${theme.colors.background};
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
        asProp="span"
        style={{
          color: 'inherit',
        }}
      >
        {name}
      </Typography>
      <Typography asProp="span">{value}</Typography>
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
