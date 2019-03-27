import { Application } from './core/Application.mjs'
import { CommandComponent } from './components/CommandComponent.mjs'
import { NoteComponent } from './components/NoteComponent.mjs'
import { PageComponent } from './components/PageComponent.mjs'
import { Note } from './models/Note.mjs'
import { GET } from './core/mixins/Actions.mjs'

Application.appName = 'twere'

Application.components = [
  PageComponent,
  NoteComponent,
  CommandComponent
]

Application.models = [
  Note
]

Application.router
  .add('/note/:id', Note.GET, Note.DELETE)
  .add('/note/:id/delete', Note.DELETE)
