import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  html {
    background-color: white;
  }

  body {
    font-family: 'Roboto Condensed', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }

  table {
      font-size: 14px;
  }
`
