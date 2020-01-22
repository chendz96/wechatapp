const API_BASE_URL = 'https://boring1996.cn'

const request = (url, needSubDomain, method, data) => {
  let _url = API_BASE_URL+ url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)            
      },
      fail(error) {
        console.log(res.data)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}


module.exports = {
  banners: (data) => {
    return request('/index/Wechatbanner/bannerlist', true, 'post', data)    
  },
  shopSubList: (data) => {
    return request('/index/Wechatbanner/shopsublist', true, 'post', data)
  },
  shopsub_phone_list: (data) => {
    return request('/index/Wechatbanner/shopsub_phone_list', true, 'post', data)
  },
  shop_display_video: (data) => {
    return request('/index/Wechatbanner/shopsub_display_video', true, 'post', data)
  }
}