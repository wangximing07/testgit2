function clicktapFun(e, that, valueA, valueB1, valueB2) {
	//列表页点击tab按钮排序
	that.setData({
		tabclick: {
			A_def: valueA,
			B_price: valueB1,
			B_pricesort: valueB2,
		}
	});
}

function clickViewFun(e, that, valueC) {
	that.setData({
		C_view: valueC
	});

}

function arrowFun(e, that) {
	//筛选箭头
	var datasetId = e.target.dataset.id;
	switch(datasetId) {
		case "1":
			if(that.data.tabShow.tabA == 0) {
				that.setData({
					arrowShow: true,
					tabShow: {
						tabA: 1,
						tabB: 0,
						tabC: 0,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			} else {
				that.setData({
					arrowShow: false,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 0,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			}
			break;
		case "2":
			if(that.data.tabShow.tabB == 0) {
				that.setData({
					arrowShow: true,
					tabShow: {
						tabA: 0,
						tabB: 1,
						tabC: 0,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			} else {
				that.setData({
					arrowShow: false,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 0,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			}
			break;
		case "3":
			if(that.data.tabShow.tabC == 0) {
				that.setData({
					arrowShow: true,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 1,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			} else {
				that.setData({
					arrowShow: false,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 0,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			}
			break;
		case "4":
			if(that.data.tabShow.tabD == 0) {
				that.setData({
					arrowShow: true,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 0,
						tabD: 1,
						tabE: 0,
						tabF: 0
					}
				});
			} else {
				that.setData({
					arrowShow: false,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 0,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			}
			break;
		case "5":
			if(that.data.tabShow.tabE == 0) {
				that.setData({
					arrowShow: true,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 0,
						tabD: 0,
						tabE: 1,
						tabF: 0
					}
				});
			} else {
				that.setData({
					arrowShow: false,
					tabShow: {
						tabA: 0,
						tabB: 0,
						tabC: 0,
						tabD: 0,
						tabE: 0,
						tabF: 0
					}
				});
			}

	}
}

function SearchInput(e, that, callBack) {
	//搜索框输入
	that.setData({
		searchEvent: {
			isSearchInput: true,
			isSerchFocus: false,
			isSearchBlur: false,
		},
		inputValue: e.detail.value,
		listboxIsshow: false
	});
	if(that.data.inputValue.length == 0) {
		var _keywordlist = that.data.keywordlist;
		//console.log(_keywordlist)
    	_keywordlist.splice(0, _keywordlist.length);
		that.setData({
			clearButton: false,
			keywordlist:_keywordlist
		})
	} else {
		that.setData({
			clearButton: true
		})
	}
	var text = e.detail.value;
	if(text.length > 1) {
		wx.request({
			url: 'https://ps4-northchina-survey-qa.chinacloudsites.cn/catalog/product/associate',
			data: {
				keyword: text
			},
			method: 'POST',
			header: {
				'appid': 'catalog'
			}, // 设置请求的 header
			success: function(res) {
				var _keywordlist = res.data.responseData
				that.setData({
					keywordlist: _keywordlist
				})
			},
			fail: function() {},
			complete: function() {}
		})
	}
}

function SearchFocus(e, that, callBack) {
	that.setData({
		searchEvent: {
			isSearchInput: false,
			isSerchFocus: true,
			isSearchBlur: false,
		},
		listboxIsshow: false,
		isSearchHidden: false,
	});
	var text = e.detail.value;
	if(text.length > 1) {
		wx.request({
			url: 'https://ps4-northchina-survey-qa.chinacloudsites.cn/catalog/product/associate',
			data: {
				keyword: text
			},
			method: 'POST',
			header: {
				'appid': 'catalog'
			}, // 设置请求的 header
			success: function(res) {
				var _keywordlist = res.data.responseData
				that.setData({
					keywordlist: _keywordlist
				})
			},
			fail: function() {},
			complete: function() {}
		})
	}else{
		var _keywordlist = that.data.keywordlist;
		var _keywordlist = [];
    	_keywordlist.splice(0, _keywordlist.length);
		that.setData({
			keywordlist:_keywordlist
		})
	}
}

function SearchBlur(e, that, callBack) {
	that.setData({
		searchEvent: {
			isSearchInput: false,
			isSerchFocus: false,
			isSearchBlur: true,
		},
		listboxIsshow: false
	});
	var list = that.data.listdata;
	list.splice(0, list.length);
}

function SelectKey(e, that) {
	var keyword = e.target.dataset.keyword;
//	var pageNo = 1;
//	var pageSize = 8;
	var list = that.data.listdata;
	list.splice(0, list.length);
	that.setData({
		inputValue: keyword,
		listboxIsshow: true,
		searchEvent: {
			isSearchInput: false,
			isSerchFocus: false,
			isSearchBlur: false,
		},
		isSearchHidden: true,
		page:1
	})
	AddHisKey(that);
	SearchFun(that.data.sort,that);

}

function NoneKeyWord(e, that) {
	that.setData({
		searchEvent: {
			isSearchInput: false,
			isSerchFocus: false,
			isSearchBlur: true,
		},
		listboxIsshow: false
	});

}

function getHisKeys(that) {
	var value = [];
	try {
		value = wx.getStorageSync('wxSearchHisKeys')
		if(value) {
			that.setData({
				hiskey: value
			});
		}
	} catch(e) {

	}

}

function DeleteKey(e, that) {
	//var text = e.target.dataset.key;
	var value = wx.getStorageSync('wxSearchHisKeys');

	if(value.length > 10) {
		value.splice(0, value.length)
		value.pop();
		wx.setStorage({
			key: "wxSearchHisKeys",
			data: value,
			success: function() {
				getHisKeys(that);
			}
		})
	}
}

function AddHisKey(that) {
	var text = that.data.inputValue;
	if(typeof(text) == "undefined" || text.length == 0) {
		return;
	}
	var value = wx.getStorageSync('wxSearchHisKeys');
	if(value) {
		if(value.length > 10) {
			//历史搜索最多10个
			value.pop();
			wx.setStorage({
				key: "wxSearchHisKeys",
				data: value,
				success: function() {
					getHisKeys(that);
				}
			})
		}

		if(value.indexOf(text) < 0) {
			value.unshift(text);
		}
		wx.setStorage({
			key: "wxSearchHisKeys",
			data: value,
			success: function() {
				getHisKeys(that);
			}
		})
	} else {
		value = [];
		value.push(text);
		wx.setStorage({
			key: "wxSearchHisKeys",
			data: value,
			success: function() {
				getHisKeys(that);
			}
		})
	}

}

function SearchFun(sort,that) {
	
	AddHisKey(that);
	//Getlist(that);
	var apiUrl = "https://ps4-northchina-survey-qa.chinacloudsites.cn/catalog/product/list";
	//var sort = "2";
	var pageNo = that.data.page;
	var pageSize = 6;
	var text = that.data.inputValue;

	that.setData({
		hidden: false
	});
	wx.request({
		url: apiUrl,
		data: {
			keyword: text,
			pageNo: pageNo,
			pageSize: pageSize,
			sort: sort,
			itemClass:that.data.itemClass1,
			itemClass2:that.data.itemClass2
		},
		method: 'POST',
		header: {
			'appid': 'catalog'
		},
		success: function(res) {
			//var list = res.data.responseData
			// var list = that.data.listdata;
			// for(var i = 0; i < res.data.responseData.length; i++) {
			// 	list.push(res.data.responseData[i]);
			// }
			var list = [];
			if(pageNo==1){
				list = res.data.responseData;
			}else{
				list = list.concat(that.data.listdata,res.data.responseData);
			}
			that.setData({
				listdata: list,
				view: {
					filtershow: 0,
					bgshow: 0,
				}
			})

			pageNo++;

			that.setData({
				hidden: true,
				page:pageNo
			});
		},
		fail: function() {},
		complete: function() {}
	})

}

function Getlist(that) {
	var apiUrl = "https://ps4-northchina-survey-qa.chinacloudsites.cn/catalog/product/list";
	var sort = "";
	var pageNo = 1;
	var pageSize = 6;
	var text = that.data.inputValue;
	that.setData({
		hidden: false
	});
	wx.request({
		url: apiUrl,
		data: {
			keyword: text,
			pageNo: pageNo,
			pageSize: pageSize,
			sort: sort,
		},
		method: 'POST',
		header: {
			'appid': 'catalog'
		},
		success: function(res) {
			//var list = res.data.responseData
			var list = that.data.listdata;
			for(var i = 0; i < res.data.responseData.length; i++) {
				list.push(res.data.responseData[i]);
			}
			that.setData({
				listdata: list
			})
//			pageNo++;

			that.setData({
				hidden: true
			});

		},
		fail: function() {},
		complete: function() {}
	})
}

module.exports = {
	clicktapFun: clicktapFun,
	SearchInput: SearchInput,
	SearchFocus: SearchFocus,
	SearchBlur: SearchBlur,
	SelectKey: SelectKey,
	arrowFun: arrowFun,
	NoneKeyWord: NoneKeyWord,
	AddHisKey: AddHisKey,
	getHisKeys: getHisKeys,
	DeleteKey: DeleteKey,
	clickViewFun: clickViewFun,
	SearchFun: SearchFun,
	Getlist: Getlist
}