const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {

  await mysql('orderfood').update({ state: 1 }).where({
    id: ctx.query.id
  })

  ctx.state.code = 1
  ctx.state.data = 'ok'
}
