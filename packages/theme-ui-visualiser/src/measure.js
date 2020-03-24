import React, { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'

const createDocumentDiv = () => {
  const container = document.createElement('div')

  container.style = {
    display: 'inline-block',
    position: 'absolute',
    visibility: 'hidden',
    zIndex: -1,
  }

  document.body.appendChild(container)
  return container
}

export const useMeasure = (element, layerId) => {
  let width = 0
  let height = 0

  useLayoutEffect(() => {
    const layerProvided = !!layerId

    const measureLayer = layerProvided
      ? document.getElementById(layerId)
      : createDocumentDiv()

    document.body.appendChild(measureLayer)

    const renderedElement = ReactDOM.createPortal(element, measureLayer)
    console.log(renderedElement, element)
    width = renderedElement.width
    height = renderedElement.height

    return () => {
      ReactDOM.unmountComponentAtNode(measureLayer)

      if (!layerProvided) {
        measureLayer.parentNode.removeChild(measureLayer)
      }
    }
  }, [])

  return { width, height }
}

export const measureElement = (element, layerId) => {
  //   const layerProvided = !!layerId

  //   const measureLayer = layerProvided
  //     ? document.getElementById(layerId)
  //     : createDocumentDiv()

  //  console.log(element, measureLayer)

  //   const renderedElement = ReactDOM.createPortal(element, measureLayer)
  //   console.log(renderedElement)

  //   const height = renderedElement.clientHeight
  //   const width = renderedElement.clientWidth

  //   ReactDOM.unmountComponentAtNode(measureLayer)

  //   if (!layerProvided) {
  //     measureLayer.parentNode.removeChild(measureLayer)
  //   }

  return { height, width }
}
