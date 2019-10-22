import { RoutePaths } from 'constants/routePaths'
import { lazy } from 'react'

export default [{ path: RoutePaths.HOME, component: lazy(() => import('features/Main')) }]
