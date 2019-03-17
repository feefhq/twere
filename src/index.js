import Application from './core/Application';
import Controller from './core/Controller';
import Database from './core/Database';
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
