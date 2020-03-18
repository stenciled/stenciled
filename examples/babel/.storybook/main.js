const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  addons: [path.resolve(__dirname, './preset.js')],
}
