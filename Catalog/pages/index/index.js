//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    var that = this;
     wx.getSystemInfo({
      success: function (res) {
        var _wHeight = res.windowHeight;
        that.setData({
          wHeight: _wHeight
        });
      }
    })
    console.log('onLoad');
    app.aldstat.sendEvent("首页");
    if (app.globalData.userInfo) {
      app.aldstat.debug("首页-" + app.globalData.userInfo.nickName);
      console.log("首页-" + app.globalData.userInfo.nickName)
    } else {
      app.getUserInfo(function (u) {
        app.aldstat.debug("首页-" + u.nickName);
        console.log("首页-" + u.nickName)
      })
    }
    // app.aldstat.debug("维生素C片");
    // app.aldstat.warn("维生素C片");
    // app.aldstat.error("维生素C片");
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    wx.request({
		url: 'https://ps4-northchina-survey-qa.chinacloudsites.cn/catalog/productCategory/list',
		data: {},
		method: 'POST',
		header: {
			'appid': 'catalog'
		}, // 设置请求的 header
		success: function(res) {
			var _itemClass = res.data.responseData
			that.setData({
				itemClass: _itemClass
			})
		},
		fail: function() {},
		complete: function() {}
	})

  
  },
  onSearch:function(e){
    wx.navigateTo({
      url: '/pages/list/list',
    })
    var classitem = undefined;
    var searchname =  e.currentTarget.dataset.searchname;
    app.globalData.classitem = classitem;
    app.globalData.searchname = searchname;
  },
  gotolist:function(e){
    var that = this;
    var classitem =  e.currentTarget.dataset.classitem;
    var searchname =  e.currentTarget.dataset.searchname;
    app.globalData.classitem = classitem;
    app.globalData.searchname = searchname;
  },
  onShareAppMessage: function () {
    return {
      title: '安利产品大全',
      path: '/pages/index/index'
    }
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '安利产品大全'
    })
  }
})
