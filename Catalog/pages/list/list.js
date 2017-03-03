// pages/list/list.js
var common = require('../../common/common.js')
var classItem = [];
var isshowArray = [];
var app = getApp()
Page({
  data: {
    inputValue: '',
    clearButton: false,
    bgView: false,
    sortView: false,
    itemClass: [],   //筛选面板数据
    itemClass1: '',   //筛选一级分类
    itemClass2: '',   //筛选二级分类
    selectClass1: '',   //index页面传递过来的一级分类
    view: {
      filtershow: 0,
      bgshow: 0,
    },
    tabclick: { A_def: 1, B_price: 0, B_pricesort: 2 },
    C_view: 0,
    searchEvent: {
      isSearchInput: false,
      isSerchFocus: false,
      isSearchBlur: true,
    },
    listboxIsshow: false,
    contentHeight: 0,
    hidden: true,
    listdata: [],
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    sort: ''
  },
  onLoad: function (e, that) {
    // 页面初始化 options为页面跳转所带来的参数
    app.aldstat.sendEvent("列表");
    if (app.globalData.userInfo) {
      app.aldstat.debug("列表-" + app.globalData.userInfo.nickName);
      console.log("列表-" + app.globalData.userInfo.nickName)
    } else {
      app.getUserInfo(function (u) {
        app.aldstat.debug("列表-" + u.nickName);
        console.log("列表-" + u.nickName)
      })
    }

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var wHeight = res.windowHeight;
        var vHeight = wHeight - 94;
        that.setData({
          contentHeight: vHeight
        });
      }
    })
    common.getHisKeys(that);
    var searchname = getApp().globalData.searchname;
    if (searchname == "搜索") {
      common.NoneKeyWord(e, that);
    }
    else {
      this.setData({
        selectClass1: e.itemclass,
        itemClass1: e.itemclass,
        listboxIsshow: true,
        searchEvent: {
          isSearchInput: false,
          isSerchFocus: false,
          isSearchBlur: false,
        },
        isSearchHidden: true
      });
      common.SearchFun('', that);
    }

  },
  sortFun: function (e, that) {
    //默认排序
    var that = this;
    var list = that.data.listdata;
    list.splice(0, list.length);
    that.setData({
      page: 1,
      sort: ''
    });
    if (this.data.tabclick.A_def == 0) {
      common.clicktapFun(e, that, 1, 0, 2)
      common.SearchFun('', that);
    }
  },
  priceFun: function (e, that) {
    var that = this;
    var list = that.data.listdata;
    that.setData({
      page: 1
    });
    list.splice(0, list.length);
    if (this.data.tabclick.B_price == 0) {
      // 价格排序
      common.clicktapFun(e, that, 0, 1, 0);
      //common.SearchFun('0',that);

    }
    if (this.data.tabclick.B_pricesort == 0) {
      //1 升价排序
      common.clicktapFun(e, that, 0, 1, 1)
      common.SearchFun('1', that);
      that.setData({
        sort: 1
      });
    } else {
      //0 升价排序
      common.clicktapFun(e, that, 0, 1, 0)
      common.SearchFun('2', that);
      that.setData({
        sort: 2
      });
    }
  },
  viewFun: function (e, that) {
    var that = this;
    if (this.data.C_view == 0) {
      //1 列表模式
      common.clickViewFun(e, that, 1)
    } else {
      //0 大图模式
      common.clickViewFun(e, that, 0)
    }
  },
  bgFun: function () {
    var that = this;
    that.setData({
      bgView: false,
      sortView: false,
    });
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
  },
  selectClassFun: function (e) {
    var that = this;
    var classid = e.currentTarget.dataset.classid;
    var itemid = e.currentTarget.dataset.itemid;
    var itemClass = this.data.itemClass;
    console.log(itemClass)
    for (var i = 0; i < itemClass.length; i++) {
      if (itemClass[i].id == classid) {
        var items = itemClass[i].child; 
        for (var j = 0; j < items.length; j++) {
          if (itemid == items[j].id) {
            itemClass[i].child[j].isselect = 1 == itemClass[i].child[j].isselect ? 0 : 1;
            break;
          }
        }
        break;
      }
    }
    
    that.setData({
      itemClass: itemClass
    })
  },
  resetselectFun: function () {
    var that = this;
    var itemClass = this.data.itemClass;
    for (var i = 0; i < itemClass.length; i++) {
      var items = itemClass[i].child;
      for (var j = 0; j < items.length; j++) {
        itemClass[i].child[j].isselect = 0;
      }
    }
    that.setData({
      itemClass: itemClass
    })
  },
  submitFun: function () {
    var that = this;
    var _itemClass = "";
    var _itemClass2 = "";
    var itemClass = this.data.itemClass;
    for (var i = 0; i < itemClass.length; i++) {
      var items = itemClass[i].child;
      for (var j = 0; j < items.length; j++) {
        if (items[j].isselect == 1) {
          if (items[j].id == -1) {
            _itemClass += itemClass[i].name + ",";
            break;
          } else {
            _itemClass2 += items[j].name + ",";
          }
        }
      }
    }
    if (_itemClass.length > 0) {
      _itemClass = _itemClass.substring(0, _itemClass.length - 1);
    }
    if (_itemClass2.length > 0) {
      _itemClass2 = _itemClass2.substring(0, _itemClass2.length - 1);
    }
    that.setData({
      page: 1,
      itemClass1: _itemClass,
      itemClass2: _itemClass2
    })
    common.SearchFun(that.data.sort, that);
  },
  arrowFun: function (e) {
    //筛选箭头
    var that = this;
    var _itemClass = this.data.itemClass;
    for (var i = 0; i < _itemClass.length; i++) {
      if (e.currentTarget.dataset.id == _itemClass[i].id) {
        _itemClass[i].tabShow = _itemClass[i].tabShow == 1 ? 0 : 1;
      }
    }
    that.setData({
      itemClass: _itemClass
    })
  },
  filterFun: function () {
    //筛选面板显示
    var that = this;
    that.setData({
      view: {
        filtershow: 1,
        bgshow: 1,
      }
    });
    var _itemClass = this.data.itemClass;
    if (_itemClass.length > 0) {
      that.setData({
        itemClass: _itemClass
      })
    } else {
      wx.request({
        url: 'https://ps4-northchina-survey-qa.chinacloudsites.cn/catalog/productCategory/list',
        data: {},
        method: 'POST',
        header: {
          'appid': 'catalog'
        }, // 设置请求的 header
        success: function (res) {
          _itemClass = res.data.responseData;
          for (var i = 0; i < _itemClass.length; i++) {
            _itemClass[i].tabShow = 0;
            var item = { id: -1, name: "全部", pid: _itemClass[i].id, level: 2 };
            //根据index页面传递过来的大类，显示筛选条件
            if (_itemClass[i].name == that.data.selectClass1) {
              item.isselect = 1;
              _itemClass[i].tabShow = 1;
            }
            if (!_itemClass[i].child) {
              _itemClass[i].child = new Array();
            }
            _itemClass[i].child.unshift(item);
          }
          that.setData({
            itemClass: _itemClass
          })
        },
        fail: function () { },
        complete: function () { }
      })
    }
  },
  escFun: function () {
    //取消筛选
    var that = this;
    that.setData({
      view: {
        filtershow: 0,
        bgshow: 0,
      }
    });
  },
  SearchFun: function (that) {
    //搜索
    var that = this;
    var list = that.data.listdata;
    list.splice(0, list.length);
    that.setData({
      listboxIsshow: true,
      searchEvent: {
        isSearchInput: false,
        isSerchFocus: false,
        isSearchBlur: false,
      },
      isSearchHidden: true,
      page: 1,
      itemClass: [],
      itemClass1: '',
      itemClass2: '',
      selectClass1: ''
    });
    common.SearchFun(this.data.sort, that);

  },
  EscSearchFun: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  SearchInput: function (e) {
    //输入框输入
    var that = this;
    common.SearchInput(e, that);
  },
  SerchFocus: function (e) {
    var that = this;
    common.SearchFocus(e, that);
  },
  SearchBlur: function (e) {
    var that = this;
    common.SearchBlur(e, that);
    //common.AddHisKey(that);
  },
  clearInput: function (e) {
    //清空搜索框
    var that = this;
    //var _keywordlist = that.data.keywordlist;
    //_keywordlist.splice(0, _keywordlist.length);
    this.setData({
      inputValue: '',
      clearButton: false
    })
    common.NoneKeyWord(e, that)
  },
  selectKeyFun: function (e) {
    //选择联想关键词搜索
    var that = this;
    //关键词搜索重置筛选条件
    this.setData({
      itemClass: [],
      itemClass1: '',
      itemClass2: '',
      selectClass1: ''
    });

    common.SelectKey(e, that);
  },
  bindDownLoad: function (e, that) {
    //该方法绑定了页面滑动到底部的事件
    var that = this;
    var sort = that.data.sort;
    var _listnum = that.data.listdata.length;
    console.log(that.data.listnum);
    console.log(_listnum);
    if(that.data.listnum!=_listnum){
      common.SearchFun(sort, that);
    }else{
      console.log("没有更多数据！");
    }
    this.setData({
      listnum: _listnum
    });

  },
  scroll: function (event) {
    //  
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  onShareAppMessage: function () {
    return {
      title: '搜索',
      path: '/pages/list/list'
    }
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})

