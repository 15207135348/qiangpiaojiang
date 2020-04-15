// pages/detail/success.js
var config = require('../../config.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: null,
        res: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中'
        })
        //初始化页面数据
        const that = this;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('data', function (data) {
            that.setData({
                order: data
            });
            console.log("rushing页面收到order页面的数据：" + data)

            let order = data;
            console.log("请求成功订单细节");
            config.get(config.urls.GET_SUCCESS_ORDER_URL, {
                orderId: order.orderId
            }, function (res) {
                console.log(res)
                wx.hideLoading()
                if (res.data.success) {
                    let message = res.data.message
                    message = JSON.parse(message);
                    that.setData({
                        res: message
                    })
                }
            });
        });

    },

    deleteOrder: function (e) {
        console.log("deleteOrder")
        let order = this.data.order;
        wx.showModal({
            title: '该操作不可逆，确定要删除订单吗？',
            showCancel: true,
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    config.get(config.urls.DELETE_ORDER_URL, {
                        orderId: order.orderId
                    }, function (res) {
                        console.log(res)
                        if (res.data.success) {
                            wx.navigateBack({
                                delta: 1,
                                success: function (res) {
                                    console.log("返回order页面")
                                }
                            });
                        }
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})