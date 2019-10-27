import { InputNumber, Slider } from 'antd';
import React from 'react'
import { Flex } from '../Layout/styled';

interface Props {
  name: string,
  disabled: boolean,
  values: object,
  setFieldValue: any,
}

const SliderBox = ({ name, disabled, setFieldValue, values }: Props) => {
  return (
    <Flex direction="row">
      <div style={{ width: '150px' }} >
        <Slider
          disabled={disabled}
          min={1}
          max={100}
          style={{ marginLeft: 10 }}
          onChange={data => setFieldValue(name, data)}
          value={values[name]}
        />
      </div>
      <InputNumber
        disabled={disabled}
        min={1}
        max={100}
        style={{ marginLeft: 10 }}
        value={values[name]}
        onChange={data => setFieldValue(name, data)}
      />
    </Flex>
  )
}
export default SliderBox
