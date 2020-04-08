/** @jsx jsx */
import React from 'react'
import { jsx } from '@theme-ui/core'
import { StenciledContext } from './context'
import { useMeasure } from 'react-use'

const ExpandedInfo = ({ render, width, height }) => (
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
    {render &&
      render({
        width,
        height,
      })}
  </div>
)

const Expander = ({ render, expanded, onClick }) => {
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
          width={expandedWidth}
          height={expandedHeight}
          render={render}
        />
      )}
    </div>
  )
}

const useMaxChildWidth = children => {
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

  return { clonedChildren, width: maxWidth === 0 ? null : maxWidth }
}

export const Part = ({ render, children, style }) => {
  const { clonedChildren, width } = useMaxChildWidth(children)
  const [expanded, setExpanded] = React.useState(false)

  const content = render ? (
    <div css={{ position: 'relative' }}>
      <Expander
        render={render}
        expanded={expanded}
        onClick={expanded => setExpanded(expanded)}
      />
      {clonedChildren}
    </div>
  ) : (
    children
  )

  return (
    <StenciledContext.Consumer>
      {({ enabled }) => {
        console.log('enabled', enabled)
        if (!enabled) {
          return children
        }

        return (
          <div
            css={{
              width: `${width}px`,
              ...(style || {}),
            }}
          >
            {content}
          </div>
        )
      }}
    </StenciledContext.Consumer>
  )
}
