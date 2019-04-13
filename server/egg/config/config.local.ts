import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = {
    domainWhiteList: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://motion.ant.design',
    ],
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    credentials: true,
  };
  return config;
};
