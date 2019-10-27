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

  .ant-pagination-item-link, .ant-avatar, .ant-calendar-prev-year-btn, .ant-calendar-next-year-btn, .ant-calendar-prev-month-btn,
  .ant-calendar-next-month-btn, .ant-calendar-year-panel-prev-decade-btn, .ant-calendar-year-panel-next-decade-btn,
  .ant-calendar-month-panel-prev-year-btn, .ant-calendar-month-panel-next-year-btn,
  .ant-calendar-decade-panel-prev-century-btn, .ant-calendar-decade-panel-next-century-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .ant-calendar-year-panel-header, .ant-calendar-month-panel-header, .ant-calendar-decade-panel-header {
    position: relative;
  }

  .ant-calendar-month-panel-body, .ant-calendar-year-panel-body, .ant-calendar-decade-panel-body {
    height: 0;
  }
`
