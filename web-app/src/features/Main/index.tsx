import { DatePicker, Icon, InputNumber } from 'antd';
import { Formik } from 'formik'
import moment from 'moment';
import React from 'react'

import { Flex } from 'components/Layout/styled';
import SliderBox from 'components/SliderBox';
import { MainLayout, StyledBody, StyledButton, StyledDescription, StyledHeader, StyledInput, StyledLogo, StyledSwitch, StyledTitle } from './styled';

const Main = ({ }) => {
  // const credentials = qs.parse(search, { ignoreQueryPrefix: true })
  return (
    <MainLayout>
      <StyledHeader>
        <StyledLogo>Flickr++</StyledLogo>
      </StyledHeader>
      <StyledBody>
        <Formik
          initialValues={{
            search: '',
            uploaded: moment(new Date, 'DD/MM/YYYY'),
            uploadedWeight: 50,
            uploadedChecked: false,

            width: 1000,
            widthWeight: 50,
            widthChecked: false,
          }}
          // validationSchema={ValidationSchoolEditMode}
          // validateOnChange={true}
          onSubmit={data => {
            console.log(data)
          }}
        >
          {({ submitForm, values, handleChange, setFieldValue }) => (
            <>
              <StyledInput
                value={values.search}
                prefix={<Icon type="search"></Icon>}
                placeholder="Photos, people or groups"
                onChange={handleChange}
              />

              <Flex direction="column">
                <StyledTitle>Date uploaded</StyledTitle>
                <Flex direction="row">
                  <StyledSwitch defaultChecked={values.uploadedChecked} onChange={data => setFieldValue('uploadedChecked', data)} />
                  <div>
                    <DatePicker
                      style={{ width: '250px' }}
                      disabled={!values.uploadedChecked}
                      value={values.uploaded}
                      format={'DD/MM/YYYY'}
                      allowClear={false}
                      onChange={data => setFieldValue('uploaded', data ? moment(data, 'DD/MM/YYYY') : data)}
                    />
                  </div>

                  <StyledDescription> weight </StyledDescription>
                  <SliderBox name="uploadedWeight" disabled={!values.uploadedChecked} setFieldValue={setFieldValue} values={values} />
                </Flex>

                <StyledTitle>Picture width (px)</StyledTitle>
                <Flex direction="row">
                  <StyledSwitch defaultChecked={values.widthChecked} onChange={data => setFieldValue('widthChecked', data)} />
                  <InputNumber
                    disabled={!values.widthChecked}
                    min={0}
                    max={5000}
                    step={100}
                    style={{ width: '250px' }}
                    value={values.width}
                    onChange={data => setFieldValue('width', data)}
                  />
                  <StyledDescription> weight </StyledDescription>
                  <SliderBox name="widthWeight" disabled={!values.widthChecked} setFieldValue={setFieldValue} values={values} />
                </Flex>
              </Flex>

              <StyledButton onClick={() => submitForm()}>Search</StyledButton>
            </>
          )}
        </Formik>
      </StyledBody>
    </MainLayout>
  )
}
export default Main
