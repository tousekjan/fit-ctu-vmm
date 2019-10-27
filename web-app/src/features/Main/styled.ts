import { Button, Input, Layout, Switch } from 'antd'
import styled from 'styled-components'

export const StyledHeader = styled(Layout)`
  height: 50px;
  line-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background: black !important;
`

export const MainLayout = styled(Layout)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #f0f2f5; */
`

export const StyledBody = styled(Layout)`
  height: 100vh;
  width: 80%;
  display: flex;
  align-items: center;
  background: white !important;
`

export const StyledLogo = styled.div`
  color: white;
  width: 80%;
  font-size: 26px;
  font-weight: bold;
`

export const StyledInput = styled(Input)`
  max-width: 580px;
  height: 30px;
  margin-top: 15px !important;
  margin-bottom: 5px !important;
`

export const StyledTitle = styled.p`
  margin-top: 5px;
  margin-bottom: 3px;
`

export const StyledDescription = styled.p`
  margin-left: 10px;
  margin-top: 7px;
`

export const StyledSwitch = styled(Switch)`
  margin-right: 10px !important;
  margin-top: 6px !important;
`

export const StyledButton = styled(Button)`
  margin: 15px;
  width: 150px;
`