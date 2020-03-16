import React from 'react'
import { ThemeProvider, useColorMode, Button } from 'theme-ui'
import { ColorModeProvider } from '@theme-ui/color-modes'
import { Component } from './Component'
import defaultTheme from '@theme-ui/preset-future'

const ColorModeSwitcher = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <>
      <button
        onClick={() => {
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }}
      >
        Toggle {colorMode === 'default' ? 'Dark' : 'Light'}
      </button>
      {children}
    </>
  )
}

const Themed = ({ children, theme }) => (
  <ThemeProvider theme={theme || defaultTheme}>
    <ColorModeProvider>{children}</ColorModeProvider>
  </ThemeProvider>
)

export default { title: 'useTheme' }

export const withNoThemeProvider = () => <Component />

export const withThemeProvider = () => (
  <Themed>
    <ColorModeSwitcher>
      <Component />
    </ColorModeSwitcher>
  </Themed>
)

// export const Test = () => {
//   return (
//     <Themed
//       theme={{
//         ...defaultTheme,
//         secondary: {
//           background: '#0c0',
//         },
//         buttons: {
//           secondary: {
//             background: '#c00',
//           },
//         },
//       }}
//     >
//       <Button variant="secondary">Test</Button>
//     </Themed>
//   )
// }
