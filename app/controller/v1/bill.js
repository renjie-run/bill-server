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

  async delete() {
    const { ctx, app, service, config } = this;
    const { authorization } = ctx.request.header;
    const { id } = ctx.request.body;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        err_code: 1001,
        err_msg: 'missing params',
        data: null,
      };
      return;
    }
    const decode = app.jwt.verify(authorization, config.jwt.secret);
    const bill = await service.bill.getBillById({ bill_id: id, user_id: decode.id });
    if (!bill) {
      ctx.status = 400;
      ctx.body = {
        err_code: 3004,
        err_msg: 'bill not exist',
        data: null,
      };
      return;
    }
    const newBill = { ...bill, delete_time: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ') };
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
        delete_time: newBill.delete_time,
      },
    };
  }

  async statistic() {
    const { ctx, app, service, config } = this;
    const { date, type_id, page = 1, page_size = 5 } = ctx.query;
    if (!date || !page || !page_size) {
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
    const { id: user_id } = decode;
    const start_date = dayjs(date).startOf('month').format('YYYY-MM-DD');
    const end_date = dayjs(date).endOf('month').format('YYYY-MM-DD');
    const bills = await service.bill.list({
      user_id,
      start_date,
      end_date,
      type_id,
    });
    if (!bills) {
      ctx.status = 500;
      ctx.body = {
        err_code: 999,
        err_msg: 'unknown error',
        data: null,
      };
      return;
    }
    let total_expense = 0;
    let total_income = 0;
    bills.forEach(bill => {
      const { pay_type, amount } = bill;
      if (pay_type === 1) {
        total_expense += Number(amount);
      } else {
        total_income += Number(amount);
      }
    });
    let data_set = bills.reduce((curr, bill) => {
      const { create_time } = bill;
      const yearMonth = dayjs(create_time).format('YYYY-MM');
      const index = curr.findIndex(item => item.date === yearMonth);
      if (index > -1) {
        curr[index].bills.push(bill);
      } else {
        curr.push({
          date: yearMonth,
          bills: [ bill ],
        });
      }
      return curr;
    }, []);
    const total_page = Math.ceil(data_set.length / page_size);
    data_set = data_set.slice((page - 1) * page_size, page * page_size);
    ctx.status = 200;
    ctx.body = {
      err_code: 0,
      err_msg: null,
      data: {
        total_expense,
        total_income,
        total_page,
        date,
        user_id,
        type_id,
        page_size,
        data_set,
      },
    };
  }
}

module.exports = BillController;
