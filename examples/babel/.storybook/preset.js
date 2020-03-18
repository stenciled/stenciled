const babel = config => {
  return {
    ...config,
    // presets: [
    //   require.resolve('@stenciled/babel-preset-stenciled'),
    //   ...config.presets,
    // ],
  }
}

module.exports = {
  babel,
}
