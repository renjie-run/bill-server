'use strict';

module.exports = secret => {
  return async function jwtErr(ctx, next) {
    const { request, app } = ctx;
    const { authorization } = request.header;
    if (!authorization) {
      ctx.status = 401;
      ctx.body = {
        err_code: 1002,
        err_msg: 'unauthorized',
        data: null,
      };
      return;
    }
    try {
      app.jwt.verify(authorization, secret);
      await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        err_code: 1003,
        err_msg: 'invalid or expired token',
        data: null,
      };
    }
  };
};
