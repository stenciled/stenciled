/** @jsx jsx */
import React from 'react'
import { jsx } from '@theme-ui/core'
import { stencil } from './stencil'

export default { title: 'stencil' }

// const Component = stencil({
//   header: ({ title }) => <p>default {title}</p>,
//   footer: ({ links }) => <p>default {links.join(', ')}</p>,
// })(props => {
//   const { header, footer } = props.stencil

//   const data = {
//     header: {
//       title: 'title',
//     },
//     footer: {
//       links: ['link 1', 'link 2'],
//     },
//   }

//   return (
//     <React.Fragment>
//       <div>{header(data.header)}</div>
//       <div>{footer(data.footer)}</div>
//     </React.Fragment>
//   )
// })

const Component = stencil({
  component: ({ stencil, ...props }) => (
    <div {...props}>
      {stencil.header()}
      {stencil.footer()}
    </div>
  ),
  parts: {
    header: {
      component: ({ stencil, ...props }) => {
        return (
          <div {...props}>
            {stencil.title()}
            {stencil.description()}
          </div>
        )
      },
      parts: {
        title: {
          component: ({ title }) => <p>{title}</p>,
          props: ({ title }) => ({ title }),
        },
        description: {
          component: ({ description }) => <p>{description}</p>,
          props: ({ description }) => ({ description }),
        },
      },
    },
    footer: {
      component: ({ footer }) => <p>{footer}</p>,
    },
  },
})

const defaultProps = {
  title: 'title',
  description: 'description',
}

export const withDefault = () => <Component {...defaultProps} />

export const withHeader = () => (
  <Component
    {...defaultProps}
    stencil={{
      header: {
        component: ({ title }) => <p css={{ fontWeight: 700 }}>{title}</p>,
      },
    }}
  />
)

export const withTitle = () => (
  <Component
    {...defaultProps}
    stencil={{
      header: {
        title: {
          component: ({ title }) => <p>{title}!</p>,
        },
      },
    }}
  />
)
