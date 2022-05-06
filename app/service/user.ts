import BaseService from './base';

interface InsertResult {
  [propname: string]: any;
  insertId?: number;
}

export default class User extends BaseService {

  public async getUserByName(username: string) {
    try {
      return this.app.mysql.select('user', { where: { username } });
    } catch (err) {
      return [];
    }
  }

  public async addUser(userInfo: object): Promise<InsertResult> {
    try {
      return this.app.mysql.insert('user', userInfo);
    } catch (err) {
      throw {};
    }
  }
}
