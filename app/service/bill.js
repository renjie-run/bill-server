'use strict';

const BaseService = require('./base');

const TABLE_NAME = 'bill';

class BillService extends BaseService {

  async addBill(newBill) {
    try {
      return await this.app.mysql.insert(TABLE_NAME, newBill);
    } catch (err) {
      return null;
    }
  }
}

module.exports = BillService;
