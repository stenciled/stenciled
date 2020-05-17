import { processStencil } from './process'

describe('processStencil', () => {
  it('should throw on undefined definition', () => {
    expect(() => processStencil()).toThrow('No definition provided.')
  })

  it('should throw on null definition', () => {
    expect(() => processStencil(null)).toThrow('No definition provided.')
  })

  it('should throw on non object definition', () => {
    expect(() => processStencil([])).toThrow(
      'The definition must be an object.'
    )
  })

  it('should throw on non object stencil', () => {
    expect(() => processStencil({}, [])).toThrow(
      'The stencil must be an object.'
    )
  })

  it('should return definition for undefined stencil', () => {
    expect(processStencil({})).toEqual({})
  })

  it('should return definition for null stencil', () => {
    expect(processStencil({}, null)).toEqual({})
  })

  it('should return expected definition for non nested stencil', () => {
    const originalComponent = () => <p>header</p>
    const component = () => <p>new header</p>

    expect(
      processStencil(
        {
          header: {
            component: originalComponent,
          },
        },
        {
          header: {
            component,
          },
        }
      )
    ).toMatchObject({
      header: {
        component,
        originalComponent,
        props: undefined,
      },
    })
  })

  it('should return expected definition for nested stencil', () => {
    const originalComponent = ({ stencil }) => <p>{stencil.title()}</p>

    const originalTitle = () => <p>title</p>
    const newTitle = () => <p>new title</p>

    expect(
      processStencil(
        {
          header: {
            component: originalComponent,
            parts: {
              title: {
                component: originalTitle,
              },
            },
          },
        },
        {
          header: {
            title: {
              component: newTitle,
            },
          },
        }
      )
    ).toMatchObject({
      header: {
        component: originalComponent,
        originalComponent,
        parts: {
          title: {
            component: newTitle,
            originalComponent: originalTitle,
            props: undefined,
          },
        },
        props: undefined,
      },
    })
  })
})
