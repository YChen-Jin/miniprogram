// pages/first/first.js
//获取应用实例
var app = getApp()

Page({
  onLoad:function(e){
    console.log('加载成功',e)
    this.setData({
        book:getApp().globalData.books
    })
  }
})