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

  async getBillById({ bill_id, user_id }) {
    try {
      return this.app.mysql.get(TABLE_NAME, { id: bill_id, user_id });
    } catch (err) {
      return null;
    }
  }

  async update(newBill) {
    try {
      return this.app.mysql.update(TABLE_NAME, newBill);
    } catch (err) {
      return null;
    }
  }

  async list({ user_id, type_id, start_date, end_date }) {
    try {
      let sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE user_id = ${user_id} AND create_time >= '${start_date}' AND create_time <= '${end_date}'`;
      if (type_id) {
        sql += ` type_id = ${type_id}`;
      }
      sql += ' ORDER BY `create_time` DESC';
      return this.app.mysql.query(sql);
    } catch (err) {
      return null;
    }
  }
}

module.exports = BillService;
