module.exports = {
  input: ['src/**/*.{ts,tsx}'],
  output: 'src/locale',
  options: {
    func: {
      list: ['t'],
      extensions: ['.ts', '.tsx'],
    },
    trans: false,
    lngs: ['cs', 'en'],
    ns: ['components', 'labels', 'common', 'feat', 'validation'],
    defaultLng: 'cs',
    defaultNs: 'common',
    defaultValue: (lng, ns, key) => `missing - ${lng}.${ns}.${key}`,
    resource: {
      loadPath: './src/locale/{{lng}}/{{ns}}.json',
      savePath: '{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':',
    keySeparator: '.',
  },
}
