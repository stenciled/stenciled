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
          console.log('found!')
          path.insertAfter(createStenciledImportDeclaration(t))
        }
      },
    },
    // post(path) {
    //   console.log('\n')
    //   console.log(path)
    // },
  }
}

module.exports = plugin
