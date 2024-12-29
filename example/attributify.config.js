/* eslint-disable @typescript-eslint/no-require-imports */
require('ts-node/register/transpile-only')
const { nativePreset } = require('../presets/index.ts')

const config = {
  presets: [nativePreset()]
}

module.exports = config