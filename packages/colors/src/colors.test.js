import { color } from './colors'
import { random } from 'faker'

describe('color', () => {
  it('should throw on undefined', () => {
    expect(() => color()).toThrow('No value specified.')
  })

  it('should throw on null', () => {
    expect(() => color(null)).toThrow('No value specified.')
  })

  it('should throw on boolean', () => {
    expect(() => color(true)).toThrow('Value is not a valid HSL object.')
  })

  it('should throw on string', () => {
    expect(() => color(random.word())).toThrow(
      'Value is not a valid HSL object.'
    )
  })

  it('should throw on empty object', () => {
    expect(() => color({})).toThrow('Value is not a valid HSL object.')
  })

  it('should return a value for percentages', () => {
    expect(color({ h: 0, s: 50, l: 50 })).toEqual({})
  })
})
