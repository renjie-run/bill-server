'use strict';

const BaseService = require('./base');

const TABLE_NAME = 'user';

class UserService extends BaseService {

  async isUserExist(username) {
    const user = await this.getUserByName(username);
    return !!(user && user.id);
  }

  async getUserByName(username) {
    try {
      return this.app.mysql.get(TABLE_NAME, { username });
    } catch (err) {
      return null;
    }
  }

  async addUser(userInfo) {
    try {
      return this.app.mysql.insert(TABLE_NAME, userInfo);
    } catch (err) {
      return null;
    }
  }

  async modifyUser(newUser) {
    try {
      return this.app.mysql.update(TABLE_NAME, newUser);
    } catch (err) {
      return null;
    }
  }
}

module.exports = UserService;
