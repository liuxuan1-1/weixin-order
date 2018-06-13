const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
  const password = await mysql('shopAdmin').select('*').where({
    account: ctx.query.account
  })

  if (password[0].password == ctx.query.password) {
    ctx.state.code = 1
    ctx.state.data = 'ok'
  } else {
    ctx.state.code = 0
    ctx.state.data = 'no password'
  }
}
