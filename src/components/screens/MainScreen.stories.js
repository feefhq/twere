import React from 'react'

import MainScreen from './MainScreen'

export default {
  component: MainScreen,
  title: 'Design System|Screens/Main Screen',
  excludeStories: /.*Data$/
}

export const Default = () => {
  const values = [
    'Event number one',
    'Event number two'
  ]
  return (
    <MainScreen values={values} />
  )
}

export const NoContent = () => {
  return (
    <MainScreen />
  )
}
