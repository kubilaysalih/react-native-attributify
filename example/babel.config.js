/* eslint-disable @typescript-eslint/no-require-imports */
require('ts-node/register/transpile-only')

const attributifyPlugin = require('../index.ts')

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [attributifyPlugin]
  }
}