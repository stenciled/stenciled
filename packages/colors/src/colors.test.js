import { color } from './colors'
import { random } from 'faker'

describe('color', () => {
  describe('constructor', () => {
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
      expect(color({ h: 0, s: 50, l: 50 })).toMatchObject({
        value: {
          h: 0,
          s: 50,
          l: 50,
        },
      })
    })

    it('should return a value for decimals', () => {
      expect(color({ h: 0, s: 0.5, l: 0.63 })).toMatchObject({
        value: {
          h: 0,
          s: 50,
          l: 63,
        },
      })
    })

    it('should clip low hue', () => {
      expect(color({ h: -1, s: 0.5, l: 0.64 })).toMatchObject({
        value: {
          h: 0,
          s: 50,
          l: 64,
        },
      })
    })

    it('should clip high hue', () => {
      expect(color({ h: 300, s: 0.5, l: 0.64 })).toMatchObject({
        value: {
          h: 255,
          s: 50,
          l: 64,
        },
      })
    })

    it('should clip low saturation', () => {
      expect(color({ h: 0, s: -1, l: 50 })).toMatchObject({
        value: {
          h: 0,
          s: 0,
          l: 50,
        },
      })
    })

    it('should clip high saturation', () => {
      expect(color({ h: 0, s: 101, l: 50 })).toMatchObject({
        value: {
          h: 0,
          s: 100,
          l: 50,
        },
      })
    })

    it('should clip low light', () => {
      expect(color({ h: 0, s: 50, l: -10 })).toMatchObject({
        value: {
          h: 0,
          s: 50,
          l: 0,
        },
      })
    })

    it('should clip high light', () => {
      expect(color({ h: 0, s: 50, l: 110 })).toMatchObject({
        value: {
          h: 0,
          s: 50,
          l: 100,
        },
      })
    })
  })

  describe('css', () => {
    it('should return hsl by default', () => {
      const c = color({ h: 0, s: 0.5, l: 0.63567 })
      expect(c.css()).toEqual('hsl(180,100%,50%)')
    })

    it('should return hsl when specified', () => {
      const c = color({ h: 0, s: 0.5, l: 0.63567 })
      expect(c.css('hsl')).toEqual('hsl(180,100%,50%)')
    })

    it('should return hex when specified', () => {
      const c = color({ h: 0, s: 0.5, l: 0.63567 })
      expect(c.css('hex')).toEqual('#00ffff')
    })

    it('should return hexa when specified', () => {
      const c = color({ h: 0, s: 0.5, l: 0.63567 })
      expect(c.css('hexa')).toEqual('#00ffffff')
    })

    it('should return rgb when specified', () => {
      const c = color({ h: 0, s: 0.5, l: 0.63567 })
      expect(c.css('rgb')).toEqual('rgb(0,255,255)')
    })

    it('should return rgba when specified', () => {
      const c = color({ h: 0, s: 0.5, l: 0.63567 })
      expect(c.css('rgba')).toEqual('rgba(0,255,255,1)')
    })

    it('should throw given an unknown format', () => {
      const format = random.word()
      const c = color({ h: 0, s: 0.5, l: 0.63567 })
      expect(() => c.css(format)).toThrow(`Unknown format '${format}'.`)
    })
  })

  describe('toString', () => {
    it('should return HSL string', () => {
      const c = color({ h: 0, s: 60, l: 40 })
      expect(c.toString()).toEqual('HSL 0, 60%, 40%')
    })

    it('should return HSL string for decimals', () => {
      const c = color({ h: 0, s: 0.51345, l: 0.55892 })
      expect(c.toString()).toEqual('HSL 0, 51%, 56%')
    })
  })
})
