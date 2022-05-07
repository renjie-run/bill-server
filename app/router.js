'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/user', controller.v1.user.register);
  router.post('/api/v1/login', controller.v1.user.login);
};
