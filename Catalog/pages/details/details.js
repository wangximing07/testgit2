// pages/details/details.js
var app = getApp()
Page({
  data:{
    indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      images: [{src:'/img/Product.png'}],
      product:{}
  },
  onLoad:function(options){
    app.aldstat.sendEvent("详情");
    if (app.globalData.userInfo) {
      app.aldstat.debug("详情-" + app.globalData.userInfo.nickName);
      console.log("详情-" + app.globalData.userInfo.nickName)
    } else {
      app.getUserInfo(function (u) {
        app.aldstat.debug("详情-" + u.nickName);
        console.log("详情-" + u.nickName)
      })
    }
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var itemNumber = options.itemNumber;
    that.setData({
      itemNumber: itemNumber
    });
    console.log(options);
    wx.request({
      url: 'https://ps4-northchina-survey-qa.chinacloudsites.cn/catalog/product/detail',
      data: {itemNumber:itemNumber},
      method: 'POST',
      header: {'appid':'catalog'}, // 设置请求的 header
      success: function (res) {
        var _product = res.data.responseData;
        //有三种尺寸
        var hdurl = (_product.imageHdurl&&_product.imageHdurl.indexOf("noimage")==0)?_product.imageHdurl:_product.imageUrl;
        _product.images = [{src:_product.imageUrl,hdurl:hdurl}]
        _product.details = _product.details?JSON.parse(_product.details):[];
        _product.brand = _product.brand?JSON.parse(_product.brand):[];
        _product.hasBrand = _product.brand.length>0?true:false;
        that.setData({product:_product})
        console.log(_product)
      },
      fail: function () {
      },
      complete: function () {
      }
    })



  },
  onReady:function(){
    // 页面渲染完成
     wx.setNavigationBarTitle({
      title: '安利小程序'
    })
  },
  onItemClick: function (e) {
    console.log(e.currentTarget.dataset.hdurl)
    wx.previewImage({
  current: e.currentTarget.dataset.current, // 当前显示图片的http链接
  urls: [e.currentTarget.dataset.hdurl] // 需要预览的图片http链接列表
})
  },
onShareAppMessage: function () {
    var id = this.data.itemNumber
    return {
      title: '安利产品搜索',
      path: '/pages/details/details?itemNumber='+id
    }
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})