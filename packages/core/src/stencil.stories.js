/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import styled from '@emotion/styled'
import { stencil } from './stencil'

export default { title: 'stencil' }

const Component = stencil({
  component: ({ stencil }) => (
    <div>
      {stencil.header()}
      {stencil.footer()}
    </div>
  ),
  parts: {
    header: {
      component: ({ stencil }) => (
        <div>
          {stencil.title()}
          {stencil.description()}
        </div>
      ),
      parts: {
        title: {
          component: ({ title }) => <p>original {title}</p>,
          props: ({ title }) => ({ title }),
        },
        description: {
          component: ({ description }) => <p>original {description}</p>,
          props: ({ description }) => ({ description }),
        },
      },
    },
    footer: {
      component: ({ footer }) => <p>original {footer}</p>,
    },
  },
})

const defaultProps = {
  title: 'title',
  description: 'description',
  footer: 'footer',
}

export const withDefault = () => <Component {...defaultProps} />

export const withHeader = () => (
  <Component
    {...defaultProps}
    stencil={{
      header: {
        component: ({ props }) => (
          <p css={{ fontWeight: 700 }}>new header {props.title}</p>
        ),
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
          component: ({ props }) => <p>{props.title}!</p>,
        },
      },
    }}
  />
)

export const withWrappedOriginal = () => (
  <Component
    {...defaultProps}
    stencil={{
      header: {
        component: ({ component }) => (
          <div style={{ border: '1px solid #ccc' }}>
            <p>wrapped header</p>
            {component}
          </div>
        ),
      },
    }}
  />
)

export const withStyledOriginal = () => (
  <Component
    {...defaultProps}
    stencil={{
      header: {
        component: ({ component }) => {
          console.log('compontent', component)
          //return component()
          return component
        },
      },
    }}
  />
)
