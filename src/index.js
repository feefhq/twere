/**
 * This is the main entry point fo the application.
 */
import Application from './core/Application.mjs'
import Database from './core/Database.mjs'
import CommandController from './controllers/CommandController.mjs'
import MainController from './controllers/MainController.mjs'
import Note from './models/Note.mjs'

// Instantiate the DB
const db = new Database('twere')

// Add the DB to the app
Application.db = db

// Add models to the app and they'll magically come to life
Application.models = [
  Note
]

// Add controllers to the app
Application.controllers = [
  CommandController,
  MainController
]

// This is temporary, so that we can do some proof of concept.
// Eventually this will be repalced by a clever router.
Application.start()
