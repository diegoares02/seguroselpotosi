module.exports = {
    setupFilesAfterEnv: ['./setupTests.js'], // Replace with your setup file path
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^.+\\.(css|less)$': '<rootDir>/CSSStub.js',
  },
  };