import i18 from 'i18next'
import * as resources from 'locale/index.ts'
import { initReactI18next } from 'react-i18next'

i18.use(initReactI18next as any).init({
  ns: ['components', 'labels', 'common', 'feat', 'validation'],
  lng: 'cs',
  fallbackLng: 'cs',
  defaultNS: 'common',
  resources,
})

export default i18
