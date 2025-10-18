const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.js')],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  moduleFileExtensions: ["js", "jsx", "json", "node"],

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": path.resolve(__dirname, 'styleMock.cjs'),
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': path.resolve(__dirname, 'fileMock.cjs'),
  },
};
