import styled, { css } from 'styled-components'

const Container = styled.div(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    height: ${theme.space[3]};
    background-color: ${theme.colors.accentLight};
    border-radius: ${theme.radii.medium};
    overflow: hidden;
  `
)

const Loader = styled.div<{ progress: number }>(
  ({ progress, theme }) => css`
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
      <Loader progress={Math.min(percentage, 100)} />
    </Container>
  )
}
