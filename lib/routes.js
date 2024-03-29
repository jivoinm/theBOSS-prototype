'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    forms = require('./controllers/forms'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/menus', api.menus);
  app.get('/api/messages', api.messages);
  app.get('/api/tasks', api.tasks);
  app.get('/api/alerts', api.alerts);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/form',forms.saveForm);
  app.post('/api/form/field',forms.saveField);
  app.post('/api/submitform',forms.submit);
  app.get('/api/form/:form_name',forms.load);
  app.get('/api/form',forms.loadAll);
  app.get('/api/formvalues/:number_of_records/:form_name',forms.latest);
  app.get('/api/form/:id/:form_name',forms.editFormById);
  app.post('/api/formvalues/',forms.formValueQuery);
  app.del('/api/formValue/:id',forms.deleteFormValue);


  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};