import styled, { keyframes } from 'styled-components'

export enum LoaderSize {
  SMALL = 'small',
  DEFAULT = 'default',
  LARGE = 'large',
}

const sizeToPixels = {
  [LoaderSize.SMALL]: {
    size: 10,
    border: 0.5,
  },
  [LoaderSize.DEFAULT]: {
    size: 15,
    border: 1,
  },
  [LoaderSize.LARGE]: {
    size: 30,
    border: 2,
  },
}

const LoadingAnimation = keyframes`
  0% { opacity: 1; transform:  perspective(40px) translate3d(0px, 0px, -10px);;}
  100% { opacity: 0; transform:  perspective(40px) translate3d(0px, 0px, 10px);;}
`

export const CommonStyledLoader = styled.div<{ size: LoaderSize }>`
  width: ${({ size }) => sizeToPixels[size].size}px;
  border-radius: 50%;
  height: ${({ size }) => sizeToPixels[size].size}px;
  border: ${({ size, theme }) => `${sizeToPixels[size].border}px solid ${theme.colors.primary}`};
  animation: ${LoadingAnimation} 0.8s ease infinite;
`

export const StyledLoader = styled.div<{ size: LoaderSize }>`
  width: ${({ size }) => sizeToPixels[size].size}px;
  border-radius: 50%;
  height: ${({ size }) => sizeToPixels[size].size}px;
  border: ${({ size, theme }) => `${sizeToPixels[size].border}px solid ${theme.colors.primary}`};
  animation: ${LoadingAnimation} 0.8s ease infinite;
  position: fixed;
  top: 50%;
  left: 50%;
`

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  background: white;
  opacity: 0.5;
`
