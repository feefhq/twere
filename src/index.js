import { Application } from './core/Application.js'
import { CommandComponent } from './components/CommandComponent.js'
import { NoteComponent } from './components/NoteComponent.js'
import { PageComponent } from './components/PageComponent.js'
import { Note } from './models/Note.js'

Application.worker = './../sw.js'

Application.name = 'twere'

Application.router
  .add('/note', Note.POST)
  .add('/note/:id', Note.GET, Note.DELETE, Note.POST)

Application.models = [
  Note
]

Application.components = [
  PageComponent,
  NoteComponent,
  CommandComponent
]
