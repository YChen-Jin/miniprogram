// pages/first/first.js

Page({
  data: {
    val:'',
    lists:[]
  },
  onLoad(){
    // var that = this;
    var list = wx.getStorageSync('list')  //同步方法
    console.log(list)
    if(list){
      this.setData({
        lists:list
      })
    }
  },
  getval(e){
    this.setData({val:e.detail.value})
  },
  add(){
    var data1 = this.data.lists;
    data1.push(this.data.val) /**push() 方法可以用于向数组的末尾添加一个或多个元素，并返回新的长度
                                push() 方法可把它的参数顺序添加到arrayObject 的尾部，可以直接修改arrayObject，而不是创建一个新的数组。**/
    this.setData({
      list:data1,
      val:''})
    wx.setStorageSync('list', this.data.lists)
    this.onLoad();  //页面刷新获取数据
  },
  del(e){
    var i = e.currentTarget.dataset.index;
    var data2 = this.data.lists;
    data2.splice(i,1)
    this.setData({list:data2})
    wx.setStorageSync('list', this.data.lists)
    this.onLoad();  //页面刷新获取数据
  },
})
