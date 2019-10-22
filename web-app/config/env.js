// Src
const DIR_NAME = `${__dirname}/../`
const SOURCE = 'src'
const MAIN = './index.tsx'
// Build
const OUTPUT = 'dist'
const BUNDLE = 'main.js'
// Rest
const PUBLIC_PATH = '/'
const HTML_MAIN = '/index.html'

module.exports = {
  theme: {
    'primary-color': '#16b487',
  },
  build: {
    DIR_NAME,
    SOURCE,
    MAIN,
    OUTPUT,
    BUNDLE,
    PUBLIC_PATH,
    HTML_MAIN,
  },
}
