var config = require("../../config.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        from_station: "武汉",
        to_station: "西安",
        trains: "G571",
        seats: "二等座",
        dates: "2020年1月28/2020年1月29/2020年1月30",

        people: "",
        contact_info: "",
        pay_type: {
            i: 1,
            arr: ["先付款安心抢", "抢到票再通知我付款"]
        },
        has_login12306: false,
        account_of12306: "登陆12306账号",
        text: "出票更快，成功率更高"
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
                from_station: data.from_station,
                to_station: data.to_station,
                trains: data.trains,
                dates: data.dates,
                dates: data.dates,
                seats: data.seats
            });
        });
        let people = wx.getStorageSync('people')
        let contact_info = wx.getStorageSync('contact_info')
        console.log(people)
        console.log(contact_info)
        that.setData({
            people: people,
            contact_info: contact_info
        });
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
        let that = this;
        //请求12306账号
        config.get(
            config.urls.GET12306ACCOUNT_URL, {},
            function (res) {
                let data = res.data;
                if (data.success) {
                    that.setData({
                        account_of12306: data.message,
                        has_login12306: true
                    });
                    console.log(data.message);
                } else {
                    that.setData({
                        account_of12306: "登陆12306账号",
                        has_login12306: false
                    });
                    console.log(data.message);
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

    bindtabLogin12306: function (e) {

        // let that = this;
        // if (that.data.has_login12306)

        wx.navigateTo({
            url: '../login/login',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log(res);
                }
            }
        })
    },

    bindtabPeople: function (e) {
        console.log("添加乘客按钮");

    },
    bindinputPeople: function (e) {
        this.setData({
            people: e.detail.value
        });
        console.log(e.detail.value);
        wx.setStorageSync('people', e.detail.value)
    },

    bindinputContactInfo: function (e) {
        this.setData({
            contact_info: e.detail.value
        });
        console.log(e.detail.value);
        wx.setStorageSync('contact_info', this.data.contact_info)
    },

    bindtabPayType: function (e) {
        console.log("选择付款方式");

    },

    bindtapSubmit: function (e) {
        console.log("提交订单");
        if(!this.data.has_login12306)
        {
            wx.showModal({
                title: '先请登陆12306账号',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if(this.data.people == "")
        {
            wx.showModal({
                title: '添加乘客姓名',
                content: '多个人买票请用/分隔',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if(this.data.contact_info == "")
        {
            wx.showModal({
                title: '添加联系方式',
                content: '支持邮箱和手机号',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        let data = {
            people: this.data.people,
            contact_info: this.data.contact_info,
            from_station: this.data.from_station,
            to_station: this.data.to_station,
            dates: this.data.dates,
            trains: this.data.trains,
            seats: this.data.seats
        }

        config.get(config.urls.FUCK12306_URL, data, function (res) {
            console.log(res.data);
            wx.showToast({
                title: '请稍等...'
            })
            //请求订阅消息【下单成功后后台推送给用户】
            wx.requestSubscribeMessage({
                tmplIds: ['K_hAQJeBiVnBwblrF6lB0igpatBc1IQmiUUUX1dGqi4'],
                success(res) {
                    console.log("requestSubscribeMessage res" + res)
                    wx.hideLoading({
                        complete: (res) => {
                            console.log("hideLoading complete res" + res)
                            wx.showModal({
                                title: '正在为您抢票',
                                content: '成功后会微信/邮箱/电话通知您',
                                showCancel: false,
                                success(res) {
                                    console.log('用户点击确定')
                                }
                            })
                        }
                    })
                }
            })
        });
    }
})