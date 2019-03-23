import { Application } from './core/Application.mjs'
import { CommandComponent } from './components/CommandComponent.mjs'
import { NoteComponent } from './components/NoteComponent.mjs'
import { PageComponent } from './components/PageComponent.mjs'
import { Note } from './models/Note.mjs'

Application.appName = 'twere'
Application.init()

Application.components = [
  PageComponent,
  NoteComponent,
  CommandComponent
]

Application.models = [
  Note
]
