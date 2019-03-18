/**
 * This is the main entry point fo the application.
 */
import Application from './core/Application';
import Database from './core/Database';
import CommandController from './controllers/CommandController';
import MainController from './controllers/MainController';
import Note from './models/Note';

// This is dumb, and only works with webpack. Needs sorting asap.
import '../css/main.css';

// Instantiate the DB
const db = new Database('twere');

// Add the DB to the app
Application.db = db;

// Add models to the app and they'll magically come to life
Application.models = [
  Note,
];

// Add controllers to the app
Application.controllers = [
  CommandController,
  MainController,
];

// This is temporary, so that we can do some proof of concept.
// Eventually this will be repalced by a clever router.
Application.start();

// This is only here for hot loading, and needs to be implemented a little
// more cleanly.
if (module.hot) {
  module.hot.accept(() => {
  });
}
