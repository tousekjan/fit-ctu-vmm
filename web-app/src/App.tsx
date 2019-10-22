import { Flex } from 'components/Layout/styled'
import Loading, { LoadingType } from 'components/Loading'
import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader'
import { Switch } from 'react-router-dom'
import { createRoutes } from 'routes'
import mainRoutes from 'routes/mainRoutes'

const App = () => {
  return (
    <Flex justify="center" alignItems="center">
      <Suspense fallback={<Loading type={LoadingType.GLOBAL} />}>
        <Switch>{createRoutes(mainRoutes)}</Switch>
      </Suspense>
    </Flex>
  )
}

export default hot(module)(App)
