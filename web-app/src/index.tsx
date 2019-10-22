import 'constants/styles/fonts.css'

import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import { Router } from 'react-router-dom'
import i18n from 'utils/locale'

import App from './App'

const history = createBrowserHistory()

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Router history={history}>
      <App />
    </Router>
  </I18nextProvider>,

  document.getElementById('root'),
)
