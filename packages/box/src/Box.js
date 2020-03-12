/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Box as ThemeUiBox } from '@theme-ui/components'

const Wrapper = ({ as, variant, children }) => (
  <ThemeUiBox sx={{ border: '1px solid #f00' }}>
    {variant && (
      <ThemeUiBox sx={{ position: 'fixed', top: 0, right: 0 }}>
        {variant}
      </ThemeUiBox>
    )}
    {children}
  </ThemeUiBox>
)

export const Box = ({ children, ...props }) => {
  console.log(props)
  const { as, variant } = props
  return (
    <Wrapper as={as} variant={variant}>
      <ThemeUiBox {...props}>{children}</ThemeUiBox>
    </Wrapper>
  )
}
