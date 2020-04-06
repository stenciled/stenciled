import React from 'react'
import { deepmerge } from '@utilz/deepmerge'

export const stencil = definition => render => {
  if (!definition) {
    throw new Error('No definition defined.')
  }

  if (!render) {
    throw new Error('No render defined.')
  }

  return ({ stencil, ...props }) => {
    return render({
      ...props,
      stencil: deepmerge(definition, stencil),
    })
  }
}
