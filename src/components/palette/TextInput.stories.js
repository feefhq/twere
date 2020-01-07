import React from 'react'

import TextInput from './TextInput'

export default {
  component: TextInput,
  title: 'TextInput',
  excludeStories: /.*Data$/
}

export const Default = () => {
  return <TextInput />
}
