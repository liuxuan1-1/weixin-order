const { mysql } = require('../qcloud')

// mysql('food').select('*').where({ id: 1 }) // => { id:1, name: 'leo', age: 20 }

async function getfood (ctx, next) {
    const foodtype = await mysql('foodType').select('*')
    const food = await mysql('food').select('*')
    const result = foodtype.map(e => {
        const obj = {}
        obj.typeid = e.typeid
        obj.typeName = e.typename
        obj.food = []

        const foodids = e.childfoodid.split(',')
        foodids.forEach(e => {
            for (let i = 0; i < food.length; i++) {
                if (e == food[i].foodid) {
                    obj.food.push(food[i])
                    break
                }
            }
        })
        return obj
    })
    ctx.state.code = 1
    ctx.state.data = result
}

async function getChoseFood (ctx, next) {
    const result = await mysql('orderfood').select('*').where({ state: 0 })

    ctx.state.code = 1
    ctx.state.data = result
}

module.exports = {
    getfood,
    getChoseFood
}
