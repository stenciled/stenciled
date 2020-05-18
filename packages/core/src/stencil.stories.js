/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import styled from '@emotion/styled'
import { stencil } from './stencil'

export default { title: 'stencil' }

const Component = stencil({
  component: ({ stencil, ...props }) => (
    <div {...props}>
      {stencil.header()}
      {stencil.footer()}
    </div>
  ),
  parts: {
    header: {
      component: ({ stencil, ...props }) => (
        <div {...props}>
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
      props: ({ title, description }) => ({ title, description }),
    },
    footer: {
      component: ({ footer }) => <p>original {footer}</p>,
      props: ({ footer }) => ({ footer }),
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
        component: ({ stencil, Component, props }) => {
          return (
            <div style={{ border: '1px solid #ccc' }}>
              <p>wrapped header</p>
              <Component stencil={stencil} {...props} />
            </div>
          )
        },
      },
    }}
  />
)

export const withStyledOriginal = () => (
  <Component
    {...defaultProps}
    stencil={{
      header: {
        component: ({ stencil, Component, props }) => {
          const Fancy = styled(Component)`
            color: hotpink;
          `

          return <Fancy stencil={stencil} />
        },
      },
    }}
  />
)
