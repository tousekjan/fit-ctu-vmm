import { Flex } from 'components/Layout/styled'
import React from 'react'

import { StyledCard, StyledFlex, StyledIcon } from './styled'

interface Props {
  message: string
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <StyledCard>
      <StyledFlex justify="center" alignItems="center">
        <Flex alignItems="center">
          <StyledIcon type="info-circle" />
          {message}
        </Flex>
      </StyledFlex>
    </StyledCard>
  )
}

export default ErrorMessage
