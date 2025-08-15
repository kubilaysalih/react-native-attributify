/* eslint-disable @typescript-eslint/no-require-imports */
const attributifyPlugin = require('../dist/index.js')

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [attributifyPlugin]
  }
}
