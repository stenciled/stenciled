export const configureUseVariant = themeKey => variant => {
  if (!variant) {
    throw new Error('No variant name provided.')
  }

  if (!themeKey) {
    return variant
  }

  return `${themeKey}.${variant}`
}

export const useVariant = configureUseVariant('components')
