import { Icon, Input, Popover } from 'antd'
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
  StyledLogo, StyledScore,
  StyledSwitch,
  StyledTimePicker,
  StyledTitle,
  StyledTitlePicture,
  StyledTitleWrapper,
} from './styled'
import { parseToQuery, useFetch } from './utils'

const Main = ({ }) => {
  const [fetchData, { loading, data /*error*/ }] = useFetch('http://localhost:8080')

  const trimEllip = (str: String) => {
    const length = 60;
    return str && str.length > length ? `${str.substring(0, length - 3)}...` : str;
  }

  const getMetadata = (picture) => (
    <div style={{minWidth: 410}}>
      <p><b>Description:</b> {trimEllip(picture.description)}</p>
      <p><b>Date uploaded:</b> {picture.dateUploaded ? moment(picture.dateUploaded).format('YYYY-MM-DD') : null}</p>
      <p><b>Time taken:</b> {picture.dateTaken ? moment(picture.dateTaken).format('HH:mm:ss') : null}</p>
      <p><b>Picture width:</b> {picture.width && (picture.width !== 0) ? `${picture.width}px` : null}</p>
      <p><b>Likes:</b> {picture.likes}</p>
      <p><b>Latitude:</b> {picture.latitude}</p>
      <p><b>Longitude:</b> {picture.longitude}</p>
    </div>
  );

  return (
    <MainLayout>
      <StyledHeader>
        <StyledLogo>Flickr++</StyledLogo>
      </StyledHeader>
      <StyledBody>
        <Formik
          initialValues={{
            text: '',
            description: '',
            descriptionWeight: 50,
            descriptionChecked: false,
            uploaded: moment(new Date, 'DD/MM/YYYY'),
            uploadedWeight: 50,
            uploadedChecked: false,
            time: moment('12:00:00', 'HH:mm:ss'),
            timeWeight: 50,
            timeChecked: false,
            width: 1000,
            widthWeight: 50,
            widthChecked: false,
            likes: 5000,
            likesWeight: 50,
            likesChecked: false,
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
                <StyledTitle>Description</StyledTitle>
                <Flex direction="row">
                  <StyledSwitch defaultChecked={values.descriptionChecked} onChange={data => setFieldValue('descriptionChecked', data)} />
                  <Input
                    name="description"
                    disabled={!values.descriptionChecked}
                    value={values.description}
                    onChange={handleChange}
                  />
                  <StyledDescription>weight</StyledDescription>
                  <SliderBox name="descriptionWeight" disabled={!values.descriptionChecked} setFieldValue={setFieldValue} values={values} />
                </Flex>

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

                <StyledTitle>Time taken</StyledTitle>
                <Flex direction="row">
                  <StyledSwitch defaultChecked={values.timeChecked} onChange={data => setFieldValue('timeChecked', data)} />
                  <div>
                    <StyledTimePicker
                      disabled={!values.timeChecked}
                      value={values.time}
                      allowClear={false}
                      onChange={data => setFieldValue('time', data ? moment(data, 'HH:mm:ss') : data)}
                    />
                  </div>

                  <StyledDescription> weight </StyledDescription>
                  <SliderBox name="timeWeight" disabled={!values.timeChecked} setFieldValue={setFieldValue} values={values} />
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

                <StyledTitle>Likes</StyledTitle>
                <Flex direction="row">
                  <StyledSwitch defaultChecked={values.likesChecked} onChange={data => setFieldValue('likesChecked', data)} />
                  <StyledInputNumber
                    disabled={!values.likesChecked}
                    min={0}
                    max={1000000}
                    step={1000}
                    value={values.likes}
                    onChange={data => setFieldValue('likes', data)}
                  />
                  <StyledDescription>weight</StyledDescription>
                  <SliderBox name="likesWeight" disabled={!values.likesChecked} setFieldValue={setFieldValue} values={values} />
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
            <StyledTitlePicture>Original</StyledTitlePicture>
            <StyledTitlePicture>Reranked</StyledTitlePicture>
          </StyledTitleWrapper>

          <Flex direction="row">
            <StyledGalleryLeft justify="center" alignItems="center">
              {data.original.map(picture =>
                <StyledImage key={`${picture.photoId}-original`} src={picture.webUrl} />
              )}
            </StyledGalleryLeft>
            <StyledGalleryRight justify="center" alignItems="center">
              {data.reranked.map(picture =>
                <div>
                  <Popover placement="top" content={getMetadata(picture)} title={`Score: ${Math.round(picture.score * 100)}%`}>
                    <StyledImage key={`${picture.photoId}-reranked`} src={picture.webUrl} />
                  </Popover>
                  <StyledScore>{`${Math.round(picture.score * 100)}%`}</StyledScore>
                </div>
              )}
            </StyledGalleryRight>
          </Flex>
        </>
        }
      </StyledBody>
    </MainLayout>
  )
}
export default Main
