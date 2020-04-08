/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Part } from '@stenciled/part'

// TODO: conditionally import @stenciled/part based on env variable
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

const Meta = ({ as, variant, width, height }) => (
  <div
    css={{
      height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      userSelect: 'none',
    }}
  >
    {variant && <Title width={width}>{variant}</Title>}
    {as && <Title width={width}>as: {as}</Title>}
  </div>
)

export const Wrapper = ({ as, variant, children }) => {
  if (!as && !variant) {
    return children
  }

  const render = ({ width, height }) => (
    <Meta as={as} variant={variant} width={width} height={height} />
  )

  return (
    <Part
      style={{
        border: '1px dashed #ccc',
      }}
      render={render}
    >
      {children}
    </Part>
  )
}
