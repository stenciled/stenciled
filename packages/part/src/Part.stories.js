/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Part } from './Part'

export default { title: 'Part' }

const defaultProps = {
  render: () => <p>Meta</p>,
  style: { border: '1px dashed #c00' },
}

const Title = ({ width, children }) => (
  <p
    title={children}
    css={{
      width,
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textAlign: 'center',
    }}
  >
    {children}
  </p>
)

export const withDefault = () => (
  <Part>
    <div>Test</div>
  </Part>
)

export const withStyle = () => (
  <Part style={defaultProps.style}>
    <div>Test</div>
  </Part>
)

export const withRender = () => (
  <Part render={defaultProps.render}>
    <div>Test</div>
  </Part>
)

export const withStyleAndRender = () => (
  <Part {...defaultProps}>
    <div>Test</div>
  </Part>
)

export const with100PercentWidth = () => (
  <Part {...defaultProps}>
    <div sx={{ width: '100%' }}>c</div>
  </Part>
)

export const withFixedWidth = () => (
  <Part {...defaultProps}>
    <div sx={{ width: '10px' }}>c</div>
  </Part>
)

export const withInlineBlock = () => (
  <Part {...defaultProps}>
    <div sx={{ display: 'inline-block' }}>c</div>
  </Part>
)

export const withMultipleChildren = () => (
  <Part {...defaultProps}>
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <div>four</div>
  </Part>
)

export const withLongContent = () => (
  <Part
    style={defaultProps.style}
    render={({ width }) => (
      <Title width={width}>
        thisisareallylongvariant.thatismadeupofmanyparts.thatarereallyverylongindeed
      </Title>
    )}
  >
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <div>four</div>
  </Part>
)

export const withOverflowHidden = () => (
  <Part {...defaultProps}>
    <div sx={{ overflow: 'hidden' }}>c</div>
  </Part>
)
