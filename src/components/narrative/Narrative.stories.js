import React from 'react'

import Narrative from './Narrative'

export default {
  component: Narrative,
  title: 'Design System|Narrative/Narrative',
  excludeStories: /.*Data$/
}

export const Default = () => {
  const values = [
    'Event number one',
    'Event number two'
  ]
  return (
    <Narrative values={values} />
  )
}
