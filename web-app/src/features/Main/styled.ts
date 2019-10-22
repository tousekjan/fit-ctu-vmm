import { Button, Divider, Layout } from 'antd'
import { Flex } from 'components/Layout/styled'
import styled from 'styled-components'

export const StyledLayout = styled(Layout)`
  height: 100vh !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
`

export const Wrapper = styled.div`
  height: 85vh;
  width: 90vw;
  max-height: 900px;
  max-width: 1400px;
  overflow: hidden;
  border-radius: 10px;
  background: red !important;
`

export const StyledTabWrapper = styled(Flex)`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  padding-top: 8px;
`

export const StyledLink = styled(Button)`
  text-transform: uppercase;
  font-size: 16px;
  padding: 0px !important;
`

export const StyledContent = styled.div`
  overflow-y: scroll;
  height: 90%;
  padding: 0 40 15 40;
`

export const DefaultTabStyle = {
  height: '100%',
  padding: '0 40',
  margin: '0',
  display: 'flex',
  textTransform: 'uppercase',
  border: 'none',
}

export const StyledDivider = styled(Divider)`
  background: ${({ theme }) => theme.colors.primary};
`

export const StyledFlex = styled(Flex)`
  padding: 0px 22px 0px 0px;
`