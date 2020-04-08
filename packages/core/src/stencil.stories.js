/** @jsx jsx */
import React from 'react'
import { jsx } from '@theme-ui/core'
import { stencil } from './stencil'

export default { title: 'stencil' }

const Component = stencil({
  header: ({ title }) => <p>default {title}</p>,
  footer: ({ links }) => <p>default {links.join(', ')}</p>,
})(props => {
  const { header, footer } = props.stencil

  const data = {
    header: {
      title: 'title',
    },
    footer: {
      links: ['link 1', 'link 2'],
    },
  }

  return (
    <React.Fragment>
      <div>{header(data.header)}</div>
      <div>{footer(data.footer)}</div>
    </React.Fragment>
  )
})

export const withDefault = () => <Component />

export const withHeader = () => (
  <Component
    stencil={{
      header: ({ title }) => <p css={{ fontWeight: 700 }}>{title}</p>,
    }}
  />
)
