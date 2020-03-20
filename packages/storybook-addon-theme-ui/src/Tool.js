/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { IconButton } from '@storybook/components'

const ThemeUIIcon = ({ ...props }) => (
  <svg {...props} viewBox="0 0 1024 1024">
    <polyline
      points="96 760 224 760 352 248 480 1016 608 568 672 760 800 760"
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '64px',
      }}
    />
    <circle
      cx="864"
      cy="760"
      r="64"
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '64px',
      }}
    />
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
