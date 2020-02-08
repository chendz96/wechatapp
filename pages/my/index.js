const app = getApp()
const WXAPI = require('../../api/common')
const CONFIG = require('../../api/config.js')
const { $Toast } = require('../../dist/base/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowbutton: "block",
    
  },  
  goOrder: function (e) {
    if (wx.getStorageSync('token') == '') {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            app.goLoginPageTimeOut()
          }
        }
      })
      return
    } 

    wx.navigateTo({
      url: "/pages/order-list/index?type=" + e.currentTarget.dataset.type
    })
    console.log(23)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    const token = wx.getStorageSync('token');
    console.log(wx.getStorageSync('token'))
    console.log(app.navigateToLogin,"app.navigateToLogin")
    console.log(app.navigateToLogin,"navigateToLogin")
    if (token) {
      //app.goLoginPageTimeOut()
      //console.log("登录授权")
      this.setData({
        isshowbutton : "none"
      })         
      console.log(this.data.isshowbutton,"showlogin_button")        
    } else {      
      this.setData({
        isshowbutton : "block"
      })    
      console.log(this.data.isshowbutton, "showlogin_button")  
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

  },
  navtologin: function() {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)
  }
})