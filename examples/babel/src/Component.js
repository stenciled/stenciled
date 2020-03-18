/** @jsx jsx */
import React from 'react'
import { Box } from 'theme-ui'
import { stenciled as jsx } from '@stenciled/theme-ui-visualiser'

export const Component = () => (
  <React.Fragment>
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
      <Box as="nav" sx={{ variant: 'one' }}>
        One
      </Box>
      <Box sx={{ variant: 'two' }}>Two</Box>
    </Box>
  </React.Fragment>
)
