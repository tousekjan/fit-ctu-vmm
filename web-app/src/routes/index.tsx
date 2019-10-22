import React from 'react'
import { Route } from 'react-router-dom'

export const createRoutes = routes => {
  return routes.map(({ exact, component: Component, path }, index) => {
    return <Route key={index} path={path} exact={exact} render={props => <Component {...props} />} />
  })
}
