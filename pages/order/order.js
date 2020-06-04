// pages/order/order.js
var config = require("../../config.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        table: {

            抢票失败: {url : "../detail/failed", colorclass: "failed-color", imageurl: "../../image/icon_14.png"},
            已取消: {url : "../detail/cancelled", colorclass: "cancelled-color", imageurl: "../../image/icon_18.png"},
            休息中:{url : "../detail/rushing", colorclass: "rushing-color", imageurl: "../../image/icon_15.png"},
            已完成:{url : "../detail/success", colorclass: "success-color", imageurl: "../../image/icon_7.png"},

            实时抢票中: {url : "../detail/rushing", colorclass: "rushing-color", imageurl: "../../image/icon_15.png"},
            实时待支付: {url : "../detail/success", colorclass: "success-color", imageurl: "../../image/icon_7.png"},
            
            候补抢票中:{url : "../detail/rushing", colorclass: "rushing-color", imageurl: "../../image/icon_15.png"},
            候补待支付:{url : "../detail/an_success", colorclass: "success-color", imageurl: "../../image/icon_7.png"},
            待兑现:{url : "../detail/an_success", colorclass: "success-color", imageurl: "../../image/icon_7.png"},
        },
        background: "background-has-order"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
              if(res.data.success){
                  arr = JSON.parse(res.data.message);
                  for(var i = 0; i < arr.length; ++i){
                      var obj = that.data.table[arr[i].status]
                      arr[i]["colorclass"] = obj.colorclass;
                      arr[i]["imageurl"] = obj.imageurl;
                  }
              }
              that.setData({
                  orders: arr
              })
              if(arr.length == 0)
              {
                  console.log("当前没有订单")
                  that.setData({
                    background: "background-no-order"
                  })
              }
              else
              {
                that.setData({
                  background: "background-has-order"
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
        let index = Number(e.currentTarget.id)
        let order = this.data.orders[index];
        let tourl = this.data.table[order.status].url
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