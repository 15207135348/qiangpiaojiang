// pages/order/order.js
var config = require("../../config.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: []
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
        wx.showLoading({
          title: '加载中'
        })
        let that = this;
        console.log("向后台发送请求,url="+config.urls.GET_ORDERS_URL)
        config.get(config.urls.GET_ORDERS_URL, {}, function(res){
            console.log("后台返回数据")
            console.log(res.data);
            wx.hideLoading()
            if(res.data.success){
                let arr = JSON.parse(res.data.message);
                for(var i = 0; i < arr.length; ++i)
                {
                    if(arr[i].status == '抢票成功')
                    {
                        arr[i]["colorclass"] = "success-color";
                        arr[i]["imageurl"] = "../../image/icon_7.png";
                    }
                    else if(arr[i].status == '抢票中')
                    {
                        arr[i]["colorclass"] = "running-color";
                        arr[i]["imageurl"] = "../../image/icon_15.png";
                    }
                    else
                    {
                        arr[i]["colorclass"] = "error-color";
                        arr[i]["imageurl"] = "../../image/icon_14.png";
                    }
                }
                that.setData({
                    orders: arr
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    bindtabLookDetail: function(e) {
        console.log("bindtabLookDetail")
        // let index = Number(e.target.id)
        // let order = this.data.orders[index];
        // if(order["status"] == "抢票成功")
        // {
        //     console.log("从order页面跳转到runing页面")
        //     wx.navigateTo({
        //         url: '../detail/rushing',
        //         events: {
        //             // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        //             okEvent: function (res) {
        //                 console.log(res);
        //             }
        //         },
        //         success: function (res) {
        //             // 通过eventChannel向被打开页面传送数据
        //             res.eventChannel.emit('data', order);
        //         }
        //     })
        // }
    }
})