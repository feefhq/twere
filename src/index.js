import { Application } from './core/Application.js'
import { CommandComponent } from './components/Command.component.js'
import { NoteComponent } from './components/Note.component.js'
import { NoteListComponent } from './components/NoteList.component.js'
import { PageComponent } from './components/Page.component.js'
import { Note } from './models/Note.js'
import { HeaderComponent } from './components/Header.component.js'

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
