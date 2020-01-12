import React from 'react'

import Narrative from './Narrative'

export default {
  component: Narrative,
  title: 'Design System|Narrative/Narrative',
  excludeStories: /.*Data$/
}

export const narrativeData = [
  'Event number one',
  'Event number two'
]

export const Default = () => {
  return (
    <Narrative values={narrativeData} />
  )
}
