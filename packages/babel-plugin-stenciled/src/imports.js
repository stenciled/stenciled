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

module.exports = {
  isJsxImport,
  createStenciledImportDeclaration,
  removeJsx,
}
