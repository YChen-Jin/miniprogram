/**
 * 图片预加载组件
 */
Component({
  properties: {
    //默认图片
    defaultImage: String,
    //原始图片
    originalImage: String,
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: String
  },
  data: {
    finishLoadFlag: false
  },
  methods: {  //加载数据前显示默认图片，加载成功后换成自己的图片
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag:true
      })
    }
  }
})