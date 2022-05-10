// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportV1Base = require('../../../app/controller/v1/base');
import ExportV1Upload = require('../../../app/controller/v1/upload');
import ExportV1User = require('../../../app/controller/v1/user');

declare module 'egg' {
  interface IController {
    v1: {
      base: ExportV1Base;
      upload: ExportV1Upload;
      user: ExportV1User;
    }
  }
}
