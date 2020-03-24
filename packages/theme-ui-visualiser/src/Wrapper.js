/** @jsx jsx */
import React from 'react'
import { jsx } from '@theme-ui/core'
import { WrapperContext } from './context'
import { useMeasure } from 'react-use'

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

const ExpandedInfo = ({ as, variant, width, height }) => {
  return (
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
}

const Expander = ({ as, variant, expanded, onClick }) => {
  const defaultProps = {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#666',
    opacity: 0.8,
    margin: 0,
    padding: 0,
    cursor: 'pointer',
    fontFamily: 'Arial',
    fontSize: '12px',
    transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out',
  }

  const expandedWidth = '100px'
  const expandedHeight = '70px'

  const expandedProps = expanded
    ? {
        width: expandedWidth,
        height: expandedHeight,
        padding: '0.5rem',
      }
    : {
        width: '10px',
        height: '10px',
      }

  return (
    <div
      css={{
        ...Object.assign({}, defaultProps, expandedProps),
      }}
      onClick={() => onClick(!expanded)}
    >
      {expanded && (
        <ExpandedInfo
          as={as}
          variant={variant}
          width={expandedWidth}
          height={expandedHeight}
        />
      )}
    </div>
  )
}

export const Wrapper = ({ as, variant, children }) => {
  const [expanded, setExpanded] = React.useState(false)

  if (!as && !variant) {
    return children
  }

  const variantStyle = {
    border: '1px dashed #ccc',
  }

  let measurements = []
  const clonedChildren = React.Children.map(children, child => {
    const [ref, props] = useMeasure()

    measurements.push({
      ref,
      props,
    })

    return React.cloneElement(child, { ref })
  })

  const maxWidth = Math.max.apply(
    Math,
    measurements.map(m => {
      if (!m.props) {
        return 0
      }

      return m.props.width || 0
    })
  )

  return (
    <WrapperContext.Consumer>
      {({ enabled }) => {
        if (!enabled) {
          return children
        }

        return (
          <div
            css={{
              width: maxWidth === 0 ? null : `${maxWidth}px`,
              ...(variant ? variantStyle : {}),
            }}
          >
            <div css={{ position: 'relative' }}>
              <Expander
                expanded={expanded}
                as={as}
                variant={variant}
                onClick={v => setExpanded(v)}
              />
              {clonedChildren}
            </div>
          </div>
        )
      }}
    </WrapperContext.Consumer>
  )
}
