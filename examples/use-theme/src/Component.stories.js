import React from 'react'
import { ThemeProvider, useColorMode } from 'theme-ui'
import { ColorModeProvider } from '@theme-ui/color-modes'
import { Component } from './Component'
import theme from '@theme-ui/preset-future'

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

const Themed = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider>{children}</ColorModeProvider>
  </ThemeProvider>
)

export default { title: 'Component' }

export const withNoThemeProvider = () => <Component />

export const withThemeProvider = () => (
  <Themed>
    <ColorModeSwitcher>
      <Component />
    </ColorModeSwitcher>
  </Themed>
)
