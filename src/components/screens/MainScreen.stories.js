import React from 'react'

import MainScreen from './MainScreen'

export default {
  component: MainScreen,
  title: 'Design System|Screens/Main Screen',
  excludeStories: /.*Data$/
}

export const narrativeData = [
  'Event number one',
  'Event number two'
]

export const Default = () => {
  return (
    <MainScreen values={narrativeData} />
  )
}

export const NoContent = () => {
  return (
    <MainScreen />
  )
}
