import { Empty } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  message?: string
}

const EmptyData = ({ message }: Props) => {
  const { t } = useTranslation()
  return <Empty description={<span>{message ? message : t('feat:global.noData')}</span>} />
}

export default EmptyData
