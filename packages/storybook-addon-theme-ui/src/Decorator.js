import React from 'react'
import { addons, makeDecorator } from '@storybook/addons'
import { WrapperContext } from '@stenciled/theme-ui-visualiser'

const Decorator = ({ story, options }) => {
  const [enabled, setEnabled] = React.useState(false)
  const [currentStory] = React.useState(story)
  const [channel] = React.useState(addons.getChannel())

  React.useEffect(() => {
    const handleEnabledChange = enabled => {
      setEnabled(enabled)
    }

    channel.on('stenciled-theme-ui/change-enabled', handleEnabledChange)

    return () => {
      channel.removeListener(
        'stenciled-theme-ui/change-enabled',
        handleEnabledChange
      )
    }
  }, [])

  return (
    <WrapperContext.Provider value={{ enabled }}>
      {currentStory}
    </WrapperContext.Provider>
  )
}

export const withThemeUI = makeDecorator({
  name: 'withThemeUI',
  parameterName: 'stenciled-theme-ui',
  wrapper: (getStory, context, { options }) => {
    return <Decorator story={getStory(context)} options={options} />
  },
})
