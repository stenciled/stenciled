import React from 'react'
import { addons, types } from '@storybook/addons'
import { Tool } from './Tool'
export { withThemeUI } from './Decorator'

addons.register('stenciled-theme-ui', api => {
  addons.addPanel('stenciled-theme-ui/panel', {
    type: types.TOOL,
    title: 'Stenciled Theme UI',
    render: () => <Tool channel={addons.getChannel()} api={api} />,
    match: ({ viewMode }) => viewMode === 'story',
  })
})
