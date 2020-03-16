import React from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useTheme } from './theme'
import { ThemeProvider } from '@theme-ui/core'
import { random } from 'faker'
import { defaultTheme } from './default-theme'

const randomTheme = () => ({ [random.word()]: random.word() })

const Component = ({ render, usage }) => {
  const theme = usage()
  return render(theme)
}

const renderTheme = ({ themeProviderTheme, usage }) => {
  let renderedTheme = null

  render(
    <ThemeProvider theme={themeProviderTheme}>
      <Component
        usage={usage}
        render={t => {
          renderedTheme = t
          return <div />
        }}
      />
    </ThemeProvider>
  )

  return renderedTheme
}

describe('useTheme', () => {
  describe('without theme provider', () => {
    it('should return default theme with no theme provided', () => {
      const { result } = renderHook(() => useTheme())
      expect(result.current).toEqual(defaultTheme)
    })

    it('should return merged theme when theme provided', () => {
      const theme = randomTheme()
      const { result } = renderHook(() => useTheme(theme))
      expect(result.current).toEqual(expect.objectContaining(theme))
    })
  })

  describe('with theme provider', () => {
    it('should return theme provider theme merged with default when no theme provided', () => {
      const theme = randomTheme()

      const renderedTheme = renderTheme({
        themeProviderTheme: theme,
        usage: () => useTheme(),
      })

      expect(renderedTheme).toEqual(expect.objectContaining(theme))
    })

    it('should return theme provider theme merged with default and provided theme', () => {
      const themeProviderTheme = randomTheme()
      const theme = randomTheme()

      const renderedTheme = renderTheme({
        themeProviderTheme,
        usage: () => useTheme(theme),
      })

      expect(renderedTheme).toEqual(
        expect.objectContaining({
          ...themeProviderTheme,
          ...theme,
        })
      )
    })
  })
})
