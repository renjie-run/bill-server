import BaseController from './base';

export default class User extends BaseController {

  public async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = {
        code: 10000,
        msg: 'invalid parameters',
        data: null,
      };
      return;
    }
    const oldUsers = await ctx.service.user.getUserByName(username);
    if (oldUsers.length > 0) {
      ctx.status = 400;
      ctx.body = {
        code: 10001,
        msg: 'user already exist',
        data: null,
      };
      return;
    }

    const insertUser = await ctx.service.user.addUser({ username, password });
    const { insertId: id } = insertUser;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        code: 10002,
        msg: 'internal error',
        data: null,
      };
      return;
    }
    ctx.body = {
      code: 10003,
      msg: null,
      data: {
        id,
        username,
      },
    };
  }
}
