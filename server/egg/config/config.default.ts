import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security

  config.keys = appInfo.name + '_1547354118233_3870';

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  const mongoConfig = {
    client: {
      host: '127.0.0.1',
      port: '27017',
      name: 'gkd',
      user: 'root',
      password: 'root',
    },
  };

  const session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: false,
    encrypt: true,
  };

  const staticObj = {
    gzip: true,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    mongo: mongoConfig,
    session,
    static: staticObj,
  };
};
