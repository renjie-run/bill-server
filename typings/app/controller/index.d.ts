// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportV1Base = require('../../../app/controller/v1/base');
import ExportV1User = require('../../../app/controller/v1/user');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    v1: {
      base: ExportV1Base;
      user: ExportV1User;
    }
  }
}
