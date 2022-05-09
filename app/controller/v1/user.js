'use strict';

const BaseController = require('./base');
const dayjs = require('dayjs');

class UserController extends BaseController {

  async register() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = {
        err_code: 1002,
        err_msg: 'missing params',
        data: null,
      };
      return;
    }
    const isUserExist = await service.user.isUserExist(username);
    if (isUserExist) {
      ctx.status = 400;
      ctx.body = {
        err_code: 2000,
        err_msg: 'user already exist',
        data: null,
      };
      return;
    }
    const { affectedRows, insertId: id } = await service.user.addUser({ username, password }) || {};
    if (affectedRows !== 1) {
      ctx.status = 500;
      ctx.body = {
        err_code: 999,
        err_msg: 'unknown error',
        data: null,
      };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      err_code: 0,
      err_msg: null,
      data: {
        id,
        username,
      },
    };
  }

  async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = {
        err_code: 1002,
        err_msg: 'missing params',
        data: null,
      };
      return;
    }
    const user = await service.user.getUserByName(username);
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        err_code: 2001,
        err_msg: 'user not exist',
        data: null,
      };
      return;
    }
    if (user.password !== password) {
      ctx.status = 400;
      ctx.body = {
        err_code: 2002,
        err_msg: 'wrong username or password',
        data: null,
      };
      return;
    }
    const token = service.token.generateToken({ id: user.id, username });
    ctx.status = 200;
    ctx.body = {
      err_code: 0,
      err_msg: null,
      data: {
        token,
      },
    };
  }

  async authorToken() {
    const { ctx, app, service } = this;
    const { authorization } = ctx.request.header;
    const decode = app.jwt.verify(authorization, app.config.jwt.secret);
    const user = await service.user.getUserByName(decode.username);
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        err_code: 2001,
        err_msg: 'user not exist',
        data: null,
      };
      return;
    }
    const { id, username, signature, avatar } = user;
    ctx.status = 200;
    ctx.body = {
      err_code: 0,
      err_msg: null,
      data: {
        id,
        username,
        signature,
        avatar,
      },
    };
  }

  async modifyUserInfo() {
    const { ctx, app, service, config } = this;
    const authorization = ctx.request.header.authorization;
    const updates = ctx.request.body;
    if (updates.hasOwnProperty('password')) {
      return this.modifyPassword();
    }

    const decode = app.jwt.verify(authorization, config.jwt.secret);
    const user = await service.user.getUserByName(decode.username);
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        err_code: 2001,
        err_msg: 'user not exist',
        data: null,
      };
      return;
    }

    const supportUpdateKeys = {
      signature: true,
      avatar: true,
    };
    const validUpdates = {};
    Object.keys(updates).forEach(key => {
      if (supportUpdateKeys[key]) {
        validUpdates[key] = updates[key];
      }
    });
    if (!Object.keys(validUpdates).length) {
      ctx.status = 400;
      ctx.body = {
        err_code: 1001,
        err_msg: 'missing params',
        data: null,
      };
      return;
    }

    const newUser = {
      ...user,
      ...validUpdates,
      update_time: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    };

    const res = await service.user.modifyUser(newUser);
    if (!res || res.affectedRows !== 1) {
      ctx.status = 500;
      ctx.body = {
        err_code: 999,
        err_msg: 'unknown error',
        data: null,
      };
      return;
    }

    const { id, username, signature, avatar } = newUser;
    ctx.status = 200;
    ctx.body = {
      err_code: 0,
      err_msg: null,
      data: {
        id,
        username,
        signature,
        avatar,
      },
    };
  }

  async modifyPassword() {
    const { ctx, app, service, config } = this;
    const authorization = ctx.request.header.authorization;
    const { password } = ctx.request.body;
    const decode = app.jwt.verify(authorization, config.jwt.secret);
    const user = await service.user.getUserByName(decode.username);
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        err_code: 2001,
        err_msg: 'user not exist',
        data: null,
      };
      return;
    }
    if (!password) {
      ctx.status = 400;
      ctx.body = {
        err_code: 2003,
        err_msg: 'password cannot be empty',
        data: null,
      };
      return;
    }
    const newUser = {
      ...user,
      password,
      update_time: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    };
    const res = await service.user.modifyUser(newUser);
    if (!res || res.affectedRows !== 1) {
      ctx.status = 500;
      ctx.body = {
        err_code: 999,
        err_msg: 'unknown error',
        data: null,
      };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      err_code: 0,
      err_msg: null,
      data: null,
    };
  }
}

module.exports = UserController;
