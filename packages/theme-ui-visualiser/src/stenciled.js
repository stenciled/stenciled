import { jsx } from '@theme-ui/core'

export const stenciled = (type, props, ...children) => {
  if (!props) {
    return jsx(type, props, ...children)
  }

  const { as, sx } = props
  const variant = sx ? sx.variant : undefined

  console.log('as', as)
  console.log('variant', variant)

  // TODO: wrap in component that takes as and variant props
  return jsx(type, props, ...children)
}
