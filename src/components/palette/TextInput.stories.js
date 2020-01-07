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

export const Prepopulated = () => {
  return <TextInput text='Some default text content.' />
}

export const PrepopulatedMultiline = () => {
  return <TextInput text='Some default text content. This is designed to overflow so that the input can handle multiple lines of content.' />
}

export const Disabled = () => {
  return <TextInput text='This text should not be editable.' disabled />
}
