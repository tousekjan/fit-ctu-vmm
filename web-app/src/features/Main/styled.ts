import { Button, Input, Layout, Switch } from 'antd'
import { Flex } from 'components/Layout/styled';
import Geosuggest from 'react-geosuggest';
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
export const StyledInputBox = styled(Flex)`
  width: 680px;
`

export const StyledButton = styled(Button)`
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 5px;
  width: 100px;
`

export const StyledInput = styled(Input)`
  width: 100%;
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

export const StyledGeosuggest = styled(Geosuggest)`
  ul {
    width: 350px;
    display: block;
    float: left;
    list-style: none outside none;
    margin: 0;
    padding: 2px;
    border-style: solid;
    border-width: 1px;
  }

  li {
    clear: left;
    float: left;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  span {
    display: block;
    padding: 3px;
    text-decoration: none;
    cursor: pointer;
  }

  span:hover {
    display: block;
    padding: 3px;
    text-decoration: none;
    background-color: #cceeff;
    cursor: pointer;
  }

  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  .geosuggest__input {
    width: 350px;
    padding-left: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }

  .geosuggest__input:disabled {
    color: #b7b7b7;
    -webkit-text-fill-color: #b7b7b7;
    background-color: #f5f5f5;
  }
`