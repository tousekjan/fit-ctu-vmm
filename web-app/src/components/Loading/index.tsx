import React, { useEffect, useState } from 'react'

import { CommonStyledLoader, LoaderSize, StyledLoader, Wrapper } from './styled'

export enum LoadingType {
  GLOBAL = 'global',
  COMMON = 'common',
}
interface Props {
  size?: LoaderSize
  treshold?: number
  children?: React.ReactElement
  type?: LoadingType
}

const Loading = ({ treshold = 300, size = LoaderSize.LARGE, children, type = LoadingType.COMMON }: Props) => {
  const [shouldDisplay, setShouldDisplay] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShouldDisplay(true), treshold)
    return () => clearTimeout(timeout)
  }, [treshold])

  if (shouldDisplay || treshold === 0) {
    switch (type) {
      case LoadingType.COMMON:
        return <CommonStyledLoader data-testid="loader" size={size} />
      case LoadingType.GLOBAL:
        return (
          <Wrapper data-testid="loader">
            <StyledLoader size={size} />
          </Wrapper>
        )
      default:
        return <StyledLoader data-testid="loader" size={size} />
    }
  }
  return children || null
}

export default Loading
