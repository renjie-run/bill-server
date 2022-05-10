/* eslint valid-jsdoc: "off" */

'use strict';

let mysql;
let jwt;
try {
  mysql = require('./config.custom.mysql');
} catch (err) {
  mysql = {};
}

try {
  jwt = require('./config.custom.jwt');
} catch (err) {
  jwt = {};
}

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1651881779135_715';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    uploadDir: 'app/public/upload',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
  };

  config.mysql = mysql;
  config.jwt = jwt;
  config.multipart = {
    mode: 'file', // file | stream
  };

  return {
    ...config,
    ...userConfig,
  };
};
