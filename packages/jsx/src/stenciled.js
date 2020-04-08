import React from 'react'
import { jsx } from '@theme-ui/core'
import { Wrapper } from './Wrapper'

// TODO: conditionally import @stenciled/part based on env variable
export const stenciled = (type, props, ...children) => {
  console.log('running')
  if (!props) {
    return jsx(type, props, ...children)
  }

  const { as, sx } = props
  const variant = sx ? sx.variant : undefined

  if (!as && !variant) {
    return jsx(type, props, ...children)
  }

  console.log('returning wrapper')
  return (
    <Wrapper as={as} variant={variant}>
      {jsx(type, props, ...children)}
    </Wrapper>
  )
}
