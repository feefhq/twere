import React from 'react'

import TextInput from './TextInput'

export default {
  component: TextInput,
  title: 'Design System|Palette/TextInput',
  excludeStories: /.*Data$/
}

export const Default = () => {
  return <TextInput />
}

export const Prepopulated = () => {
  return <TextInput value='Some default text content.' />
}

export const PrepopulatedMultiline = () => {
  return <TextInput value='Some default text content. This is designed to overflow so that the input can handle multiple lines of content.' />
}

export const Disabled = () => {
  return <TextInput value='This text should not be editable.' disabled />
}

export const DisabledMultiline = () => {
  return <TextInput value='This text should not be editable. And should resize when it overflows due to blah de blah de blah. Resizing should happen regardless of state.' disabled />
}
