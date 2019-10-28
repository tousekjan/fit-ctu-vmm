import { Icon } from 'antd'
import { Formik } from 'formik'
import moment from 'moment'
import React from 'react'

import { Flex } from 'components/Layout/styled'
import Loading from 'components/Loading'
import SliderBox from 'components/SliderBox'
import { SearchParams } from './interfaces'
import {
  MainLayout,
  StyledBody,
  StyledButton,
  StyledDatePicker,
  StyledDescription,
  StyledGalleryLeft,
  StyledGalleryRight,
  StyledGeosuggest,
  StyledHeader,
  StyledImage,
  StyledInput,
  StyledInputBox,
  StyledInputNumber,
  StyledLoadingWrapper,
  StyledLogo, StyledSwitch,
  StyledTitle,
  StyledTitlePicture,
  StyledTitleWrapper,
} from './styled'
import { parseToQuery, useFetch } from './utils'

const Main = ({ }) => {
  const [fetchData, { loading, data /*error*/ }] = useFetch('http://localhost:8080')

  return (
    <MainLayout>
      <StyledHeader>
        <StyledLogo>Flickr++</StyledLogo>
      </StyledHeader>
      <StyledBody>
        <Formik
          initialValues={{
            text: '',
            uploaded: moment(new Date, 'DD/MM/YYYY'),
            uploadedWeight: 50,
            uploadedChecked: false,
            width: 1000,
            widthWeight: 50,
            widthChecked: false,
            lat: null,
            lon: null,
            geoWeight: 50,
            geoChecked: false,
          } as SearchParams}
          onSubmit={(data: SearchParams) => {
            fetchData(`/search?${parseToQuery(data)}`)
          }}
        >
          {({ submitForm, values, handleChange, setFieldValue }) => (
            <>
              <StyledInputBox direction="row">
                <StyledInput
                  name="text"
                  value={values.text}
                  prefix={<Icon type="search"></Icon>}
                  placeholder="Photos, people or groups"
                  onChange={handleChange}
                />
                <StyledButton disabled={!values.text} type="ghost" icon="search" onClick={() => submitForm()}>Search</StyledButton>
              </StyledInputBox>

              <Flex direction="column">
                <StyledTitle>Date uploaded</StyledTitle>
                <Flex direction="row">
                  <StyledSwitch defaultChecked={values.uploadedChecked} onChange={data => setFieldValue('uploadedChecked', data)} />
                  <div>
                    <StyledDatePicker
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
                  <StyledInputNumber
                    disabled={!values.widthChecked}
                    min={0}
                    max={5000}
                    step={100}
                    value={values.width}
                    onChange={data => setFieldValue('width', data)}
                  />
                  <StyledDescription>weight</StyledDescription>
                  <SliderBox name="widthWeight" disabled={!values.widthChecked} setFieldValue={setFieldValue} values={values} />
                </Flex>

                <StyledTitle>Location of picture</StyledTitle>
                <Flex direction="row">
                  <StyledSwitch defaultChecked={values.geoChecked} onChange={data => setFieldValue('geoChecked', data)} />
                  <StyledGeosuggest
                    placeholder=""
                    disabled={!values.geoChecked}
                    onSuggestSelect={data => {
                      setFieldValue('lat', data.location.lat)
                      setFieldValue('lon', data.location.lng)
                    }}
                  />
                  <StyledDescription> weight </StyledDescription>
                  <SliderBox name="geoWeight" disabled={!values.geoChecked} setFieldValue={setFieldValue} values={values} />
                </Flex>
              </Flex>
            </>
          )}
        </Formik>

        {loading &&
          <StyledLoadingWrapper>
            <Loading />
          </StyledLoadingWrapper>
        }

        {!loading && data && <>
          <StyledTitleWrapper direction="row" justify="center" alignItems="center">
            <StyledTitlePicture>Orignal</StyledTitlePicture>
            <StyledTitlePicture>Reranked</StyledTitlePicture>
          </StyledTitleWrapper>

          <Flex direction="row">
            <StyledGalleryLeft justify="center" alignItems="center">
              {data.original.map(picture => <StyledImage key={`${picture}-original`} src={picture} />)}
            </StyledGalleryLeft>
            <StyledGalleryRight justify="center" alignItems="center">
              {data.reranked.map(picture => <StyledImage key={`${picture}-reranked`} src={picture} />)}
            </StyledGalleryRight>
          </Flex>
        </>
        }
      </StyledBody>
    </MainLayout>
  )
}
export default Main
