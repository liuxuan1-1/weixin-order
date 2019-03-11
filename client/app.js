//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

wx.cloud.init()
App({
    onLaunch: function () {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'login',
        // 传给云函数的参数
        data: {
          a: 1,
          b: 2,
        },
        success(res) {
          console.log(res) // 3
        },
        fail: console.error
      })
    }
})