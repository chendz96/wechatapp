//index.js
//获取应用实例
const app = getApp()
const WXAPI = require('../../api/common')
var that = this
Page({
  data: {
    swiperCurrent: 0, //当前banner所在位置
    bannerList: [],
    shopSubList: [],
    shopsub_phone_list:[],
    videosrc:""
  },
  
  onShow() {
    const _this = this
    WXAPI.banners().then(res=>{
      _this.setData({
        bannerList: res,
      })
      console.log(res)
    })
    WXAPI.shopSubList().then(res => {      
        _this.setData({
          shopSubList: res
        })
      console.log(res)
    })
    WXAPI.shopsub_phone_list().then(res => {
      _this.setData({
        shopsub_phone_list: res
      })
      console.log(res)
    })
    WXAPI.shop_display_video().then(res => {
      _this.setData({
        videosrc: res
      })
      console.log(res)
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function (e) {
   
    
  },
  swiperchange: function (e) { // banner滚动事件
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  previewImage: function (e) {        
    var url_array = new Array()         
    for (var i = 0; i < this.data.bannerList.length;i++) {
      url_array.push(this.data.bannerList[i]["src"])
    }
    var currentimg = e.target.dataset.src.src
    //图片预览
    wx.previewImage({      
      current: currentimg,  
      urls: url_array,
      success: function (data) {
        //console.log("成功", data)
      },
      fail: function(error){
        //console.log(error)
      }    
    })
  },
  goMap(e) { // 打开地图
    
    const id = e.currentTarget.dataset.id
    const item = this.data.shopSubList.find(ele => {
      return ele.id == id
    })
    console.log(item.latitude, item.longitude);
    //parseFloat(item.latitude)
    //parseFloat(item.longitude)
    wx.openLocation({
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      name: item.name,
      address: item.address
    })
  },

  callPhone(e) {
    const tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  }
 
})
