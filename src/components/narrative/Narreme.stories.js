import React from 'react'

import Narreme from './Narreme'

export default {
  component: Narreme,
  title: 'Narreme',
  excludeStories: /.*Data$/
}

export const Default = () => {
  return <Narreme />
}
