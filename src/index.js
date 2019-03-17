/**
 *
 */
import Application from './core/Application';
import MainController from './controllers/MainController.mjs';
import Database from './core/Database';
import Note from './models/Note';

import '../css/main.css';

const db = new Database('twere');

Application.db = db;
Application.models = [
  Note,
];
Application.controllers = MainController;
Application.start();

if (module.hot) {
  module.hot.accept(() => {
  });
}
