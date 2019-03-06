import Controller from './controller.mjs';
import Application from './application.mjs';
import Database from './database.mjs';
import Note from './models/note.mjs';

import './../css/main.css';

const db = new Database('twere');
const app = new Application(db);

app.models = [
  Note
]

if (module.hot) {
  module.hot.accept(function() {
    console.log('Ouch! Something went wrong with HMR.');
  })
}
