import { ServiceWorker } from './core/ServiceWorker.js'
import { Application } from './core/Application.js'
import { CommandComponent } from './components/CommandComponent.js'
import { NoteComponent } from './components/NoteComponent.js'
import { PageComponent } from './components/PageComponent.js'
import { Note } from './models/Note.js'
import { Sync } from './core/Sync.js'

Application.worker = ServiceWorker

Application.name = 'twere'

Application.router
  .add('/note', Note.POST)
  .add('/note/:id', Note.GET, Note.DELETE, Note.POST)

Application.components = [
  PageComponent,
  NoteComponent,
  CommandComponent
]

Application.models = [
  Note
]

Sync.init()
