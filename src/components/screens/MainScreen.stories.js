import React from 'react'

import MainScreen from './MainScreen'

export default {
  component: MainScreen,
  title: 'Design System|Screens/Main Screen',
  excludeStories: /.*Data$/
}

export const narrativeData = [
  'A narrative or story is an account of a series of related events, experiences, or the like, whether true (episode, vignette, travelogue, memoir, autobiography, biography) or fictitious (fairy tale, fable, story, epic, legend, novel).[1][2][3][4] The word derives from the Latin verb narrare (to tell), which is derived from the adjective gnarus (knowing or skilled).[5][6] Along with argumentation, description, and exposition, narration, broadly defined, is one of four rhetorical modes of discourse. More narrowly defined, it is the fiction-writing mode in which the narrator communicates directly to the reader.',
  'Oral storytelling is the earliest method for sharing narratives. During most people\'s childhoods, narratives are used to guide them on proper behavior, cultural history, formation of a communal identity and values, as especially studied in anthropology today among traditional indigenous peoples.',
  'Narrative is found in all forms of human creativity, art, and entertainment, including speech, literature, theatre, music and song, comics, journalism, film, television and video, video games, radio, game-play, unstructured recreation and performance in general, as well as some painting, sculpture, drawing, photography and other visual arts, as long as a sequence of events is presented. Several art movements, such as modern art, refuse the narrative in favor of the abstract and conceptual.',
  'Narrative can be organized into a number of thematic or formal categories: non-fiction (such as definitively including creative non-fiction, biography, journalism, transcript poetry and historiography); fictionalization of historical events (such as anecdote, myth, legend and historical fiction) and fiction proper (such as literature in prose and sometimes poetry, such as short stories, novels and narrative poems and songs, and imaginary narratives as portrayed in other textual forms, games or live or recorded performances). Narratives may also be nested within other narratives, such as narratives told by an unreliable narrator (a character) typically found in the genre of noir fiction. An important part of narration is the narrative mode, the set of methods used to communicate the narrative through a process narration (see also "Aesthetics approach" below).'
]

export const Default = () => {
  return (
    <MainScreen values={narrativeData} />
  )
}

export const Reverse = () => {
  return (
    <MainScreen values={narrativeData} direction='column-reverse' />
  )
}

export const NoContent = () => {
  return (
    <MainScreen />
  )
}
