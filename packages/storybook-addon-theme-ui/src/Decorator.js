import React from 'react'
import { addons, makeDecorator } from '@storybook/addons'
import { StenciledContext } from '@stenciled/part'

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
    <StenciledContext.Provider value={{ enabled }}>
      {currentStory}
    </StenciledContext.Provider>
  )
}

export const withThemeUI = makeDecorator({
  name: 'withThemeUI',
  parameterName: 'stenciled-theme-ui',
  wrapper: (getStory, context, { options }) => {
    return <Decorator story={getStory(context)} options={options} />
  },
})
