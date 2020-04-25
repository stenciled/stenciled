import React from 'react'
import { addDecorator } from '@storybook/react'
import { ThemeprintContext } from '@themeprint/part'

addDecorator(storyFn => (
  <ThemeprintContext.Provider value={{ enabled: true }}>
    {storyFn()}
  </ThemeprintContext.Provider>
))
