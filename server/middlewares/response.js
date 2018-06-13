const debug = require('debug')('koa-weapp-demo')
const path = require('path')
const mime = require('mime')
const fs = require('mz/fs')

/**
 * 响应处理模块
 */
module.exports = async function (ctx, next) {
    try {
        // 调用下一个 middleware
        await next()

        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        let rpath = ctx.request.path
        const forehead = '/weapp/build/'
        // console.log(rpath);
        // 判断是否以指定的url开头
        if (rpath.startsWith('/weapp/build/')) {
          // 获取文件完整路径
            let fp = path.resolve(__dirname, '../build/', rpath.substring(forehead.length))
          // 判断文件是否存在
            if (await fs.exists(fp)) {
            // 查找文件的mime;
                ctx.response.type = mime.getType(rpath)
            // 读取文件内容并赋值给response.body
                ctx.response.body = await fs.readFile(fp)
            } else {
            // 文件不存在
                ctx.response.status = 404
            }
        } else {
            ctx.body = ctx.body ? ctx.body : {
                code: ctx.state.code !== undefined ? ctx.state.code : 0,
                data: ctx.state.data !== undefined ? ctx.state.data : {}
            }
        }
    } catch (e) {
        // catch 住全局的错误信息
        debug('Catch Error: %o', e)

        // 设置状态码为 200 - 服务端错误
        ctx.status = 200

        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            error: e && e.message ? e.message : e.toString()
        }
    }
}
