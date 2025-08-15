/* eslint-disable @typescript-eslint/no-require-imports */
const { nativePreset } = require('../dist/presets/index.js')

const config = {
  presets: [nativePreset()]
}

module.exports = config
