/** @jsx jsx */
import React from 'react'
import { jsx } from '@theme-ui/core'
import { stencil } from './stencil'

console.log(stencil)

export default { title: 'stencil' }

// const Foo = ({ stencil }) => {
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
//       <div>
//         {stencil.header ? (
//           stencil.header(data.header)
//         ) : (
//           <p>{data.header.title}</p>
//         )}
//       </div>
//       <div>
//         {stencil.footer ? (
//           stencil.footer(data.footer)
//         ) : (
//           <p>{data.footer.links.join(', ')}</p>
//         )}
//       </div>
//     </React.Fragment>
//   )
// }

const Foo = stencil({
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

export const withDefault = () => <Foo />

export const withHeader = () => (
  <Foo
    stencil={{
      header: ({ title }) => <p css={{ fontWeight: 700 }}>{title}</p>,
    }}
  />
)
