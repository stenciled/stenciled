/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Wrapper } from './Wrapper'

export default { title: 'Wrapper' }

export const withDefault = () => (
  <Wrapper>
    <div>Test</div>
  </Wrapper>
)

export const withAs = () => (
  <Wrapper as="nav">
    <div>Test</div>
  </Wrapper>
)

export const withVariant = () => (
  <Wrapper variant="variant">
    <div>Test</div>
  </Wrapper>
)

export const withAsAndVariant = () => (
  <Wrapper as="nav" variant="variant">
    <div>Test</div>
  </Wrapper>
)

export const with100PercentWidth = () => (
  <Wrapper variant="variant">
    <div sx={{ width: '100%' }}>c</div>
  </Wrapper>
)

export const withFixedWidth = () => (
  <Wrapper variant="variant">
    <div sx={{ width: '10px' }}>c</div>
  </Wrapper>
)

export const withInlineBlock = () => (
  <Wrapper variant="variant">
    <div sx={{ display: 'inline-block' }}>c</div>
  </Wrapper>
)

export const withMultipleChildren = () => (
  <Wrapper variant="variant">
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <div>four</div>
  </Wrapper>
)

export const withLongVariant = () => (
  <Wrapper variant="thisisareallylongvariant.thatismadeupofmanyparts.thatarereallyverylongindeed">
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <div>four</div>
  </Wrapper>
)
