// pages/success/success.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  returnClick:function(){
    wx.switchTab({
      url: '../home/home'
    })
  },

  // 下单支付
  doPay:function(){
    // wx.requestPayment({
    //    "timeStamp": "",
    //    "nonceStr": "",
    //    "package": "",
    //    "signType": "MD5",
    //    "paySign": "",
    //    "success":function(res){
    //    },
    //    "fail":function(res){
    //    }
    // })
    wx.request({
      url: 'http://127.0.0.1:7001/api/accounts/info',
      method: 'get',
      data: {
        comments: wx.getStorageSync('comments'),
        list: wx.getStorageSync('orderList').list,
      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000,
      mask: true,
    })
    setTimeout(() => {
      wx.switchTab({
        url: '../home/home'
      })
    }, 1000)

  }
})