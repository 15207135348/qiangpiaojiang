var config = require("../../config.js");
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        fromStation: "武汉",
        toStation: "西安",
        trains: "G571",
        seats: "二等座",
        dates: "2020年1月28/2020年1月29/2020年1月30",
        expireTime: "",

        people: "",
        contactInfo: "",
        payType: {
            i: 1,
            arr: ["先付款安心抢", "抢到票再通知我付款"]
        },
        rushTypes: "",
        hasLogin12306: false,
        accountOf12306: "登陆12306账号",
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
                fromStation: data.fromStation,
                toStation: data.toStation,
                trains: data.trains,
                dates: data.dates,
                dates: data.dates,
                seats: data.seats
            });
        });
        let people = wx.getStorageSync('people')
        let contactInfo = wx.getStorageSync('contactInfo')
        let rushTypes = wx.getStorageSync('rushTypes')
        console.log(people)
        console.log(contactInfo)
        console.log(rushTypes)
        that.setData({
            people: people,
            contactInfo: contactInfo,
            rushTypes: rushTypes
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
                        accountOf12306: data.message,
                        hasLogin12306: true
                    });
                    console.log(data.message);
                } else {
                    that.setData({
                        accountOf12306: "登陆12306账号",
                        hasLogin12306: false
                    });
                    console.log(data.message);
                }
            });
    },

    bindtabLogin12306: function (e) {

        // let that = this;
        // if (that.data.hasLogin12306)

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

    bindtapPeople: function (e) {
        console.log("点击添加乘客")

        if(!this.data.hasLogin12306){
            wx.showModal({
                title: '请先登陆12306',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }

        let that = this;
        wx.navigateTo({
            url: '../people/people',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log("people页面跳回submit页面，返回结果")
                    console.log(res);
                    let str = util.arrJoin(res.data, "/");
                    that.setData({
                        people: str,
                    });
                    wx.setStorageSync('people', str)
                }
            }
        })

    },

    bindinputContactInfo: function (e) {
        this.setData({
            contactInfo: e.detail.value
        });
        console.log(e.detail.value);
        wx.setStorageSync('contactInfo', this.data.contactInfo)
    },

    bindtapPayType: function (e) {
        console.log("选择付款方式");

    },

    bindtaprushType: function(e) {
        console.log("选择抢票方式")
        let that = this;
        wx.navigateTo({
            url: '../rushType/rushType',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log("rushType页面跳回submit页面，返回结果")
                    console.log(res);
                    let str = util.arrJoin(res.data, "/");
                    that.setData({
                        rushTypes: str,
                    });
                    wx.setStorageSync('rushTypes', str)
                }
            }
        })

    },

    bindtapSubmit: function (e) {
        console.log("提交订单");
        if (!this.data.hasLogin12306) {
            wx.showModal({
                title: '先请登陆12306账号',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.people == "") {
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
        if (this.data.contactInfo == "") {
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
        if (this.data.rushTypes == "") {
            wx.showModal({
                title: '选择付款方式',
                content: '支持实时抢票和候补抢票',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        let data = {
            people: this.data.people,
            contactInfo: this.data.contactInfo,
            fromStation: this.data.fromStation,
            toStation: this.data.toStation,
            dates: this.data.dates,
            trains: this.data.trains,
            seats: this.data.seats,
            rushTypes:this.data.rushTypes
        }
        wx.showLoading({
            title: '请稍等...',
        })
        config.get(config.urls.FUCK12306_URL, data, function (res) {
            console.log("下单成功，返回数据:" + res.data);
            wx.hideLoading({
                complete: (res) => {
                    console.log("hideLoading complete res" + res)
                    wx.showModal({
                        title: '正在为您抢票',
                        content: '成功后会微信/邮箱/电话通知您',
                        showCancel: false,
                        success(res) {
                            console.log('用户点击确定')
                            //请求订阅消息【下单成功后后台推送给用户】
                            wx.requestSubscribeMessage({
                                tmplIds: ['K_hAQJeBiVnBwblrF6lB0qZthvlaNFtC_20RgYM3HHc', 'K_hAQJeBiVnBwblrF6lB0pYtVX5ag5-D2sRikUtoouA'],
                                success(res) {
                                    console.log("requestSubscribeMessage res" + res)
                                    wx.navigateTo({
                                        url: '../order/order',
                                        events: {
                                            okEvent: function (res) {
                                                console.log(res);
                                            }
                                        }
                                    })
                                    console.log("navigateTo order页面")
                                }
                            })
                        }
                    })
                }
            })
        });
    }
})