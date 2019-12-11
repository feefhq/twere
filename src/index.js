import { Application } from './core/Application.js'
import { CommandComponent } from './components/CommandComponent.js'
import { NoteComponent } from './components/NoteComponent.js'
import { NoteListComponent } from './components/NoteListComponent.js'
import { PageComponent } from './components/PageComponent.js'
import { Note } from './models/Note.js'
import { HeaderComponent } from './components/HeaderComponent.js'

// Application.worker = './../sw.js'

Application.setLabel('twere')

Application.router
  .add('/note', Note.POST)
  .add('/note/:id', Note.GET, Note.DELETE, Note.POST)

Application.setModels([Note])

Application.setComponents([
  HeaderComponent,
  PageComponent,
  NoteComponent,
  NoteListComponent,
  CommandComponent
])
