// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    books:[{
      "name":"红楼梦",
      "price":"39.8",
      "picture":"/pages/public/imgs/hlm.jpg"
    },{
      "name":"西游记",
      "price":"42.5",
      "picture":"/pages/public/imgs/xyj.jpg"
    },{
      "name":"水浒传",
      "price":"36.7",
      "picture":"/pages/public/imgs/shz.jpg"
    },{
      "name":"三国演义",
      "price":"38.8",
      "picture":"/pages/public/imgs/sgyy.jpg"
    }]
  }
})
