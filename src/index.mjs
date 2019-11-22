import { Application } from './core/Application.mjs'
import { CommandComponent } from './components/CommandComponent.mjs'
import { NoteComponent } from './components/NoteComponent.mjs'
import { PageComponent } from './components/PageComponent.mjs'
import { Note } from './models/Note.mjs'

// Application.worker = './../sw.js'

Application.name = 'twere'

Application.router
  .add('/note', Note.POST)
  .add('/note/:id', Note.GET, Note.DELETE, Note.POST)

Application.models = [Note]

Application.components = [PageComponent, NoteComponent, CommandComponent]
