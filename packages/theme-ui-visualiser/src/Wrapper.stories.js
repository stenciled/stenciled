import React from 'react'
import { Wrapper } from './Wrapper'

export default { title: 'Wrapper' }

export const withDefault = () => (
  <Wrapper>
    <p>Test</p>
  </Wrapper>
)

export const withAs = () => (
  <Wrapper as="nav">
    <p>Test</p>
  </Wrapper>
)

export const withVariant = () => (
  <Wrapper variant="variant">
    <p>Test</p>
  </Wrapper>
)

export const withAsAndVariant = () => (
  <Wrapper as="nav" variant="variant">
    <p>Test</p>
  </Wrapper>
)
