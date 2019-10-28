import defaultConfig from '../../config/stageConfig/localhost/conf.js'
import { IConf } from './@typings'

declare global {
  interface Window {
    Conf: IConf
  }
}
const config: IConf = (window && window.Conf) || defaultConfig
export default config
