import React from 'react'
import { deepmerge } from '@utilz/deepmerge'

const Wrapper = ({ children }) => <div className="foo">{children}</div>

export const stencil = definition => render => {
  if (!definition) {
    throw new Error('No definition defined.')
  }

  if (!render) {
    throw new Error('No render defined.')
  }

  return ({ stencil, ...props }) => {
    const funcs = deepmerge(definition, stencil) // TODO: check stencil only contains props defined on definition

    return render({
      ...props,
      stencil: Object.keys(funcs).reduce((map, key) => {
        map[key] = props => <Wrapper>{funcs[key](props)}</Wrapper>
        return map
      }, {}),
    })
  }
}
