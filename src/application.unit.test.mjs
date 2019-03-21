/**
 * These are some early unit tests, which can be run directly in the browser,
 * either headful or headless. There are currently no test runner dependencies,
 * the tests will simply return true or false depending on the outcome of each
 * function. This will eventually become much more standardised and elegant.
 */
import Application from './application.mjs'

export function testApplicationType () {
  const app = new Application()
  return app.constructor.name === 'Application'
}

export function testApplicationSetGetModels (t) {
  const app = new Application()
  const models = ['model1', 'model2']
  app.models = models
  return app.models.every(e => models.includes(e))
}
