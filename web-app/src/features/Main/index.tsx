import { DatePicker, Icon } from 'antd';
import { Formik } from 'formik'
import moment from 'moment';
import React from 'react'

import { Flex } from 'components/Layout/styled';
import SliderBox from 'components/SliderBox';
import { MainLayout, StyledBody, StyledButton, StyledDescription, StyledHeader, StyledInput, StyledLogo, StyledSwitch } from './styled';

const Main = ({ }) => {
  // const credentials = qs.parse(search, { ignoreQueryPrefix: true })
  return (
    <MainLayout>
      <StyledHeader>
        <StyledLogo>Flickr++</StyledLogo>
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
              <StyledInput
                value={values.search}
                prefix={<Icon type="search"></Icon>}
                placeholder="Photos, people or groups"
                onChange={handleChange}
              />

              <Flex direction="row">
                <StyledDescription>Date upload</StyledDescription>
                <StyledSwitch defaultChecked={values.uploadedChecked} onChange={data => setFieldValue('uploadedChecked', data)} />
                <div>
                  <DatePicker
                    disabled={!values.uploadedChecked}
                    value={values.uploaded}
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                    onChange={data => setFieldValue('uploaded', data ? moment(data, 'DD/MM/YYYY') : data)}
                  />
                </div>
                <SliderBox name="uploadedWeight" disabled={!values.uploadedChecked} setFieldValue={setFieldValue} values={values} />
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
