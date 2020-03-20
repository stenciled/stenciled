/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { WrapperContext } from './context'

const getAsProps = as => {
  if (!as) {
    return {}
  }

  return {
    '::after': {
      content: `"${as}"`,
      fontSize: '10px',
      fontFamily: 'Arial',
      color: '#666',
      backgroundColor: '#eee',
      padding: '0.2rem 0.3rem',
      margin: 0,
      position: 'absolute',
      right: 0,
      bottom: 0,
      opacity: '0.9',
    },
  }
}

const getVariantProps = variant => {
  if (!variant) {
    return {}
  }

  return {
    '::before': {
      content: `"${variant}"`,
      fontSize: '10px',
      fontFamily: 'Arial',
      color: '#666',
      backgroundColor: '#eee',
      padding: '0.2rem 0.3rem',
      margin: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      opacity: '0.9',
    },
  }
}

export const Wrapper = ({ as, variant, children }) => {
  if (!as && !variant) {
    return children
  }

  const variantStyle = {
    border: '1px solid #ccc',
    borderStyle: 'dashed',
  }

  return (
    <WrapperContext.Consumer>
      {({ enabled }) => {
        if (!enabled) {
          return children
        }

        return (
          <div
            css={{
              position: 'relative',
              ...(variant ? variantStyle : {}),
              ...getAsProps(as),
              ...getVariantProps(variant),
            }}
          >
            {children}
          </div>
        )
      }}
    </WrapperContext.Consumer>
  )
}
