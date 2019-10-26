import React from 'react'
import { Formik } from 'formik'

import { StyledBody, StyledHeader, StyledLogo, StyledInput, MainLayout } from './styled';
// import { Flex } from 'components/Layout/styled';
import { Button, Icon, DatePicker, Slider, InputNumber, Switch } from 'antd';
import moment from 'moment';
import { Flex } from 'components/Layout/styled';
moment.locale('cs');

const Main = ({ }) => {
  // const credentials = qs.parse(search, { ignoreQueryPrefix: true })
  console.log('main')
  return (
    <MainLayout>
      <StyledHeader>
        <StyledLogo> Flickr++</StyledLogo>
      </StyledHeader>
      <StyledBody>
        <Formik
          initialValues={{ search: '', uploaded: moment(new Date, 'DD/MM/YYYY'), uploadedWeight: 50, uploadedChecked: false }}
          // validationSchema={ValidationSchoolEditMode}
          // validateOnChange={true}
          onSubmit={data => {
            console.log(data)
          }}
        >
          {({ submitForm, values, handleChange, setFieldValue }) => (
            <>
              {/* <Wrapper> */}
              <br></br>
              <StyledInput value={values.search} prefix={<Icon type="search"></Icon>} placeholder="Photos, people or groups" onChange={handleChange}></StyledInput>
              <br></br>

              <Flex direction="row">
                <Switch defaultChecked={values.uploadedChecked} onChange={(data) => setFieldValue('uploadedChecked', data)} />
                <DatePicker value={values.uploaded} format={'DD/MM/YYYY'} onChange={(data) => setFieldValue('uploaded', moment(data, 'DD/MM/YYYY'))}/>
                <div style={{ width: '150px' }} >
                  <Slider
                    min={1}
                    max={100}
                    onChange={(data) => setFieldValue('uploadedWeight', data)}
                    value={values.uploadedWeight}
                  />
                </div>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16 }}
                  value={values.uploadedWeight}
                  onChange={(data) => setFieldValue('uploadedWeight', data)}
                />
              </Flex>

              <br></br>

              <Button onClick={() => submitForm()}>Search</Button>
              {/* </Wrapper> */}
            </>
          )}
        </Formik>


      </StyledBody>
    </MainLayout>
  )
}
export default Main
