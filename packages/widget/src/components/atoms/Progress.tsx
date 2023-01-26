import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    height: ${theme.space[3]};
    background-color: ${theme.colors.accentSecondary};
    border-radius: ${theme.radii.medium};
    overflow: hidden;
  `
)

const Loader = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: ${theme.radii.medium};
    background-color: ${theme.colors.accent};
    transition: width 0.15s ease-in-out;
  `
)

export const Progress = ({ percentage }: { percentage: number }) => {
  return (
    <Container>
      <Loader
        style={{
          width: `${percentage}%`,
        }}
      />
    </Container>
  )
}
