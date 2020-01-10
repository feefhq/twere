import React from 'react'

import Narreme from './Narreme'

const description = `
Narreme is the basic unit of narrative structure. According to Helmut Bonheim (2000), the concept of narreme was developed three decades earlier by Eugene Dorfman and expanded by Henri Wittmann, The narreme is to narratology what the sememe is to semantics, the morpheme is to morphology and the phoneme to phonology. The narreme, however, has yet to be persuasively defined in practice. In interpretative narratology constrained in a framework of Principles and parameters, narration is the projection of a narreme N0, the abstract head of a narrative macrostructure where Nn dominates immediately Nn-1 (Wittmann 1995).
`

export default {
  component: Narreme,
  title: 'Design System|Narrative/Narreme',
  excludeStories: /.*Data$/
}

export const Default = () => {
  return <Narreme value={description} />
}

export const Short = () => {
  return <Narreme value='Narreme is the basic unit of narrative structure.' />
}

export const BasicMarkdown = () => {
  return <Narreme value='**I am bold.** _I am italic._ I am not' />
}
