// import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/user.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('get user by username.', async () => {
    await ctx.service.user.getUserByName('Jerry');
    // assert(result === []);
  });

  it('add user.', async () => {
    await ctx.service.user.addUser({ username: 'Jerry', password: '123456' });
    // assert(result === {});
  });
});
