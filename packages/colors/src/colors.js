import chroma from 'chroma-js'
import { isObject, isNil } from '@utilz/types'

const clip = (min, max) => value => {
  if (isNil(value)) {
    throw new Error('No value specified.')
  }

  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value
}

const round = value => Math.round(value)

const normaliseHsl = value => {
  const clipPercentage = clip(0, 100)

  console.log('value', value)
  const percentage = {
    h: value.h,
    s: value.s <= 1 ? value.s * 100 : value.s,
    l: value.l <= 1 ? value.l * 100 : value.l,
  }

  const normalised = {
    h: clip(0, 255)(round(percentage.h)),
    s: clipPercentage(round(percentage.s)),
    l: clipPercentage(round(percentage.l)),
  }

  console.log('normalised', normalised)
  return normalised
}

export const toHsl = value => {
  if (!value) {
    throw new Error('No value specified.')
  }

  if (isHsl(value)) {
    return normaliseHsl(value)
  }

  return stringToHsl(value)
}

const isHsl = value => {
  if (!value) {
    return false
  }

  if (!isObject(value)) {
    return false
  }

  if (
    value.hasOwnProperty('h') &&
    value.hasOwnProperty('s') &&
    value.hasOwnProperty('l')
  ) {
    return true
  }

  return false
}

// Only support HSL
export const color = obj => {
  if (!obj) {
    throw new Error('No value specified.')
  }

  if (!isHsl(obj)) {
    throw new Error('Value is not a valid HSL object.')
  }

  const value = normaliseHsl(obj)
  const chromaValue = chroma(value)

  return {
    value,
    css: (format = 'hsl') => {
      //   const chromaFormat = {
      //     h: value.h,
      //     s: value.s / 100,
      //     l: value.l / 100,
      //   }

      //console.log('chromaFormat', chromaFormat)
      return chromaValue.css(format)
    },
    toString: () => {},
  }
}

const stringToHsl = hex => {
  const ch = chroma(hex).hsl()
  return color({
    h: isNaN(ch[0]) ? 0 : ch[0],
    s: ch[1],
    l: ch[2],
  })
}

const colorsFromEdges = (start, end, number = 9) => {
  return chroma
    .scale([start.value, end.value])
    .colors(number)
    .map(hex => stringToHsl(hex))
}

const colorsFromEdgesAndCenter = (start, center, end) => {
  const firstHalf = colorsFromEdges(start, center, 5).slice(1, 4)
  const secondHalf = colorsFromEdges(center, end, 5).slice(1, 4)

  return [start]
    .concat(firstHalf)
    .concat([center])
    .concat(secondHalf)
    .concat([end])
}

// See https://blog.logrocket.com/how-to-manipulate-css-colors-with-javascript-fb547113a1b8/
const rotateHue = rotation => ({ value, ...rest }) => {
  const modulo = (x, n) => ((x % n) + n) % n
  const newHue = modulo(value.h + rotation, 360)
  return color({ h: newHue, s: value.s, l: value.l })
}

const validOptions = obj => {
  if (!obj) {
    throw new Error('No object specified.')
  }

  if (!obj.start && !obj.center && !obj.end) {
    throw new Error('You must specify start, center, or end.')
  }

  if (obj.name && !obj.center) {
    throw new Error('You must specify a center value when specifying name.')
  }

  // TODO: validate combinations
}

export const scale = obj => {
  validOptions(obj)

  const { name, start, center, end, rotation } = obj

  const toScale = (name, center, value) => {
    if (!name) {
      return value
    }

    return {
      [name]: center.css(),
      [`${name}:scale`]: value.map(c => c.css()),
    }
  }

  if (start && center && end) {
    return toScale(name, center, colorsFromEdgesAndCenter(start, center, end))
  }

  if (start && end) {
    const palette = colorsFromEdges(start, end)
    return toScale(name, palette[4], palette)
  }

  // Assume only center
  const ROTATION = rotation || 80
  return toScale(
    name,
    center,
    colorsFromEdgesAndCenter(
      rotateHue(ROTATION * -1)(center),
      center,
      rotateHue(ROTATION)(center)
    )
  )
}

export const black = () => color({ h: 0, s: 0, l: 0 })

export const white = () => color({ h: 0, s: 0, l: 100 })
