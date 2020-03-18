const createStenciledImportDeclaration = t =>
  t.importDeclaration(
    [t.importSpecifier(t.identifier('jsx'), t.identifier('stenciled'))],
    t.stringLiteral('@stenciled/theme-ui-visualiser')
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
  createStenciledImportDeclaration,
}
