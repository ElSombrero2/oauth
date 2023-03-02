
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  coverageDirectory: '../coverage',
  setupFiles: ['dotenv/config']
};