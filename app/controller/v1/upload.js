'use strict';

const BaseController = require('./base');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const dayjs = require('dayjs');
const sendToWormhole = require('stream-wormhole');

class UploadController extends BaseController {

  async upload() {
    const { ctx, config } = this;
    const dir = path.join(config.uploadDir, dayjs().format('YYYYMMDD'));
    await mkdirp(dir);

    let filepath;
    if (config.multipart.mode === 'stream') {
      filepath = await this.uploadWithStream(dir);
    } else {
      filepath = await this.uploadWithFile(dir); // file mode
    }
    if (!filepath) {
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
      data: filepath.replace(/app/g, ''),
    };
  }

  async uploadWithStream(dir) {
    const { ctx } = this;
    const rs = await ctx.getFileStream();
    const filepath = path.join(dir, path.basename(rs.filename));

    const ws = fs.createWriteStream(filepath);
    try {
      await rs.pipe(ws);
      return filepath;
    } catch (err) {
      await sendToWormhole(rs);
      return null;
    }
  }

  async uploadWithFile(dir) {
    const { ctx } = this;
    const file = ctx.request.files[0];
    let filepath;
    try {
      const fileContent = await fs.readFileSync(file.filepath);
      filepath = path.join(dir, file.filename);
      await fs.writeFileSync(filepath, fileContent);
    } catch (err) {
      filepath = null;
    }
    ctx.cleanupRequestFiles();
    return filepath;
  }

}

module.exports = UploadController;
