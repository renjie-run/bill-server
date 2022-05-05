import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
let configMysqlCustom;
try {
  configMysqlCustom = require('./config.mysql.custom');
} catch (err) {
  configMysqlCustom = null;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1651735334346_6791';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  /**
   * client: {
   *  host,
   *  port',
   *  user,
   *  password,
   *  database,
   * },
   * app: true, // 是否加载到 app 上，默认开启
   * agent: false, // 是否加载到 agent 上，默认关闭
   */
  if (configMysqlCustom) {
    config.mysql = configMysqlCustom;
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
