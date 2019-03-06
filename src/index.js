import Controller from './controller';
import Application from './application';
import Database from './database';
import Note from './models/Note';

import '../css/main.css';

const db = new Database('twere');

Application.db = db;
Application.models = [
  Note,
];
Application.controllers = Controller;
Application.start();

if (module.hot) {
  module.hot.accept(() => {
  });
}
