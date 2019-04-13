import { Service } from 'egg';
// egg-mongo的依赖
// tslint:disable-next-line: no-implicit-dependencies
// import { ObjectId } from 'mongodb';
// import ms = require('ms');

import { IResponseBody } from '../../typings';

/**
 * User Service
 */
export default class User extends Service {

  /**
   * login check
   * @param accountId => 账号
   * @param password => 密码
   */
  public async login(accountId: string, password: string): Promise<IResponseBody> {
    const { ctx } = this;
    const userInfo = await ctx.app.mongo.find('user', {
      query: {
        account: accountId,
      },
    });
    if (Array.isArray(userInfo) && userInfo.length === 0) {
      return {
        success: false,
        message: '用户名错误',
        data: {},
      };
    }

    if (userInfo[0] && userInfo[0].password === password) {
      return {
        success: true,
        message: '登录成功',
        data: {
          userInfo: userInfo[0],
        },
      };
    } else if (userInfo[0] && userInfo[0].password !== password) {
      return {
        success: false,
        message: '密码错误',
        data: {
        },
      };
    }

    return {
      success: false,
      message: '未知错误',
      data: {},
    };
  }

  /**
   * registered user
   * @param param => 见下面doc参数
   */
  public async info(param): Promise<IResponseBody> {

    const { ctx } = this;
    const doc: any = {
      comments: param.comments,
      list: param.list,
    };

    try {
      const result = await ctx.app.mongo.insertOne('order', {
        doc,
      });
      if (result.result.ok === 1) {
        return {
          success: true,
          message: `订餐成功`,
          data: {
            info: result.ops[0],
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `数据库插入错误: ${error}`,
        data: {},
      };
    }

    return {
      success: false,
      message: '未知错误',
      data: {},
    };
  }

  /**
   * 获取用户信息
   */
  public async getinfo() {
    const { ctx } = this;
    const userInfo = await ctx.app.mongo.find('order', {
    });
    return {
      success: true,
      message: 'ok',
      data: {
        ...userInfo,
      }
    };
  }
}
