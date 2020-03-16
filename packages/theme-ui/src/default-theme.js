import { base as theme } from '@theme-ui/preset-base'

// TODO: add invert option to enrich function
// which dynamically adds dark mode
// TODO: review colors
const highlight = '#29112c'

export const defaultTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    highlight,
  },
  modes: {
    dark: {
      primary: theme.colors.muted,
      secondary: theme.colors.primary,
      text: theme.colors.background,
      background: theme.colors.text,
      muted: highlight,
      highlight: theme.colors.muted,
    },
  },
}
