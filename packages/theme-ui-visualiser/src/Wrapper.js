import React from 'react'

export const Wrapper = ({ as, variant, children }) => {
  if (!as && !variant) {
    return children
  }

  return (
    <div style={{ border: variant ? '1px solid #f00' : null }}>
      {as && <p>{as}</p>}
      {children}
      {variant && <p>{variant}</p>}
    </div>
  )
}
