const app = getApp()
const WXAPI = require('../../api/common')
const CONFIG = require('../../api/config.js')

Page({
  data: {
    statusType: ["预约中","预约完成"],
    hasRefund: false,
    currentType: "0",
    tabClass: ["", ""]
  },
  statusTap: function(e) {
    const curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },  
  onLoad: function(options) {
    if (options && options.type) {
      if (options.type == 99) {
        this.setData({
          hasRefund: true,
          currentType: options.type
        });
      } else {
        this.setData({
          hasRefund: false,
          currentType: options.type
        });
      }      
    }
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成

  },  
  onShow: function() {    
      this.doneShow()    
  }, 
  doneShow: function () {
    // 获取订单列表
    var that = this;
    var postData = {
      uid: wx.getStorageSync('uid')
    };
    postData.hasRefund = that.data.hasRefund;
    if (!postData.hasRefund) {
      postData.status = that.data.currentType;
    }
    //this.getOrderStatistics();
    WXAPI.orderList(postData).then(function (res) {
      console.log(res,"orderlistdata")
      if (res.code == 0) {
        that.setData({
          orderList: res.data
          //logisticsMap: res.data.logisticsMap,
          //goodsMap: res.data.goodsMap
        });
      } else {
        that.setData({
          orderList: null
          //logisticsMap: {},
          //goodsMap: {}
        });
      }
    })
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数

  }
})