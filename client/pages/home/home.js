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
    if (wx.getStorageSync('logged')) {
      const userInfo = wx.getStorageSync('userInfo')
      this.setData({
        logged: true,
        userInfo: userInfo,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录再操作!!!',
        confirm: function (res) {
          wx.switchTab({
            url: '/my'
          })
        }
      })
    }
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
    const logged = wx.getStorageSync('logged')

    if (logged) {
      const userInfo = wx.getStorageSync('userInfo')
      this.setData({
        logged: logged ? logged : false,
        userInfo: userInfo ? userInfo : {},
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录再操作!!!',
        complete: function (res) {
          wx.switchTab({
            url: "../my/my"
          })
        }
      })
    }
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