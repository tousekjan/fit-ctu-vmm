import { Input, Layout } from 'antd'
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
  max-width: 500px;
  height: 30px;
`