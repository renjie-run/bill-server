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
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.mysql = mysql;
  config.jwt = jwt;

  return {
    ...config,
    ...userConfig,
  };
};
