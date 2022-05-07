'use strict';

const BaseService = require('./base');

class TokenService extends BaseService {

  /**
   * 生成 token 加盐
   * @param {object} userInfo
   * exp: token 有效期，为 24 小时
   */
  generateToken({ id, username }) {
    const { app } = this;
    return app.jwt.sign({
      id,
      username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, app.config.jwt.secret);
  }
}

module.exports = TokenService;
