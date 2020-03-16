import { defaultTheme } from './default-theme'
import each from 'jest-each'

describe('default theme', () => {
  const expectedColors = [
    'primary',
    'secondary',
    'text',
    'background',
    'muted',
    'highlight',
  ]

  each(expectedColors.map(c => [c])).test(`contains color '%s'`, color => {
    expect(defaultTheme.colors[color]).toBeTruthy()
  })

  each(expectedColors.map(c => [c])).test(
    `contains dark mode color '%s'`,
    color => {
      expect(defaultTheme.modes.dark[color]).toBeTruthy()
    }
  )
})
