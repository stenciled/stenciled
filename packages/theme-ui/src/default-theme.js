import theme from '@theme-ui/preset-base'

console.log(theme)

// TODO: add invert option to enrich function
// which dynamically adds dark mode
export const defaultTheme = {
  ...theme,
  modes: {
    dark: {
      text: theme.colors.background,
      background: theme.colors.text,
      primary: theme.colors.muted,
      muted: theme.colors.primary,
    },
  },
}
