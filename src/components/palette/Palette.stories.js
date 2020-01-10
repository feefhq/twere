import React from 'react'

import Palette from './Palette'

export default {
  component: Palette,
  title: 'Design System|Palette/Palette',
  excludeStories: /.*Data$/
}

export const Default = () => {
  return <Palette />
}
