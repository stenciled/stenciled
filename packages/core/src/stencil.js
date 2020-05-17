import React from 'react'
import { deepmerge } from '@utilz/deepmerge'
import { Part } from '@themeprint/part'

const Wrapper = ({ children, name }) => (
  <Part render={({ width, height }) => <p>{name}</p>}>{children}</Part>
)

// export const stencil = definition => render => {
//   if (!definition) {
//     throw new Error('No definition defined.')
//   }

//   if (!render) {
//     throw new Error('No render defined.')
//   }

//   return ({ stencil, ...props }) => {
//     const funcs = deepmerge(definition, stencil) // TODO: check stencil only contains props defined on definition

//     return render({
//       ...props,
//       stencil: Object.keys(funcs).reduce((map, key) => {
//         map[key] = props => <Wrapper name={key}>{funcs[key](props)}</Wrapper>
//         return map
//       }, {}),
//     })
//   }
// }

// Converts { component, parts, props } into component
const componentFromPart = ({ definition, props }) => {
  const { component, parts = {} } = definition

  if (!component) {
    throw new Error(`Unexpected missing 'component' property.`)
  }

  const propsFunc = definition.props || (p => p)

  const resolvedProps = propsFunc(props)

  const stencil = Object.keys(parts).reduce((map, key) => {
    // map[key] = props => <Wrapper name={key}>{parts[key](props)}</Wrapper>
    map[key] = () =>
      componentFromPart({ definition: parts[key], props: resolvedProps })
    return map
  }, {})

  return component({ stencil, ...resolvedProps })
}

export const stencil = definition => {
  if (!definition) {
    throw new Error('No definition defined.')
  }

  return ({ stencil, ...props }) => {
    const resolvedDefinition = deepmerge(definition, stencil)
    // TODO: check stencil only contains
    // component and props properties
    // don't merge parts property

    return componentFromPart({ definition: resolvedDefinition, props })
  }
}
