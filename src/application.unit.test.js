import Application from './application';

export function testApplicationType(t) {
  const app = new Application();
  t.assert(app.constructor.name === 'Application', 'Application should be of right type');
}

export function testApplicationSetGetModels(t) {
  const app = new Application();
  const models = ['model1', 'model2'];
  app.models = models;
  t.assert(app.models.every(e => models.includes(e)), 'Models should have set and get');
}
