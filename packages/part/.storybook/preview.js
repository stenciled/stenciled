import React from 'react'
import { addDecorator } from '@storybook/react'
import { StenciledContext } from '../src/context'

addDecorator(storyFn => (
  <StenciledContext.Provider value={{ enabled: true }}>
    {storyFn()}
  </StenciledContext.Provider>
))
