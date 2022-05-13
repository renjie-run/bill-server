'use strict';

const dayjs = require('dayjs');
const BaseController = require('./base');

class BillController extends BaseController {

  async addBill() {
    const { ctx, app, service, config } = this;
    const { authorization } = ctx.request.header;
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
    const { pay_type, amount, date, type_id, type_name, remark = '' } = ctx.request.body;
    if (!pay_type || !amount || !date || !type_id || !type_name) {
      ctx.status = 400;
      ctx.body = {
        err_code: 1001,
        err_msg: 'missing params',
        data: null,
      };
      return;
    }

    const newBill = {
      pay_type,
      amount,
      date,
      type_id,
      type_name,
      remark,
      user_id: decode.id,
    };

    const { affectedRows, insertId: id } = await service.bill.addBill(newBill);
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
        ...newBill,
        id,
      },
    };
  }

  async getBillById() {
    const { ctx, app, service, config } = this;
    const { authorization } = ctx.request.header;
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
    const { id: billId } = ctx.params;
    if (!billId) {
      ctx.status = 400;
      ctx.body = {
        err_code: 1001,
        err_msg: 'missing params',
        data: null,
      };
      return;
    }

    const bill = await service.bill.getBillById({ bill_id: billId, user_id: decode.id });
    if (!bill) {
      ctx.status = 400;
      ctx.body = {
        err_code: 3004,
        err_msg: 'bill not exist',
        data: null,
      };
      return;
    }
    const { id, pay_type, amount, date, type_id, type_name, user_id, remark, create_time } = bill;
    ctx.status = 300;
    ctx.body = {
      err_code: 0,
      err_msg: null,
      data: {
        id,
        pay_type,
        amount,
        date,
        type_id,
        type_name,
        user_id,
        remark,
        create_time,
      },
    };
  }

  async update() {
    const { ctx, app, service, config } = this;

    const updates = ctx.request.body;
    const AVAILABLE_UPDATE_ATTRS = [ 'amount', 'type_id', 'type_name', 'date', 'pay_type', 'remark' ];
    const availableUpdates = {};
    Object.keys(updates).forEach(attr => {
      const update = updates[attr];
      if (AVAILABLE_UPDATE_ATTRS.includes(attr) && update) {
        availableUpdates[attr] = updates[attr];
      }
    });
    if (!updates.id || Object.keys(availableUpdates).length === 0) {
      ctx.status = 400;
      ctx.body = {
        err_code: 1001,
        err_msg: 'missing params',
        data: null,
      };
      return;
    }
    const { authorization } = ctx.request.header;
    const decode = app.jwt.verify(authorization, config.jwt.secret);
    const bill = await service.bill.getBillById({ bill_id: updates.id, user_id: decode.id });
    if (!bill) {
      ctx.status = 400;
      ctx.body = {
        err_code: 3004,
        err_msg: 'bill not exist',
        data: null,
      };
      return;
    }
    const newBill = { ...bill, ...availableUpdates, update_time: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ') };
    const res = await service.bill.update(newBill);
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
      data: {
        id: newBill.id,
        pay_type: newBill.pay_type,
        amount: newBill.amount,
        date: newBill.date,
        type_id: newBill.type_id,
        type_name: newBill.type_name,
        user_id: newBill.user_id,
        remark: newBill.remark,
        create_time: newBill.create_time,
        update_time: newBill.update_time,
      },
    };
  }
}

module.exports = BillController;
