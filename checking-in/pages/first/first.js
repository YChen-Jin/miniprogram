// QQMapKey是在腾讯地图开放平台设置的密钥
// 请使用你自己的密钥
const QQMapKey = '4LXBZ-LC6CQ-4TF52-GDLVL-6VRJO-H7BYU';

// 在密钥设置中开启WebServiceAPI，选择签名校验，即可获取Secret key，即SK
// 请使用你自己的SK
const SK = '3adNJ0DH5h8Wu3oTWUPRkSwW1HezFL0Y';

// 引入MD5库
import md5 from '../../utils/md5'

Page({
  data: {
    userInfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    haveUserInfo:false,
    lon: 116.307689,
    address: '定位中...'
  },
  bindGetUserInfo(e) {
    let _that = this;
    // 1 获取用户信息
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              if (res.userInfo.gender==1) {
                _that.setData({
                  userInfo:'男',
                  haveUserInfo:true
                })
              }else if (res.userInfo.gender==2) {
                _that.setData({
                  userInfo:'女',
                  haveUserInfo:true
                })
              }else{
                _that.setData({
                  userInfo:'未知',
                  haveUserInfo:true
                })
              }
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },//授权结束

  onLoad(){
    this.getLocation();
  },
    // 2 获取位置
    // 根据经纬度，逆地址解析
    getAddress(lat, lon) {
      // 在wx.request中，this指向wx.request，故无法setData，此处将this指向that
      var that = this
      let SIG = md5("/ws/geocoder/v1?key=" + QQMapKey +"&location="+String(lat)+","+String(lon)+SK)
      wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1',
        data: {
          key: QQMapKey,
          location: `${lat},${lon}`,
          sig: SIG
        },
        success(res) {
          let result = res.data.result
          // console.log(result)
          // formatted_addresses.recommend是经过腾讯地图优化过的描述方式，更具人性化特点
          let formatted_addresses = result.formatted_addresses.recommend
          // 此处的that指向app
          that.setData({
            address: formatted_addresses
          })
          wx.hideLoading()
        },
        fail:(e) => {
          console.log(e)
          wx.hideLoading()
        }
      })
    },
    // 根据经纬度，设置数据
    updateLocation(res) {
      let {latitude: lat, longitude: lon} = res
      let data = {
        lat,
        lon
      }
      this.setData(data)
      this.getAddress(lat, lon)
    },
    // 微信api，获取经纬度
    getLocation() {
      wx.getLocation({
        type: 'gcj02',
        success: this.updateLocation,
        fail: (e)=> {
          console.log(e)
        }
      })
    }, // 获取位置结束

    //3 照片
  chooseImage: function(){
    var _that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _that.setData({
          imgsrc: tempFilePaths
        })
        //查看图片信息
        wx.getImageInfo({
          src: tempFilePaths[0],
          success: function(res){
            console.log(res)
          }
        })
      }
    })
  },
  reviewImage: function(){
    var _that = this;
    var imgsrc = _that.data.imgsrc
    wx.previewImage({
      current: imgsrc[0], // 当前显示图片的http链接
      urls: imgsrc // 需要预览的图片http链接列表
    })
  },
})