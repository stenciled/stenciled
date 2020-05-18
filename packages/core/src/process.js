import { isNil, isObject } from '@utilz/types'
import { deepmerge } from '@utilz/deepmerge'

// Converts a stencil and definition to a definition
// Ready to be converted to a React component
const convertToDefinition = (definition, stencil, key) => {
  if (!definition[key]) {
    throw new Error(`No stencil part named '${key}'.`)
  }

  const isPartReplacement =
    !stencil[key].hasOwnProperty('component') &&
    !stencil[key].hasOwnProperty('props')

  if (!isPartReplacement) {
    return {
      component: stencil[key].component || definition[key].component,
      originalComponent: definition[key].component,
      props: stencil[key].props || definition[key].props,
    }
  }

  if (!definition[key].parts) {
    throw new Error(`No parts defined on stencil part '${key}'.`)
  }

  const parts = Object.keys(stencil[key]).reduce((map, k) => {
    if (!definition[key].parts[k]) {
      throw new Error(`No part '${k}' defined on stencil part '${key}'.`)
    }

    map[k] = convertToDefinition(definition[key].parts, stencil[key], k)
    return map
  }, {})

  return {
    component: definition[key].component,
    // originalComponent: definition[key].component,
    parts,
    props: definition[key].props,
  }
}

export const processStencil = (definition, stencil) => {
  if (isNil(definition)) {
    throw new Error('No definition provided.')
  }

  if (!isObject(definition)) {
    throw new Error('The definition must be an object.')
  }

  if (isNil(stencil)) {
    return definition
  }

  if (!isObject(stencil)) {
    throw new Error('The stencil must be an object.')
  }

  const convertedStencil = convertToDefinition(
    {
      root: definition,
    },
    { root: stencil },
    'root'
  )

  return deepmerge(definition, convertedStencil)
}
