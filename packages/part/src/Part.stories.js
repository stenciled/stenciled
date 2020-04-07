/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Part } from './Part'

export default { title: 'Part' }

export const withDefault = () => (
  <Part>
    <div>Test</div>
  </Part>
)

export const withAs = () => (
  <Part as="nav">
    <div>Test</div>
  </Part>
)

export const withVariant = () => (
  <Part variant="variant">
    <div>Test</div>
  </Part>
)

export const withAsAndVariant = () => (
  <Part as="nav" variant="variant">
    <div>Test</div>
  </Part>
)

export const with100PercentWidth = () => (
  <Part variant="variant">
    <div sx={{ width: '100%' }}>c</div>
  </Part>
)

export const withFixedWidth = () => (
  <Part variant="variant">
    <div sx={{ width: '10px' }}>c</div>
  </Part>
)

export const withInlineBlock = () => (
  <Part variant="variant">
    <div sx={{ display: 'inline-block' }}>c</div>
  </Part>
)

export const withMultipleChildren = () => (
  <Part variant="variant">
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <div>four</div>
  </Part>
)

export const withLongVariant = () => (
  <Part variant="thisisareallylongvariant.thatismadeupofmanyparts.thatarereallyverylongindeed">
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <div>four</div>
  </Part>
)

export const withOverflowHidden = () => (
  <Part as="nav" variant="variant">
    <div sx={{ overflow: 'hidden' }}>c</div>
  </Part>
)
