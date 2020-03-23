import React from 'react'
import { addDecorator } from '@storybook/react'
import { WrapperContext } from '../src/context'

addDecorator(storyFn => (
  <WrapperContext.Provider value={{ enabled: true }}>
    {storyFn()}
  </WrapperContext.Provider>
))
