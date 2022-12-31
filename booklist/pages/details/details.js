// pages/details/details.js
//获取应用实例
// var app = getApp();
Page({
  data: {
    id:0,
    details:[],
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    console.log('options---',options)
    console.log('详情',this.data.details)
  },
  onReady: function () {
    this.setData({
      details:getApp().globalData.books
  })
  },

})