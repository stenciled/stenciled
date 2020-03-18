const { addNamed } = require('@babel/helper-module-imports')

const addStenciledImport = path => {
  return addNamed(path, 'stenciled', '@stenciled/theme-ui-visualise', {
    nameHint: 'stenciled',
  })
}

const createStenciledImportDeclaration = t =>
  t.importDeclaration(
    [t.importSpecifier(t.identifier('_stenciled'), t.identifier('stenciled'))],
    t.stringLiteral('@stenciled/theme-ui-visualise')
  )

const isJsxImport = node => {
  if (!node) {
    return false
  }

  if (!node.specifiers || node.specifiers.length === 0) {
    return false
  }

  if (node.specifiers.some(n => n.imported && n.imported.name === 'jsx')) {
    if (node.source && node.source.value === 'theme-ui') {
      return true
    }
  }

  return false
}

module.exports = {
  isJsxImport,
  addStenciledImport,
  createStenciledImportDeclaration,
}
