import { Divider as AntDivider } from 'antd'
import { AlignItemsProperty, FlexDirectionProperty, JustifyContentProperty } from 'csstype'
import { flow } from 'lodash/fp'
import styled from 'styled-components'

interface FlexProps {
  justify?: JustifyContentProperty
  direction?: FlexDirectionProperty
  alignItems?: AlignItemsProperty
}

interface DividerProps {
  marginX?: number
  marginY?: number
}

const cssWhen = (pred: boolean, css: string) => (acc: string) => (pred ? `${acc}${css};` : acc)

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ justify, direction, alignItems }) =>
    flow(
      cssWhen(!!justify, `justify-content: ${justify}`),
      cssWhen(!!direction, `flex-direction: ${direction}`),
      cssWhen(!!alignItems, `align-items: ${alignItems}`),
    )('')};
`

const withUnit = (marginValue: number) => (marginValue > 0 ? `${marginValue}px` : 0)

export const Divider = styled(AntDivider)<DividerProps>`
  margin: ${({ marginX = 0, marginY = 0 }) => {
    return `${withUnit(marginX)} ${withUnit(marginY)}`
  }};
`
