const app = getApp()
const WXAPI = require('../../api/common')
const CONFIG = require('../../api/config.js')
const { $Toast } = require('../../dist/base/index');
Page({
  data: {   
  },
  onLoad(e) {
    console.log(e)
    
  },
  formSubmit: function (e) {
    if(wx.getStorageSync('token') == '') {
      wx.showModal({
        title: '提示',
        content: '请先登录,再次点击提交',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            app.goLoginPageTimeOut()
          }
        }
      })      
      return
    }
    var uid = wx.getStorageSync('uid')
    var data = { phone: e.detail.value.phone, ps: e.detail.value.shoesinfo, uid: uid, user: CONFIG.login_key.user, password: CONFIG.login_key.password}
    this.form_save(data)    
  },
  form_save:function(data) {
    WXAPI.clothessubmit(data).then(res => {
      if (res.code == '1') {
        console.log(res.msg, '衣服提交回复')
        return
      }
      console.log(res, '衣服提交回复')
      wx.showModal({
        title: '成功',
        icon: 'success',
        showCancel: false,        
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      })
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  onShow() {
  }
})