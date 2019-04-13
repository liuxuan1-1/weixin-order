import { Controller } from 'egg';
// import ms = require('ms');
import { IResponseBody } from '../../typings';

export default class AccountController extends Controller {
  public async login() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.query;

    const result: IResponseBody = await ctx.service.user.login(param.account, param.password);

    ctx.body = result;
  }

  public async info() {
    const { ctx } = this;
    // ctx.request.query get请求
    const info = ctx.request.query;

    const result: IResponseBody = await ctx.service.user.info(info);

    ctx.body = result;
  }

  public async getinfo() {
    const { ctx } = this;
    // ctx.request.query get请求
    // const info = ctx.request.query;

    const result: IResponseBody = await ctx.service.user.getinfo();

    ctx.body = result;
  }

}
