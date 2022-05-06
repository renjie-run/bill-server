// import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/user.test.ts', () => {
  it('should POST /api/user', async () => {
    await app.httpRequest().post('/api/user').expect(400);
  });
});
