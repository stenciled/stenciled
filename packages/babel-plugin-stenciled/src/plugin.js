const { addNamed } = require('@babel/helper-module-imports')

const getComments = node => {
  if (!node) {
    return []
  }

  if (node.body && node.body.length > 0) {
    const leadingComments = node.body[0].leadingComments
    return leadingComments || []
  }

  return node.innerComments || []
}

// Replaces any instance of /** @jsx jsx */
// with /** @jsx stenciled */
const replaceJsxPragmas = node => {
  const comments = getComments(node)

  if (comments.length === 0) {
    return
  }

  // TODO: regex match
  const jsxPragmaComments = comments.filter(
    c =>
      c.type === 'CommentBlock' && c.value && c.value.startsWith('* @jsx jsx')
  )

  if (jsxPragmaComments.length === 0) {
    return
  }

  // TODO: regex replace
  jsxPragmaComments.forEach(c => {
    c.value = '* @jsx _stenciled '
  })
}

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
