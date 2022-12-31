// pages/detail/detail.js
Page({
  onLoad: function (options) {
    this.setData({
      name: options.name,
      price:options.price
    })
  },
  navigateBack: function () {
    wx.navigateBack({
      delta: 1  //返回的页面数
    })
  }
})