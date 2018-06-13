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
    swipeIndex: 0,
    foodTypeCur: 0,
    totalPrice: 0,
    foodType: [],
    showcart: false,
    food: [],
    choseFood: [
    ],
    data: [
    ]
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

  // 食物类型点击
  handlerClickFoodType: function(e) {
    if ( !(e.target.dataset.index + 1) ) return
    this.setData({
      foodTypeCur: e.target.dataset.index - 1,
    })
  },

  // 选择菜品
  handlerClickChoseFood: function(e) {

    const { choseFood, food } = this.data;
    const id = e.currentTarget.dataset.foodid;

    let find = false;
    choseFood.forEach((e) => {
      if (e.foodid == id) {
        e.nums++;
        this.setData({
          choseFood,
        })
        find = true;
      }
    })

    if (!find) {
        choseFood.push({
          foodid: id,
          nums: 1,
          name: food[id].foodname,
          price: food[id].price,
        })
        this.setData({
          choseFood
        })
    }
    this.handlerSumPrice()


  },

  // 加商品
  handlerItemPlus: function(e) {
    const id = e.target.dataset.index
    const { choseFood } = this.data;
    choseFood.forEach((e) => {
      if (e.foodid == id) {
        e.nums++;
        this.setData({
          choseFood,
        })
      }
    })
    this.handlerSumPrice()
  },

  // 减商品
  handlerItemSubtract: function(e) {
    const id = e.target.dataset.index
    const { choseFood } = this.data;
    choseFood.forEach((e) => {
      if (e.foodid == id) {
        e.nums > 0 ? e.nums-- : null
        this.setData({
          choseFood,
        })
      }
    })
    this.handlerSumPrice()
  },

  // 显示购物车
  handlerShowCart: function(e) {
    this.setData({
      showcart: !this.data.showcart
    })
  },

  // 手动输入商品数量
  handlerInputChange: function(e) {
    const value = e.detail.value;
    const id = e.target.dataset.index;

    const { choseFood } = this.data;
    console.log(this.data.choseFood)
    choseFood.forEach((e) => {
      if (e.foodid == id) {
        value >= 0 ? (
          e.nums = value
        ) : e.nums = 0
        this.setData({
          choseFood,
        })
      }
    })
    this.handlerSumPrice()
  },

  // 计算商品总价格
  handlerSumPrice() {
    const { choseFood } = this.data;
    let sum = 0;
    choseFood.forEach(e => {
      sum += (+e.nums) * (+e.price)
    })
    this.setData({
      totalPrice: sum,
    })
  },

  // 支付
  handlerPay: function() {
    if (this.data.totalPrice) {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        mask: true,
      })
      const user = wx.getStorageSync('userInfo');

      wx.request({
        url: 'https://9vagitvj.qcloud.la/weapp/pay',
        method: 'GET',
        data: {
          info: this.data.choseFood,
          userid: user.openId,
          username: user.nickName,
        },
        success: (e) => {

        }
      })

      this.setData({
        choseFood: []
      })
      this.handlerSumPrice();
    } else {
      wx.showToast({
        title: '购物车为空',
        icon: 'none',
        mask: true,
      })
    }

    
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

    wx.request({
      url: 'https://9vagitvj.qcloud.la/weapp/getfood',
      success: (e) => {
        const myData = e.data.data;
        const food = {}
        const foodType = []
        myData.forEach((e) => {
          foodType.push({
            id: e.typeid,
            typename: e.typeName,
          })
          e.food.forEach((e2) => {
            food[e2.foodid] = JSON.parse(JSON.stringify(e2));
          })
        })
        this.setData({
          food,
          data: myData,
          foodType,
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