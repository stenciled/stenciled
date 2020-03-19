import React from 'react'
import { addons, types } from '@storybook/addons'
// import { Tool } from './Tool'
// export { withPulse } from './Decorator'

addons.register('stenciled-theme-ui', api => {
  addons.addPanel('stenciled-theme-ui/panel', {
    type: types.TOOL,
    title: 'Stenciled Theme UI',
    render: () => <p>tool</p>, // <Tool channel={addons.getChannel()} api={api} />,
    match: ({ viewMode }) => viewMode === 'story',
  })
})
