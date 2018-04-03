// pages/home/home.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    swipeIndex: 1,
  },

  // 滑动卡片
  changeSwipe: function (res) {
    if (res.detail.source === 'touch' || res.detail.source === '') {
      this.setData({
        swipeIndex: res.detail.current,
      })
    }
  },

  // 点击卡片头部切换
  changeSwipeHead: function (res) {
    const target = res.target.dataset.index;
    if (target === '1' || target === '0') {
      this.setData({
        swipeIndex: parseInt(target, 10),
      })
    }
  },

  // 打电话
  callphone: function () {
    wx.makePhoneCall({
      phoneNumber: '123456789',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
          wx.setStorage({
            key: 'userInfo',
            data: result,
          })

          wx.setStorage({
            key: 'logged',
            data: true,
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
              wx.setStorage({
                key: 'userInfo',
                data: result.data.data,
              })
              wx.setStorage({
                key: 'logged',
                data: true,
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
              wx.setStorage({
                key: 'logged',
                data: false,
              })
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', '请重新登录')
        console.log('登录失败', error)
        wx.setStorage({
          key: 'logged',
          data: false,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})