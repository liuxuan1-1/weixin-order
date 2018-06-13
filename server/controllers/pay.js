const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const obj = {
      userid: ctx.query.userid,
      username: ctx.query.username,
      info: ctx.query.info,
    }
    await mysql("orderfood").insert(obj)

    ctx.state.code = 1
    ctx.state.data = 'ok'
}
