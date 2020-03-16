import { deepmerge } from '@utilz/deepmerge'
import { useThemeUI } from '@theme-ui/core'
import { defaultTheme } from './default-theme'

export const configureUseTheme = defaultTheme => fallbackTheme => {
  const context = useThemeUI()

  if (!context) {
    return deepmerge(defaultTheme, fallbackTheme)
  }

  const { theme } = context
  return deepmerge(defaultTheme, fallbackTheme, theme)
}

export const useTheme = configureUseTheme(defaultTheme)
