const {
  isJsxImport,
  createStenciledImportDeclaration,
  removeJsx,
} = require('./imports')

const plugin = ({ types: t }) => {
  return {
    name: 'stenciled',
    visitor: {
      ImportDeclaration(path) {
        if (isJsxImport(path.node)) {
          path.insertAfter(createStenciledImportDeclaration(t))
          removeJsx(path)
        }
      },
    },
  }
}

module.exports = plugin
