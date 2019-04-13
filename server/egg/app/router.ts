import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/accounts/login', controller.account.login);
  router.get('/api/accounts/info', controller.account.info);
  router.get('/api/accounts/getinfo', controller.account.getinfo);

};
