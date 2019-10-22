import { Card, Icon } from 'antd'
import { Flex } from 'components/Layout/styled'
import styled from 'styled-components'

export const StyledFlex = styled(Flex)`
  color: ${({ theme }) => theme.colors.failure};
`

export const StyledIcon = styled(Icon)`
  margin-right: 20px;
  font-size: 20px;
`

export const StyledCard = styled(Card)`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.lightGrey};
`
