/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { IconButton } from '@storybook/components'

const ThemeUIIcon = ({ ...props }) => (
  <svg {...props} viewBox="0 0 54 54">
    <g transform="matrix(1.25,0,0,-1.25,0,47.5)">
      <g transform="translate(3,28)">
        <path
          d="m 0,0 c 0,2.209 1.791,4 4,4 l 28,0 c 2.209,0 4,-1.791 4,-4 l 0,-28 c 0,-2.209 -1.791,-4 -4,-4 l -28,0 c -2.209,0 -4,1.791 -4,4 L 0,0 z"
          style={{
            fill: '#ffffff',
            fillOpacity: 1,
            fillRule: 'nonzero',
            stroke: '#000000',
            strokeWidth: 0.72000003,
            strokeLinecap: 'round',
            strokeMiterlimit: 4,
            strokeOpacity: 1,
            strokeDasharray: '2.88, 5.76',
            strokeDashoffset: 0,
            markerStart: 'none',
          }}
        />
      </g>
    </g>
  </svg>
)

export const Tool = ({ channel }) => {
  const [enabled, setEnabled] = useState(false)

  const setAndEmitEnabled = enabled => {
    setEnabled(enabled)
    channel.emit('stenciled-theme-ui/change-enabled', enabled)
  }

  return (
    <IconButton
      key="stenciled-theme-ui"
      title={enabled ? 'Theme UI - Disable' : 'Theme UI - Enable'}
      onClick={() => setAndEmitEnabled(enabled ? false : true)}
      active={enabled}
    >
      <ThemeUIIcon
        css={{
          stroke: 'currentColor',
        }}
      />
    </IconButton>
  )
}

Tool.defaultProps = {
  api: null,
  channel: null,
}
