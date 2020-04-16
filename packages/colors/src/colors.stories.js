/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { color as createColor } from './color'

export default { title: 'color' }

const Color = ({ color }) => (
  <div css={{ width: 50, height: 50, backgroundColor: color }} />
)

export const withColor = () => {
  const c = createColor({ h: 50, s: 20, l: 30 })
  return <Color color={c.css()} />
}
