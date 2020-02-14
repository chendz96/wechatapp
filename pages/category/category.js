// pages/category/category.js
const WXAPI = require('../../api/common')
const CONFIG = require('../../api/config.js')
Page({

  /**
     * 页面的初始数据
     */
  data: {
    categories: [],
    goodsWrap: [],
    categorySelected: "",
    goodsToView: "",
    categoryToView: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },
  initData() {
    let that = this;

    wx.showNavigationBarLoading();
    WXAPI.goodsCategory(CONFIG.login_key).then(function (res) {      
      
      var categories = [];
      if (res.code == 0) {
        for (var i = 0; i < res.data.length; i++) {

          let item = res.data[i];

          item.scrollid = "s" + item.id;
          categories.push(item);

          if (i == 0) {

            that.setData({
              categorySelected: item.scrollid,
            })

          }
        }
      }
      that.setData({
        categories: categories,

      });      
      that.getGoodsList(0);
    }).catch((e) => {

      wx.hideNavigationBarLoading();
    });
  }
  ,
  getGoodsList: function (categoryId, append) {

    let that = this;

    WXAPI.goods(CONFIG.login_key).then(function (res) {
      if (res.code == 404 || res.code == 700) {

        return
      }
      let goodsWrap = [];


      that.data.categories.forEach((o, index) => {

        let wrap = {};
        wrap.id = o.id;
        wrap.scrollId = "s" + o.id;
        wrap.name = o.name;
        let goods = [];

        wrap.goods = goods;
        res.data.forEach((item, i) => {

          if (item.categoryid == wrap.id) {

            goods.push(item)
          }
        })

        goodsWrap.push(wrap);
      })



      that.setData({
        goodsWrap: goodsWrap,
      });

      console.log(res);
      console.log(goodsWrap);

      wx.hideNavigationBarLoading();
    }).catch((e) => {

      wx.hideNavigationBarLoading();
    });
  },
  toDetailsTap: function (e) {
    console.log(e)
    wx.requestSubscribeMessage({
      tmplIds: [CONFIG.tmpletid],
      success(res) {
        console.log('已授权接收订阅消息')
      }
    })
    wx.navigateTo({
      url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id      
    })
  },
  onCategoryClick: function (e) {

    let id = e.currentTarget.dataset.id;
    this.categoryClick = true;
    this.setData({
      goodsToView: id,
      categorySelected: id,
    })

  },
  scroll: function (e) {

    if (this.categoryClick) {
      this.categoryClick = false;
      return;
    }

    let scrollTop = e.detail.scrollTop;

    let that = this;

    let offset = 0;
    let isBreak = false;

    for (let g = 0; g < this.data.goodsWrap.length; g++) {

      let goodWrap = this.data.goodsWrap[g];

      offset += 30;

      if (scrollTop <= offset) {

        if (this.data.categoryToView != goodWrap.scrollId) {
          this.setData({
            categorySelected: goodWrap.scrollId,
            categoryToView: goodWrap.scrollId,
          })
        }

        break;
      }


      for (let i = 0; i < goodWrap.goods.length; i++) {

        offset += 91;

        if (scrollTop <= offset) {

          if (this.data.categoryToView != goodWrap.scrollId) {
            this.setData({
              categorySelected: goodWrap.scrollId,
              categoryToView: goodWrap.scrollId,
            })
          }

          isBreak = true;
          break;
        }
      }

      if (isBreak) {
        break;
      }


    }


  }
})
