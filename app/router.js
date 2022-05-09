'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, config } = app;
  const _jwt = middleware.jwtErr(config.jwt.secret);
  router.post('/api/v1/user', controller.v1.user.register);
  router.post('/api/v1/login', controller.v1.user.login);
  router.get('/api/v1/auth-token', _jwt, controller.v1.user.authorToken);
  router.put('/api/v1/user', _jwt, controller.v1.user.modifyUserInfo);
};
