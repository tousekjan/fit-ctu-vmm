import { Layout } from 'antd';
import React from 'react'

import { StyledLayout } from './styled';

const { Header} = Layout;

const Main = ({ location: { search }, match: { params } }) => {
  // const credentials = qs.parse(search, { ignoreQueryPrefix: true })
  console.log('main')
  return (
    <Layout>
      <Header style={{ height: '40px', lineHeight: '40px' }}>
        <div style={{ color: 'white' }} > Flicker++</div>
      </Header>
        <StyledLayout>
          <h1>Flicker app</h1>
          <p>heloooooo</p>

        </StyledLayout>
    </Layout>
  )
}
export default Main
