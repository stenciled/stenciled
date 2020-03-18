const { isJsxImport, createStenciledImportDeclaration } = require('./imports')

const removeJsx = path => {
  const { node } = path

  // remove jsx import specifier
  const specifiers = (node.specifiers || []).filter(
    s => s.imported.name !== 'jsx'
  )

  // if no import specifiers remaining,
  // then remove the import declaration
  if (specifiers.length === 0) {
    path.remove()
    return
  }

  node.specifiers = specifiers
}

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
