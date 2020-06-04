//index.js
var config = require("../../config.js");

Page({
    data: {
        navbar: ['实时抢票订单', '候补抢票订单'],
        currentTab: 0,
        table1: {
            抢票失败: {url : "../detail/failed", colorclass: "gray", imageurl: "../../image/icon_14.png"},
            已取消: {url : "../detail/cancelled", colorclass: "gray", imageurl: "../../image/icon_18.png"},
            休息中:{url : "../detail/rushing", colorclass: "blue", imageurl: "../../image/icon_15.png"},
            已完成:{url : "../detail/success", colorclass: "green", imageurl: "../../image/icon_7.png"},
            与未完成订单冲突:{url : "../detail/cancelled", colorclass: "gray", imageurl: "../../image/icon_18.png"},
            实时抢票中: {url : "../detail/rushing", colorclass: "blue", imageurl: "../../image/icon_15.png"},
            实时待支付: {url : "../detail/paying", colorclass: "red", imageurl: "../../image/icon_23.png"},
        },
        table2: {
            抢票失败: {url : "../detail/failed", colorclass: "gray", imageurl: "../../image/icon_14.png"},
            已取消: {url : "../detail/cancelled", colorclass: "gray", imageurl: "../../image/icon_18.png"},
            休息中:{url : "../detail/rushing", colorclass: "blue", imageurl: "../../image/icon_15.png"},
            已完成:{url : "../detail/success", colorclass: "green", imageurl: "../../image/icon_7.png"},
            与未完成订单冲突:{url : "../detail/cancelled", colorclass: "gray", imageurl: "../../image/icon_18.png"},
            候补抢票中: {url : "../detail/rushing", colorclass: "blue", imageurl: "../../image/icon_15.png"},
            候补待支付: {url : "../detail/an_paying", colorclass: "red", imageurl: "../../image/icon_23.png"},
            待兑现:{url : "../detail/cashing", colorclass: "darkblue", imageurl: "../../image/icon_25.png"},
        },
        background1: "background-has-order",
        background2: "background-has-order",
        orders: [[], []],
    },

    onShow() {
        var currentTab = wx.getStorageSync('currentTab')
        this.setData({
            currentTab: currentTab
        })

        console.log("orders页面的onShow函数")
        // 清理rushing页面的定时器
        console.log("清理rushing页面的定时器")
        wx.getStorage({
            key: 'rushing_timer',
            success: function (res) {
                clearInterval(res.data);
                console.log("取消定时器:" + res.data);
            }
        })
        this.loadOrder()

    },

    //切换bar
    navbarTap: function (e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
        //全局变量
        wx.setStorageSync('currentTab', this.data.currentTab)
    },
    swiperChange: function (e) {
        this.setData({
            currentTab: e.detail.current,
        })
        //全局变量
        wx.setStorageSync('currentTab', this.data.currentTab)
    },

    loadOrder: function(){
        wx.showLoading({
            title: '加载中'
          })
          let that = this;
          console.log("向后台发送请求,url="+config.urls.GET_ORDERS_URL)
          config.get(config.urls.GET_ORDERS_URL, {}, function(res){
              console.log("后台返回数据")
              console.log(res.data);
              wx.hideLoading()
              let arr = []
              var arr1 = []
              var arr2 = []
              if(res.data.success){
                  arr = JSON.parse(res.data.message);
                  for(var i = 0; i < arr.length; ++i){
                      if(arr[i].rushType == "实时抢票"){
                        var obj = that.data.table1[arr[i].status]
                        arr[i]["colorclass"] = obj.colorclass;
                        arr[i]["imageurl"] = obj.imageurl;
                        arr1.push(arr[i])
                      }
                      if(arr[i].rushType == "候补抢票"){
                        var obj = that.data.table2[arr[i].status]
                        arr[i]["colorclass"] = obj.colorclass;
                        arr[i]["imageurl"] = obj.imageurl;
                        arr2.push(arr[i])
                      }
                  }
              }
              that.setData({
                  orders: [arr1, arr2]
              })
              if(arr1.length == 0)
              {
                  that.setData({
                    background1: "background-no-order"
                  })
              }
              else
              {
                that.setData({
                    background1: "background-has-order"
                })
              }
              if(arr2.length == 0)
              {
                  that.setData({
                    background2: "background-no-order"
                  })
              }
              else
              {
                that.setData({
                    background2: "background-has-order"
                })
              }
          });
    },

    // 下拉刷新
    onPullDownRefresh: function (e) {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading()
        this.loadOrder()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },

    bindtabLookDetail: function(e) {
        console.log("bindtabLookDetail")
        let currentTab = this.data.currentTab
        let index = Number(e.currentTarget.id)
        let order = this.data.orders[currentTab][index]
        let tourl
        if(currentTab == 0){
            tourl = this.data.table1[order.status].url
        }else{
            tourl = this.data.table2[order.status].url
        }
         
        console.log("从order页面跳转到"+ tourl + "页面")
        wx.navigateTo({
            url: tourl,
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log(res);
                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('data', order);
                console.log("order页面向" + tourl + "页面传递数据："+ order)
            }
        })
    }

})