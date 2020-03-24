const { declare } = require('@babel/helper-plugin-utils')
const stenciledPlugin = require('@stenciled/babel-plugin-stenciled')

const preset = declare(api => {
  api.assertVersion(7)

  return {
    plugins: [stenciledPlugin],
  }
})

module.exports = preset
