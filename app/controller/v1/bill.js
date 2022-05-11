'use strict';

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
}

module.exports = BillController;
