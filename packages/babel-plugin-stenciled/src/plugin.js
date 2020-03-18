const { replaceJsxPragmas } = require('./pragma')
const {
  addStenciledImport,
  isJsxImport,
  createStenciledImportDeclaration,
} = require('./imports')

const plugin = ({ types: t }) => {
  return {
    name: 'stenciled',
    visitor: {
      Program(path) {
        replaceJsxPragmas(path.node)

        if (path.node.body.length === 0) {
          addStenciledImport(path)
        }
      },
      ImportDeclaration(path) {
        if (isJsxImport(path.node)) {
          path.insertAfter(createStenciledImportDeclaration(t))
        }
      },
    },
  }
}

module.exports = plugin
