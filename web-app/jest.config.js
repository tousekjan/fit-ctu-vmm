module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },

  collectCoverage: true,
  collectCoverageFrom: ['src/{components,features,utils}/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['stories', 'spec', 'gql', 'testing'],
  moduleNameMapper: {
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^features/(.*)$': '<rootDir>/src/features/$1',
    '^locale/(.*)$': '<rootDir>/src/locale/$1',
    '^routes/(.*)$': '<rootDir>/src/routes/$1',
    '^gql/(.*)$': '<rootDir>/src/gql/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [`/node_modules/(?!react-dnd|react-spring|dnd-core)`],
}
