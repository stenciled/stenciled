import React from 'react'
import { deepmerge } from '@utilz/deepmerge'
import { Part } from '@themeprint/part'

const Wrapper = ({ children, name }) => (
  <Part render={({ width, height }) => <p>{name}</p>}>{children}</Part>
)

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
        map[key] = props => <Wrapper name={key}>{funcs[key](props)}</Wrapper>
        return map
      }, {}),
    })
  }
}
