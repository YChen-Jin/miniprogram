// pages/first/first.js
Page({
  data: {
    array: ['男', '女'],
    objectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }]
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})