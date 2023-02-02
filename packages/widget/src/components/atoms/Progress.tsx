import { css, DefaultTheme } from 'styled-components'

import styled from '../../styles/styled/'

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
  ({ progress, theme }: { progress: number; theme: DefaultTheme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${progress}%;
    border-radius: ${theme.radii.medium};
    transition: all 0.15s ease-in-out;
    background-color: ${progress >= 100
      ? theme.colors.green
      : theme.colors.accent};
  `
)

export const Progress = ({ percentage }: { percentage: number }) => {
  return (
    <Container>
      <Loader progress={percentage} />
    </Container>
  )
}
