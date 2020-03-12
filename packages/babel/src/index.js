import { declare } from '@babel/helper-plugin-utils'
import addImports from 'babel-plugin-add-imports'

export default declare((api, opts) => {
  api.assertVersion(7)

  //   const pragma = opts.pragma || 'React.createElement'
  //   const pragmaFrag = opts.pragmaFrag || 'React.Fragment'
  //   const throwIfNamespace =
  //     opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace
  //   const development = !!opts.development
  //   const useBuiltIns = !!opts.useBuiltIns
  //   const { useSpread } = opts

  //   if (typeof development !== 'boolean') {
  //     throw new Error(
  //       "@babel/preset-react 'development' option must be a boolean."
  //     )
  //   }

  return {
    plugins: [
      [addImports, [`{ jsx } from '@stenciled/theme-ui-visualise`]],
    ].filter(Boolean),
  }
})
