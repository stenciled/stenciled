export const babelDefault = config => {
  return {
    ...config,
    presets: [
      require.resolve('@stenciled/babel-preset-stenciled'),
      ...config.presets,
    ],
  }
}
