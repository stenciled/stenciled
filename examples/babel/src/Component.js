/** @jsx jsx */
import React from 'react'
import { jsx, Box } from 'theme-ui'

export const Component = () => (
  <React.Fragment>
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
      <Box as="nav" sx={{ color: '#f00', variant: 'one' }}>
        One
      </Box>
      <Box sx={{ variant: 'two' }}>Two</Box>
    </Box>
  </React.Fragment>
)
