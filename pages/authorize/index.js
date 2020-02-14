const WXAPI = require('../../api/common')
var app = getApp();
const CONFIG = require('../../api/config.js')
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  details:[],
  avatarUrl:'',
  nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {   
    console.log("hide") 
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindGetUserInfo: function(e) {
    const that = this;    
    console.log(e,"bindGetUserInfo")
    if (!e.detail.userInfo) {
      return;
    }
    if (app.globalData.isConnected) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      console.log(e.detail)
      that.setData({ details: e.detail })      
      this.login();
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  },
  login: function() {
    let that = this;
    const token = wx.getStorageSync('token');
    if (token) {      
      WXAPI.checkToken(token).then(function(res) {
        if (res.code != 0) {
          //console.log("")
          wx.removeStorageSync('token')
          that.login();
        } else {
          // 回到原来的地方放
          app.navigateToLogin = false
          wx.navigateBack();
        }
      })
      return;
    }
    wx.login({
      success: function(res) {
        console.log(res)        
        WXAPI.login({ code: res.code, appid: CONFIG.appid, secret: CONFIG.secret, details: JSON.stringify(that.data.details),user: CONFIG.login_key.user, password: CONFIG.login_key.password }).then(function (res) {
          if (res.code == 10000) {
            // 去注册
            that.registerUser();
            return;
          }
          console.log(res,"login")
          if (res.code != 0) {
            
            // 登录错误
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '无法登录，请重试',
              showCancel: false
            })
            return;
          }
          $Toast({
            content: '登录成功',
            type: 'success'
          });
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('uid', res.data.uid)
          that.setData({
            avatarUrl: res.data.avatarUrl,
            nickName: res.data.nickName
          })
          // 回到原来的地方放
          app.navigateToLogin = true  
          setTimeout(function () {
            wx.navigateBack();
          }, 500)        
          
        })
      }
    })
  },
  registerUser: function() {
    let that = this;
    wx.login({
      success: function(res) {
        let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function(res) {
            let iv = res.iv;
            let encryptedData = res.encryptedData;
            let referrer = '' // 推荐人
            let referrer_storge = wx.getStorageSync('referrer');
            if (referrer_storge) {
              referrer = referrer_storge;
            }
            // 下面开始调用注册接口
            WXAPI.register( {
              code: code,
              encryptedData: encryptedData,
              iv: iv,
              referrer: referrer
            }).then(function(res) {
              wx.hideLoading();
              that.login();
            })
          }
        })
      }
    })
  }
})