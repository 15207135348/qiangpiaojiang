// pages/detail/runing.js
var config = require('../../config.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: {},
        timer: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //初始化页面数据
        const that = this;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('data', function (data) {
            that.setData({
                order: data
            });
            console.log("rushing页面收到order页面的数据：" + data)
        });
    },

    bindtapCancelOrder: function (e) {
        console.log("bindtapCancelOrder")
        let that = this;
        let order = this.data.order;
        wx.showModal({
            title: '确定要取消订单吗',
            showCancel: true,
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    config.get(config.urls.CANCEL_ORDER_URL, {
                        orderId: order.orderId
                    }, function (res) {
                        console.log(res)
                        if (res.data.success) {
                            wx.navigateBack({
                                delta: 1,
                                success: function (res) {
                                    console.log("navigateBack时取消定时器")
                                    if (that.data.timer != null) {
                                        clearInterval(that.data.timer);
                                        console.log("取消定时器:" + that.data.timer);
                                    }
                                }
                            });
                        }
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
            
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        let order = this.data.order;
        let id = setInterval(function () {
            config.get(config.urls.GET_QUERT_COUNT_URL, {
                orderId: order.orderId
            }, function (res) {
                console.log(res)
                if (res.data.success) {
                    order.queryCount = res.data.message;
                    that.setData({
                        order: order
                    })
                    console.log("查询次数更新：" + order.queryCount);
                }
            });
        }, 5000);
        this.setData({
            timer: id
        });
        wx.setStorageSync('rushing_timer', id)
        console.log("定时器ID:" + id);
    }
})