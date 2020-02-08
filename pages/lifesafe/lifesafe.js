const app = getApp()
const WXAPI = require('../../api/common')
const CONFIG = require('../../api/config.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsWrap: [],

  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    WXAPI.safeimglist(CONFIG.login_key).then(res => {
      if (res.code === 0) {
        that.setData({
          goodsWrap: res.data,
        })
        
      }
      console.log(res)
      console.log(that.data.goodsWrap)
    })
  },

  previewImage: function (e) {
    var url_array = new Array()
    var index = e.target.dataset.index
    console.log(e)
    for (var i = 0; i < e.target.dataset.list.length; i++) {
      url_array.push(e.target.dataset.list[i]['src'])
    }
    var currentimg = e.target.dataset.src
    //图片预览
    wx.previewImage({
      current: currentimg,
      urls: url_array,
      success: function (data) {
        //console.log("成功", data)
      },
      fail: function (error) {
        //console.log(error)
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

  },
 
})