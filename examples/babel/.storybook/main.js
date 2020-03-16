// const { Box } = require('@stenciled/box')

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: async config => {
    config.resolve.alias['theme-ui'] = '@stenciled/box'
    // resolve: {
    //     alias: {
    //       '~': path.resolve(__dirname, './src'),
    //     },
    //   },

    // Return the altered config
    return config
  },
}
