module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/react',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components'],
    },
    development: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        'react-hot-loader/babel',
        'babel-plugin-styled-components',
        ['import', { libraryName: 'ramda', libraryDirectory: 'src', camel2DashComponentName: false }, 'ramda'],
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
      ],
    },
    production: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        'react-hot-loader/babel',
        'babel-plugin-styled-components',
        ['import', { libraryName: 'ramda', libraryDirectory: 'src', camel2DashComponentName: false }, 'ramda'],
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
      ],
    },
  },
}
