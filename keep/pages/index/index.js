Page({
  data:{
    imglist:["/pages/assets/images/qs1.GIF","/pages/assets/images/qs2.GIF","/pages/assets/images/qs3.GIF","/pages/assets/images/qs4.GIF"],  // 图片列表
    runname:["呼啦圈","举重","跳绳","哑铃"],  //动作名称
    index:0,  //索引，记录到当前第几个
    count:8,  //每个动作持续时间，用来显示时间变化(s)
    total:8,  //每个动作持续时间，固定值(s)
    timer:null  //定时器，当离开页面时需要清除定时器
  },
  changeTimer:function(){
    var that = this
    //判断如果已经做到最后一个动作
    if(this.data.index == this.data.imglist.length){
      //给出提示，是重做运动，还是返回主页
      wx.showModal({
        title:'提示',
        content:'运动完成',
        confirmText:'休息一下',
        cancelText:'继续运动',
        success:function(res){
          if(res.confirm){
            clearTimeout(that.data.timer)
            that.setData({
              index:0,
              count:that.data.total
            })
            wx.navigateTo({
              url: '/pages/first/first',
            })
          }else if(res.cancel){
            // 再做一遍，重置初始值
            that.setData({
              index:0
            },function(){
              that.changeTimer()
            })
          }
        }
      })
    }else{
      this.data.timer =setTimeout(()=>{
        //时间递减
        this.setData({
          count:this.data.count-1
        })
        if(this.data.count<=0){
          // 当时间到0，进入下一个动作
          this.setData({
            index:this.data.index + 1,
            count:this.data.total
          })
          this.changeTimer()
        }else{
          this.changeTimer()
        }
        },1000);
      }
    },
    /**
     * 生命周期函数--监听页面显示 
    **/
    onShow:function(){
      var that = this;
      this.setData({
        count:that.data.total
      })
      this.changeTimer()
    },
    /**
     * 生命周期函数--监听页面隐藏 
    **/
   onHide:function(){
     clearTimeout(this.data.timer)
   },
   /**
     * 生命周期函数--监听页面卸载
    **/
   onUnload:function(){
     clearTimeout(this.data.timer)
   }
})