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
// with /** @jsx _stenciled */
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

module.exports = {
  replaceJsxPragmas,
}
